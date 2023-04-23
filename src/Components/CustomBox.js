import { Card } from 'native-base'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Fonts from '../Constants/Fonts'

const CustomBox = props => {
    return (
        <Card
            style={{ backgroundColor: "white", width: props.width, height: 62, alignSelf: 'center', borderRadius: 6, }}>
            <TouchableOpacity
                onPress={props.action}
                style={{ width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontSize: 18, fontFamily: Fonts.AvenirNextLTPro_Demi }}>{props.title}</Text>
            </TouchableOpacity>
        </Card>
    )
}

export default CustomBox