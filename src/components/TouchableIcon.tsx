import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface IconProps {
  name?: string;
  size?: number;
  color?: string;
  action?: Function;
}

const TouchableIcon: React.FC<IconProps> = ({ name, size, color, action }) => {
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}
    >
      <TouchableOpacity onPress={() => action()}>
        <Icon name={name} color={color} size={size} />
      </TouchableOpacity>
    </View>
  );
};

TouchableIcon.defaultProps = {
  name: 'home',
  color: 'red',
  size: 30,
  action: () => {},
};

export default TouchableIcon;
