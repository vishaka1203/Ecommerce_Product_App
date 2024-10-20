import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors'; 
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00BF7B', 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background, 
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? '#00BF7B' : color} /> // Change icon color to #00BF7B if focused
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search'} color={focused ? '#00BF7B' : color} /> 
          ),
        }}
      />
       <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list'} color={focused ? '#00BF7B' : color} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart'} color={focused ? '#00BF7B' : color} /> 
          ),
        }}
      />
       <Tabs.Screen
        name="account"
        options={{
          title: 'account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person'} color={focused ? '#00BF7B' : color} /> 
          ),
        }}
      />
    </Tabs>
  );
}
