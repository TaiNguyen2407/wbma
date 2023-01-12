import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Modal} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';


const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.row} onPress={() => {
      navigation.navigate('Single', item);
    }}  >
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + item.thumbnails?.w160}}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    minHeight: 100,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },

})

ListItem.propTypes = {
  navigation: PropTypes.object,
};

export default ListItem;
