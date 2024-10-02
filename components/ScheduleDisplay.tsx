import React from 'react';
import { View, Text } from 'react-native';

interface ScheduleProps {
    schedule: string;
}

const ScheduleDisplay = ({ schedule }: ScheduleProps) => {
    // Split the schedule string into day and hour
    const [day, time] = schedule.split(' ');

    return (
        <View className="flex items-center justify-center bg-white rounded-2xl p-2">
            {/* Day part */}
            <Text className="text-black font-bold uppercase">{day.slice(0,3)}</Text>

            {/* Time part */}
            <Text className="text-gray-800 text-sm">{time}</Text>
        </View>
    );
};

export default ScheduleDisplay;
