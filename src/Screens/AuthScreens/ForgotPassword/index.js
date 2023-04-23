import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native'

import CustomLine from '../../../Components/CustomLine/index'
import CustomTextInput1 from '../../../Components/CustomTextInput1/index'
import CustomButton1 from '../../../Components/CustomButton1/index'
import Colors from "../../../Constants/Colors/index"
import Fonts from "../../../Constants/Fonts/index"
import { post } from '../../../Api/post'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateResetPasswordEmail } from '../../../redux'
const ForgotPassword = props => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const ValidateEmail = (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    const onSubmit = async () => {
        if (email == "") {
            Alert.alert("Please enter your email.");
        } else if (!ValidateEmail(email)) {
            Alert.alert("Please enter valid email address.")
        } else {
            dispatch(updateResetPasswordEmail(email));
            let obj = {
                email: email
            }
            setIsLoading(true);

            post("auth/resetPasswordOTP", obj)
                .then((res) => {
                    // console.log(res.otp);
                    props.navigation.navigate("VerificationCode", { OTP: res.otp })
                    setIsLoading(false);
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        Alert.alert(error.response.data.error)
                    } else {
                        Alert.alert("OOPS there is some unexpected error.")
                    }
                    setIsLoading(false);
                })
        }


    }

    return (
        <View style={styles.screen}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {/* LOCK IMAGE  */}
                <View>

                </View>
                <View style={styles.lockContanier}>
                    <Image
                        style={styles.icon}
                        source={require("../../../Assets/Images/lock.png")}
                    />
                </View>

                {/* FORGOT PASSWORD TEXT  */}
                <Text style={styles.title}>FORGOT PASSWORD</Text>
                <CustomLine />
                <Text style={styles.des}>Enter your email for the verification process. We'll send 4-digit code to your email</Text>

                {/* TEXT INPUT FIELD  */}
                <View style={{ marginTop: '20%' }}>
                    <CustomTextInput1
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                        style={{ borderWidth: 0.5, borderRadius: 6, padding: 10 }}
                    />
                </View>

                {/* BUTTON  */}
                <View style={{ marginTop: '10%' }}>
                    <CustomButton1
                        title="CONTINUE"
                        action={() => {
                            onSubmit()
                        }}
                        isLoading={isLoading}
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
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.white
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
        width: 71,
        height: 71,
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
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})

export default ForgotPassword