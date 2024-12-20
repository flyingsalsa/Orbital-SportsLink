import { View, Text, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FB_AUTH } from '../../FirebaseConfig';
import thingU from '../../assets/logo.png';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const {width, height} = Image.resolveAssetSource(thingU);


const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FB_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FB_AUTH, email, password);
    } catch (error: any) {
      console.error('Login error:', error.message);
      alert('Login failed' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    if (password.length < 6) {
      alert('password too short');
      setLoading(false);
    } else {
    try {
        const response = createUserWithEmailAndPassword(FB_AUTH, email, password);    
    } catch (error: any) {
      console.error('Login error:', error.message);
      alert('Sign up failed' + error.message);
    } finally {
      alert('Sign Up successful!');
      setLoading(false);
    }
  }
}


  return (
    <SafeAreaView style = {styles.container}>
      <Image source={require('../../assets/logo.png')} style={{ resizeMode: 'contain', width: ww * 0.85, height: null, aspectRatio: (width/height), marginBottom: 10, }}/>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)} maxLength={100} />
      <TextInput style={styles.input} secureTextEntry = {true} placeholder="Password" autoCapitalize="none" value={password} onChangeText={(text) => setPassword(text)} />
      {loading ? ( 
      <ActivityIndicator size="large" color="#000ff" />
      ) : ( 
      <>
      <Button color='#1580C2' title="Login" onPress ={() => signIn()} />
      <View style = {{paddingVertical: 2.5}} />
      <Button color='#1580C2' title="Sign Up" onPress ={() => signUp()} />
      </>
      )
    }
    </SafeAreaView>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#1580C2',
    borderWidth: 3,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    paddingVertical: 1,
    borderRadius: 20
  },
  spacingContainer: {
    paddingVertical: 5, 
  },
});

export default Login;