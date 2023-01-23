import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Icon, ListItem, Button } from "@rneui/themed";
import {React, useContext, useEffect, useState} from "react";
// import { StyleSheet, SafeAreaView, Text, Image } from "react-native";
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

    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar}}/>
      <ListItem>
        <Icon name="email"/>
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge"/>
        <ListItem.Title>{user.full_name} Tai Nguyen</ListItem.Title>
      </ListItem>
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
    </Card>
  );
};



export default Profile;
