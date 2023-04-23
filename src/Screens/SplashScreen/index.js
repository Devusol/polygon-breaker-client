import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, Text, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Constants/Colors/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateState,
  getUserDetails,
  fetchNarrativeTypesActions,
} from '../../redux';

const Splash = () => {
  const dispatch = useDispatch();
  const checkTokenAvailable = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setTimeout(() => {
        dispatch(getUserDetails());
      }, 1000);
      dispatch(getUserDetails());
    }
  };

  useEffect(() => {
    dispatch(fetchNarrativeTypesActions());
    checkTokenAvailable();
  }, []);
  return (
    <View style={styles.screen}>
      <Image
        style={{width: 298, height: 162}}
        source={require('../../Assets/Images/logo.png')}
      />
    </View>
  );
};
export default Splash;

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
