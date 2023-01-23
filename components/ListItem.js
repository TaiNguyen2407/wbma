import React, {useState} from 'react';
// import { StyleSheet} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Divider, ListItem as RNEListItem } from '@rneui/themed';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  const navigation = useNavigation();
  return (
    <RNEListItem bottomDivider>
      <Avatar source={{uri: uploadsUrl + item.thumbnails?.w160}}/>
      <RNEListItem.Content>
        <RNEListItem.Title >{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>{item.description}</RNEListItem.Subtitle>
      </RNEListItem.Content>
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
