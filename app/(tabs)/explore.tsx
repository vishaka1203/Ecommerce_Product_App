import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  Modal, 
  TouchableOpacity 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [likedProducts, setLikedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dev.api.bexcart.com/api/product/list');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        setSelectedProduct(item);
        setModalVisible(true);
      }} 
      className="bg-white rounded-lg shadow-md m-2 flex-1 h-64 p-4"
    >
      <Image
        source={{ uri: item.productImages[0].filePath }}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <Text className="font-bold text-lg">{item.name}</Text>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-[#00BF7B] font-semibold text-base">Price: ${item.pricing.price}</Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="ml-1 text-gray-700">{item.ratingCount}</Text>
          <TouchableOpacity
            onPress={() => {
              setLikedProducts(prev => ({
                ...prev,
                [item._id]: !prev[item._id],
              }));
            }}
            className="ml-2"
          >
            <Ionicons
              name={likedProducts[item._id] ? "heart" : "heart-outline"}
              size={16}
              color={likedProducts[item._id] ? "#00BF7B" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00BF7B" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TextInput
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="border border-gray-300 rounded-lg p-2 mb-4"
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item._id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-4 w-3/4">
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: selectedProduct.productImages[0].filePath }}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <Text className="font-bold text-2xl">{selectedProduct.name}</Text>
                <Text className="text-[#00BF7B] font-semibold text-lg">
                  Price: ${selectedProduct.pricing.price}
                </Text>
                <Text className="text-gray-700 mt-2">Description: {selectedProduct.shortDescription}</Text>
                <Text className="text-gray-700 mt-2">Category: {selectedProduct.category.name}</Text>
                <Text className="text-gray-700 mt-2">Subcategory: {selectedProduct.subCategory.name}</Text>
              </>
            )}
            <TouchableOpacity onPress={closeModal} className="mt-4 bg-[#00BF7B] p-2 rounded">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Explore;
