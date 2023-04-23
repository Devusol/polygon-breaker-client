import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import CustomHeader from '../../Components/CustomHeader';




const NarrativeScreen = props => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <CustomHeader
                title="INDIVIDUAL SETS"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />

            {/* NAVIGATION BUTTONS  */}
            <View style={{ height: wp(2) }} />


            <View style={{ flex: 1 }}>

            </View>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => setSelected('Study')}
                    style={{ width: '45%', height: 35, borderRadius: 21, backgroundColor: selected == "Study" ? "#4AA8E0" : "white", borderWidth: 0.5, borderColor: '#BFBFBF', marginVertical: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: selected == "Study" ? 'white' : 'black', fontFamily: Fonts.AvenirNextLTPro_Demi }}>Study Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelected('Exam')}
                    style={{ width: '45%', height: 35, borderRadius: 21, backgroundColor: selected != "Study" ? "#4AA8E0" : "white", borderWidth: 0.5, borderColor: '#BFBFBF', marginVertical: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: selected != "Study" ? 'white' : 'black', fontFamily: Fonts.AvenirNextLTPro_Demi }}>Exam Mode</Text>
                </TouchableOpacity>
            </View> */}

            {/* {
                selectSet.length != 0 && selected == "Study" ?
                    <View>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginVertical: 20 }}>{selectSet}</Text>

                        <FlatList
                            style={{ marginLeft: "5%" }}
                            data={data}
                            keyExtractor={(data, index) => index}
                            numColumns={2}
                            renderItem={(itemData) => {
                                return (
                                    <CustomBox
                                        action={() => { props.navigation.navigate("NarrativeBackground") }}
                                        width="45%"
                                        title={itemData.item}
                                    />
                                )
                            }}
                        />
                    </View>

                    : <Container>
                        <Content>
                            {
                                selected == "Study" ?

                                    Practiceset.map((data, index) => {
                                        return (
                                            <View key={index} style={{ marginVertical: 10 }}>
                                                <CustomBox
                                                    width="90%"
                                                    action={() => setSelectSet(data)}
                                                    title={data}
                                                />
                                            </View>
                                        )
                                    })

                                    :
                                    ExamMode.map((data, index) => {
                                        return (
                                            <View
                                                // onPress = {() => console.log(data)}
                                                key={index} style={{ marginVertical: 10 }}>
                                                <CustomBox
                                                    width="90%"
                                                    action={() => { props.navigation.navigate("NarrativeBackground") }}
                                                    title={data}
                                                />
                                            </View>
                                        )
                                    })
                            }
                        </Content>
                    </Container>
            } */}
        </View>
    )
}

export default NarrativeScreen