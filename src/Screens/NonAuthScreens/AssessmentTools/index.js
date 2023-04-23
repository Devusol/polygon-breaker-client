import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import CustomHeader from "../../../Components/CustomHeader/index"
import Colors from "../../../Constants/Colors/index"
import Sets from "../../../Components/Sets/index"
import Fonts from '../../../Constants/Fonts';

const windowWidth = Dimensions.get('window').width;
const AssessmentTools = props => {
    const [show, setShow] = useState(true)
    return (
        <View style={styles.mainView}>
            <View style={{ flex: 0.1 }}>
                <CustomHeader
                    title="ASSESSMENT TOOLS"
                    imageUrl={require("../../../Assets/Images/drawer.png")}
                    action={() => {
                        props.navigation.openDrawer();
                    }}
                />
            </View>
            <View style={styles.headerNav}>
                <View style={{ ...styles.view, }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setShow(true)
                        }}
                    >
                        <Text style={styles.navigation}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.view, }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setShow(false)
                        }}
                    >
                        <Text style={styles.navigation}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setShow(false)
                }}
                style={{ alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 14, lineHeight: 16, fontFamily: Fonts.AvenirNextLTPro_Demi }}>
                    Click the card to see the other side.
                    </Text>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 1, width: '100%', marginTop: 15, backgroundColor: Colors.red }}></View>
                {show ?
                    <TouchableOpacity onPress={() => setShow(false)} style={{ width: '80%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 14, lineHeight: 25, textAlign: 'center' }}>
                            Child & Adolescent Functional Assessment Scale (CAFAS)
                        </Text>
                    </TouchableOpacity>
                    :

                    <TouchableOpacity onPress={() => setShow(true)}>
                        <View>
                            <Text>
                                <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: Fonts.AvenirNextLTPro_Demi }}>Mental Status Exam : </Text>
                                <Text style={{ fontSize: 14, lineHeight: 24, fontFamily: Fonts.AvenirNextLTPro_Regular }}>
                                    Depressive periods lasting for few weeks elevated mood, history of hospitalizations due to depression with suicidal ideation. history of hospitalizations due to depression with suicidal ideation.
                             </Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                }


                <View style={{ height: 1, width: '100%', backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 30, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
                <View style={{ height: 1, width: '100%', marginTop: 25, backgroundColor: Colors.skyBlue }}></View>
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', bottom: 40, position: 'absolute', width: "100%" }}>
                <TouchableOpacity style={{ borderColor: '#9F9F9F', width: 87, height: 24, borderWidth: 0.5, borderRadius: 21, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12 }}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ borderColor: '#9F9F9F', width: 87, height: 24, borderWidth: 0.5, borderRadius: 21, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12 }}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AssessmentTools;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.white
    },
    view: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.grey,
        width: 87,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 40
    },
    navigation: {
        fontSize: 14,
        color: "#4F4C47",
        borderRadius: 50,
        fontFamily: Fonts.AvenirNextLTPro_Regular
    },
})
