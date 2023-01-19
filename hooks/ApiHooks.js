import { useState, useEffect } from "react";
import { baseUrl } from "../utils/variables";


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

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async() => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
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
  }, []);

  return {mediaArray};
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

  return {getUserByToken, postUser};
 };
export {useMedia, useAuthentication, useUser};
