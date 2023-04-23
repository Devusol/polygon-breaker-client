import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Pressable } from 'react-native';


import Colors from '../../Constants/Colors/index';
import Fonts from '../../Constants/Fonts/index'
const windowWidth = Dimensions.get('window').width;

const CustomModal = props => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            {...props}
        >
            <Pressable
                onPress={props.action}
                style={styles.screen}>
                <View style={styles.modal}>

                    <View style={styles.contanier}>
                        <View>
                            <Text style={styles.title}>Do you wish to save the changes?</Text>
                        </View>

                        <View>
                            
                        </View>

                    </View>

                    {/* BUTTON SECTION  */}
                    <TouchableOpacity onPress={props.action}>
                        <View style={styles.buttonCon}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 40 }}>

                    </View>



                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0000003B',
        flex: 1,
        padding: 20
    },
    modal: {
        maxHeight: "80%",
        backgroundColor: Colors.blue,
        marginTop: '32%',
        borderRadius: 31
    },
    circle: {
        width: 97,
        height: 97,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        alignSelf: 'center',
        bottom: 50
    },
    image: {
        width: 37,
        height: 78
    },
    contanier: {
        justifyContent: 'space-evenly',
        padding: 34,
        flex: 1,
    },
    title: {
        fontSize: 14,
        lineHeight: 19,
        fontFamily: Fonts.AvenirNextLTPro_Demi,
        marginVertical: 10
    },
    buttonCon: {
        width: "85%",
        alignSelf: 'center',
        height: 43,
        backgroundColor: 'white',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: Fonts.AvenirNextLTPro_Demi,
        lineHeight: 35,
        fontSize: 16,
        color: Colors.grey
    }

})

export default CustomModal;