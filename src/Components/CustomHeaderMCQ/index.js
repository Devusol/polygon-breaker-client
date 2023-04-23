import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Colors from "../../Constants/Colors/index"
import Fonts from "../../Constants/Fonts/index"
import DeviceInfo from 'react-native-device-info';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from "react-redux"
import { fetchMCQActions, removeLastPageMCQ } from '../../redux'
import { post } from '../../Api/post'
import { deleteApi } from '../../Api/delete'

const CustomHeader = props => {
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.multipleChoice);
    const questionKey = reduxData.activeCard;
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const flagCard = () => {
        let obj = {
            mcqId: reduxData.practiceQuestions[questionKey]._id,
            action: "Flag",
            categoryId: reduxData.practiceQuestions[questionKey].category,
        }
        setLoading(true);
        post("multiplechoice/action", obj)
            .then((result) => {
                if (result.success) {

                    let tabname = reduxData.cardsTypes[reduxData.selectedCardIndex].value;
                    if (tabname == "flagged") {
                        dispatch(removeLastPageMCQ(true));
                        let navigateto = "";
                        if (parseInt(questionKey) + 1 != reduxData.practiceQuestions.length) {
                            navigateto = "QuestionsComponent_" + (parseInt(questionKey) + 1)
                        } else {
                            navigateto = "HomeScreen";
                        }
                        props.navigation.navigate(navigateto);
                    }
                    dispatch(fetchMCQActions());
                    setTimeout(() => {

                        setLoading(false)
                    }, 800)
                }
            })
            .catch((error) => {
                Alert.alert(error.message)
                setLoading(false)
                console.log(error);
            })
    }
    // let navigateto = "";
    // if (parseInt(questionKey) + 1 != reduxData.practiceQuestions.length) {
    //     navigateto = "QuestionsComponent_" + (parseInt(questionKey) + 1)
    // } else {
    //     navigateto = "MultipleChoiceResult";

    // }

    const deleteAllData = () => {
        deleteApi("multiplechoice/actions/all")
            .then(() => {
                dispatch(fetchMCQActions());
                // props.actionDelete
                props.navigation.navigate("MultipleChoiceCategory")
            })
            .catch((error) => {
                console.log(error);
            })
        // 
    }


    const deleteConfirm = () =>
        Alert.alert(
            "Alert",
            "Do you want to remove all the flagged Questions? ",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => deleteAllData() }
            ]
        );


    return (
        <View style={{ marginTop: wp(2) }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.screen}>
                    <TouchableOpacity
                        onPress={props.action}
                        style={{
                            paddingVertical: wp(2),
                            paddingHorizontal: wp(5),
                            borderTopRightRadius: 70,
                            borderBottomRightRadius: 70,
                            backgroundColor: Colors.drawerBlue,
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={props.imageUrl}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    {props.cardView ?
                        <TouchableOpacity onPress={props.card}>
                            <Image
                                style={{ width: 40, height: 23, borderRadius: 50, resizeMode: "contain" }}
                                source={require("../../Assets/Images/headercard.jpg")}
                            />
                        </TouchableOpacity>
                        : null}
                    {reduxData.practiceQuestions.length > 0 && props.mcqHeader && questionKey != -1 &&
                        <>
                            {loading ? <View style={{ paddingRight: 10 }}>
                                <ActivityIndicator color="black" />
                            </View> :
                                <View style={{ flexDirection: "row" }}>

                                    {!reduxData.deletedIds.includes(reduxData.practiceQuestions[questionKey]._id) &&
                                        <TouchableOpacity
                                            style={{ width: 30, height: 30, borderRadius: 50, borderColor: "#00000024", borderWidth: 1, justifyContent: "center", alignItems: "center", marginRight: 10 }}
                                            onPress={() => {
                                                flagCard()
                                            }}
                                        >
                                            <Image
                                                style={{ width: 14, height: 17 }}
                                                source={reduxData.flagIds.includes(reduxData.practiceQuestions[questionKey]._id) ? require('../../Assets/Images/flag.png') : require('../../Assets/Images/flagInactive.png')}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {reduxData.selectedCardIndex == 1 &&
                                        <TouchableOpacity
                                            style={{ width: 30, height: 30, borderRadius: 50, borderColor: "#00000024", borderWidth: 0, justifyContent: "center", alignItems: "center", marginRight: 10 }}
                                            onPress={() => deleteConfirm()}
                                        >
                                            <Image
                                                style={{ width: 14, height: 17 }}
                                                source={require('../../Assets/Images/delete.png')}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                            }
                        </>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,


        justifyContent: 'center',
        alignItems: 'flex-start',


    },
    icon: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    title: {
        color: Colors.darkBlack,
        textAlign: "center",
        fontSize: wp(DeviceInfo.isTablet() ? 3 : 3.5),
        // lineHeight: DeviceInfo.isTablet() ? 40 : 16,
        fontFamily: Fonts.AvenirNextLTPro_Demi
    },
})

export default CustomHeader
