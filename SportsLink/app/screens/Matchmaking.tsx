import { View, Text, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, Button, TouchableOpacity, ImageBackground, FlatList, Touchable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FB_AUTH, db } from '../../FirebaseConfig'
import { collection, addDoc, query, where, getDocs, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';

const Matchmaking = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [username, setUsername] = useState('');
    

    useEffect(() => {
      fetchUsername();
    }, []);
  
    const fetchUsername = async () => {
      if (FB_AUTH.currentUser) {
        const userRef = doc(db, 'users', FB_AUTH.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }
      }
    };
  
    const searchGroups = async () => {
      const groupsRef = collection(db, 'groups');
      const q = query(groupsRef, where('GroupName', '>=', searchTerm), 
                                  where('GroupName', '<=', searchTerm + '\uf8ff'),
                                  where('GroupOwner', '!=', FB_AUTH.currentUser.uid));
      
      try {
        const querySnapshot = await getDocs(q);
        const groupsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroups(groupsList);
      } catch (error) {
        console.error('Error searching groups:', error);
      }
    };
    searchGroups();
  
    const renderGroupItem = ({ item }) => (
      <View style={styles.groupItem}>
        <View>
          <Text style={styles.groupHeaderText}>{item.GroupName}</Text>
          <Text>{item.Sport}</Text>
          <Text>{item.Level}</Text>
        </View>
        <Button title="Join" onPress={() => joinGroup(item.id)} />
      </View>
    );
  
    const joinGroup = async (groupId) => {
        if (!FB_AUTH.currentUser) {
          Alert.alert('Error! You must be logged in to join a group');
          return;
        }
      
        try {
          const groupRef = doc(db, 'groups', groupId);
          const groupSnap = await getDoc(groupRef);
          
          if (groupSnap.exists()) {
            const groupData = groupSnap.data();
            
            // Check if user is already a member
            if (groupData.memberUIDs && groupData.memberUIDs.includes(FB_AUTH.currentUser.uid)) {
              alert('Info: You are already a member of this group');
              return;
            }
      
            // If not a member, add the user UID to the group
            await updateDoc(groupRef, {
              memberUIDs: arrayUnion(FB_AUTH.currentUser.uid)
            });
      
            alert('Success! You have joined the group successfully!');
            searchGroups(); // Refresh the group list
          } else {
            alert('Error Group not found');
          }
        } catch (error) {
          console.error('Error joining group:', error);
          alert('Error! Failed to join group');
        }
      };



    return (
      <SafeAreaView style={{flex: 1}}>
        <Button title='BACK TO HOME' onPress={() => navigation.navigate('HomeTabs')}/>
          <View style={styles.container}>
            <Text style={styles.title}>Matchmaking</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search for groups"
              />
              <TouchableOpacity style={styles.searchButton} onPress={searchGroups}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#1580c2'}}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={groups}
              renderItem={renderGroupItem}
              keyExtractor={item => item.id}
              style={styles.list}
            />
          </View>
      </SafeAreaView>
    );
};
    
  
const styles = StyleSheet.create({ 
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    groupHeaderText: {
      fontWeight: 'bold',
      fontSize: 18
    },
    searchContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
        flex: 1,
      borderWidth: 1,
      borderColor: 'gray',
      marginRight: 10,
      padding: 8,
    },
    input2: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom:8
      },
    list: {
      flex: 1,
    },
    groupItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    createGroupContainer: {
      marginTop: 20,
      flexDirection: 'column',
      textAlignVertical: 'center'
    },
    searchButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      backgroundColor: 'white',
      height: 50,
      width: '20%',
      borderRadius: 100,
      borderColor: '#1580c2',
      borderWidth: 3,
    },

  });

export default Matchmaking