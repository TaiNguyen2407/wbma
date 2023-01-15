import React from "react";
import { StyleSheet, ImageBackground, Platform, View, Text } from "react-native";
import { Settings } from "react-native-feather";


const BackgroundImage = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'http://placekitten.com/200/300'}}
        style={styles.imageBackground}
        resizeMode='cover'
        imageStyle={{borderBottomRightRadius:100}} />
      <Text style={styles.alt}>Homeless Kitten</Text>
      <Settings style={styles.icon} />
    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flex:0.5
  },
  imageBackground :  {
    flex:1,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  alt: {
    backgroundColor:'mediumblue',
    color:'white',
    fontSize: 30,
    padding:10,
    paddingLeft: 15,
    alignSelf:'flex-start',
    position:'absolute',
    bottom:'10%',
  },
  icon: {
    position:'absolute',
    alignSelf:'flex-end',
    top:'30%',
    right: '5%',
    padding: 20,
    color:'white',
  }
})

export default BackgroundImage;
