import React from 'react'
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Fonts from '../Constants/Fonts'

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.action} disabled={props.isLoading ? props.isLoading : false}>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#36D1DC', '#5B86E5']} style={styles.gradient} >
                {props.isLoading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator color="white" /></View> :
                    <Text style={styles.text}>{props.title}</Text>
                }
            </LinearGradient>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    gradient: {
        height: 60,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        width: "100%"
    },
    text: {
        fontSize: 16,
        color: Colors.white,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: Fonts.AvenirNextLTPro_Demi

    },
})

export default CustomButton