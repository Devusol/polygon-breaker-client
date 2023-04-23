import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../../Components/CustomHeader'
import Colors from '../../Constants/Colors'
import Fonts from '../../Constants/Fonts/index'
import { post } from '../../Api/post'
import { get } from '../../Api/get'
import { updatePracticeMode, updateLoadingStateAll, fetchMCQActions, updateMCQSelectedCategory, fetchNarrativeExamFromSetId, updateNarrativeTab, resetMCQAnswers, resetAllExam, updateUUIDRedux, updateMCWQuestions } from '../../redux'
import RNIap from 'react-native-iap';

const MultipleChoiceCategory = (props) => {
    const dispatch = useDispatch();
    const multipleChoiceCategory = useSelector(state => state.multipleChoice.categories);
    const narrative = useSelector(state => state.narrative);
    const [loading, setLoading] = useState(false)

    const paymentIds = useSelector(state => state.user.paymentIds);

    const purchase = async (id) => {
        try {
            dispatch(updateLoadingStateAll(true));
            await AsyncStorage.setItem("examID", id)
            await RNIap.requestPurchase("001", false);
        } catch (err) {
            dispatch(updateLoadingStateAll(false));
            console.warn(err.code, err.message);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(resetAllExam())
            dispatch(resetMCQAnswers())
        }, [false])
    );
    const moveToNextScreen = (id) => {
        dispatch(updateMCQSelectedCategory(id))
        dispatch(fetchMCQActions())
        props.navigation.navigate("MCQScreen", { categoryId: id });
    }
    const renderItem = ({ item }) => {

        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ width: wp(90), height: 62, borderRadius: 6, borderWidth: 1, borderColor: "#DCDCDC", justifyContent: "center", marginTop: 10 }}
                    key={item.index}
                    onPress={() => {
                        if (item.isPaid && !paymentIds.includes(item._id)) {
                            purchase(item._id);
                        } else {
                            moveToNextScreen(item._id)
                        }

                    }}
                >
                    <Text style={{ fontSize: 18, textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi }}>{item.name}</Text>
                    {item.isPaid && !paymentIds.includes(item._id) &&
                        <Image
                            style={{ height: 22, width: 17, resizeMode: 'contain', position: "absolute", right: 20 }}
                            source={require("../../../assets/Images/lock.png")}
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading &&
                <View style={{ width: '100%', height: "100%", backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", zIndex: 9, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator
                        color="white"
                        size="large"
                    />
                </View>
            }
            <CustomHeader
                title="MULTIPLE CHOICE"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />

            <View style={{ height: wp(2) }} />
            <View style={{ flex: 1 }}>
                <View style={{ height: wp(2) }} />
                <FlatList
                    data={multipleChoiceCategory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index = index}
                />
            </View>
        </View >
    )
}
export default MultipleChoiceCategory;