import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UserIcon, LockClosedIcon, ArrowLeftIcon } from 'react-native-heroicons/outline/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isOk, setIsOk] = useState<boolean>(true);
    const [warning, setWarning] = useState<string>(''); // State for warning message
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const logInUser = () => {
        if (!username || !password) {
            setWarning('Please enter your username and password.');
            return;
        }

        setWarning('');

        const user = { username, password };
        axios.post('http://localhost:3000/auth/login', user)
            .then(async (response) => {
                // console.log('User logged in successfully', response.data);
                await SecureStore.setItemAsync('userToken', response.data.access_token);
                navigation.navigate('Home');
            })
            .catch((error) => {
                setIsOk(false);
                console.log('Error logging in user', error);
            });
    };

    useEffect(() => {
        setIsOk(true);
    }, []);

    const checkLogin = async () => {
        try {
            const userToken = await SecureStore.getItemAsync('userToken');
            return userToken !== null;
        } catch (error) {
            console.error('Error checking login status', error);
            return false;
        }
    };

    useEffect(() => {
        const checkAndNavigate = async () => {
            const isLoggedIn = await checkLogin();
            if (isLoggedIn) {
                navigation.navigate('Home'); 
            }
        };
        checkAndNavigate();
    }, []);
    return (
        <SafeAreaView className='flex items-center space-y-2'>
             <TouchableOpacity 
            onPress={() => {
                  navigation.navigate('Home');
              }}
            className="right-32 border rounded-full w-14 h-14 items-center pt-1 m-3 bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
            <ArrowLeftIcon size={42} color='black' />
        </TouchableOpacity>
            <View className='flex items-center justify-center h-80'>
                <Text className='text-4xl font-bold'>Login</Text>
            </View>
            <View>
                {
                    !isOk ? 
                    <View className='flex items-center'>
                        <Text className='text-red-500 text-xl font-semibold'>Something went wrong.</Text>
                        <Text className='text-red-500 text-xl font-semibold'>Verify your Username / Password.</Text>
                    </View>
                    :
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
                onPress={logInUser}
                className='p-2 w-1/3 bg-blue-500 rounded-xl items-center'>
                <Text className='text-white font-semibold text-lg'>Login</Text>
            </TouchableOpacity>
            <View className='flex flex-row p-4'>
                <Text className='text-lg'> Not registered yet? </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text className='text-blue-600 text-lg'>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
