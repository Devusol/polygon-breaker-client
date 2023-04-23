import React from 'react';
import { View, Image, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors/index';

const Bar = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{width:23 ,height: 2, backgroundColor: Colors.blue}} />
        </View>
    )
}
export default Bar;

