import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import Colors from "../../Constants/Colors/index"
import Fonts from "../../Constants/Fonts/index"



const CustomTextInput = props => {
    const [visible, setVisible] = useState(props.isPassword ? props.isPassword : false);
    return (
        <View style={styles.screen}>
            {props.title &&
                <Text style={styles.titleText}>{props.title}</Text>
            }
            <TextInput
                {...props}
                placeholderTextColor="#858585"
                style={styles.text}
                placeholder={props.placeholder}
                secureTextEntry={visible}
            />
            {props.isPassword &&
                <TouchableOpacity
                    style={{ position: "absolute", right: 15, bottom: 10 }}
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

        // borderRadius: 6,
        borderBottomWidth: 0.5,
        borderColor: Colors.grey,
        width: "100%",
        // marginVertical: 10
    },
    titleText: {
        color: "#6E6E6E",
        fontSize: 14,
        textAlign: 'left',
        // lineHeight: 22,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    text: {
        paddingVertical: 10,
        color: Colors.black,
        lineHeight: 16,
        fontSize: 14,
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})

export default CustomTextInput;