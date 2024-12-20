import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, FB_AUTH } from '../../FirebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'

const Groups = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}> 
    <Text style={styles.headerText}>Manage Groups</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('My Groups')}>
          <Text style={styles.buttonText}>
            My Groups
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Joined Groups')}>
            Joined Groups
          </Text >
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Make a New Group')}>
          <Text style={styles.createText}>
            Create Group
          </Text >
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 100,
    width: '75%',
    borderRadius: 100,
    borderColor: '#1580c2',
    borderWidth: 3,
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    borderRadius: 30,
    borderColor: '#1580c2',
    borderWidth: 3,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  headerText: {
    fontSize: 45,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 100
  },
  createText: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#1580C2',
    padding: 10
  },
  buttonText: {
    color: '#1580C2',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 38,
  }

    
});
export default Groups