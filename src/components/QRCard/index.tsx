import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Clipboard,
  Linking,
} from 'react-native';
import Card from '../Card';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import * as rules from '../../rules';
import * as styles from '../../styles';
import TouchableIcon from '../TouchableIcon';
import LinkText from '../LinkText';

export interface QRCardProps {
  data: QrCardObject;
  deleteCommand?: Function;
}

export type QrCardObject = {
  data: string;
  saved: boolean;
  date?: string;
  name: string;
  uuid?: string;
};

const copyIcon = (value: string) => (
  <TouchableIcon
    name="clipboard-text-outline"
    action={() => {
      Clipboard.setString(value);
    }}
    size={30}
    color={styles.colors.greyDetail}
  />
);

const deleteIcon = (uuid: string, action: Function) => (
  <TouchableIcon name="delete" action={() => action()} size={30} />
);

class QRCard extends React.Component<QRCardProps> {
  render() {
    const {
      data: { saved, date, name },
    } = this.props;

    let label: String = saved
      ? `${date.substr(0, 10)} ${date.substr(11, 5)}`
      : null;
    if (name !== null && name !== '') {
      label = `${name}\n${label}`;
    }

    return <Card label={label}>{this.renderCardContent(this.props.data)}</Card>;
  }
  renderCardContent = (data: QrCardObject) => {
    const { data: dataValue } = data;
    const {
      phoneRegex,
      imageRegex,
      emailRegex,
      websiteRegex,
    } = rules.regexRules;
    if (imageRegex.test(dataValue)) {
      const imageUrl = dataValue.match(imageRegex)[0];
      return (
        <React.Fragment>
          <View style={qrStyles.container}>
            <Image source={{ uri: imageUrl }} style={qrStyles.qrImage} />
            <LinkText
              text={imageUrl}
              action={() => this.loadInBrowser(imageUrl)}
            />
          </View>
          <View style={qrStyles.buttonContainer}>
            {copyIcon(dataValue)}
            {data.saved && deleteIcon(data.uuid, this.props.deleteCommand)}
          </View>
        </React.Fragment>
      );
    } else if (websiteRegex.test(dataValue)) {
      const websiteUrl = dataValue.match(websiteRegex)[0];
      return (
        <React.Fragment>
          <View style={qrStyles.container}>
            <LinkText
              text={websiteUrl}
              action={() => this.loadInBrowser(websiteUrl)}
            />
          </View>
          <View style={qrStyles.buttonContainer}>
            {copyIcon(dataValue)}
            {data.saved && deleteIcon(data.uuid, this.props.deleteCommand)}
          </View>
        </React.Fragment>
      );
    } else if (phoneRegex.test(dataValue)) {
      const phoneNumber = dataValue.match(phoneRegex)[0];
      return (
        <React.Fragment>
          <View style={qrStyles.container}>
            <Text>Number: {phoneNumber}</Text>
          </View>
          <View style={qrStyles.buttonContainer}>
            {copyIcon(dataValue)}
            <TouchableIcon
              name="phone"
              action={() => Linking.openURL(`tel:${phoneNumber}`)}
              color="#18880d"
            />
            <TouchableIcon
              name="chat"
              action={() => Linking.openURL(`sms:${phoneNumber}`)}
              color={styles.colors.darkerBasicBlue}
            />
            {data.saved && deleteIcon(data.uuid, this.props.deleteCommand)}
          </View>
        </React.Fragment>
      );
    } else if (emailRegex.test(dataValue)) {
      const email = dataValue.match(emailRegex)[0];
      return (
        <React.Fragment>
          <View style={qrStyles.container}>
            <Text>Mail: {email}</Text>
          </View>
          <View style={qrStyles.buttonContainer}>
            {copyIcon(dataValue)}
            <TouchableIcon
              name="email"
              action={() => Linking.openURL(`mailto:${email}`)}
            />
            {data.saved && deleteIcon(data.uuid, this.props.deleteCommand)}
          </View>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <View style={qrStyles.container}>
          <Text>{dataValue}</Text>
        </View>
        <View style={qrStyles.buttonContainer}>
          {copyIcon(dataValue)}
          {data.saved && deleteIcon(data.uuid, this.props.deleteCommand)}
        </View>
      </React.Fragment>
    );
  };

  loadInBrowser = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
}

const qrStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  qrImage: {
    width: '90%',
    aspectRatio: 16 / 9,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default QRCard;
