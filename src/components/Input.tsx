import React from 'react';
import {
  View,
  TextInput as Input,
  Text,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles';

interface InputProps {
  value: string;
  name: string;
  setValue: Function;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  placeholder?: string;
}

const TextInput: React.FC<InputProps> = props => {
  const { value, name, setValue, keyboardType, secure, placeholder } = props;
  const { containerStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text>{props.name.replace(/^\w/, char => char.toUpperCase())}</Text>
      <Input
        value={value}
        onChangeText={value => setValue(name, value)}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        placeholder={placeholder}
        style={inputStyle}
      />
    </View>
  );
};

TextInput.defaultProps = {
  keyboardType: 'default',
  secure: false,
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  inputStyle: {
    width: '100%',
    backgroundColor: colors.lightGreyBackground,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 5,
    fontSize: 18,
  },
});

export default TextInput;
