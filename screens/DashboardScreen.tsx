import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native'
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline/'
import CourseCard from '../components/CourseCard';
import { useEffect, useState } from 'react';
import { CourseType } from '../types'
import axios from 'axios';
import { TodayDate } from '../components/TodayDate'

const DashboardScreen = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [pageStart, setPageStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(5);

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
                console.log('got ' +response.data.length+ ' elemets between ', pageStart, pageEnd);
            })
            .catch ((error) => {
                console.log('cannot get the data', error);
            })
    }, [pageStart, pageEnd]);
    // console.log('course ', courses);
    const colors: string[] = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
  return (
    <SafeAreaView className='relative flex-1 bg-white'>
        {/* First View (Header) */}
        <View className='flex flex-row px-8 pt-8 items-center mb-8'>
            <View className='flex-col flex-1'>
                <Text className='text-3xl font-bold'>Dashboard</Text>
                <TodayDate />
            </View>
            <TouchableOpacity className='border border-blue-500 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 p-1'>
                <PlusIcon size={40} color="white"
                    className='border rounded bg-blue-400'
                />
            </TouchableOpacity>
        </View>
        
        {/* Second View (Main Content) */}
        <View className="flex-grow px-3">
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

        {/* Last View (Pagination) Fixed at the Bottom */}
        <View className='absolute bottom-0 w-full flex flex-row items-center justify-center gap-4 bg-white pb-6'>
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
                pageStart / 5 - 1 >= 0 ? 
                <TouchableOpacity className={`p-2 border rounded-full ${pageStart === 0 ? 'bg-blue-200' : ''}`}>
                    <Text>{pageStart / 5 - 1}</Text>
                </TouchableOpacity> 
                :
                <></>

            }
            <TouchableOpacity className='p-2 border rounded-full'>
                <Text>{pageStart / 5}</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-2 border rounded-full'>
                <Text>{pageStart / 5 + 1}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>{
                    setPageStart((prev)=>prev + 5);
                    setPageEnd((prev)=>prev + 5);
                }}
                className='p-2 border rounded-full'>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>

  )
}

export default DashboardScreen