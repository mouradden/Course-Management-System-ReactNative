import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native'
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline/'
import CourseCard from '../components/CourseCard';
import { useEffect, useState } from 'react';
import { CourseType } from '../types'
import axios from 'axios';
import { TodayDate } from '../components/TodayDate'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const DashboardScreen = () => {
    const navigation = useNavigation();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [coursesLength, setCoursesLength] = useState<number>(0);
    const [pageStart, setPageStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(5);
    const colors: string[] = ['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300', 'bg-purple-300'];


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
    useEffect(()=>{
        checkLogin();
        axios.get('http://192.168.1.106:3000/course')
        .then ((response) => {
            setCoursesLength(response.data);
        })
        .catch ((error) => {
            console.log('cannot get the data', error);
        })
    }, []);
    useEffect(()=>{
        axios.get('http://192.168.1.106:3000/course/byInterval',
            { params: 
                {
                    'start': pageStart,
                    'end': pageEnd,
                }
            }
        )
        .then ((response) => {
            setCourses(response.data);
        })
        .catch ((error) => {
            console.log('cannot get the data', error);
        })
    }, [pageStart, pageEnd]);

    
  return (
    <SafeAreaView className='flex-1 bg-white'>
        {/* (Header) */}
        <View className='flex flex-row justify-between px-8 pt-8 items-center mb-8'>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Home")}
                className="border rounded-full w-14 h-14 items-center pt-1 mr-8 bg-yellow-300 shadow-xl transform rotate-12 hover:scale-110">
                <ArrowLeftIcon size={42} color='black' />
            </TouchableOpacity>
            <View className='flex-col flex-1'>
                <Text className='text-3xl font-bold'>Dashboard</Text>
                <TodayDate />
            </View>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate("NewCourse");
                }}
                className='border border-blue-500 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 p-1'>
                <PlusIcon size={40} color="white"
                    className='border rounded bg-blue-400'
                />
            </TouchableOpacity>
        </View>
        
        {/* (Main Content) */}
        <View className="flex-grow px-3 h-4/5">
            <FlatList
                data={courses}
                renderItem={({ item, index }: { item: CourseType; index: number }) => (
                    <>
                    <CourseCard
                        title={item.title}
                        description={item.description}
                        instructor={item.instructor}
                        schedule={item.schedule}
                        color={colors[index % colors.length]}
                    />
                    </>
                )}
            />
        </View>

        {/* Pagination */}
        <View className='absolute bottom-0 w-full flex flex-row items-center justify-center gap-1 bg-white pb-6'>
            <TouchableOpacity
                onPress={()=>{
                    if (pageStart === 0)
                        return;
                    else if (pageStart <= 5)
                    {
                        setPageStart(0);
                        setPageEnd((prev)=>prev - 5);
                    }
                    else
                    {
                        setPageStart((prev)=>prev - 5);
                        setPageEnd((prev)=>prev - 5);
                    }
                }}
                className='p-2 border rounded-full'>
                <Text>Prev</Text>
            </TouchableOpacity>
            {
                pageStart > 5 ?
                <TouchableOpacity 
                    onPress={()=>{
                        setPageStart(0);
                        setPageEnd(5);
                    }}
                        className={`p-2 border rounded-full ${pageStart === 0 ? 'bg-blue-200' : ''}`}>
                        <Text>0</Text>
                </TouchableOpacity> 
                :
                <></>

            }
            <View>
                <Text>...</Text>
            </View>
            {
                pageStart / 5 - 1 >= 0 ? 
                <TouchableOpacity 
                onPress={()=>{
                    setPageStart((pageStart / 5 - 1) * 5);
                    setPageEnd((pageStart / 5 - 1) * 5 + 5);
                }}
                    className={`p-2 border rounded-full ${pageStart === 0 ? 'bg-blue-200' : ''}`}>
                    <Text>{pageStart / 5 - 1}</Text>
                </TouchableOpacity> 
                :
                <></>

            }
            <TouchableOpacity 
                onPress={()=>{
                    setPageStart((pageStart / 5) * 5);
                    setPageEnd((pageStart / 5) * 5 + 5);
                }}
                className={`p-2 border rounded-full bg-blue-200`}>
                <Text>{pageStart / 5}</Text>
            </TouchableOpacity>
            {
                (pageStart / 5 + 1) * 5 <= coursesLength ?
                <TouchableOpacity 
                    onPress={()=>{
                        setPageStart((pageStart / 5 + 1) * 5);
                        setPageEnd((pageStart / 5 + 1) * 5 + 5);
                    }}
                    className='p-2 border rounded-full'>
                    <Text>{pageStart / 5 + 1}</Text>
                </TouchableOpacity>
                :
                <></>
            }
            <View>
                <Text>...</Text>
            </View>
            {
                pageStart / 5 !== parseInt(coursesLength / 5, 10) ?
                <TouchableOpacity 
                    onPress={()=>{
                        setPageStart(parseInt(coursesLength / 5, 10) * 5);
                        setPageEnd(parseInt(coursesLength / 5, 10) * 5 + 5);
                    }}
                    className='p-2 border rounded-full'>
                    <Text>Last</Text>
                </TouchableOpacity>
                :
                <></>

            }
            {
                pageStart / 5 + 1 <= parseInt(coursesLength / 5, 10) ?
                <TouchableOpacity 
                    onPress={()=>{
                        setPageStart((prev)=>prev + 5);
                        setPageEnd((prev)=>prev + 5);
                    }}
                    className='p-2 border rounded-full'>
                    <Text>Next</Text>
                </TouchableOpacity>
                :
                <></>
            }
        </View>
    </SafeAreaView>

  )
}

export default DashboardScreen