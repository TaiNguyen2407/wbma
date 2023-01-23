import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';



const Login = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async() => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // If no token available, do thing / return nothing.
      if (userToken === null){
        return ;
      }
      const userData = await getUserByToken(userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn('No valid token available', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex:1}}
      activeOpacity={1} >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoginForm/>
        <RegisterForm/>

      </KeyboardAvoidingView>
    </TouchableOpacity>

  );
};



Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
