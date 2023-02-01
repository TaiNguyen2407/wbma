import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";
import PropTypes from 'prop-types';
import { uploadsUrl } from "../utils/variables";
import { Card, Icon, ListItem } from "@rneui/themed";



const Single = ({route}) => {

  const {title, filename, description} = route.params;
  return (
    <Card>
      <Card.Image
      source={{uri: uploadsUrl + filename}} />
      <Card.Title>{title}</Card.Title>
      <ListItem>
        <Icon name="image" />
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
        <ListItem.Subtitle><Text>uploaded at : {new Date(timeAdded).toLocaleString('fi-FI')}</Text></ListItem.Subtitle>
      </ListItem>
    </Card>
  );
};


Single.propTypes = {
  route : PropTypes.object,
};

export default Single;
