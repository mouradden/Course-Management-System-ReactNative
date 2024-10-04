import { Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NewCourseScreen from '../screens/NewCourseScreen';
import CourseScreen from '../screens/CourseScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function Index() {
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Course' component={CourseScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Search' component={SearchScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ presentation: "fullScreenModal", headerShown: false}}/>
        <Stack.Screen name='NewCourse' component={NewCourseScreen} options={{ presentation: "modal", headerShown: false}} />
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}
const FooterNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: 'lightgray', marginBottom: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex items-center">
          <Ionicons name="home-outline" size={30} color="black" />
          <Text className="text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} className="flex items-center">
          <Ionicons name="grid-outline" size={30} color="black" />
          <Text className="text-xs">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} className="flex items-center">
          <Ionicons name="search-outline" size={30} color="black" />
          <Text className="text-xs">Search</Text>
        </TouchableOpacity>
      </View>
  );
};
