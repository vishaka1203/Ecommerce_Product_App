import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ACCOUNT_API_URL = 'https://dev.api.bexcart.com/api/product/list';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(ACCOUNT_API_URL);
        const data = await response.json();
        
       
        if (data.data.length > 0) {
          const userData = data.data[0].addedBy.userId; 
          setUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        } else {
          Alert.alert('Error', 'No user data available.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged Out') },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey!</Text>
      <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>

      <FlatList
        data={[
          { name: 'Orders', icon: 'cart' },
          { name: 'Wishlist', icon: 'heart' },
          { name: 'Coupons', icon: 'pricetag' },
          { name: 'Help Center', icon: 'help-circle' },
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={item.icon} size={24} color="#00BF7B" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Account Settings</Text>
      <FlatList
        data={[
          { name: 'My Activity', icon: 'time' },
          { name: 'Add Reviews', icon: 'star' },
          { name: 'Q & A', icon: 'chatbubble' },
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={item.icon} size={24} color="#00BF7B" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Feedback and Information</Text>
      <FlatList
        data={[
          { name: 'Terms and Policies', icon: 'document' },
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={item.icon} size={24} color="#00BF7B" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 8,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff3d00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Account;
