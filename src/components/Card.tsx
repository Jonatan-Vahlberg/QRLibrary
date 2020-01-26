import React, { ReactNode } from 'react';
import { View, Text, ViewStyle, StyleSheet, TextStyle } from 'react-native';

interface CardProps {
  style?: ViewStyle;
  label?: String;
  labelStyle?: TextStyle;
  children: ReactNode;
}

const Card: React.FC<CardProps> = props => {
  return (
    <View style={[styles.root, props.style]}>
      {props.label !== null && (
        <View style={styles.labelView}>
          <Text style={[styles.labelStyle, props.labelStyle]}>
            {props.label}
          </Text>
        </View>
      )}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    minHeight: 100,
    elevation: 7.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 2,
  },
  labelView: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelStyle: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Card;
