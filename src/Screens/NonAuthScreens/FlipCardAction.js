import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, Image } from 'react-native';
import { useRoute, useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info'
import CustomHeader from "../../Components/CustomHeader/index"
import Fonts from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PraticeExplanation from './Narrative/PracticeMode/PraticeExplaination';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux'
import FlipCard from 'react-native-flip-card';
import { updateActiveCardId, fetchFCActions, removeLastPageFlipCard } from '../../redux'
import { post } from '../../Api/post'


const Stack = createStackNavigator();
const QuestionsComponent = (props) => {
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.flashCard);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const route = useRoute();
    const questionKey = route.name.split("_")[1];
    const data = reduxData.flipCards[questionKey];


    useFocusEffect(
        React.useCallback(() => {
            dispatch(updateActiveCardId(questionKey))
        }, [false])
    );


    const removeLastPageIndex = () => {
        props.navigation.dispatch(state => {
            let lastpage = "QuestionsComponent_" + (parseInt(questionKey) - 1);
            const routes = state.routes.filter(r => r.name != lastpage);
            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        });
    }
    let arr = [];
    for (let i = 1; i <= 50; i++) {
        arr.push(i);
    }
    let navigateto = "";
    let txt = "Next"
    if (parseInt(questionKey) + 1 != reduxData.flipCards.length) {
        navigateto = "QuestionsComponent_" + (parseInt(questionKey) + 1)
        txt = "Next"

    } else {
        navigateto = "HomeScreen";
        txt = "Finish"
    }

    useEffect(() => {
        if (reduxData.removeLastPage) {
            dispatch(removeLastPageFlipCard(false));
            removeLastPageIndex();
        }
        if (reduxData.deletedIds.includes(reduxData.flipCards[questionKey]._id)) {
            dispatch(removeLastPageFlipCard(true));
            props.navigation.navigate(navigateto)
        }
    }, [false])

    useEffect(() => {
        console.log("The index selected",)
        if (reduxData.cardsTypes[reduxData.selectedCardIndex].value == "flagged") {
            if (!reduxData.flagIds.includes(reduxData.flipCards[questionKey]._id)) {
                dispatch(removeLastPageFlipCard(true));
                props.navigation.navigate(navigateto)
            }
        }
    }, [false])
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ flex: 1, paddingTop: 10 }}>
                <FlipCard
                    flipHorizontal={true}
                    flipVertical={false}
                    friction={10}
                    perspective={1000}
                >
                    {/* Face Side */}
                    <View style={{ flex: 1, padding: 10 }}>
                        {arr.map((res, key) => {
                            return (
                                <View style={{ height: 1, backgroundColor: "#AFEFFF", width: wp(100), position: "absolute", top: (DeviceInfo.isTablet() ? 20 * key : 16 * key) }} key={key} />
                            )
                        })}
                        <View style={{ height: DeviceInfo.isTablet() ? 12 : 7 }} />
                        <Text style={{ textAlign: "center", color: "#444747", fontSize: DeviceInfo.isTablet() ? 18 : 14, fontFamily: Fonts.AvenirNextLTPro_Demi, lineHeight: DeviceInfo.isTablet() ? 20 : 16 }}>{data.term}</Text>
                        <View style={{ position: "absolute", bottom: 10, right: 30 }}>
                            <Text>Term</Text>
                        </View>
                    </View>
                    {/* Back Side */}
                    <View style={{ flex: 1, padding: 10 }}>
                        {arr.map((res, key) => {
                            return (
                                <View style={{ height: 1, backgroundColor: "#AFEFFF", width: wp(100), position: "absolute", top: (DeviceInfo.isTablet() ? 20 * key : 16 * key) }} key={key} />
                            )
                        })}
                        <View style={{ height: DeviceInfo.isTablet() ? 12 : 7 }} />
                        <Text style={{ textAlign: "left", color: "#444747", fontSize: DeviceInfo.isTablet() ? 18 : 14, fontFamily: Fonts.AvenirNextLTPro_Regular, lineHeight: DeviceInfo.isTablet() ? 20 : 16 }}>{data.definition}</Text>
                        <View style={{ position: "absolute", bottom: 10, right: 30 }}>
                            <Text>Definition</Text>
                        </View>
                    </View>
                </FlipCard>
                <View style={{ position: "absolute", bottom: 50, width: wp(100) }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start", flex: 1, marginLeft: 20 }}>
                            {questionKey != 0 &&
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 20, paddingVertical: 6, borderWidth: 1, borderColor: "#9F9F9F", borderRadius: 50, backgroundColor: "white" }}
                                    onPress={() => props.navigation.goBack()}
                                >
                                    <Text style={{ color: "#252626", fontFamily: Fonts.AvenirNextLTPro_Regular, fontSize: DeviceInfo.isTablet() ? 16 : 12 }}>Previous</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 20, paddingVertical: 6, borderWidth: 1, borderColor: "#9F9F9F", borderRadius: 50, backgroundColor: "white" }}
                                onPress={() => props.navigation.navigate(navigateto)}
                            >
                                <Text style={{ color: "#252626", fontFamily: Fonts.AvenirNextLTPro_Regular, fontSize: DeviceInfo.isTablet() ? 16 : 12 }}>{txt}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const NavigationContainerQuestions = () => {
    const reduxData = useSelector(state => state.flashCard);
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}

        >
            {reduxData.flipCards.map((data, key) => {
                return (
                    <Stack.Screen name={"QuestionsComponent_" + key} component={QuestionsComponent} key={key} options={{
                        animationEnabled: false,
                    }} />
                )
            })}

        </Stack.Navigator>
    )
}

