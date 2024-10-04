import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UserType } from '@/types';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ArrowLeftIcon, UserCircleIcon, UserIcon, AtSymbolIcon, PhoneIcon, GlobeAltIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline'; 
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState<UserType>(null);
    const [loading, setLoading] = useState(true);
    const [bounceValue] = useState(new Animated.Value(1)); // For bounce animation

    const checkLoginStatus = async () => {
        const userToken = await SecureStore.getItemAsync('userToken');
        if (!userToken) {
          navigation.navigate('Login');
        } else {
          getLoggedUser();
        }
      };
    
    const getLoggedUser = async () => {
        const userToken = await SecureStore.getItemAsync('userToken');
        try {
            const response = await axios.get('http://192.168.1.106:3000/profile', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log('response ', response.data);
            setUser(response.data);
        } catch (error) {
            console.log('error getting the user', error);
        } finally {
            setLoading(false);
            Animated.spring(bounceValue, {
                toValue: 1.1,
                friction: 3,
                useNativeDriver: true,
            }).start(() => {
                Animated.spring(bounceValue, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-yellow-50">
                <ActivityIndicator size="large" color="yellow" />
            </SafeAreaView>
        );
    }

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-br from-yellow-300 to-yellow-500 relative">
            {/* Background Shapes */}
            <View className="absolute inset-0 bg-white opacity-10 rounded-full transform -translate-x-1/2" style={{ width: '150%', height: '150%', top: '-30%', left: '50%' }} />
            <View className="absolute inset-0 bg-yellow-200 opacity-30 rounded-full transform -translate-y-1/4" style={{ width: '120%', height: '120%', top: '50%', left: '-20%' }} />
            
            <View className="flex flex-row justify-between w-full px-4">
                {/* Back Button (left) */}
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="border rounded-full w-14 h-14 items-center pt-1 bg-white shadow-xl transform rotate-12 hover:scale-110">
                    <ArrowLeftIcon size={42} color="black" />
                </TouchableOpacity>
                
                {/* Logout Button (right) */}
                <TouchableOpacity 
                    onPress={handleLogout}
                    className="border rounded-full w-14 h-14 items-center justify-center bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
                    <ArrowRightOnRectangleIcon size={30} color="black" />
                </TouchableOpacity>
            </View>

            <Animated.View style={{ transform: [{ scale: bounceValue }] }} className='flex items-center mb-4'>
                <View className='relative'>
                    <UserCircleIcon size={150} color="blue" />
                    {/* Status Indicator */}
                    <View className='absolute right-1 bottom-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
                </View>
            </Animated.View>

            {/* Header with Gradient */}
            <View className='bg-white rounded-lg shadow-md p-4 mx-4 mb-4'>
                <Text className="text-center text-xl font-bold mb-1">{user?.username}</Text>
                <Text className="text-center text-gray-600">{user?.bio || 'This user has not set a bio.'}</Text>
            </View>

            {/* User Info Section */}
            <View className='flex items-center bg-white rounded-lg shadow-md p-4 mx-4'>
                {/* Icons with Labels */}
                {[
                    { icon: <UserIcon size={28} color='black' />, label: user?.username },
                    { icon: <AtSymbolIcon size={28} color='gray' />, label: user?.email },
                    { icon: <PhoneIcon size={28} color='gray' />, label: user?.phone || 'N/A' },
                    { icon: <GlobeAltIcon size={28} color='gray' />, label: user?.website || 'No website available' },
                ].map((item, index) => (
                    <View className='flex flex-row items-center mb-2' key={index}>
                        {item.icon}
                        <Text className="ml-2 text-lg font-semibold">{item.label}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
