import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const banners = [
    require('../../assets/images/banner-1.jpg'),
    require('../../assets/images/banner-2.jpg'),
    require('../../assets/images/banner-3.jpg'),
    require('../../assets/images/banner-4.jpg'),
    require('../../assets/images/banner-5.jpg'),
    require('../../assets/images/banner-6.jpg'),
    require('../../assets/images/banner-7.jpg'),
  ];

  // Get the screen width
  const screenWidth = Dimensions.get('window').width;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dev.api.bexcart.com/api/product/list');
        const result = await response.json();
        if (result.status) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Search and Logo */}
      <View className="flex-row items-center p-4 mb-4">
        <Image 
          source={require('../../assets/images/logo-1.png')} 
          className="w-20 h-20 mr-4 rounded-full" 
        />
        
        <TextInput 
          className="flex-1 h-12 bg-white rounded-full px-4 border border-gray-200" 
          placeholder="Search for products..." 
          placeholderTextColor="#888"
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        
       
      </View>

      {/* Banner Carousel */}
      <Carousel
        loop
        width={screenWidth}
        height={250}
        autoPlay={true}
        data={banners}
        renderItem={({ item }) => (
          <View className="w-full h-full rounded-xl overflow-hidden shadow-md justify-center items-center">
            <Image source={item} className="w-full h-full object-cover" />
          </View>
        )}
      />

      {/* Promotional Text */}
      <View className="mt-6 px-4">
        <Text className="text-2xl font-bold text-center text-gray-800">Big Sale! Up to 50% Off</Text>
        <Text className="text-center text-gray-600 mt-2">
          Don't miss out on our special deals! Get the best prices on your favorite products.
        </Text>
        <Text className="text-center text-red-500 font-semibold mt-2">Limited Time Offer!</Text>
      </View>

      {/* Product Cards */}
      <View className="mt-6 px-4">
        <FlatList
          data={filteredProducts} 
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View className="w-[48%] bg-white rounded-lg overflow-hidden shadow-md mt-4">
              <Image 
                source={{ uri: item.thumbnailImage?.filePath }} 
                className="w-full h-40 object-cover" 
              />
              <Text className="p-2 text-center font-semibold text-gray-800">{item.name}</Text>
            </View>
          )}
          scrollEnabled={false} 
        />
      </View>

      {/* Footer Offers */}
      <View className="mt-8">
        <Text className="text-xl font-bold text-center text-gray-800 mb-4">More Offers & Discounts</Text>
        <Carousel
          loop
          width={screenWidth}
          height={150}
          autoPlay={true}
          data={banners}
          renderItem={({ item }) => (
            <View className="w-full h-full rounded-xl overflow-hidden shadow-md justify-center items-center">
              <Image source={item} className="w-full h-full object-cover" />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
