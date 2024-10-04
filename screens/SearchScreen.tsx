import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MagnifyingGlassIcon, ArrowLeftIcon } from 'react-native-heroicons/outline/'
import axios from 'axios';
import { CourseType } from '@/types';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isAskedForMore, setIsAskedForMore] = useState<boolean>(false);

    const navigation =  useNavigation();
    useEffect(() => {
        if (searchQuery.length >= 3) {
            fetchCourses(1);
            setPage(1);
            setIsAskedForMore(false);
        }
    }, [searchQuery]);
    const fetchCourses = async (currentPage: number) => {
            if (searchQuery.length >= 3) {
                axios.get('http://192.168.1.106:3000/course/search',
                    { params: 
                        {
                            'searchQuery': searchQuery,
                            'page': currentPage,
                        }
                    }
                )
                .then ((response) => {
                    setCourses(response.data);
                })
                .catch ((error) => {
                    console.log('cannot get the data', error);
                })
            }
            else
                setCourses([]);
    }

    const handleSeeMore = () => {
        setIsAskedForMore(true);
        const nextPage = page + 1;
        fetchCourses(nextPage);
        setPage(nextPage);
    };
    const handleSearch = () => {
        setIsAskedForMore(true);
        fetchCourses(0);
    };
    const checkLogin = async () => {
        try {
          const userToken = await SecureStore.getItemAsync('userToken');
          if (!userToken) {
            navigation.navigate('Login');
          }
        } catch (error) {
          console.error('Error checking login status', error);
        }
    };
    useEffect(() => {
        checkLogin();
      }, []);  
  return (
    <SafeAreaView className='flex-1'>
    <View className=' bg-white'>
        <TouchableOpacity 
            onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Home');
                }
              }}
            className="border rounded-full w-14 h-14 items-center pt-1 m-3 bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
            <ArrowLeftIcon size={42} color='black' />
        </TouchableOpacity>
    </View>
    <View className="flex-1 justify-center items-center bg-white p-4">
        <View className='flex flex-start right-32'>
            <Text className='text-2xl font-bold'>Search</Text>
        </View>
        <View className=" flex flex-row items-center border rounded-lg p-2 mb-4 mt-4 w-80">
            <TextInput
                placeholder="Search by title or instructor"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className='flex-1 p-2'
            />
            <TouchableOpacity 
                onPress={()=>{
                    handleSearch();
                }}
                className='bg-blue-200 p-2 rounded-md'>
                <MagnifyingGlassIcon />
            </TouchableOpacity>
        </View>

        {
            !isAskedForMore && courses.length > 0 ? (
            <FlatList
                data={courses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate("Course",
                                { title: item.title, description: item.description, instructor: item.instructor, schedule: item.schedule });
                        }}
                        className="mb-4 p-4 border rounded-lg bg-white shadow-md w-80">
                        <Text className="text-xl font-bold">{item.title}</Text>
                        <Text className="text-gray-700">Instructor: {item.instructor}</Text>
                        <Text className="text-gray-500">Schedule: {item.schedule}</Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    courses.length === 4 ? (
                        <TouchableOpacity
                            onPress={() => {
                                handleSeeMore();
                            }}
                            className="flex items-center border rounded-lg p-2 mb-4 w-80 bg-blue-200"
                        >
                            <Text>See Search Results</Text>
                        </TouchableOpacity>
                    ) : null // Use null instead of an empty fragment
                }
                
            />
            )
            : isAskedForMore && courses.length > 0 ?
            (
                <>
                    <Text className='py-2 font-bold right-32'>Search Results</Text>
                     <FlatList
                        data={courses}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                onPress={()=>{
                                    navigation.navigate("Course",
                                        { title: item.title, description: item.description, instructor: item.instructor, schedule: item.schedule });
                                }}
                                className="mb-4 p-4 border rounded-lg bg-white shadow-md w-80 bg-gray-100">
                                <Text className="text-xl font-bold">{item.title}</Text>
                                <Text className="text-gray-700">Instructor: {item.instructor}</Text>
                                <Text className="text-gray-500">Schedule: {item.schedule}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View className='flex flex-row gap-4'>
                        {
                            page > 1 ?
                            <TouchableOpacity
                                onPress={()=>{
                                    if(page > 1){
                                        const nextPage = page - 1;
                                        console.log('nextPage ', nextPage);
                                        fetchCourses(nextPage);
                                        setPage(nextPage);
                                    }
                                }}
                                className='border rounded-md bg-gray-200 p-2'    
                            >
                                <Text>Back</Text>
                            </TouchableOpacity>
                            :
                            <></>

                        }
                        <TouchableOpacity
                            onPress={()=>{
                                const nextPage = page + 1;
                                fetchCourses(nextPage);
                                setPage(nextPage);
                            }}
                            className='border rounded-md bg-gray-200 p-2'    
                        >
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
            : isAskedForMore && courses.length === 0 ?
            <View className='flex flex-col space-y-4'>
                <Text>No More Results Found</Text>
                <TouchableOpacity
                    onPress={()=>{
                        if(page > 1){
                            const nextPage = page - 1;
                            fetchCourses(nextPage);
                            setPage(nextPage);
                        }
                    }}
                    className='border rounded-md bg-gray-200 p-2 items-center'    
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            </View> 
            :
            <></>
        }
        </View>
        </SafeAreaView>
  )
}

export default SearchScreen