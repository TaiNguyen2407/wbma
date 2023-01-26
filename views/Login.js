import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Button, Text } from '@rneui/themed';



const Login = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken, checkUsername} = useUser();

  const [toggleForm, setToggleForm] = useState(true);

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
    <ScrollView>
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex:1, padding: 16}}
      activeOpacity={1} >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {toggleForm ? <LoginForm/> : <RegisterForm/>}
      <Button title={toggleForm ? 'Register' : 'Log in'} style={{marginTop: 10}} onPress={() => setToggleForm(!toggleForm)} />
      </KeyboardAvoidingView>
    </TouchableOpacity>
    </ScrollView>
  );
};



Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
