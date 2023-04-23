import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import CustomHeader from "../../../Components/CustomHeader/index"
import Fonts from '../../../Constants/Fonts';
import CustomButton from '../../../Components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = [
    "A.  Short-term goals",
    "B.  Financial Expectation",
    "C.  Fees",
    "D.  Confidentiality"
]

const PresentingProblem = props => {


    return (
        <View style={styles.mainView}>
            <View style={{ height: 20 }}></View>
            <View style={{ flex: 0.1 }} >
                <CustomHeader
                    title="PRESENTING PROBLEM"
                    imageUrl={require("../../../Assets/Images/drawer.png")}
                    action={() => {
                        props.navigation.toggleDrawer();
                    }}
                    cardView={true}
                    card={() => {
                        props.navigation.navigate("NarrativeBackground");
                    }}
                />

            </View>

            {/* TIMER SECTION  */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, marginRight: 10, fontSize: 12, lineHeight: 14 }}>Timer</Text>

            </View>


            <View style={{ flex: 0.9, marginLeft: 19 }}>
                <ScrollView style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text><Text style={styles.parentTxt}>Presenting Problem: </Text><Text style={styles.childTxt}>The client is 33y old male referred to  you by one or more system solutions. As a licensed Mental health therapist, it is imperative to go over intake paperwork in the initial session. Which item is most likely to be explored within the intake process?</Text></Text>
                    <Text style={styles.parentTxt}>Question 1/10</Text>
                    <Text style={styles.childTxt}>As a licensed Mental health therapist, it is imperative to go over intake paperwork in the initial session. Which item is most likely to be explored within the intake process?</Text>
                    {
                        data.map((data, index) => {
                            return (
                                <View style={{ backgroundColor: 'white', borderRadius: 5, height: 47, width: "95%", marginTop: 10, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Regular, marginLeft: 20 }}>{data}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>

            </View>
            <CustomButton
                title="Next"
                action={() => {
                    props.navigation.navigate("Session")
                }}
            />
        </View>
    )
}
export default PresentingProblem;

const styles = ({
    mainView: {
        flex: 1,
        backgroundColor: "#F6F6F6",
    },
    parentTxt: {
        lineHeight: 16,
        fontSize: 14,
        marginVertical: 20,
        fontFamily: Fonts.AvenirNextLTPro_Demi,
    },
    childTxt: {
        lineHeight: 16,
        fontSize: 14,
        marginBottom: 20,
        fontFamily: Fonts.AvenirNextLTPro_Regular
    }
})