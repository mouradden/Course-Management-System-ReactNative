import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScheduleDisplay from './ScheduleDisplay'
import { CourseType } from '../types'


const CourseCard = ({ title, description, instructor, schedule, color }: CourseType & { color: string }) => {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <View className={`bg-white border border-gray-300 rounded-3xl shadow-md p-4 mx-8  mb-3 ${color}`}>
            <View className='flex flex-row items-start'>
                <Text className="text-xl text-white font-bold mb-2 flex-1">{title}</Text>
                <ScheduleDisplay schedule={schedule} />
            </View>
            <Text className="text-gray-700 font-semibold">Instructor: {instructor}</Text>
            <Text className="text-gray-100 my-2">
                {isExpanded ? description : `${description.substring(0, 100)}...`}
            </Text>

            {/* Read more/less Toggle */}
            <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
                <Text className="text-yellow-300 font-semibold mt-1">
                    {description.length > 100 ? isExpanded ? 'Read less' : 'Read more' : ''}
                </Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default CourseCard;
