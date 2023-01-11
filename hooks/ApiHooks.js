import { useState, useEffect } from "react";
import { baseUrl } from "../utils/variables";

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

export {useMedia};
