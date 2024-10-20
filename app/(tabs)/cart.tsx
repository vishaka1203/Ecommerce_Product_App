import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const CART_API_URL = 'https://dev.api.bexcart.com/api/product/list';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(CART_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const handleProceedToBuy = () => {
    alert('Proceeding to buy the selected products!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.thumbnailImage.filePath }} style={styles.image} />
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.price}>Price: ${item.pricing.price}</Text>
            <Text style={styles.offerPrice}>Offer Price: ${item.pricing.offerPrice}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToBuy}>
        <Text style={styles.proceedButtonText}>Place order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  offerPrice: {
    fontSize: 16,
    color: 'red',
  },
  proceedButton: {
    marginTop: 20,
    backgroundColor: '#00BF7B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default Cart;
