import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
// import { useDispatch } from 'react-redux';
// import { updateState } from '../../redux'

function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        AsyncStorage.clear();
        dispatch(updateState("login"));
    }, [false])
    return (
        <View />
    )
}

export default Logout;