const FlipCardAction = props => {
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.flashCard);

    const questionKey = reduxData.activeCard;
    const total = reduxData.flipCards.length - 1;

    const removeCard = () => {
        let obj = {
            flipCardId: reduxData.flipCards[questionKey]._id,
            action: "Delete",
            categoryId: reduxData.flipCards[questionKey].category,
        }
        post("flipcards/action", obj)
            .then((result) => {
                if (questionKey == total) {
                    props.navigation.navigate("HomeScreen")
                } else {
                    let num = parseInt(questionKey) + 1;
                    dispatch(removeLastPageFlipCard(true));
                    props.navigation.navigate("QuestionsComponent_" + num);
                }
                dispatch(fetchFCActions());
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return (
        <View style={styles.mainView}>
            <View style={{ height: 20 }}></View>
            <View style={{ flex: 0.1 }} >
                <CustomHeader
                    title="ASSESSMENT TOOLS"
                    imageUrl={require("../../Assets/Images/drawer.png")}
                    action={() => {
                        props.navigation.toggleDrawer();
                    }}
                    flipheader={true}
                    actionDelete={() => props.navigation.navigate("FlipCardScreen")}
                    {...props}
                />
            </View>

            {/* TIMER SECTION  */}
            <View style={{ flex: 1 }}>
                {reduxData.flipCards.length > 0 &&
                    <View style={{ alignItems: "center", borderBottomColor: "#F50000", borderBottomWidth: 1 }}>
                        {reduxData.deletedIds.includes(reduxData.flipCards[questionKey]._id) ?
                            <View>
                                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 20 : 16, color: "#990000" }}>Card Removed</Text>

                            </View> :


                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 20, paddingVertical: 6, borderWidth: 1, borderColor: "#9F9F9F", borderRadius: 50 }}
                                    onPress={() => props.navigation.navigate("QuestionsComponent_0")}
                                >
                                    <Text style={{ color: "#252626", fontFamily: Fonts.AvenirNextLTPro_Regular, fontSize: DeviceInfo.isTablet() ? 16 : 12 }}>Reset</Text>
                                </TouchableOpacity>
                                {!reduxData.flagIds.includes(reduxData.flipCards[questionKey]._id) &&
                                    <>
                                        <View style={{ width: wp(8) }} />
                                        <TouchableOpacity
                                            style={{ paddingHorizontal: 20, paddingVertical: 6, borderWidth: 1, borderColor: "#9F9F9F", borderRadius: 50 }}
                                            onPress={() => removeCard()}
                                        >
                                            <Text style={{ color: "#252626", fontFamily: Fonts.AvenirNextLTPro_Regular, fontSize: DeviceInfo.isTablet() ? 16 : 12 }}>Remove</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                        }
                        <View style={{ marginTop: 25, marginBottom: 10 }}>
                            <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: DeviceInfo.isTablet() ? 20 : 16, color: "#444747" }}>Click the card to see the other side.</Text>
                        </View>
                    </View>
                }
                {/* NEW NAVIGATION */}
                <NavigationContainerQuestions />
            </View>


        </View>
    )
}
export default FlipCardAction;

const styles = ({
    mainView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    parentTxt: {
        lineHeight: 16,
        fontSize: 14,
        marginTop: 20,
        fontFamily: Fonts.AvenirNextLTPro_BoldCn,
    },
    childTxt: {
        lineHeight: 16,
        fontSize: 14,
        marginBottom: 20,
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})