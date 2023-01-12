/* eslint-disable react/jsx-no-undef */
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
