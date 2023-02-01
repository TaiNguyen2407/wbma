import PropTypes from 'prop-types';
import { Card, Input, Button } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useMedia, useTag } from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../contexts/MainContext';
import { useFocusEffect } from '@react-navigation/native';
import { appId } from '../utils/variables';

const Upload = ({navigation}) => {
  const {control, handleSubmit, formState: { errors }, trigger, setValue} = useForm({
    defaultValues: {title: '', description: ''},
    mode:'onBlur'
  });
  const [mediaFile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const { postMedia } = useMedia();
  const { postTag } = useTag();
  const { update, setUpdate } = useContext(MainContext);
  // const navigation = useNavigation()

  const upload = async(data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const fileName = mediaFile.uri.split('/').pop();
    let fileExt = fileName.split('.').pop();
    if (fileExt === 'jpg') {
        fileExt = 'jpeg';
    }
    const mimeType = mediaFile.type + '/' + fileExt;
    console.log(mediaFile.type);

    formData.append('file', {
      uri: mediaFile.uri,
      name: fileName,
      type: mimeType,
    });

    console.log('upload:', formData);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);
      const appTag = {
        file_id: result.file_id,
        tag: appId
      };
      const tagResult = await postTag(appTag, token);
      console.log(tagResult);
      Alert.alert('Uploaded successfully', 'File id: ' + result.file_id, [
        {text: 'OK', onPress: () => {
          console.log('OK Pressed');
          //update 'update' state in main context
          setUpdate(!update);
          //Reset Form
          reset();
          //TODO: navigate to Home page
          navigation.navigate('Home');

        }}
      ])
    } catch (error) {
      console.warn('Check file: ', error);
    } finally {
      setLoading(false);
    }
  };



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
	const result = await ImagePicker.launchImageLibraryAsync({
	      mediaTypes: ImagePicker.MediaTypeOptions.All,
	      allowsEditing: true,
	      aspect: [4, 3],
	      quality: 0.5,
	    });

	    console.log(result);

	    if (!result.canceled) {
	      setMediaFile(result.assets[0]);
        //Validate form
        trigger();
	    }
    } catch (error) {
      console.log(error);
    }
  };



  // console.log('validation errors: ', errors);
  const reset = () => {
    setMediaFile({});
    setValue('title', '');
    setValue('description', '');
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, []),
  );

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex:1, padding: 16}}
        activeOpacity={1}>
        <Card>
          { mediaFile.type === 'video' ?
          (
            <Card.Title>Video</Card.Title>
          ) :
          (
            <Card.Image
              source={{uri: mediaFile.uri || 'http://placekitten.com/200/300'}}
              onPress={pickImage}
            />
          )
          }
          <Controller
            control={control}
            rules={{
              required: {
                value:true, message: 'is required',
              },
              minLength: {
                value: 3, message: 'Title min length 3 is required'
              }
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder='Title'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage= {errors.title && errors.title.message}
              />
            )}
            name='title'
          />

          <Controller
            control={control}
            rules={{
              minLength: {
                value: 3,
                message:'Description min length 3 is required'
              }
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder='Description'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='description'
          />


          <Button
            title='Pick image'
            onPress={handleSubmit(pickImage)}
          />

          <Button
            disabled={!mediaFile.uri || errors.title || errors.description}
            title='Upload'
            onPress={handleSubmit(upload)}
          />
          <Button title={'Reset'} onPress={reset} type='outline' />
          {loading && <ActivityIndicator size={'large'} />}

        </Card>

      </TouchableOpacity>
    </ScrollView>
  );
};


Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
