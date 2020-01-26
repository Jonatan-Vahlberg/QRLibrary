import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as styles from '../styles';

interface ModalConfirmProps {
  onRequestClose?: Function;
  onAccept?: Function;
  visible?: boolean;
  transparent?: boolean;
  colors?: {
    background: string;
    acceptBtn: string;
    declineBtn: string;
    btnText: string;
  };
  texts?: { acceptBtn: string; declineBtn: string };
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  children,
  onRequestClose,
  onAccept,
  visible,
  colors,
  transparent,
  texts,
}) => {
  const {
    container,
    buttonStyle,
    buttonView,
    buttonSubView,
    btnTextStyle,
    outsideContainer,
  } = generateStyles(colors);
  return (
    <Modal
      onRequestClose={() => onRequestClose()}
      visible={visible}
      transparent={transparent}
    >
      <View style={outsideContainer}>
        <View style={container}>
          <ScrollView>{children}</ScrollView>
          <View style={buttonView}>
            <View style={buttonSubView}>
              <TouchableOpacity onPress={() => onAccept()}>
                <View
                  style={[buttonStyle, { backgroundColor: colors.acceptBtn }]}
                >
                  <Text style={btnTextStyle}>{texts.acceptBtn}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={buttonSubView}>
              <TouchableOpacity onPress={() => onRequestClose()}>
                <View
                  style={[buttonStyle, { backgroundColor: colors.declineBtn }]}
                >
                  <Text style={btnTextStyle}>{texts.declineBtn}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const generateStyles = colors => {
  return StyleSheet.create({
    outsideContainer: {
      backgroundColor: '#00000050',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignSelf: 'center',
      alignContent: 'center',
      width: '80%',
      maxHeight: '60%',
      minHeight: '10%',
      borderRadius: 10,
      backgroundColor: colors.background,
    },
    buttonStyle: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 10,
    },
    buttonView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    buttonSubView: {
      flex: 1,
      paddingHorizontal: 5,
    },
    btnTextStyle: {
      color: colors.btnText,
      fontSize: 20,
      fontWeight: '700',
    },
  });
};

ModalConfirm.defaultProps = {
  onRequestClose: () => {},
  onAccept: () => {},
  visible: false,
  transparent: true,
  colors: {
    background: '#fff',
    acceptBtn: styles.colors.greenHighlight,
    declineBtn: styles.colors.redHighlight,
    btnText: '#fff',
  },
  texts: { acceptBtn: 'Ok', declineBtn: 'Decline' },
};

export { ModalConfirm };
