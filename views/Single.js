import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Image, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { uploadsUrl } from "../utils/variables";
import { Card, Icon, ListItem } from "@rneui/themed";
import { Video } from "expo-av";
import { useUser } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Single = ({route}) => {
  const {getUserById} = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [owner, setOwner] = useState({});
  const {title, filename, description, media_type: type, screenshot, user_id:userId} = route.params;

  const getOwnerInfo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    return setOwner(await getUserById(userId, userToken));
  }

  useEffect(() => {
    getOwnerInfo();
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
      </Card>
    </ScrollView>

  );
};


Single.propTypes = {
  route : PropTypes.object,
};

export default Single;
