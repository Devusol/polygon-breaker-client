import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Fonts from "../../Constants/Fonts/index"


const CustomTextInput = props => {
    const [visible, setVisible] = useState(props.isPassword ? props.isPassword : false);
    return (
        <View style={styles.screen}>
            <TextInput

                {...props}
                placeholderTextColor="#858585"
                style={styles.text}
                placeholder={props.placeholder}
                secureTextEntry={visible}
            />
            {props.isPassword &&
                <TouchableOpacity
                    style={{ position: "absolute", right: 15, bottom: 15 }}
                    onPress={() => setVisible(!visible)}
                >
                    <Image
                        source={!visible ? require('../../Assets/Images/eyeopen.png') : require('../../Assets/Images/eyeclose.png')}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: 52,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#CFCFCF",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10
    },
    text: {
        width: "100%",
        color: "#000000",
        lineHeight: 16,
        fontSize: 14,
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})

export default CustomTextInput;