import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
import Colors from "../../Constants/Colors/index";
import Fonts from "../../Constants/Fonts/index";

const windowWidth = Dimensions.get('window').width;

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.action}
            activeOpacity={0.8}
            disabled={props.isLoading ? props.isLoading : false}
        >
            <View style={styles.screen}>
                {/* <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#36D1DC', '#5B86E5']} style={styles.gradient} > */}
                    {props.isLoading ?
                        <View style={{ alignItems: "center", flex: 1 }}>
                            <ActivityIndicator color="white" />
                        </View>
                        :

                        <>
                            <Text style={styles.text}>{props.title}</Text>
                            <Image
                                style={styles.forward}
                                source={require("../../Assets/Images/forward.png")}
                            />
                        </>
                    }
                {/* </LinearGradient> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        width: windowWidth - 48,
        height: 52,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        lineHeight: 19,
        color: Colors.white,
        marginLeft: 35,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    forward: {
        width: 15,
        height: 13,
        marginRight: 20
    },
    gradient: {
        flex: 1,
        height: 55,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
})

export default CustomButton