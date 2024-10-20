// src/screens/Welcome.js
import { View, Text, Image } from 'react-native';
import React from 'react';
import Button from '@/components/Button'; 
import { useNavigation } from '@react-navigation/native'; 

const Welcome = () => {
  const navigation = useNavigation(); 

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Image 
        source={require('../assets/images/welcome-image.png')} 
        className="w-full h-1/2 object-cover mb-4"
      />
      <Text className="text-3xl font-bold mb-2">Welcome to ShopEasy!</Text>
      <Text className="text-lg text-center mb-4">
        Discover a wide range of products at unbeatable prices. 
      </Text>
      <Button
        title="Shop Now"
        onPress={() => {
          console.log('Visit button pressed');
          navigation.navigate('(tabs)'); 
        }}
      />
    </View>
  );
};

export default Welcome;
