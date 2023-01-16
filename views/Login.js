import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const logIn = async() => {
      setIsLoggedIn(true);
      try {
        await AsyncStorage.setItem('userToken', 'abc123');
      } catch (error) {
        console.warn('error in storing token', error);
      }

  };

  const checkToken = async() => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === 'abc123') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.warn('No valid token available', error)
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // button: {
  //   backgroundColor:'powderblue',
  //   color:'white',
  //   padding: 5
  // }
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
