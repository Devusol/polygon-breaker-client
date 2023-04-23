import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomHeader from '../../Components/CustomHeader';
import Fonts from '../../Constants/Fonts';

const YourPerformance = props => {
    return (
        <View style={styles.screen}>
            {/* HEADER SECTION  */}
            <View style={styles.header}>
                <CustomHeader
                    title="YOUR PERFORMANCE"
                    imageUrl={require("../../Assets/Images/back.png")}
                    action={() => {
                        props.navigation.navigate("HomeScreen");
                    }}
                />
            </View>

            <View style={styles.mainContanier}>
                <View style={{ height: "60%", width: "100%", backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: "#46B0E0", width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: "white", width: 135, height: 135, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24 }}>10.0pts.</Text>
                        </View>
                    </View>

                    <Text style={{
                        fontSize: 21,
                        marginTop: 30,
                        width: "50%",
                        textAlign: 'center'
                    }}>Overall Score of 10 questions.</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F6F6F6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'grey',
        fontFamily: Fonts.Roboto_Bold,
        lineHeight: 32,
        fontSize: 24,
    },
    mainContanier: {
        height: "100%",
        width: "100%",
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default YourPerformance