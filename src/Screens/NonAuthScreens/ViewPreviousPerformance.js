import React from 'react'
import { View, Text, FlatList, Image, ImageBackground, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Colors from '../../Constants/Colors'
import CustomHeader from '../../Components/CustomHeader';
import Fonts from '../../Constants/Fonts';
import { Container, Content } from 'native-base';
import CustomButton from '../../Components/CustomButton';


const ViewPreviousPerformance = props => {


    return (
        <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>

            {/* HEADER SECTION  */}

            <CustomHeader
                title="YOUR PERFORMANCE"
                imageUrl={require("../../../assets/Images/back.png")}
                action={() => {
                    // props.navigation.dispatch(StackActions.popToTop())
                    props.navigation.goBack();
                }}
            />


            {/* RANKING SECTION  */}

            <ScrollView style={{ padding: 15 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Bold }}>Ranking</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20, justifyContent: "center", alignItems: "center" }}>
                            <View>
                                <View style={{ width: wp(25), height: wp(25), borderRadius: wp(14), borderColor: "#3C9AEF", borderWidth: 4, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 18, fontFamily: Fonts.AvenirNextLTPro_Demi, lineHeight: 30 }}>0.0</Text>
                                        <Text style={{ fontSize: 11, fontFamily: Fonts.AvenirNextLTPro_Demi, lineHeight: 18 }}>pts.</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Regular, textAlign: "center" }}>Overall score of 10 questions</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20, justifyContent: "center", alignItems: "center" }}>
                            <View>
                                <View style={{ width: wp(25), height: wp(25), borderRadius: wp(14), borderColor: "#3C9AEF", borderWidth: 4, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 18, fontFamily: Fonts.AvenirNextLTPro_Demi, lineHeight: 30 }}>0.09</Text>
                                        <Text style={{ fontSize: 11, fontFamily: Fonts.AvenirNextLTPro_Demi, lineHeight: 18 }}>%</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Regular, textAlign: "center" }}>Score comparison to other people.</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Bold }}>5 Subject Areas</Text>
                </View>
                <View style={{ backgroundColor: "white", borderRadius: 10, borderColor: "#DBDBDB", borderWidth: 1 }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
                                <AnimatedCircularProgress
                                    size={120}
                                    width={15}
                                    fill={40}
                                    tintColor="#E0A530"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#E8E8E8"
                                    rotation={0}
                                >
                                    {
                                        (fill) => (
                                            <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 16 }}>
                                                <Text style={{ color: "#E0A530" }}>40</Text>
                                                <Text style={{ color: "#000000" }}>/100</Text>
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 14, textAlign: "center" }}>Professional Practice & Ethics</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
                                <AnimatedCircularProgress
                                    size={120}
                                    width={15}
                                    fill={90}
                                    tintColor="#2699FB"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#E8E8E8"
                                    rotation={0}
                                >
                                    {
                                        (fill) => (
                                            <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 16 }}>
                                                <Text style={{ color: "#2699FB" }}>90</Text>
                                                <Text style={{ color: "#000000" }}>/100</Text>
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: Fonts.AvenirNextLTPro_Demi, fontSize: 14, textAlign: "center" }}>Professional Practice & Ethics</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default ViewPreviousPerformance