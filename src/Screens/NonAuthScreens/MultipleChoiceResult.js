import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import CustomHeader from "../../Components/CustomHeader/index"
import Fonts from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import CustomButton1 from '../../Components/CustomButton1'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PraticeExplanation from './Narrative/PracticeMode/PraticeExplaination';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native'

const MultipleChoiceResult = props => {
    const reduxData = useSelector(state => state.multipleChoice);
    const [percentage, setPercentage] = useState('00.00')

    const resetNavigation = () => {
        props.navigation.dispatch(state => {
            console.log(state);
            const routes = state.routes.filter(r => r.name !== 'MultipleChoiceScreen');
            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        });
    }


    useEffect(() => {
        resetNavigation();

        let questions = reduxData.practiceQuestions;
        let answers = reduxData.answers;
        let totalWrong = 0;
        let totalRight = 0;
        for (let i in questions) {
            for (let j in answers) {
                if (questions[i]._id == answers[j].questionId) {
                    let rightIndex = -1;
                    for (let k in questions[i].options) {
                        if (questions[i].options[k].isTrue) {
                            rightIndex = k;
                        }
                    }
                    if (answers[j].userAnswer == rightIndex) {
                        totalRight++;
                    } else {
                        totalWrong++;
                    }
                }
            }
        }
        let total = totalRight + totalWrong;
        let percentage = (totalRight / total) * 100;
        setPercentage(percentage.toFixed(2));
        // console.log(totalRight, totalWrong)


    }, [])
    return (
        <View style={styles.mainView}>
            <View style={{ height: 20 }}></View>
            <View style={{ flex: 0.1 }} >
                <CustomHeader
                    title="YOUR PERFORMANCE"
                    imageUrl={require("../../Assets/Images/drawer.png")}
                    action={() => {
                        props.navigation.toggleDrawer();
                    }}
                />

            </View>
            {/* TIMER SECTION  */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#FFFFFF", width: wp(90), height: wp(100), borderRadius: 25 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                        <View style={{ width: wp(60), height: wp(60), borderRadius: wp(30), borderColor: "#3C9AEF", borderWidth: 10, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 24, lineHeight: 30, fontFamily: Fonts.AvenirNextLTPro_Bold, color: "#3F3F3F" }}>{percentage}</Text>
                                <Text style={{ fontSize: 16, lineHeight: 18, fontFamily: Fonts.AvenirNextLTPro_Bold, color: "#3F3F3F" }}>pts.</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 0.4, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 21, color: "#000000" }}>
                            Overall Score of {reduxData.practiceQuestions.length} questions.
                        </Text>
                    </View>
                </View>

            </View>
            <CustomButton
                title="Finish"
                action={() => {
                    props.navigation.navigate("HomeScreen")
                }}
            />

        </View>
    )
}
export default MultipleChoiceResult;

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