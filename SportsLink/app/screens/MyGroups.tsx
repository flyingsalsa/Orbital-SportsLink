import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, FB_AUTH } from '../../FirebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'


const MyGroups = ({ navigation }) => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserGroups();
    }, []);

    const renderGroupItem = ({ item }) => (
        <View style={styles.groupItem}>
          <View style={{flex: 1}}>
            <Text style={styles.groupHeaderText}>{item.GroupName}</Text>
            <Text>{item.Sport}</Text>
            <Text>{item.Level}</Text>
            <Text>{item.OtherInfo}</Text>
          </View>
          <Button title="View"  onPress={() => navigation.navigate('Group Details', { group: item })}/>
          <Button color="red" title="Delete" onPress={() => deleteGroup(item.id)} />
        </View>
      );

      const fetchUserGroups = async () => {
        if (!FB_AUTH.currentUser) {
          Alert.alert('Error', 'You must be logged in to view your groups');
          setLoading(false);
          return;
        }
    
        try {
          const groupsRef = collection(db, 'groups');
          const q = query(groupsRef, where('GroupOwner', '==', FB_AUTH.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const groups = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUserGroups(groups);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user groups:', error);
          Alert.alert('Error', 'Failed to fetch your groups');
          setLoading(false);
        }
      };

      const deleteGroup = async (groupId) => {
        try {
          await deleteDoc(doc(db, 'groups', groupId));
          alert('Group deleted successfully!');
          fetchUserGroups();
          // Optionally, you might want to refresh the group list here
        } catch (error) {
          console.error('Error deleting group:', error);
          alert('Failed to delete group');
        }
      };
    
    return (
      <View style={{flex: 1}}>  
          {userGroups.length > 0 ? (
          <FlatList
          data={userGroups}
          renderItem={renderGroupItem}
          keyExtractor={item => item.id}
          />
          ) : (
            <>
            <Text style={{paddingTop: 250, textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>
              You haven't made any groups yet!
            </Text>   
            <Text style={{paddingTop: 20, textAlign: 'center', fontSize: 19}}>
              You can create a group by using the 'create group' button on the previous page.
            </Text>
            </>
            
      )}
      </View>
    )
       
}

export default MyGroups;

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