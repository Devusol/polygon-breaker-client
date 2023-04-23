import axios from 'axios';
import { BASE_URL } from './baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const put = async (endPoint, data) => {
    let token = "";
    let localToken = await AsyncStorage.getItem('token')
    if (localToken) {
        token = localToken;
    }
    return new Promise((resolve, reject) => {
        return axios.put(BASE_URL + endPoint, data, {
            headers: {
                'Content-Type': "application/json",
                "authorization": "Bearer " + token
            }
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}