import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpenIcon, UserIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid/';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Function to check if a user is logged in
  const checkLogin = async () => {
    try {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (userToken) {
        setIsLoggedIn(true);
      } 
      
    } catch (error) {
      console.error('Error checking login status', error);
    }
  };

  // Check login status when the home screen loads
  useEffect(() => {
    checkLogin();
  }, []);  

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#f6d365', '#fda085']}
        className="absolute inset-0"
      />

      <View className="flex-1 justify-center items-center px-4">
        <Image
          source={require('../assets/images/bg-pic.png')}
          className="h-80 w-screen rounded-lg shadow-lg mb-6"
        />

        {/*  join Button */}
        {
          !isLoggedIn && 
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            className="absolute top-8 w-32 left-2/3 transform -translate-x-1/2 p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg border-2 border-blue-800 bg-blue-800">
            <View className="flex flex-row items-center justify-center">
              <Text className="text-white text-lg font-semibold ml-2">Join</Text>
            </View>
          </TouchableOpacity>
        }

        <Text className="text-black text-4xl font-bold mb-2">Welcome Back!</Text>
        <Text className="text-black text-xl text-center mb-8">Unlock your potential by mastering new skills today!</Text>
        
        {/* Nav bar buttons */}
        <View className="flex-row justify-between w-full px-6">
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Dashboard')} 
            className="flex items-center p-4 bg-white rounded-lg shadow-md w-28">
            <BookOpenIcon size={40} color="black" />
            <Text className="text-black mt-2 text-sm">Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Search')} 
            className="flex items-center p-4 bg-white rounded-lg shadow-md w-28">
            <MagnifyingGlassIcon size={40} color="black" />
            <Text className="text-black mt-2 text-sm">Search</Text>
          </TouchableOpacity>

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
