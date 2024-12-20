import {Image, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react'
import { FB_AUTH, db } from '../../FirebaseConfig'
import { collection, addDoc, query, where, getDocs, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';

const CreateGroups = () => {
    const [groupName, setGroupName] = useState("");
    const [sport, setSport] = useState("");
    const [level, setLevel] = useState("");
    const [AdditionalInfo, setAdditionalInfo] = useState("");
    
    const createGroup = async () => {
      if (!groupName.trim()) {
        alert('Please enter a group name');
        return;
      }
      try {
        const docRef = await addDoc(collection(db, 'groups'), {
          GroupName: groupName,
          GroupOwner: FB_AUTH.currentUser.uid,
          memberUIDs: [FB_AUTH.currentUser.uid],
          Sport: sport,
          Level: level,
          OtherInfo: AdditionalInfo
        });
        alert('Group created successfully!');
      } catch (error) {
        console.error('Error creating group:', error);
        alert('Failed to create group');
      }
    };

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Name: </Text>
                <TextInput style={styles.input}
                    placeholder="insert group name here"
                    onChangeText={(text) => setGroupName(text)}
                />
            </View>
            <View>
                <Text style={styles.text}>Type of Sport: </Text>
                <RNPickerSelect
                    placeholder={{label: "Select a sport...", value: null}}
                    onValueChange={(value) => setSport(value)}
                    items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Badminton', value: 'badminton' },
                    { label: 'Hockey', value: 'hockey' },
                    ]}
                />
            </View>
            <View>
                <Text style={styles.text}>Skill Level: </Text>
                <RNPickerSelect
                    placeholder={{label: "Select a skill level...", value: null}}
                    onValueChange={(value) => setLevel(value)}
                    items={[
                    { label: 'Low-Beginner', value: 'Low-Beginner' },
                    { label: 'Mid-Beginner', value: 'Mid-Beginner' },
                    { label: 'High-Beginner', value: 'High-Beginner' },
                    { label: 'Low-Intermediate', value: 'Low-Intermediate' },
                    { label: 'Mid-Intermediate', value: 'Mid-Intermediate' },
                    { label: 'High-Intermediate', value: 'High-Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                    ]}
                />
            </View>
                <View>
                <Text style={styles.text}>Additional Information: </Text> 
                <TextInput style={styles.additionalInfoInput}
                    multiline
                    placeholder="Add any additional information you want here such as location timing etc." 
                    onChangeText={(text) => setAdditionalInfo(text)}
                />
                </View>    
            <View style={{paddingTop: 200}}>
                <TouchableOpacity style={styles.button} onPress={createGroup}>
                    <Text style={styles.buttonText}>Create Group!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 100,
        resizeMode:'contain',
        width: 200,
        height: 80,
        borderRadius: 30,
        borderColor: '#1580c2',
        borderWidth: 3,
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingBottom: 100,
        position: 'absolute',
        top: 70
    },
    buttonText: {
        color: '#1580C2',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 25,
    },
    text: {
        fontSize: 20,
        paddingLeft: 12,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    additionalInfoInput: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }

})

export default CreateGroups;