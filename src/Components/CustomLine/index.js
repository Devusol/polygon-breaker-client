import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors/index';

const CustomLine = props => {
    return(
        <View style = {styles.screen}>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: 39, 
        height: 1,
        backgroundColor: Colors.blue, 
        borderRadius: 1, 
        alignSelf: 'center', 
        marginVertical: 4,
    }
})

export default CustomLine;