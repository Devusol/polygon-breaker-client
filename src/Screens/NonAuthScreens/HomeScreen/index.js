import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// import CustomHeader from "../../../Components/CustomHeader/index"
import Colors from "../../../Constants/Colors/index"
import Fonts from "../../../Constants/Fonts/index"

import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchCategories, updateUUIDRedux, setTotalNumber, fetchFCCategories, setExamNumber, fetchMCQCategories } from '../../../redux'
import uuid from 'react-native-uuid';
import { post } from '../../../Api/post'


const Home = props => {

    // console.log("Home Screen PROPS: ", props.route)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories('practice'))
        dispatch(fetchCategories('exam'))
        dispatch(updateUUIDRedux(uuid.v4()))
        dispatch(fetchMCQCategories())
        dispatch(fetchFCCategories())
        dispatch(setExamNumber(0));
        dispatch(setTotalNumber(0))
    }, [])

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            {/* <CustomHeader
                title="NCMHCE REVIEW TEST"
                imageUrl={require("../../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            /> */}

            {/* {DeviceInfo.isTablet() ? <View style={{ height: 20 }}></View> : null} */}

            <View style={{ height: windowHeight - 300, width: windowWidth, marginVertical: 50 }}>
                <View style={{ alignSelf: 'center', }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            // console.log("Practice Sets")
                            // DOES NOT TAKE YOU TO THE ACTUAL PRACTICE SETS SCREEN
                            props.navigation.navigate("PracticeSets")
                        }}
                    >
                        <ImageBackground
                            style={{
                                height: DeviceInfo.isTablet() ? 200 : 113, width: windowWidth - 50, elevation: 5,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                            }}
                            source={require("../../../Assets/Images/narrativeview.png")}

                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 10 }}>
                                <Image
                                    style={{ height: DeviceInfo.isTablet() ? "50%" : 55, marginLeft: 10, width: DeviceInfo.isTablet() ? "50%" : 134, resizeMode: 'contain' }}
                                    source={require("../../../Assets/Images/narrative.png")}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, color: Colors.white, fontSize: DeviceInfo.isTablet() ? 30 : 18, lineHeight: DeviceInfo.isTablet() ? 35 : 21, paddingRight: 10 }}>Narrative</Text>
                                    <Image
                                        style={{ height: DeviceInfo.isTablet() ? 27 : 20, width: DeviceInfo.isTablet() ? 70 : 50, top: "8%", resizeMode: 'contain' }}
                                        source={require("../../../Assets/Images/forwardHome.png")}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center', marginTop: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            props.navigation.navigate("MultipleChoiceCategory")
                        }}
                    >

                        <ImageBackground
                            style={{
                                height: DeviceInfo.isTablet() ? 200 : 113, width: windowWidth - 50, elevation: 5,

                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                            }}
                            source={require("../../../Assets/Images/multipleChoiceView.png")}

                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 10 }}>
                                <Image
                                    style={{ height: DeviceInfo.isTablet() ? "50%" : 55, marginLeft: 10, width: DeviceInfo.isTablet() ? "50%" : 134, resizeMode: 'contain' }}

                                    source={require("../../../Assets/Images/multiple.png")}
                                />

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: "right", fontFamily: Fonts.AvenirNextLTPro_Demi, width: "70%", color: Colors.white, fontSize: DeviceInfo.isTablet() ? 30 : 18, lineHeight: DeviceInfo.isTablet() ? 50 : 21, paddingRight: 10 }}>Multiple Choice</Text>
                                    <Image
                                        style={{ height: DeviceInfo.isTablet() ? 27 : 20, width: DeviceInfo.isTablet() ? 70 : 50, top: "10%", resizeMode: 'contain' }}
                                        source={require("../../../Assets/Images/forwardHome.png")}
                                    />
                                </View>
                            </View>
                        </ImageBackground>

                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center', marginTop: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            props.navigation.navigate("FlipCardCategory")
                            // props.navigation.navigate("FlipCardScreen")
                        }}
                    >
                        <ImageBackground
                            style={{
                                height: DeviceInfo.isTablet() ? 200 : 113, width: windowWidth - 50, elevation: 5,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                            }}
                            source={require("../../../Assets/Images/flipview.png")}

                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 10 }}>
                                <Image
                                    style={{ height: DeviceInfo.isTablet() ? "50%" : 55, marginLeft: 10, width: DeviceInfo.isTablet() ? "50%" : 134, resizeMode: 'contain' }}

                                    source={require("../../../Assets/Images/flip.png")}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, color: Colors.white, fontSize: DeviceInfo.isTablet() ? 30 : 18, lineHeight: DeviceInfo.isTablet() ? 50 : 21, paddingRight: 10 }}>Flip Cards</Text>
                                    <Image
                                        style={{ height: DeviceInfo.isTablet() ? 27 : 20, width: DeviceInfo.isTablet() ? 70 : 50, top: "8%", resizeMode: 'contain' }}
                                        source={require("../../../Assets/Images/forwardHome.png")}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    mainView: {

    }
})
