import { Card, Input, Button } from '@rneui/themed';
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { MainContext } from '../contexts/MainContext';
import { useAuthentication, useUser } from '../hooks/ApiHooks';


const RegisterForm = () => {
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {postUser, checkUsername} = useUser();
  const {control, handleSubmit, getValues, formState: { errors }} = useForm({
    defaultValues: {username: '', password: '', email: '', full_name: '', confirmPassword:''},
    mode:'onBlur',
  });

  const register = async(registerData) => {
    delete registerData.confirmPassword;
    console.log('registerData: ', registerData);
      try {
        const registerResult = await postUser(registerData);
        console.log('register data: ', registerResult);
      } catch (error) {
        console.error('register', error);
        throw error;
      }
  };

  const checkUser = async(username) => {
    try {
      const userAvailable = await checkUsername(username);
      return userAvailable ? userAvailable : 'Username is already taken';
    } catch (error) {
      console.error('checkuser', error.message);
    }
  }

  return (
    <>
      <Card.Title>Register Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required:{value: true, message:'This is required'},
          minLength: {value: 3, message:'Min length 3 is required'},
          validate: checkUser,
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Username'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
            errorMessage= {errors.username && errors.username.message}
          />
        )}
        name='username'
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage= {errors.password && errors.password.message}
          />
        )}
        name='password'
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            if (value === getValues('password')) {
              return true;
            } else {
              return 'Password must match';
            }
          }
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Confirm Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage= {errors.confirmPassword && errors.confirmPassword.message}
          />
        )}
        name='confirmPassword'
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message:' Email is required'
          },
          pattern: {
            value:/^[a-zA-Z0-9.]{1,64}@[a-z0-9.-]{3,64}/i,
            message: 'Entered value does not match email format'
          }
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name='email'
      />

      <Controller
        control={control}
        rules={{
          minLength: {value:3, message:'Must be at least 3 characters'}
        }}
        render={({field: {onBlur, onChange, value}}) => (
          <Input
            placeholder='Full Name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name='full_name'
      />
      <Button title='Register' onPress={handleSubmit(register)} />
    </>
  )
};


export default RegisterForm;
