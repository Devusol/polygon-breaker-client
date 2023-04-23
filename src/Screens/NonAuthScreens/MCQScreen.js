import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, FlatList, Platform, Alert, ActivityIndicator } from "react-native";
import CustomHeader from "../../Components/CustomHeader/index"
import CustomButton from '../../Components/CustomButton'
import Colors from "../../Constants/Colors/index"
import Fonts from "../../Constants/Fonts/index"
import { useDispatch, useSelector } from 'react-redux'
// import { Picker as IOSPicker } from '@react-native-picker/picker';
// import Picker from '@gregfrench/react-native-wheel-picker'
import { get } from '../../Api/get'
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { updateSelectedCardIndexFlip, updateSelectedCardIndexMCQ, fetchMCQActions, updateActiveCardIdMCQ, updateFlipCards, updateMCWQuestions } from '../../redux'

const MCQScreen = props => {
    const dispatch = useDispatch();
    const [selectedQuestions, setSelectedQuestions] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const flashCardData = useSelector(state => state.multipleChoice)
    const [loading, setLoading] = useState(false)
    const categoryId = props.route.params.categoryId;

    const getFCData = () => {
        dispatch(fetchMCQActions());
        dispatch(updateActiveCardIdMCQ(0))

        // props.navigation.navigate("FlipCardAction")
        let qty = 0;
        let type = flashCardData.cardsTypes[selectedIndex].value;
        if (flashCardData.cardsTypes[selectedIndex].value != "all") {
            qty = selectedQuestions;
        }
        // console.log(flashCardData.cardsTypes[selectedIndex].value);
        // console.log(selectedQuestions);
        setLoading(true);
        get("multiplechoice/bycategory/" + categoryId + "/" + qty + "/" + type)
            .then((result) => {
                // console.log(result.data);
                if (result.data.length > 0) {
                    console.log(result.data)
                    dispatch(updateMCWQuestions(result.data));
                    dispatch(updateSelectedCardIndexMCQ(selectedIndex))
                    setTimeout(() => {
                        props.navigation.navigate("MultipleChoiceScreen")
                        setLoading(false);
                    }, 1000)

                } else {
                    Alert.alert("There is no data available")
                    setLoading(false);
                }

            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })

        // props.navigation.navigate("MultipleChoiceScreen")
    }

    useEffect(() => {
        dispatch(updateFlipCards([]))
        dispatch(fetchMCQActions());
    }, [false])

    const renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ width: wp(90), height: 62, borderRadius: 6, borderWidth: 1, borderColor: "#DCDCDC", justifyContent: "center", marginTop: 10, backgroundColor: selectedIndex == item.index ? "#EEEEEE" : "white" }}
                    key={item.index}
                    onPress={() => {
                        setSelectedIndex(item.index)
                    }}
                >
                    <Text style={{ fontSize: 18, textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            {loading &&
                <View style={{ width: '100%', height: "100%", backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", zIndex: 9, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator
                        color="white"
                        size="large"
                    />
                </View>
            }
            <CustomHeader
                title="NCMHCE MCQ"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />

            <View style={{ marginTop: 20, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={flashCardData.cardsTypes}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.index = index}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    {/* {selectedIndex >= 0 ?
                        Platform.OS === 'ios' ?
                            <IOSPicker
                                selectedValue={selectedQuestions}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedQuestions(itemValue)
                                }>
                                {flashCardData.questionsQuantites.map((item, key) => {
                                    return (
                                        <IOSPicker.Item label={item.name} value={item.value} key={key} />
                                    )
                                })}
                            </IOSPicker>
                            : <Picker
                                style={{ width: wp(100), height: 180 }}
                                lineColor="#000000" //to set top and bottom line color (Without gradients)
                                lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
                                lineGradientColorTo="#FF5733"
                                selectedValue={selectedQuestions}
                                itemStyle={{ color: "black", fontSize: 26 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedQuestions(itemValue)
                                }>
                                {flashCardData.questionsQuantites.map((item, key) => {
                                    return (
                                        <Picker.Item label={item.name} value={item.value} key={key} />
                                    )
                                })}
                            </Picker>
                        : null} */}
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {selectedIndex >= 0 &&
                        <View style={{ width: wp(90), marginBottom: 20 }}>
                            <CustomButton
                                title={"Start"}
                                action={() => {
                                    getFCData();
                                }}
                                isLoading={loading}
                            />
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

export default MCQScreen;