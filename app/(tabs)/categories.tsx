import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const categories = [
  { title: 'Fashion', descriptions: ['Chic', 'Trendy', 'Stylish'], images: [
      require('../../assets/images/fashion-1.jpg'),
      require('../../assets/images/fashion-2.jpg'),
      require('../../assets/images/fashion-3.jpg'),
    ] 
  },
  { title: 'Grocery', descriptions: ['Fresh', 'Organic', 'Local'], images: [
      require('../../assets/images/grocery-1.jpg'),
      require('../../assets/images/grocery-2.jpg'),
      require('../../assets/images/grocery-3.jpg'),
    ] 
  },
  { title: 'Appliances', descriptions: ['Smart', 'Efficient', 'Durable'], images: [
      require('../../assets/images/appliances-1.jpg'),
      require('../../assets/images/appliances-2.jpg'),
      require('../../assets/images/appliances-3.jpg'),
    ] 
  },
  { title: 'Mobiles', descriptions: ['Latest', 'Sleek', 'Powerful'], images: [
      require('../../assets/images/mobiles-1.jpg'),
      require('../../assets/images/mobiles-2.jpg'),
      require('../../assets/images/mobiles-3.jpg'),
    ] 
  },
  { title: 'Electronics', descriptions: ['Innovative', 'High-tech', 'Compact'], images: [
      require('../../assets/images/electronics-1.jpg'),
      require('../../assets/images/electronics-2.jpg'),
      require('../../assets/images/electronics-3.jpg'),
    ] 
  },
  { title: 'Home', descriptions: ['Cozy', 'Stylish', 'Functional'], images: [
      require('../../assets/images/home-1.jpg'),
      require('../../assets/images/home-2.jpg'),
      require('../../assets/images/home-3.jpg'),
    ] 
  },
  { title: 'Beauty', descriptions: ['Radiant', 'Elegant', 'Vibrant'], images: [
      require('../../assets/images/beauty-1.jpg'),
      require('../../assets/images/beauty-2.jpg'),
      require('../../assets/images/beauty-3.jpg'),
    ] 
  },
];

const Categories = () => {
  return (
    <ScrollView style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.cardRow}>
            {category.images.map((image, imgIndex) => (
              <TouchableOpacity key={imgIndex} style={styles.card}>
                <Image source={image} style={styles.image} />
                <Text style={styles.cardDescription}>{category.descriptions[imgIndex]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100, 
    borderRadius: 10,
  },
  cardDescription: {
    textAlign: 'center',
    padding: 5,
    fontStyle: 'italic',
  },
});

export default Categories;
