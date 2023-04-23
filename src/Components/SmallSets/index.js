import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../Constants/Colors/index"
import Fonts from "../../Constants/Fonts/index"

const SmallSets = props => {
    return (
        <View style={styles.mainView}>
            <Text style={{fontFamily:Fonts.AvenirNextLTPro_Demi, fontSize: 18, lineHeight: 21, alignSelf: 'center' }}>
                {props.title}
            </Text>

        </View>
    )
}

export default SmallSets

const styles = StyleSheet.create({
    mainView: {
        height:62,
        width: "90%",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: "center", 
        borderWidth: 3, 
        borderRadius: 6,
        borderColor: Colors.lightGrey,
        marginTop:20
    }
})