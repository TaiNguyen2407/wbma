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


const useMedia = (myFilesOnly) => {
  const {update, user} = useContext(MainContext);
  const [mediaArray, setMediaArray] = useState([]);


  const loadMedia = async() => {
    try {
      let json = await useTag().getFilesByTag(appId);
      // Keep user files if MyFilesOnly
      if (myFilesOnly) {
        json = json.filter((file) => {
          if (file.user_id === user.user_id) {
            return file;
          }
        });
      }
      json.reverse();

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
  };

  const getUserById = async(id, token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const result = await doFetch(baseUrl + 'users/' + id, options);
      return result;
    } catch (error) {
      throw new Error('getUserById: ' + error.message);
    }
  };

  return {getUserByToken, postUser, checkUsername, getUserById};
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


const useFavourite = () => {
  const postFavourite = async(fileId, token) =>{
    try {
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({file_id: fileId})
      };
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('postFavourite: ' + error.message);
    }
  }

  const getFavouritesByUser = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      };
      return await doFetch(baseUrl + 'favourties', options);
    } catch (error) {
      throw new Error('postFavourite: ' + error.message);
  };
}

  const getFavouritesByFileId = async (fileId) => {
    try {
      return doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      throw new Error('getFavouritesById: ' + error.message);
    }
  }

  const deleteFavourite = async (fileId, token) =>{
    const options = {
      method: 'delete',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('deleteFavourite error, ' + error.message);
    }
  }

  return {postFavourite, getFavouritesByFileId, getFavouritesByUser, deleteFavourtie};
}



export {useMedia, useAuthentication, useUser, useTag, useFavourite};
