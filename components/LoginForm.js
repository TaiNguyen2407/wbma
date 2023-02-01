import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View } from 'react-native';
import { useAuthentication, useUser } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';
import { Controller, useForm } from 'react-hook-form';
import { ButtonGroup, Card, Dialog, Divider, Header, Input, Button } from '@rneui/themed';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {checkUsername} = useUser();
  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {username: '', password: ''}
  });

  const logIn = async(loginData) => {
      try {
        // const userToken = await AsyncStorage.getItem('userToken');
        const loginResult = await postLogin(loginData);
        // console.log(await AsyncStorage.getItem('userToken'));
        await AsyncStorage.setItem('userToken', loginResult.token);
        setIsLoggedIn(true);
        setUser(loginResult.user);
      } catch (error) {
        console.warn('authentication failed', error.message);
        //TODO: notify user failed login attempt
      }
  };


  return (
    <>
      <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value:true, message: 'is required'}
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder='Username'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage= {errors.username && errors.username.message}
          />
        )}
        name='username'
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'}
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage= {errors.password && errors.password.message}
            //TODO: create a useState for displaying password option
          />
        )}
        name='password'
        />
        <Button
          title='Sign in!'
          onPress={handleSubmit(logIn)}
        />
    </>
  )
};

LoginForm.propTypes = {};


export default LoginForm;
