import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NewCourseScreen from '../screens/NewCourseScreen';
import CourseScreen from '../screens/CourseScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Search" screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Course' component={CourseScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Search' component={SearchScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='NewCourse' component={NewCourseScreen} options={{ presentation: "modal", headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
