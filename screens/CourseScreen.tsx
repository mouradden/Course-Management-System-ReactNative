import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native'
import { CourseType } from '../types';
import { ArrowLeftIcon, UserIcon, CalendarIcon } from 'react-native-heroicons/outline'; 

const CourseScreen = () => {
    const navigation = useNavigation();
    const { params }: { params: CourseType } = useRoute();
    const { title, description, instructor, schedule } = params;
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(30);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-r from-blue-200 to-purple-300 p-6">
            {/* Back Button */}
            <View>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="border rounded-full w-14 h-14 items-center pt-1 m-3 bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
                    <ArrowLeftIcon size={42} color='black' />
                </TouchableOpacity>
            </View>

            {/* Animated Course Details Card */}
            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
                <Text className="text-5xl font-extrabold text-gray-800 mb-6 text-center tracking-wider rotate-3">
                    {title}
                </Text>
                <Text className="text-lg text-gray-700 italic mb-8 text-center">
                    {description}
                </Text>

                {/* Instructor Card */}
                <TouchableOpacity className="flex flex-row items-center bg-red-300 rounded-2xl p-4 mb-4 shadow-md transform rotate-2 space-x-4 mb-8">
                    <UserIcon size={30} color="#065f46" className="mr-4"/>
                    <View>
                        <Text className="text-teal-900 text-xl">Instructor</Text>
                        <Text className="text-teal-900 font-bold text-2xl">{instructor}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center bg-green-200 rounded-2xl p-4 shadow-md transform -rotate-2 space-x-4">
                    <CalendarIcon size={30} color="#1e3a8a" className="mr-4"/>
                    <View>
                        <Text className="text-navy-900 text-xl">Schedule</Text>
                        <View className="flex flex-row">
                            <Text className="text-navy-900 font-bold text-2xl">{schedule.split(' ')[0]}</Text>
                            <Text className="text-navy-900 font-medium text-xl ml-2">{schedule.split(' ')[1]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            {/* Bottom Subtle Image Background */}
            <Image 
                source={{ uri: 'https://example.com/fancy-pattern.png' }} 
                className="absolute bottom-0 w-full h-full opacity-5"
                style={{ zIndex: -1 }}
            />
        </SafeAreaView>
    );
};

export default CourseScreen;
