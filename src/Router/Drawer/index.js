import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../Screens/NonAuthScreens/HomeScreen/index';
import Logout from '../../Screens/NonAuthScreens/Logout';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    
      <Stack.Screen name="Logout" component={Logout} />

    </Stack.Navigator>
  );
};

const MyDrawer = props => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="HomeScreen">
      <Drawer.Screen name="StackDrawer" component={MyStack} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
