import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline/';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { daysOfWeek, hoursOfDay } from '../types';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const NewCourseScreen = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [warning, setWarning] = useState(''); // State for warning message
    const schedule = selectedDay + ' ' + selectedHour;

    const addCourse = () => {
        // Check if any fields are empty
        if (!title || !description || !instructor || !selectedDay || !selectedHour) {
            setWarning('Please fill in all fields.');
            return;
        }

        setWarning(''); // Clear previous warnings

        const newCourse = { title, description, instructor, schedule };
        axios.post('http://localhost:3000/course/addNew', newCourse)
            .then((response) => {
                console.log('A course added successfully', response.data);
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Failed to add new course', error);
            });
    };

    return (
        <View className='flex p-4 items-center'>
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("Dashboard");
                }}
                className='flex flex-row items-center left-40 p-2 border rounded-full bg-black mb-4'>
                <Text className='text-white'>Close</Text>
                <XMarkIcon size={24} color='white' />
            </TouchableOpacity>
            <View>
                <Text className='text-2xl font-bold mb-20'>Add New Course</Text>
            </View>
            {warning ? (
                <Text className='text-red-500 mb-4'>{warning}</Text> // Display warning message
            ) : null}
            <View className='flex flex-col items-center pl-2 gap-4'>
                <View className='flex flex-row gap-4 items-center'>
                    <Text className='w-1/5'>Title</Text>
                    <TextInput
                        onChangeText={setTitle}
                        keyboardType='default'
                        placeholder='Enter a Title'
                        className='border border-gray-400 rounded w-3/4 h-8 p-2'
                    />
                </View>
                <View className='flex flex-row gap-4 items-center'>
                    <Text className='w-1/5'>Description</Text>
                    <TextInput
                        onChangeText={setDescription}
                        placeholder='Enter a Description'
                        multiline
                        className='border border-gray-400 rounded w-3/4 h-24 p-2'
                    />
                </View>
                <View className='flex flex-row gap-4 items-center'>
                    <Text className='w-1/5'>Instructor</Text>
                    <TextInput 
                        onChangeText={setInstructor}
                        placeholder='Enter the full name of the Instructor'
                        className='border border-gray-400 rounded w-3/4 h-8 p-2'
                    />
                </View>
                <View className='flex flex-row items-center gap-4 px-4'>
                    <Text className='w-1/5'>Schedule</Text>
                    <View className='flex flex-row space-x-10 mb-6 w-4/5 items-center'>
                        <View className={`flex ${Platform.OS === 'ios' ? 'flex-row' : 'flex-col'} items-center gap-8`}>
                            <View className='border border-gray-300 p-2'>
                                <Text className='mb-1'>Day</Text>
                                {
                                    Platform.OS === 'ios' ?
                                    <RNPickerSelect
                                        onValueChange={(value) => setSelectedDay(value)}
                                        items={daysOfWeek}
                                        placeholder={{ label: 'Select a day', value: null }}
                                        style={pickerSelectStyles.inputIOS}
                                    />
                                    :
                                    <Picker
                                        style={{ height: 50, width: 170, borderWidth: 2, borderColor: 'red', borderRadius: 5 }}
                                        selectedValue={selectedDay}
                                        onValueChange={(itemValue) => setSelectedDay(itemValue)}>
                                        {
                                            daysOfWeek.map((day, index) => (
                                                <Picker.Item key={index} label={day.label} value={day.value} />
                                            )) 
                                        }
                                    </Picker>
                                }
                            </View>
                            <View className='border border-gray-300 p-2'>
                                <Text className='mb-1'>Hour</Text>
                                {
                                    Platform.OS === 'ios' ?
                                    <RNPickerSelect
                                        onValueChange={(value) => setSelectedHour(value)}
                                        items={hoursOfDay}
                                        placeholder={{ label: 'Select an hour', value: null }}
                                        style={pickerSelectStyles.inputIOS}
                                    />
                                    :
                                    <Picker
                                        mode={"dialog"}
                                        style={{ height: 50, width: 140, borderWidth: 2, borderColor: 'red', borderRadius: 5 }}
                                        selectedValue={selectedHour}
                                        onValueChange={(itemValue) => setSelectedHour(itemValue)}>
                                        {
                                            hoursOfDay.map((hour, index) => (
                                                <Picker.Item key={index} label={hour.label} value={hour.value} />
                                            )) 
                                        }
                                    </Picker>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={addCourse}
                    className='flex items-center border rounded w-24 bg-blue-400 p-2'>
                    <Text className='text-white text-lg font-bold'>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
});

export default NewCourseScreen;
