
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView, Alert } from 'react-native'
// import { useSelector, useDispatch } from 'react-redux';
// import { updateState, getUserDetails } from '../../../redux'
import Bar from '../../../Components/Bar/index'
import CustomTextInput from '../../../Components/CustomTextInput/index'
import CustomButton from '../../../Components/CustomButton/index'
import Colors from "../../../Constants/Colors/index"
import Fonts from "../../../Constants/Fonts/index"
import { post } from '../../../Api/post'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
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
        } else if (password.length < 5) {
            Alert.alert("Password should be 6 characters long.")
        } else {
            let obj = {
                email: email,
                password: password
            }
            setLoading(true)
            post('auth/login', obj)
                .then((res) => {
                    AsyncStorage.setItem('token', res.token)
                        .then(() => {
                            dispatch(getUserDetails());
                            setTimeout(() => {
                                dispatch(updateState("dashboard"));
                                setLoading(false)
                            }, 1000)

                        })

                    // console.log(res)
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        Alert.alert(error.response.data.error)
                    } else {
                        Alert.alert("Error: " + JSON.stringify(error.response))
                    }
                    setLoading(false)
                })
            // dispatch(updateState("dashboard"));
        }

    }
    return (
        <View style={styles.screen}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.mainContanier}>
                    {/* LOGO SECTION  */}
                    <Image
                        style={styles.logo}
                        source={require("../../../Assets/Images/logo.png")}
                    />

                    {/* LOGIN TEXT AND OTHERS */}
                    <View style={{ marginTop: "22%" }}>
                        <Text style={styles.title}>Login</Text>
                        <Bar />
                    </View>
                    {/* FORM INPUTS  */}
                    <View style={{ marginTop: "20%", width: "100%" }}>
                        {/* <Text style={styles.text}>Email</Text> */}
                        <CustomTextInput
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            title={"Email"}
                            value={email}
                        />
                        <View style={{ height: 20 }} />
                        {/* <Text style={styles.text}>Password</Text> */}
                        <CustomTextInput
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            title={"Password"}
                            secureTextEntry={true}
                            isPassword={true}
                        />
                    </View>

                    {/* FORGOT PASSWORD  */}
                    <View style={{ height: 5 }} />
                    <TouchableOpacity style={{ alignSelf: 'flex-end', top: '1%' }}
                        onPress={() => {
                            props.navigation.navigate("ForgotPassword")
                        }}
                    >
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* LOGIN BUTTON */}
                    <View style={{ marginTop: 50 }}>
                        <CustomButton
                            action={() => {
                                onSubmit()
                            }}
                            title="Login"
                            isLoading={loading}
                        />
                    </View>

                    {/* SIGNUP */}

                    <View style={{ flexDirection: 'row', marginVertical: 12, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 14, lineHeight: 16, color: Colors.grey, fontFamily: Fonts.AvenirNextLTPro_Demi, marginTop: 10 }}>You don't have any account?</Text>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate("SignUpScreen")
                        }}>
                            <Text style={{ fontSize: 14, lineHeight: 16, color: Colors.darkBlue, fontFamily: Fonts.AvenirNextLTPro_Demi, marginTop: 10 }}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 24
    },
    logo: {
        width: 190,
        height: 104,
        marginTop: 50,
        alignSelf: 'center'
    },
    mainContanier: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Colors.white

    },
    title: {
        fontSize: 26,
        color: Colors.black,
        lineHeight: 30,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    text: {
        color: "#6E6E6E",
        fontSize: 14,
        alignSelf: 'center',
        lineHeight: 22,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        color: Colors.grey,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    text: {
        top: "6%",
        left: '1%',
        fontSize: 14,
        lineHeight: 16,
        color: Colors.grey,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    }
})

export default LoginScreen