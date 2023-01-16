import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
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
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    padding: 5,
    alignSelf:'center'
  },
  image: {
    flex: 1,
    minHeight: 100,
    borderBottomLeftRadius: 50
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },

})

ListItem.propTypes = {
  navigation: PropTypes.object,
};

export default ListItem;
