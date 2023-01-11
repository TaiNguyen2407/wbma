import { useEffect, useState } from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { baseUrl } from '../utils/variables';
import ListItem from './ListItem';


const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async() => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(json.map(async(item) => {
        const fileResponse = await fetch(baseUrl + 'media/' + item.file_id);
        // console.log(fileResponse.json());
        return await fileResponse.json();

      }))



      setMediaArray(media);
    } catch (e) {
      console.log('error: ', e);
    }

  }

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList style={styles.flatList}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  )
};


const styles = StyleSheet.create({
  flatList: {
  }
})

export default List;
