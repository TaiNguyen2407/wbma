import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Modal} from 'react-native';
import { uploadsUrl } from '../utils/variables';


const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.container} onPress= {() => {
    }}>
      <Image
        style={styles.image}
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      />
      <View style={styles.ListItemView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    backgroundColor:'#c6c6c6',
    marginBottom: 10,
    height: 200
  },
  image: {
    width:'30%',
    margin:5,
  },
  title: {
    fontSize:25,
    fontWeight: '600',
  },
  ListItemView: {
    width: '60%',
    paddingVertical: 10,
  }

})

export default ListItem;
