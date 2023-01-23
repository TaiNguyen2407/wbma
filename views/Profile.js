import AsyncStorage from "@react-native-async-storage/async-storage";
import {React, useContext, useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, Text, Button, Image } from "react-native";
import { MainContext } from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import { uploadsUrl } from "../utils/variables";

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async() => {
    try {
      const avatarArr = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArr.pop().filename);
    } catch (error) {
      console.warn('cannot load avatar', error.message);
    }

  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image source={{uri: uploadsUrl + avatar}} style={{width:200, height:200}}/>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Full Name: {user.full_name}</Text>
      <Button
        title="Logout!"
        onPress={async() => {
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.warn('Clearing asyncStorage failed', error);
          }
      }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 40,
  },
});

export default Profile;
