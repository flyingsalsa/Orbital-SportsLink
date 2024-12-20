import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Login from './app/screens/Login'
import Settings from './app/screens/Settings';
import HomeTabs from './app/screens/HomeTabs';
import Matchmaking from "./app/screens/Matchmaking";
import{ User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FB_AUTH } from './FirebaseConfig';
import CreateGroups from './app/screens/CreateGroups';
import MyGroups from './app/screens/MyGroups';
import JoinedGroups from './app/screens/JoinedGroups';
import GroupDetailScreen from './app/screens/GroupDetailScreen';

const Stack = createNativeStackNavigator(); 
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
  <InsideStack.Navigator >
    <InsideStack.Screen options={{headerShown: false}} name='HomeTabs' component={HomeTabs}/>
    <InsideStack.Screen options={{headerShown: false}} name='Settings' component={Settings}/>
    <InsideStack.Screen options={{headerShown: false}} name='Matchmaking' component={Matchmaking}/>
    <InsideStack.Screen name='Make a New Group' component={CreateGroups}/>
    <InsideStack.Screen name='My Groups' component={MyGroups}/>
    <InsideStack.Screen name='Joined Groups' component={JoinedGroups}/>
    <InsideStack.Screen name='Group Details' component={GroupDetailScreen}/>
    
  </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    onAuthStateChanged(FB_AUTH, user => { 
      console.log('user', user);
      setUser(user);
    });
  });

  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      {user ? (<Stack.Screen name='In' component={InsideLayout} options={{headerShown: false}} />)
      : (<Stack.Screen name='Login' component={Login} options={{headerShown: false}} />)}
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
