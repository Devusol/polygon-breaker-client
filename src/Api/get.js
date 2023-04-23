import axios from 'axios';
import {BASE_URL} from './baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const get = async endPoint => {
  let token = '';
  let localToken = await AsyncStorage.getItem('token');
  if (localToken) {
    token = localToken;
  }
  console.log('token', token)
  console.log(`GET: going to call ${BASE_URL + endPoint}`)
  return new Promise((resolve, reject) => {
    return axios
      .get(BASE_URL + endPoint, {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
