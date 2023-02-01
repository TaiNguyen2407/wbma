import { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { appId, baseUrl } from "../utils/variables";


const doFetch = async(url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error ?
                    `${json.message} : ${json.error}` :
                    json.message;
    throw new Error(message || response.statusText);
  }
  return json;
}


const useMedia = () => {
  const {update} = useContext(MainContext);

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async() => {
    try {
      // const response = await fetch(baseUrl + 'media');
      // const json = await response.json();
      const json = await useTag().getFilesByTag(appId);

      const media = await Promise.all(json.map(async(item) => {
        const fileResponse = await fetch(baseUrl + 'media/' + item.file_id);
        return await fileResponse.json();
      }))
      setMediaArray(media);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  useEffect(() => {
    loadMedia();
    //TODO: load media when update state changes in main context
    //add update state to the array below
  }, [update]);


  const postMedia = async(fileData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type' : 'multipart/form-data',
      },
      body: fileData,
    }
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('error uploading file: ', error);
    }
  }


  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => { // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
       // TODO: add method, headers and body for sending json data with POST
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials),
    };
    const loginResult = await doFetch(baseUrl + 'login', options);
    return loginResult;
 };
  return {postLogin};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options)
  };

  const postUser = async (userData) => { // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
       // TODO: add method, headers and body for sending json data with POST
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    };
    const registerResult = await doFetch(baseUrl + 'users', options);
    return registerResult;
 };

  const checkUsername = async(username) => {
    try {
      const result =  await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('Check username' + error.message);
    }
  }

  return {getUserByToken, postUser, checkUsername};
 };

const useTag = () => {
  const getFilesByTag = async(tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  }

  const postTag = async(tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(tagData),
    }
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('PostTag: ', error);
    }
  }

  return {getFilesByTag, postTag};
}




export {useMedia, useAuthentication, useUser, useTag};
