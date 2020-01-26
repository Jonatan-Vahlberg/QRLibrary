import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../styles';
interface ButtonProps {
  action?: Function;
  color?: string;
  rounded?: boolean;
  outline?: boolean;
  ball?: boolean;
  extraStyle?: ViewStyle;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    action,
    color,
    rounded,
    outline,
    children,
    loading,
    ball,
    extraStyle,
  } = props;
  const {
    normalButton,
    roundedStyle,
    outlineStyle,
    buttonSpinner,
    ballStyle,
  } = generateStyles(color);
  const styleArray = [
    normalButton,
    rounded ? roundedStyle : {},
    outline ? outlineStyle : {},
    ball ? ballStyle : {},
    extraStyle,
  ];
  if (loading) {
    return (
      <ActivityIndicator style={buttonSpinner} color={color} size="large" />
    );
  }
  return (
    <TouchableOpacity onPress={() => action()}>
      <View style={styleArray}>{children}</View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  color: colors.darkerBasicBlue,
  rounded: false,
  outline: false,
  extraStyle: {},
  action: () => {},
  loading: false,
  ball: false,
};

const generateStyles = (color: string) => {
  return StyleSheet.create({
    normalButton: {
      width: '100%',
      minHeight: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
      minWidth: 100,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 10,
      marginVertical: 15,
    },
    buttonSpinner: {
      minHeight: 50,
      marginVertical: 15,
    },
    outlineStyle: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 1.5,
      borderColor: color,
    },
    roundedStyle: {
      borderRadius: 25,
    },
    ballStyle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      maxWidth: 60,
      minWidth: 30,
    },
  });
};

export default Button;
