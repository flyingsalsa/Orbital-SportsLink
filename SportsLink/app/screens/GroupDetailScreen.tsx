import { View, Text, StyleSheet, Image, Dimensions, TextInput, ActivityIndicator, Button, TouchableOpacity, ImageBackground, FlatList} from 'react-native'
import React, {useState, useEffect, Component} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FB_AUTH, db } from '../../FirebaseConfig'
import { doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';

const GroupDetailScreen = ({ route }) => {
  const { group } = route.params;
  const [members, setMembers] = useState([]);
  const [ownerUsername, setOwnerUsername] = useState('');
const renderMember = ({ item }) => (
  <Text style={styles.memberItem}>{item.username}</Text>
);
useEffect(() => {

// Fetch member details
const fetchGroupDetails = async () => {
// Filter out the group owner from memberUIDs

const memberPromises = group.memberUIDs.filter(uid => uid !== group.GroupOwner).map(uid => 
  getDoc(doc(db, 'users', uid)));
const memberSnapshots = await Promise.all(memberPromises);
const memberData = memberSnapshots.map(snap => ({
  id: snap.id,
  ...snap.data()
}));
setMembers(memberData);
const ownerRef = doc(db, 'users', group.GroupOwner);
const ownerSnap = await getDoc(ownerRef);
setOwnerUsername(ownerSnap.data().username);
          
};


fetchGroupDetails();
}, [group]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.GroupName}</Text>
      <Text>Sport: {group.Sport}</Text>
      <Text>Level: {group.Level}</Text>
      <Text>Other Info: {group.OtherInfo}</Text>
      <Text style={styles.subtitle}>Members:</Text>
      <Text style={styles.subtitle}>Group Owner: {ownerUsername}</Text>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        style={styles.memberList}
      />
    </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  memberList: {
    maxHeight: 200, // Adjust as needed
  },
  memberItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default GroupDetailScreen;