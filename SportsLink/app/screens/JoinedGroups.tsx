import { View, Button, Text, FlatList, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, query, where, getDocs, doc, updateDoc, arrayRemove, getDoc, setDoc } from 'firebase/firestore';
import { db, FB_AUTH } from '../../FirebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'

const JoinedGroups = ({ navigation }) => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserGroups();
    }, []);

    const fetchUserGroups = async () => {
        if (!FB_AUTH.currentUser) {
            Alert.alert('Error', 'You must be logged in to view your groups');
            setLoading(false);
            return;
        }

        try {
            const groupsRef = collection(db, 'groups');
            const q = query(groupsRef, where('memberUIDs', 'array-contains', FB_AUTH.currentUser.uid), where('GroupOwner', '!=', FB_AUTH.currentUser.uid));
            const querySnapshot = await getDocs(q);
            const groups = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
        }));
        setUserGroups(groups);
        
        } catch (error) {
            console.error('Error fetching user groups:', error);
            Alert.alert('Error', 'Failed to fetch your groups');

        }
    };

    const renderGroupItem = ({ item }) => (
        <View style={styles.groupItem}>
          <View style={{flex: 1}}>
            <Text style={styles.groupHeaderText}>{item.GroupName}</Text>
            <Text>{item.Sport}</Text>
            <Text>{item.Level}</Text>
            <Text>{item.OtherInfo}</Text>
          </View>
          <Button title="View"  onPress={() => navigation.navigate('Group Details', { group: item })}/>
          <Button title="Leave" color='red' onPress={() => leaveGroup(item.id)} />
        </View>
      );

      const leaveGroup = async (groupId) => {
        try {
          const groupRef = doc(db, 'groups', groupId);
          const groupSnap = await getDoc(groupRef);
          if (groupSnap.exists()) {
            const groupData = groupSnap.data();
    
            await updateDoc(groupRef, {
              memberUIDs: arrayRemove(FB_AUTH.currentUser.uid)
            });
            alert('Success! You have left the group successfully!');
            fetchUserGroups();
          } else {
            alert('Error Group not found');
          }
        } catch (error) {
          console.error('Error leaving group:', error);
          alert('Error! Failed to leave group');
        }
      };

    return (
        <View>
          {userGroups.length > 0 ? (
            <FlatList
            data={userGroups}
            renderItem={renderGroupItem}
            keyExtractor={item => item.id}
            />
          ) : (
            <>
            <Text style={{paddingTop: 250, textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>
              You haven't joined any groups yet!
            </Text>   
            <Text style={{paddingTop: 20, textAlign: 'center', fontSize: 19}}>
              You can join a group by finding a match.
            </Text>
            </>
          )}  
        </View>
    )
    
   
}

export default JoinedGroups;

const styles = StyleSheet.create({
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
      },
      groupHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
      },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         rowGap: 10
//     },
//     container3: {
//         backgroundColor: '#FFDE59',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1, 
//         marginHorizontal: 20,
//         borderBottomLeftRadius:25,
//         borderBottomRightRadius:25,
//         borderWidth:3,
//         borderColor: "#1580C2",
//     },
//     container2: {
//         backgroundColor: '#FFDE59',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1, 
//         marginHorizontal: 20,
//         marginBottom:15,
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//         borderWidth:3,
//         borderColor: "#1580C2",
//         zIndex:0
//     },
//     text: {
//         backgroundColor: '#F2F2F2',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 0.25, 
//         marginHorizontal: 20,
//         marginTop:15,
//         marginBottom:-30,
//         borderWidth:3,
//         borderColor: "#1580C2",
//         textAlign: 'center',
//         textAlignVertical: 'center',
//         fontWeight: 'bold',
//         fontSize: 35,
//         color: '#1580C2',
//         zIndex:1,
//         borderRadius:25,
//     }, 
//     container: {
//         flex: 1,
//         padding: 30,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     groupItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',  
//         paddingTop:40,
//         flex:1
//     },
//     groupName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },

// });