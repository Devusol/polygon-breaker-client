import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native'
// import { useSelector } from 'react-redux';

import CustomLine from '../../../Components/CustomLine'
import CustomTextInput1 from '../../../Components/CustomTextInput1'
import CustomButton1 from '../../../Components/CustomButton1'
import Colors from "../../../Constants/Colors/index"
import Fonts from "../../../Constants/Fonts/index"
import { post } from '../../../Api/post'
const ResetPassword = props => {
    const user = useSelector(state => state.user);
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const onSubmit = () => {
        let email = user.resetEmail;
        if (password.length < 5) {
            Alert.alert("Password must be of 6 characters.")
        } else if (password != cnfPassword) {
            Alert.alert("Password and Confirm Password should be same.")
        } else {
            let obj = {
                email,
                password
            }
            setLoading(true);
            post("auth/changePassword", obj)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    props.navigation.navigate("LoginScreen")
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        Alert.alert(error.response.data.error)
                    } else {
                        Alert.alert("OOPS there is some unexpected error.")
                    }
                    setLoading(false);
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
                <View style={styles.lockContanier}>
                    <Image
                        style={styles.icon}
                        source={require("../../../Assets/Images/reset.png")}
                    />
                </View>

                {/* FORGOT PASSWORD TEXT  */}
                <Text style={styles.title}>RESET PASSWORD</Text>
                <CustomLine />

                {/* TEXT INPUT FIELD  */}
                <View style={{ marginTop: 60 }}>
                    <CustomTextInput1
                        placeholder="New Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        secureTextEntry={true}
                        isPassword={true}
                    />
                    <CustomTextInput1
                        placeholder="Confirm Password"
                        value={cnfPassword}
                        onChangeText={(text) => {
                            setCnfPassword(text)
                        }}
                        secureTextEntry={true}
                        isPassword={true}
                    />
                </View>

                {/* BUTTON  */}
                <View style={{ marginTop: "10%" }}>
                    <CustomButton1
                        title="CONTINUE"
                        action={() => {
                            onSubmit()
                        }}
                        isLoading={loading}
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
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 30,
        height: 29,
        resizeMode: 'contain'
    },
    title: {
        marginTop: "16%",
        fontSize: 26,
        lineHeight: 30,
        textAlign: 'center',
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
    des: {
        marginTop: 20,
        color: "#858585",
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})

export default ResetPassword