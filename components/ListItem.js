import React, {useContext, useState} from 'react';
// import { StyleSheet} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Avatar, Button, ButtonGroup, Card, Divider, ListItem as RNEListItem } from '@rneui/themed';
import { MainContext } from '../contexts/MainContext';

const ListItem = ({singleMedia}) => {
  const {user} = useContext(MainContext);
  const item = singleMedia;
  const navigation = useNavigation();
  return (
    <RNEListItem bottomDivider>
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
            console.log('Modify pressed')
          }else {
            console.log('Delete pressed')
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
};

export default ListItem;
