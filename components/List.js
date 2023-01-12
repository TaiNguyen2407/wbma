import {FlatList, StyleSheet} from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import ListItem from './ListItem';


const List = () => {
  const {mediaArray} = useMedia();
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
