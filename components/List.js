import { useEffect, useState } from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async() => {
    const response = await fetch(url);
    const json = await response.json();
    setMediaArray(json);
  }

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList style={styles.flatList}
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  )
};


const styles = StyleSheet.create({
  flatList: {
  }
})

export default List;
