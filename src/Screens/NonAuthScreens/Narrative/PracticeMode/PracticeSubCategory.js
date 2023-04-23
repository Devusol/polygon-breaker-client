import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Modal from 'react-native-modal'
import CustomHeader from '../../../../Components/CustomHeader'
import Colors from '../../../../Constants/Colors'
import Fonts from '../../../../Constants/Fonts/index'
import { updatePracticeMode, fetchNarrativeExam, updateUUIDRedux, resetAllExam, updateCurrectScreenIndex } from '../../../../redux'

const HeaderButton = (props) => {
    let page = props.page;
    return (
        <View style={{ flexDirection: "row", paddingHorizontal: wp(2.5) }}>
            <View style={{ flex: 1, paddingHorizontal: wp(5) }}>
                <TouchableOpacity style={{ backgroundColor: page == "PracticeSubCategory" ? Colors.darkBlue : Colors.white, padding: DeviceInfo.isTablet() ? 15 : 10, borderRadius: 50, borderColor: "#BFBFBF", borderWidth: page == "PracticeSubCategory" ? 0 : 1 }}
                    onPress={() => props.navigation.navigate("PracticeSets")}
                >
                    <Text style={{ textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 18 : 14, color: page == "PracticeSubCategory" ? Colors.white : Colors.darkBlack }}>Individual Sets</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: wp(5) }}>
                <TouchableOpacity style={{ backgroundColor: page == "ExamSets" ? Colors.darkBlue : Colors.white, padding: DeviceInfo.isTablet() ? 15 : 10, borderRadius: 50, borderColor: "#BFBFBF", borderWidth: page == "ExamSets" ? 0 : 1 }}
                    onPress={() => props.navigation.navigate("ExamSets")}
                >
                    <Text style={{ textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 18 : 14, color: page == "ExamSets" ? Colors.white : Colors.darkBlack }}>Exam Sets</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const PracticeSubCategory = (props) => {
    const dispatch = useDispatch()

    const practiceDataSubCategories = useSelector(state => state.narrative.practiceSubCategoryies);
    const selectedCategory = useSelector(state => state.narrative.selectedCategory);
    const narrative = useSelector(state => state.narrative)
    const [showModal, setShowModal] = useState(false);
    const [narrativeId, setNarrativeId] = useState("");
    const renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ width: wp(45), marginLeft: wp(2.5), height: 62, borderRadius: 6, borderWidth: 1, borderColor: "#DCDCDC", justifyContent: "center", marginTop: 10 }}
                    key={item.index}
                    onPress={() => {
                        console.log("IN DIVIDUAL SET PRESSSED> ", item.narrativeID)
                        setShowModal(!showModal)
                        setNarrativeId(item.narrativeID)
                    }}
                >
                    <Text style={{ fontSize: 18, textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi }}>{item.name}</Text>

                </TouchableOpacity>
            </View>
        )
    }
    useFocusEffect(
        React.useCallback(() => {
            dispatch(updateUUIDRedux(uuid.v4()))
            dispatch(updateCurrectScreenIndex(0))
            dispatch(resetAllExam())

        }, [false])
    );
    
    useEffect(() => {
        console.log("UPDATE NARRATIVE EXAM: ",narrative.updateNarrativeExam)
        if (narrative.updateNarrativeExam.length > 0) {
            props.navigation.navigate("NarrativeBackground")
        } else if (narrative.updateNarrativeError != "") {
            alert(narrative.updateNarrativeError);
        }
    }, [narrative.updateNarrativeExam, narrative.updateNarrativeError])

    const updateMode = async (type) => {
        dispatch(updatePracticeMode(type));
        setShowModal(false)
        let setID = narrative.selectedCategory.contentID
        await dispatch(fetchNarrativeExam(setID, narrativeId));

        // if (narrative.updateNarrativeExam.length > 0) {
        //     props.navigation.navigate("NarrativeBackground")
        // } else {
        //     alert(narrative.updateNarrativeError);
        // }

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Modal
                backdropColor={"black"}
                backdropOpacity={.8}

                swipeDirection='right'
                avoidKeyboard={false}
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                onBackButtonPress={() => setShowModal(false)}
            >
                <View style={{ backgroundColor: Colors.white, width: wp(DeviceInfo.isTablet() ? 50 : 70), height: wp(DeviceInfo.isTablet() ? 50 : 70), borderRadius: 30, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                    <View style={{ width: wp(DeviceInfo.isTablet() ? 40 : 50) }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.darkBlue, padding: DeviceInfo.isTablet() ? 15 : 10, borderRadius: 50, borderColor: "#BFBFBF", borderWidth: 0 }}
                            onPress={() => updateMode("practice")}
                        >
                            <Text style={{ textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 18 : 14, color: Colors.white }}>Practice Mode</Text>
                        </TouchableOpacity>
                        <View style={{ height: wp(5) }} />
                        <TouchableOpacity style={{ backgroundColor: Colors.darkBlue, padding: DeviceInfo.isTablet() ? 15 : 10, borderRadius: 50, borderColor: "#BFBFBF", borderWidth: 0 }}
                            onPress={() => updateMode("exam")}
                        >
                            <Text style={{ textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 18 : 14, color: Colors.white }}>Exam Mode</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <CustomHeader
                title="INDIVIDUAL SETS"
                imageUrl={require("../../../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />

            {/* NAVIGATION BUTTONS  */}
            <View style={{ height: wp(2) }} />

            <View style={{ flex: 1 }}>
                <HeaderButton
                    page={props.route.name}
                    {...props}
                />
                <View style={{ height: wp(2) }} />
                <View style={{ height: wp(2) }} />
                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Bold, textAlign: "center", fontSize: DeviceInfo.isTablet() ? 24 : 18 }}>{selectedCategory && selectedCategory.name}</Text>
                <View style={{ height: wp(2) }} />
                <FlatList
                    data={practiceDataSubCategories}
                    contentContainerStyle={{
                        justifyContent: "center"
                    }}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index = index}
                />
            </View>
        </View>
    )
}
export default PracticeSubCategory;