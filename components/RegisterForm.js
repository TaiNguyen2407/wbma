import { Card, Input, Button } from '@rneui/themed';
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import { useAuthentication, useUser } from '../hooks/ApiHooks';


const RegisterForm = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication
  const {postUser} = useUser();
  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {username: '', password: '', email: '', full_name: ''}
  });

  const register = async(registerData) => {
    console.log('registerData: ', registerData);
      try {
        const registerResult = await postUser(registerData);
        console.log('register data: ', registerResult);
      } catch (error) {
        console.error('register', error);
      }
  };

  return (
    <>
      <Card.Title>Register Form</Card.Title>
      <Controller
        control={control}
        rules={{required:true, minLength: 3}}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
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
        rules={{required:true, minLength: 5}}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name='password'
      />
      {errors.password && <Text>Password (min. 5 chars) is required.</Text>}

      <Controller
        control={control}
        rules={{
          required:true,
          pattern: {
            value:'/\S+@\S+\.\S+/',
            message: 'Entered value does not match email format'
          }
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}

          />
        )}
        name='email'
      />
      {errors.email && <Text>`${errors.email.message}`</Text>}
      {errors.email?.type === 'required' && <Text>is required</Text>}

      <Controller
        control={control}
        rules={{required:false, minLength:3}}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Full Name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='full_name'
      />
      {errors.full_name?.type === 'minLength' && <Text>min length is 3 characters</Text>}
      <Button title='Register' onPress={handleSubmit(register)} />
    </>
  )
};


export default RegisterForm;
