import React from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";
import PropTypes from 'prop-types';
import { uploadsUrl } from "../utils/variables";


const Single = ({route}) => {
  const {title, filename, description, time_added} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image
      style={styles.image}
      source={{uri: uploadsUrl + filename}} />
      <Text>{description}</Text>
      <Text>{time_added}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 40,
  },
  image:{
    height:300,
    width:200,
  }
});

Single.propTypes = {
  route : PropTypes.object,
};

export default Single;
