import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Modal} from 'react-native';
import ModalTester from './Modal';


const ListItem = ({singleMedia}) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.container} onPress= {() => {
        <Modal
          isVisible={isModalVisible} Testomg
        >
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
    }}>
      <Image
        style={styles.image}
        source={{uri: item.thumbnails.w160}}
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
  },
  image: {
    width:'30%',
    margin:10,
  },
  title: {
    fontSize:20,
    fontWeight: '600',
  },
  ListItemView: {
    width: '60%',
    paddingVertical: 10,
  }

})

export default ListItem;
