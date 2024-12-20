import { View, Text, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, Button, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FB_AUTH, db } from '../../FirebaseConfig'
import { doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const user = FB_AUTH.currentUser;

  useEffect(() => {
    if (user) {
      fetchCurrentUsername();
    }
  });

  const fetchCurrentUsername = async() => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().username != null) {
         setCurrentUsername(docSnap.data().username + '!');
      } else {
        setCurrentUsername('Enter your name here');
      }
  };

  const updateUsername = async () => {
    if (!user) {
      alert('Error You must be logged in to update your username');
      return;
    }

    if (!newUsername.trim()) {
      alert('Error Username cannot be empty');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { username: newUsername }, { merge: true });
      alert('Success, Username updated successfully');
      setCurrentUsername(newUsername);
      setNewUsername('');
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Error Failed to update username');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{flex: 1}} source={require('../../assets/homescreenbackground.png')} resizeMode='cover'>
      <View style={styles.utilityView}>
        <Button color='red' title='settings' onPress={() => navigation.navigate('Settings')}/>
      </View>
      <Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode='contain'/>
      <View style={styles.welcomeTextView}>
        <Text style={styles.welcomeText}>Hey there,</Text>
        <TextInput
        maxLength={17}
        style={styles.welcomeText2}
        value={newUsername}
        onChangeText={setNewUsername}
        placeholder={`${currentUsername}`}
        onSubmitEditing={updateUsername}
        returnKeyType="done"
        />
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Matchmaking')}>
          <Text style={styles.button2Text}>Let's Find {'\n'} a match!</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      rowGap: 0
    },

    utilityView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      columnGap: 10,
      padding: 20
    },
    logo: {
      width: '60%',
      height: 'undefined',
      aspectRatio: 1667/464,
      alignSelf: 'center',
    },

    welcomeTextView: {
      paddingTop: 30,
      flex: 2,
      alignItems: 'center',
    },
    
    buttonAreaView: {
      flex: 4,
      alignItems: 'center',
      rowGap: 20
    },

    welcomeText: {
      fontSize: 45,
      alignSelf: 'center',
      fontWeight: 'bold'
    },


    welcomeText2: {
      fontSize: 34,
      alignSelf: 'stretch',
      textAlign: 'center',
      fontWeight: 'bold',
      paddingBottom: 20
    },

    button2: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
      height: 100,
      width: '75%',
      borderRadius: 100,
      borderColor: '#1580c2',
      borderWidth: 3
    },

    button2Text: {
      color: '#1580C2',
      fontWeight: 'bold',
      fontSize: 26,
      lineHeight: 38
    }

});

export default Home