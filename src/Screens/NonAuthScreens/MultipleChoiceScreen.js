import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, Image, Alert } from 'react-native';
import { useRoute, useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import CustomHeader from "../../Components/CustomHeaderMCQ/index"
import Fonts from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PraticeExplanation from './Narrative/PracticeMode/PraticeExplaination';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux'
import { updateMCQAnswer, updateActiveCardIdMCQ, removeLastPageMCQ, fetchMCQActions } from '../../redux'
import { post } from '../../Api/post'
const Stack = createStackNavigator();
const QuestionsComponent = (props) => {
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.multipleChoice);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [submit, setSubmit] = useState(false);
    const [already, setAlready] = useState(false);
    const route = useRoute();
    const questionKey = route.name.split("_")[1];
    const data = reduxData.practiceQuestions[questionKey];

    useFocusEffect(
        React.useCallback(() => {
            dispatch(updateActiveCardIdMCQ(questionKey))
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

    useEffect(() => {
        if (reduxData.removeLastPage) {
            dispatch(removeLastPageMCQ(false));
            removeLastPageIndex();
        }
        if (reduxData.deletedIds.includes(reduxData.practiceQuestions[questionKey]._id)) {
            dispatch(removeLastPageMCQ(true));
            props.navigation.navigate(navigateto)
        }
    }, [false])
    useEffect(() => {
        console.log("The index selected",)
        if (reduxData.cardsTypes[reduxData.selectedCardIndex].value == "flagged") {
            if (!reduxData.flagIds.includes(reduxData.practiceQuestions[questionKey]._id)) {
                dispatch(removeLastPageMCQ(true));
                props.navigation.navigate(navigateto)
            }
        }
    }, [false])
    // removeLastPageMCQ
    useEffect(() => {
        // let checkAvailable = reduxData.answers.filter(qdata => qdata.questionId == data._id)

        let available = false;
        let answerData = null;
        for (let i in reduxData.answers) {
            if (reduxData.answers[i].questionId == data._id) {
                available = true;
                answerData = reduxData.answers[i];
            }
        }
        if (available) {
            setAlready(true);
            setSelectedIndex(answerData.userAnswer)
            setSubmit(true);
        }
    }, [reduxData.answers])

    const toLetters = (num) => {
        "use strict";
        var mod = num % 26,
            pow = num / 26 | 0,
            out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? toLetters(pow) + out : out;
    }

    let correctOption = -1;
    for (let i in data.options) {
        if (data.options[i].isTrue) {
            correctOption = parseInt(i) + 1;
        }
    }

    const flagCard = () => {
        let obj = {
            mcqId: reduxData.practiceQuestions[questionKey]._id,
            action: "Flag",
            categoryId: reduxData.practiceQuestions[questionKey].category,
        }
        // setLoading(true);
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

                        // setLoading(false)
                    }, 800)
                }
            })
            .catch((error) => {
                Alert.alert(error.message)
                // setLoading(false)
                console.log(error);
            })
    }
    const navigateUser = () => {
        if (selectedIndex == correctOption - 1) {
            if (reduxData.cardsTypes[reduxData.selectedCardIndex].value == "flagged") {
                flagCard();
            } else {
                props.navigation.navigate(navigateto)
            }
        } else {
            props.navigation.navigate(navigateto)
        }

    }

    let navigateto = "";
    if (parseInt(questionKey) + 1 != reduxData.practiceQuestions.length) {
        navigateto = "QuestionsComponent_" + (parseInt(questionKey) + 1)
    } else {
        navigateto = "MultipleChoiceResult";

    }
    return (
        <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 15, padding: 10, }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.parentTxt}>Question {parseInt(questionKey) + 1}/{reduxData.practiceQuestions.length}</Text>
                    <View style={{ height: 1, backgroundColor: "#D8D8D8", width: wp(6), marginTop: 5, marginBottom: 15 }} />
                    <Text style={styles.childTxt}>{data.question}</Text>
                    {data.options.map((res, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedIndex(index)}
                                key={index}
                                disabled={selectedIndex >= 0 && submit != false}
                                style={{
                                    backgroundColor: selectedIndex == index ?
                                        submit == false ?
                                            "#E1E1E1" :
                                            res.isTrue ?
                                                "#BDFFBC" :
                                                '#FFB8B8' :
                                        'white', borderRadius: 5, height: 47, width: "95%", marginTop: 10, justifyContent: 'center'
                                }}>
                                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Regular, marginLeft: 20 }}>{toLetters(index + 1)}. {res.text}</Text>
                            </TouchableOpacity>
                        )
                    })}

                    {selectedIndex >= 0 && submit != false &&
                        <PraticeExplanation
                            explainText={data.explanation}
                            correctOption={toLetters(correctOption)}

                        />
                    }

                </ScrollView>

            </View>

            <CustomButton
                title={submit ? "Next" : "Submit"}
                action={() => {
                    if (submit) {
                        if (!already) {
                            dispatch(updateMCQAnswer({
                                questionId: data._id,
                                userAnswer: selectedIndex
                            }))
                        }
                        navigateUser()

                    } else if (selectedIndex < 0) {
                        Alert.alert("Please select any option.")
                    } else {

                        setSubmit(true);
                    }
                }}
            />
        </View>
    )
}

const NavigationContainerQuestions = () => {
    const reduxData = useSelector(state => state.multipleChoice);
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {reduxData.practiceQuestions.map((data, key) => {
                return (
                    <Stack.Screen name={"QuestionsComponent_" + key} component={QuestionsComponent} key={key} />
                )
            })}

        </Stack.Navigator>
    )
}

const MultipleChoiceScreen = props => {
    // const reduxData = useSelector(state => state.narrative);
    return (
        <View style={styles.mainView}>
            <View style={{ height: 20 }}></View>
            <View style={{ flex: 0.1 }} >
                <CustomHeader
                    title="MULTIPLE CHOICE"
                    imageUrl={require("../../Assets/Images/drawer.png")}
                    action={() => {
                        props.navigation.toggleDrawer();
                    }}
                    mcqHeader={true}
                    actionDelete={() => console.log("")}
                    {...props}
                />

            </View>

            {/* TIMER SECTION  */}
            <View style={{ flex: 1 }}>


                {/* NEW NAVIGATION */}
                <NavigationContainerQuestions />
            </View>


        </View>
    )
}
export default MultipleChoiceScreen;

const styles = ({
    mainView: {
        flex: 1,
        backgroundColor: "#F6F6F6",
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