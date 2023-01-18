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
    const {username, password} = userCredentials;
    const options = {
       // TODO: add method, headers and body for sending json data with POST
        method:'POST',
        headers:{
          'Content-Type': 'Application/json'
        }
    };
    try {
       // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
    } catch (error) {
       throw new Error(error.message);
    }
 };
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {
  const checkUser = async() => {
    // Call
  }
}
export {useMedia};
