import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/AuthScreens/Login';
import SignUpScreen from '../../Screens/AuthScreens/SignUp';
import ForgotPassword from '../../Screens/AuthScreens/ForgotPassword';
import VerificationCode from '../../Screens/AuthScreens/VerficationCode/index'
import ResetPassword from "../../Screens/AuthScreens/ResetPassword/index"

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <>
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </>
  );
}

export default LoginStack