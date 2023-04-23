import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input';

import CustomLine from '../../../Components/CustomLine/index'
import CustomButton1 from '../../../Components/CustomButton1/index'
import Colors from '../../../Constants/Colors/index';
import Fonts from '../../../Constants/Fonts/index';

const OtpScreen = props => {
    const [enterOTP, setEnterOTP] = useState("");
    const [computerOTP, setComputerOTP] = useState("");

    useEffect(() => {
        let otp = props.route.params.OTP;
        setComputerOTP(otp);
    }, [false])
    const onSubmit = () => {
        if (enterOTP == "") {
            Alert.alert("Please enter OTP first");
        } else if (enterOTP != computerOTP) {
            Alert.alert("Incorrect OTP");
        } else {
            props.navigation.navigate("ResetPassword");
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {/* LOCK IMAGE  */}
                <View style={styles.lockContanier}>
                    <Image
                        style={styles.icon}
                        source={require("../../../Assets/Images/phone.png")}
                    />
                </View>

                {/* FORGOT PASSWORD TEXT  */}
                <Text style={styles.title}>VERIFICATION CODE</Text>
                <CustomLine />
                <Text style={styles.des}>Enter the 4-digit code that you received on your email</Text>

                {/* OTP SECTION  */}

                <View style={styles.otpContainer}>
                    <OTPInputView
                        pinCount={4}
                        style={styles.otp}
                        codeInputFieldStyle={styles.input}
                        placeholderTextColor="grey"
                        keyboardType="number-pad"
                        onCodeFilled={(code => {
                            setEnterOTP(code);
                            // console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                </View>

                {/* BUTTON  */}
                <View style={{ marginTop: "10%" }}>
                    <CustomButton1
                        title="CONTINUE"
                        action={() => {
                            onSubmit()
                        }}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
    lockContanier: {
        alignSelf: "center",
        marginTop: 70,
        borderRadius: 100,
        width: 71,
        height: 71,
        backgroundColor: Colors.darkestBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 21,
        height: 30,
        resizeMode: 'contain'
    },
    title: {
        marginTop: "15%",
        fontSize: 26,
        lineHeight: 30,
        textAlign: 'center',
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    des: {
        marginTop: "15%",
        color: Colors.grey,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        width: "80%",
        alignSelf: 'center',
        fontFamily: Fonts.AvenirNextLTPro_Regular
    },
    otpContainer: {
        marginTop: '15%',
        justifyContent: 'center',
        height: 80,
        alignItems: 'center'
    },
    otp: {
        width: "100%",
        height: 70,
        padding: -100
    },
    input: {
        color: "#CFCFCF",
        borderColor: "#CFCFCF",
        borderRadius: 6,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },

})

export default OtpScreen