import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AtSymbolIcon, LockClosedIcon } from 'react-native-heroicons/outline/'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const registerUser = () => {
        const user = {'username': username, 'email': email, 'password': password};
        axios.post('http://192.168.1.106:3000/auth/register', user)
        .then((response)=>{
            console.log('user registred successfully ', response.data);
        })
        .catch((error)=>{
            console.log('error registring user ', error);
        })
    }
  return (
    <SafeAreaView className='flex items-center space-y-2'>
        <View className='flex items-center justify-center h-80'>
            <Text className='text-4xl font-bold'>Register</Text>
        </View>
        <View className='flex flex-row items-center gap-4'>
            <View className='pt-2'>
                <AtSymbolIcon size={28} color='gray'/>
            </View>
            <TextInput
                onChangeText={setUsername}
                placeholder='Username'
                className='border-b-2 border-gray-200 text-2xl w-2/3 p-2'
            />
        </View>
        <View className='flex flex-row items-center gap-4'>
            <View className='pt-2'>
                <AtSymbolIcon size={28} color='gray'/>
            </View>
            <TextInput 
                onChangeText={setEmail}
                placeholder='Email'
                className='border-b-2 border-gray-200 text-2xl w-2/3 p-2'
            />
        </View>
        <View className='flex flex-row items-center gap-4 mb-12'>
            <View className='pt-2'>
                <LockClosedIcon size={28} color='gray'/>
            </View>
            <View className='flex flex-row items-center border-b-2 border-gray-200 w-2/3'>
                <TextInput 
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    className=' text-2xl p-2  flex-1'
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
            onPress={()=>{
                registerUser();
            }}
            className='p-2 w-1/3 bg-blue-500 rounded-xl items-center'>
            <Text className='text-white font-semibold text-lg'>Register</Text>
        </TouchableOpacity>
        <View className='flex flex-row p-4'>
            <Text className='text-lg'>Already have an accout ? </Text>
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('Login');
                }}
            >
                <Text className='text-blue-600 text-lg'>Sign In</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen