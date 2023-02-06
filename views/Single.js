import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Image, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { uploadsUrl } from "../utils/variables";
import { Card, Icon, ListItem } from "@rneui/themed";
import { Video } from "expo-av";
import { useFavourite, useUser } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Single = ({route}) => {
  const {getUserById} = useUser();
  const { getFavouritesByFileId, postFavourite, deleteFavourite } = useFavourite();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const {title, filename, description, media_type: type, screenshot, user_id:userId, file_id:fileId} = route.params;

  const getFavourites = async() =>{
    const favourites =  await getFavouritesByFileId(fileId);
    setLikes(favourites);
  };

  const addFavourites = async() => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, userToken);
      getFavourites();

    } catch (error) {
      // note: cannot like same file multiple times

    }
  }

  const minusFavourites = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      getFavourites();
    } catch (error) {
      // note: you cannot like same file multiple times
      console.log(error);
    }
  };


  //Check if user has liked a file already by => check if her/his userId is in the likes array => If yes, display possibility to dislike => if no, display possibility to lilke


  const getOwnerInfo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    return setOwner(await getUserById(userId, userToken));
  };

  useEffect(() => {
    getOwnerInfo();
    getFavourites();
  }, []);

  return (
    <ScrollView>
      <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      {type === 'image' ? (
        <Card.Image
        source={{uri: uploadsUrl + filename}} />
      ) : (
        <Video
          ref={video}
          source={{
            uri: uploadsUrl + filename
          }}
          useNativeControls
          isLooping
          resizeMode="contain"
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          style={{height:500, width:'100%'}}
          posterSource={{uri:uploadsUrl + screenshot}}
        />
      )}
      <Card.Divider />
      <ListItem>
        <Icon name="image" />
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <ListItem.Subtitle> {owner.username} ({owner.full_name})</ListItem.Subtitle>
      </ListItem>
      <ListItem>
        <Icon name="favorite" onPress={addFavourites} />
        <Text>favourite: {likes.length.toString()}</Text>
      </ListItem>
      <ListItem>
          {userLikesIt ? (
            <Icon name="favorite" color="red" onPress={dislikeFile} />
          ) : (
            <Icon name="favorite-border" onPress={likeFile} />
          )}
          <Text>Total likes: {likes.length}</Text>
        </ListItem>
      </Card>
    </ScrollView>

  );
};


Single.propTypes = {
  route : PropTypes.object,
};

export default Single;
