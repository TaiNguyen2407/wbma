import React, {useContext, useState} from 'react';
// import { StyleSheet} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Avatar, Button, ButtonGroup, Card, Divider, ListItem as RNEListItem } from '@rneui/themed';
import { MainContext } from '../contexts/MainContext';
import { useMedia } from '../hooks/ApiHooks';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItem = ({singleMedia, navigation}) => {
  const {user, update, setUpdate} = useContext(MainContext);
  const item = singleMedia;
  const {deleteMedia} = useMedia();
  const navigation = useNavigation();


  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <RNEListItem bottomDivider onPress={() => {
      navigation.navigate('Single,=', item);
    }}>
      <Avatar source={{uri: uploadsUrl + item.thumbnails?.w160}}/>
      <RNEListItem.Content>
        <RNEListItem.Title >{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>{item.description}</RNEListItem.Subtitle>
      </RNEListItem.Content>
      {item.user_id === user.user_id && (
        <ButtonGroup
        button={['Modify', 'Delete']}
        rounded
        onPress={(index) => {
          if (index === 0) {
            navigation.navigate('Modify', {file: item});
          }else {
            doDelete();
          }
        }} />
      )}

      <Button onPress={() => {
        navigation.navigate('Single', item);
      }}>View</Button>
    </RNEListItem>
  );


};


ListItem.propTypes = {
  navigation: PropTypes.object,
  singleMedia: PropTypes.object,
};

export default ListItem;
