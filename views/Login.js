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
import { useAuthentication, useUser } from '../hooks/ApiHooks';



const Login = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const logIn = async() => {
    const data = {username: 'Tai Nguyen', password:'password1'};
      try {
        const loginResult = await postLogin(data);
        await AsyncStorage.setItem('userToken', loginResult.token);
        setIsLoggedIn(true);
      } catch (error) {
        console.warn('error in storing token', error);
      }
  };

  const checkToken = async() => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(userToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn('No valid token available', error);
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
  }
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
