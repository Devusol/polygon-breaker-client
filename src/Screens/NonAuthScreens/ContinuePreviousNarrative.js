import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import CustomHeader from '../../Components/CustomHeader'
import Colors from '../../Constants/Colors'
import Fonts from '../../Constants/Fonts/index'
import { get } from '../../Api/get';
import { updatePracticeMode, fetchNarrativeExam, continueAutoSelect, updateNarrativeTab, fetchNarrativeExamFromSetIdFromContinue, setExamNumber, setTotalNumber, updateNarrativeExam, updateResultCreateData, updateUUIDRedux, resetAllExam, updateCurrectScreenIndex } from '../../redux'
import { useFocusEffect } from '@react-navigation/native';

const ContinuePreviousNarrative = (props) => {
    const dispatch = useDispatch();
    const practiceData = useSelector(state => state.narrative.examCategoryies);
    const [continuePrevious, setContinuePrevious] = useState([]);
    const narrative = useSelector(state => state.narrative);
    const [loading, setLoading] = useState(false);

    const getContinuePrevious = () => {
        setLoading(true);
        get("narrativeresult/continue/results")
            .then((result) => {
                if (result.success) {
                    setContinuePrevious(result.data)
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
            getContinuePrevious();
            dispatch(resetAllExam());
        }, [false])
    );

    const getExamSets = (item) => {
        setLoading(true);
        dispatch(continueAutoSelect(true));
        dispatch(updateUUIDRedux(item.uuid));
        dispatch(updateNarrativeTab(item.narrativeTab))
        dispatch(updatePracticeMode(item.practicepapermode));
        dispatch(updateResultCreateData(item));
        dispatch(setExamNumber(item.examNumber));
        dispatch(fetchNarrativeExamFromSetIdFromContinue(item.narrativeSetId._id))
        setTimeout(() => {
            props.navigation.navigate("PresentingPraticeProblem")
            setLoading(false);
        }, 2000)
    }

    const onSubmit = (item) => {
        if (item.narrativeTab == "exam") {
            getExamSets(item);
        } else {
            setLoading(true);
            let arr = [item.narrativeId]
            dispatch(continueAutoSelect(true));
            dispatch(updateNarrativeExam(arr));
            dispatch(updateUUIDRedux(item.uuid));
            dispatch(updateNarrativeTab(item.narrativeTab))
            dispatch(updatePracticeMode(item.practicepapermode));
            dispatch(updateResultCreateData(item));
            dispatch(setExamNumber(0));
            dispatch(setTotalNumber(0));
            setTimeout(() => {
                props.navigation.navigate("PresentingPraticeProblem")
                setLoading(false);
            }, 1000)

        }
        // console.log(item)
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
                        onSubmit(item)
                        // props.navigation.navigate("NarrativeBackground")
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
                title="CONTINUE NARRATIVE"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />


            <View style={{ flex: 1 }}>
                <View style={{ height: wp(2) }} />
                <FlatList
                    data={continuePrevious}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index = index}
                />
            </View>
        </View>
    )
}
export default ContinuePreviousNarrative;