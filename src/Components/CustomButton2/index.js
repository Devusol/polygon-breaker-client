import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Colors from "../../Constants/Colors/index";
import Fonts from '../../Constants/Fonts';

const windowWidth = Dimensions.get('window').width;

const CustomButton1 = props => {
    return (
        <TouchableOpacity onPress={props.action}>
            <View style={styles.screen}>
                <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#36D1DC', '#5B86E5']} style={styles.gradient} >
                    <Text style={styles.text}>{props.title}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        width:windowWidth,
        right:'5%',
        height: 52,
        borderRadius: 6,
        backgroundColor:Colors.white
    },
    text: {
        fontSize: 16,
        color: Colors.white,
        lineHeight: 19,
        textAlign:'center',
        fontFamily:Fonts.AvenirNextLTPro_Demi
    },
    gradient: {
        flex: 1,
        height:60,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
      },
})

export default CustomButton1