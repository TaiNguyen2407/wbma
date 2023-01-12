import {FlatList, StyleSheet} from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';


const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList style={styles.flatList}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
      <ListItem
      navigation={navigation}
      singleMedia={item}/>}
    />
  )
};

const styles = StyleSheet.create({
  flatList: {
  }
});

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
