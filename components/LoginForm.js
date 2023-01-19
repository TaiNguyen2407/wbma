import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useAuthentication } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {username: '', password: ''}
  });

  const logIn = async(loginData) => {
      try {
        const loginResult = await postLogin(loginData);
        await AsyncStorage.setItem('userToken', loginResult.token);
        setIsLoggedIn(true);
        setUser(loginResult.user);
      } catch (error) {
        console.warn('authentication failed', error);
        //TODO: notify user failed login attempt
        Alert.alert('Incorrect username or password');
      }
  };


  return (
    <View>
      <Text>Login Form</Text>
      <Controller
        control={control}
        rules={{
          required:true,
          minLength: 3
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder='Username'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='username'
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && <Text>min length is 3 characters</Text>}

      <Controller
        control={control}
        rules={{
          required:true,
          minLength: 5
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            //TODO: create a useState for displaying password option
          />
        )}
        name='password'
        />
        {errors.password && <Text>Password (min. 5 chars) is required.</Text>}
        <Button title='Sign in!' onPress={handleSubmit(logIn)} />
    </View>
  )
};

LoginForm.propTypes = {};


export default LoginForm;
