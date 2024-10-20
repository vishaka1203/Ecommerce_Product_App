// src/components/Button.js
import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { backgroundColor: '#00BF7B' }, 
        {
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        },
        style, 
      ]}
    >
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
