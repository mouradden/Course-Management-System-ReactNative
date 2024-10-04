import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ScheduleDisplay from './ScheduleDisplay'
import { CourseType } from '../types'
import { useNavigation } from '@react-navigation/native';
import { UserIcon } from 'react-native-heroicons/outline'; 

const CourseCard = ({ title, description, instructor, schedule, color }: CourseType & { color: string }) => {
    const [isExpanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
        onPress={() => {
            navigation.navigate("Course", { title, description, instructor, schedule });
        }}
        className={`rounded-3xl shadow-lg mx-8 mb-4 ${color}`}
    >
        <View 
            className={`bg-white p-6 rounded-3xl shadow-md ${color}`}
        >
            <View className='flex flex-row items-center mb-2'>
                <Text className="text-2xl font-bold text-gray-900 flex-1">{title}</Text>
                    <ScheduleDisplay schedule={schedule}/>
            </View>
            <View className='flex flex-row gap-4 items-center'>
                <UserIcon/>
                <Text className="text-black-700 font-bold">Instructor: {instructor}</Text>
            </View>
            <Text className={`text-gray-600 my-2 ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}>
                {isExpanded ? description : `${description.substring(0, 100)}...`}
            </Text>

            <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
                <Text className="text-red-500 font-semibold mt-1 underline">
                    {description.length > 100 ? isExpanded ? 'Read less' : 'Read more' : ''}
                </Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>

    );
};

export default CourseCard;
