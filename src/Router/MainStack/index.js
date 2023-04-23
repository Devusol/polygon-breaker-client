import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from '../LoginStack'
import Drawer from "../Drawer/index"

const Stack = createStackNavigator();

const MainStack = props => {
    return (
        <Stack.Navigator
            initialRouteName="LoginStack"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Drawer" component={Drawer} />
            <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
    );
}

export default MainStack;fr