import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AtSymbolIcon, LockClosedIcon, ArrowLeftIcon, UserIcon } from 'react-native-heroicons/outline/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const registerUser = () => {
        if (!username || !email || !password) {
            setWarning('Please fill in all fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setWarning('Please enter a valid email address.');
            return;
        }

        setWarning('');

        const user = { username, email, password };
        axios.post('http://192.168.1.106:3000/auth/register', user)
        .then((response) => {
            const { status, message, user } = response.data;

            if (status === 201) { 
                console.log('User registered successfully', user);
                setIsRegistered(true);
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 2000);
            } else if (status === 400) {
                console.log('Registration failed:', message);
                setWarning(message);
            }
        })
        .catch((error) => {
            console.log('Error registering user:', error);
            setWarning('An error occurred while registering. Please try again later.');
        });

    };

    return (
        <SafeAreaView className='flex items-center space-y-2'>
             <TouchableOpacity 
            onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Home');
                }
              }}
            className="right-32 border rounded-full w-14 h-14 items-center pt-1 m-3 bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
            <ArrowLeftIcon size={42} color='black' />
        </TouchableOpacity>
            <View className='flex items-center justify-center h-80'>
                <Text className='text-4xl font-bold'>Register</Text>
            </View>
            <View>
                {
                    isRegistered && <Text className='text-green-500 text-lg'>Registed Successfully, redirecting to Login page</Text>
                }
            </View>
            <View>
                {
                    warning ? (
                        <Text className='text-red-500 text-xl font-semibold'>{warning}</Text>
                    ) : null
                }
            </View>
            <View className='flex flex-row items-center gap-4'>
                <View className='pt-2'>
                    <UserIcon size={28} color='gray' />
                </View>
                <TextInput
                    onChangeText={setUsername}
                    placeholder='Username'
                    className='border-b-2 border-gray-200 text-2xl w-2/3 p-2'
                />
            </View>
            <View className='flex flex-row items-center gap-4'>
                <View className='pt-2'>
                    <AtSymbolIcon size={28} color='gray' />
                </View>
                <TextInput
                    onChangeText={setEmail}
                    placeholder='Email'
                    className='border-b-2 border-gray-200 text-2xl w-2/3 p-2'
                />
            </View>
            <View className='flex flex-row items-center gap-4 mb-12'>
                <View className='pt-2'>
                    <LockClosedIcon size={28} color='gray' />
                </View>
                <View className='flex flex-row items-center border-b-2 border-gray-200 w-2/3'>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        className='text-2xl p-2 flex-1'
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={26}
                        color="black"
                        onPress={toggleShowPassword}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={registerUser}
                className='p-2 w-1/3 bg-blue-500 rounded-xl items-center'>
                <Text className='text-white font-semibold text-lg'>Register</Text>
            </TouchableOpacity>
            <View className='flex flex-row p-4'>
                <Text className='text-lg'>Already have an account? </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text className='text-blue-600 text-lg'>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
