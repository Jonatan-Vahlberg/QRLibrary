import React from 'react';
import { View, TouchableOpacity, Text, TextStyle } from 'react-native';
import { colors } from '../styles';

interface LinkTextProps {
  text?: string;
  action?: Function;
  color?: string;
  textStyle?: TextStyle;
}

const LinkText: React.FC<LinkTextProps> = ({
  text,
  action,
  color,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={() => action()}>
      <Text
        style={[
          {
            textDecorationColor: color,
            textDecorationLine: 'underline',
            color: color,
            paddingHorizontal: 10,
            paddingVertical: 5,
            textAlign: 'center',
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

LinkText.defaultProps = {
  action: () => {},
  color: colors.darkerBasicBlue,
  text: '[URL HERE]',
  textStyle: {},
};

export default LinkText;
