import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Notifications from './Notifications';
import Groups from './Groups';
import { NavigationProp } from '@react-navigation/native';
import { FB_AUTH } from '../../FirebaseConfig';
import Icons from 'react-native-vector-icons/AntDesign';


interface RouterProps { navigation: NavigationProp<any,any>; }
const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }: RouterProps) => {
  return (
   <Tab.Navigator screenOptions={{}}>
    <Tab.Screen name="Home" options={{ 
      headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" color={color} size={size} />
          ),
     }} component={Home} />
    <Tab.Screen name="Groups" 
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
      <Icons name="team" color={color} size={size} />
    ), }} 
    component={Groups} /> 
  {/* <Tab.Screen
     options={{
      tabBarIcon: ({ color, size }) => (
      <Icons name="notification" color={color} size={size} />
    ), }} 
    name="Notifications" component={Notifications}  
    /> */}
   </Tab.Navigator> 
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default HomeTabs