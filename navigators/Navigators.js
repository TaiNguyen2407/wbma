import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Single from "../views/Single";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from "../views/Login";
import { MainContext } from "../contexts/MainContext";
import Upload from "../views/Upload";
import { Icon } from "@rneui/themed";
import MyFiles  from '../views/MyFiles';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => {
      // return {
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;
      //     if (route.name === 'Home') {
      //       iconName = 'home';
      //     } else if (route.name === 'Profile'){
      //       iconName = 'person';
      //     }
      //     return <Ionicons name={iconName} size='20' />
      //   },
      // };
    }} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />
        }} />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({color}) => <Icon name="cloud-upload" color={color} />
        }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />
        }}/>
    </Tab.Navigator>
  );
}

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      { isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{ headerShown: false }} />
            <Stack.Screen name="Single" component={Single} />
            <Stack.Screen name="MyFiles" component={MyFiles} />
            <Stack.Screen name="Modify" component={Modify} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      ) }
    </Stack.Navigator>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  )
};

export default Navigator;
