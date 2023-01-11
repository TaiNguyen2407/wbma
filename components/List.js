import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
let mediaArray = [];
const loadMedia = async() => {
  const response = await fetch(url);
  const json = await response.json();
}

loadMedia();
const List = () => {
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
