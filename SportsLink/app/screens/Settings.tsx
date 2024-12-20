import { View, Text, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, Button, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FB_AUTH } from '../../FirebaseConfig'

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            
            <Text style ={{fontSize:30}}>Settings</Text>
            <Button title='back' onPress={() => navigation.navigate('HomeTabs')}/>
            <View style ={{padding:8}}/>     
            <Button onPress={() => FB_AUTH.signOut()} title = 'Logout' />
        </SafeAreaView>
    )

}

export default Settings