import PropTypes from 'prop-types';
import { Card, Input, Button } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {title: '', description: ''}
  });
  const [mediaFile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const { postMedia } = useMedia();
  const { update, setUpdate } = useContext(MainContext);

  const upload = async(data) => {

    // if (!data) {
    //   Alert.alert('Please select a picture');
    //   return;
    // }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const fileName = mediaFile.uri.split('/').pop();
    const fileExt = fileName.split('.').pop();
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
      const result = await postMedia(formData, await AsyncStorage.getItem('userToken'));
      console.log(result);
      Alert.alert('Uploaded successfully', 'File id: ' + result.file_id, [
        {text: 'OK', onPress: () => {
          console.log('OK Pressed');
          //update 'update' state in main context
          setUpdate(!update);
          //TODO: navigate to Home page
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediaFile(result.assets[0]);
    }
  };


  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex:1, padding: 16}}
        activeOpacity={1}>
        <Card>
          <Card.Image source={{uri: mediaFile.uri || 'http://placekitten.com/200/300'}} />
          <Controller
            control={control}
            rules={{
              required: {value:true, message: 'is required'}
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
            disabled={!mediaFile.uri}
            title='Upload'
            onPress={handleSubmit(upload)}
          />
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
