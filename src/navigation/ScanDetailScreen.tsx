import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as styles from '../styles';
import { NavigationStackProp } from 'react-navigation-stack';
import QRCard, { QrCardObject } from '../components/QRCard';
import Button from '../components/Button';
import TextInput from '../components/Input';
import { ApplicationContext, contextProps } from '../../ApplicationContext';
import { ModalConfirm } from '../components/ModalConfirm';
interface ScanDetailProps {
  navigation: NavigationStackProp;
}

interface ScanDetailState {
  title: string;
  visible: boolean;
}

class ScanDetailScreen extends React.Component<
  ScanDetailProps,
  ScanDetailState
> {
  constructor(props: ScanDetailProps) {
    super(props);
    this.state = {
      title: '',
      visible: false,
    };
  }

  setValue = (name: keyof ScanDetailState, value: any) => {
    this.setState({ [name]: value } as Pick<
      ScanDetailState,
      keyof ScanDetailState
    >);
  };

  render() {
    const { data, target, type } = this.props.navigation.getParam('data', null);
    const restructuredData: QrCardObject = {
      data,
      saved: false,
      date: null,
      name: null,
      uuid: require('uuid/v4')(),
    };
    return (
      <ApplicationContext.Consumer>
        {context => (
          <View style={scanDetailStyles.root}>
            <ModalConfirm
              visible={this.state.visible}
              onRequestClose={() => this.setState({ visible: false })}
              onAccept={() => {
                this.setState({ visible: false });
                this.saveCurrentCode(restructuredData);
              }}
              transparent={true}
            >
              <Text>Would you like to save this code?</Text>
              <TextInput
                name="title"
                value={this.state.title}
                setValue={this.setValue}
              />
            </ModalConfirm>
            <QRCard data={restructuredData} />
            <Button rounded action={() => this.setState({ visible: true })}>
              <Text style={scanDetailStyles.buttonTextStyle}>Save Code</Text>
            </Button>
            <Button rounded outline action={() => this.props.navigation.pop()}>
              <Text
                style={[
                  {
                    color: styles.colors.darkerBasicBlue,
                    textShadowColor: '#fff',
                    fontSize: 20,
                  },
                ]}
              >
                Return
              </Text>
            </Button>
          </View>
        )}
      </ApplicationContext.Consumer>
    );
  }

  saveCurrentCode = (code: QrCardObject) => {
    const name =
      this.state.title !== null && this.state.title !== ''
        ? this.state.title
        : null;
    const newCode: QrCardObject = {
      ...code,
      saved: true,
      date: new Date().toISOString(),
      name,
    };
    this.props.navigation.popToTop();
    this.context.addToList(newCode);
  };
}

ScanDetailScreen.contextType = ApplicationContext;

const scanDetailStyles = StyleSheet.create({
  root: {
    backgroundColor: styles.colors.backGroundColor,
    width: styles.metrics.screenWidth,
    height: styles.metrics.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,

    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 1,
  },
  buttonTextStyleOutline: {
    color: styles.colors.basicButtonColor,
  },
  premissionTextStyle: {
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: styles.colors.redHighlight,
  },
  scannerStyle: {
    width: styles.metrics.screenWidth * 0.95,
    aspectRatio: 1,
  },
});

export default ScanDetailScreen;
