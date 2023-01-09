import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" backgroundColor="black" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
