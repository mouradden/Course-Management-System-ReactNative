import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpenIcon, UserIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid/';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if a user is logged in
  const checkLogin = async () => {
    try {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (userToken) {
        setIsLoggedIn(true);
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking login status', error);
    }
  };

  // Check login status when the home screen loads
  useEffect(() => {
    // checkLogin();
  }, []);  

  return (
    <SafeAreaView className="flex-1">
      {/* Gradient Background */}
      <LinearGradient
        colors={['#f6d365', '#fda085']}
        className="absolute inset-0"
      />

      {/* Centered Content */}
      <View className="flex-1 justify-center items-center px-4">
        
        {/* Hero Image */}
        <Image
          source={require('../assets/images/bg-pic.png')}
          className="h-80 w-screen rounded-lg shadow-lg mb-6"
        />

        {/* Welcome and Motivation Text */}
        <Text className="text-black text-4xl font-bold mb-2">Welcome Back!</Text>
        <Text className="text-black text-xl text-center mb-8">Unlock your potential by mastering new skills today!</Text>

        {/* Quick Links to Course Sections */}
        <View className="flex-row justify-between w-full px-6">
          
          {/* My Courses Button */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Dashboard')} 
            className="flex items-center p-4 bg-white rounded-lg shadow-md w-28">
            <BookOpenIcon size={40} color="black" />
            <Text className="text-black mt-2 text-sm">Courses</Text>
          </TouchableOpacity>

          {/* Progress Button */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Search')} 
            className="flex items-center p-4 bg-white rounded-lg shadow-md w-28">
            <MagnifyingGlassIcon size={40} color="black" />
            <Text className="text-black mt-2 text-sm">Search</Text>
          </TouchableOpacity>

          {/* Profile Button */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')} 
            className="flex items-center p-4 bg-white rounded-lg shadow-md w-28">
            <UserIcon size={40} color="black" />
            <Text className="text-black mt-2 text-sm">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
