import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native';

import CustomHeader from '../../Components/CustomHeader'
import Colors from '../../Constants/Colors'
import Fonts from '../../Constants/Fonts/index'
import { get } from '../../Api/get';
import { setTotalNumber, setExamNumber, updateUUIDRedux, updateNarrativeTab } from '../../redux'

const ViewYourScore = (props) => {
    const dispatch = useDispatch();
    const practiceData = useSelector(state => state.narrative.examCategoryies);
    const [previousScores, setPreviousScores] = useState([])
    const [loading, setLoading] = useState(false);
    const getPreviousScores = () => {
        setLoading(true);
        get("narrativeresult/complete/results")
            .then((result) => {
                if (result.success) {
                    console.log(result.data)
                    if (result.data) {
                        setPreviousScores(result.data)
                    }
                } else {
                    Alert.alert("There is some problem.")
                }
                setLoading(false);
            })
            .catch((error) => {
                Alert.alert(error.message);
                setLoading(false);
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            getPreviousScores();
        }, [false])
    );
    const moveToNext = (data) => {
        // setTotalNumber, setExamNumber, updateUUIDRedux, updateNarrativeTab
        if (data.narrativeTab == "exam") {
            dispatch(setTotalNumber(previousScores.length))
            dispatch(setExamNumber(previousScores.length))
            dispatch(updateUUIDRedux(data.uuid))
            dispatch(updateNarrativeTab(data.narrativeTab))
            props.navigation.navigate("FinalReviewResult", { examId: data._id, goback: true })
        } else if (data.narrativeTab == "practice" && data.practicepapermode == "practice") {
            // alert(data._id)
            props.navigation.navigate("ViewPerformance", { examId: data._id, goback: true })
        } else {
            dispatch(setTotalNumber(0))
            dispatch(setExamNumber(0))
            dispatch(updateUUIDRedux(data.uuid))
            dispatch(updateNarrativeTab(data.narrativeTab))
            props.navigation.navigate("FinalReviewResult", { examId: data._id })
        }
    }
    const renderItem = ({ item }) => {
        let printHeading = ""
        let examType = "";
        let practiceMode = "";
        if (item.narrativeTab == "exam") {
            printHeading = item.narrativeSetId.displayName;
            examType = "Exam"
        } else {
            printHeading = item.narrativeSetId.displayName + " - " + item.narrativeSectionId.displayName;
            examType = "Practice (" + (item.practicepapermode == "exam" ? "Exam" : "Practice") + ")";

        }

        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ width: wp(90), padding: 20, borderRadius: 6, borderWidth: 1, borderColor: "#DCDCDC", justifyContent: "center", marginTop: 10 }}
                    key={item.index}
                    onPress={() => {
                        // alert("This feature is under development.")
                        moveToNext(item)
                        // props.navigation.navigate("ViewPreviousPerformance")
                    }}
                >
                    <Text style={{ fontSize: 18, fontFamily: Fonts.AvenirNextLTPro_Demi }}>{printHeading}</Text>
                    <View style={{ height: 5 }} />
                    <Text style={{ fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Regular }}>{examType}</Text>
                    <View style={{ height: 5 }} />
                    <Text style={{ fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Regular }}>{moment(item.createsAt).format("MM/DD/YYYY hh:mm:ss A")}</Text>
                    {/* {item.isPaid &&
                        <Image
                            style={{ height: 22, width: 17, resizeMode: 'contain', position: "absolute", right: 20 }}
                            source={require("../../../assets/Images/lock.png")}
                        />
                    } */}
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading &&
                <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 9 }}>
                    <ActivityIndicator
                        size="large"
                        color="white"
                    />
                </View>
            }
            <CustomHeader
                title="PREVIOUS SCORES"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />


            <View style={{ flex: 1 }}>
                <View style={{ height: wp(2) }} />
                <FlatList
                    data={previousScores}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index = index}
                />
            </View>
        </View>
    )
}
export default ViewYourScore;