import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigator={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
