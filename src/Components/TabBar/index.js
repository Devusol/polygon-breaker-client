import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Pressable } from 'react-native';

import { Card } from 'native-base'
// const { width } = Dimensions.get('screen')

const TabBar = ({ state, navigation }) => {

    useEffect(() => {
        homeHandlePress("Home")
    }, []);

    const [home, setHome] = useState(false)
    const [wallet, setWallet] = useState(false)
    const [setting, setSetting] = useState(false)

    const homeHandlePress = (activeTab) => {
        navigation.navigate(activeTab)
        setHome(true)
        setSetting(false)
        setWallet(false)
    }

    const settingHandlePress = (activeTab) => {
        navigation.navigate(activeTab)
        setHome(false)
        setSetting(true)
        setWallet(false)
    }

    const calenderHandlerPress = (activeTab) => {
        navigation.navigate(activeTab)
        setHome(false)
        setSetting(false)
        setWallet(true)
    }



    return (
        <View style={styles.wrapper}>
            <View style={styles.contanier}>
                <TouchableOpacity onPress={() => homeHandlePress('Drawer')}>
                    {home ? <Image
                        source={require("../../Assets/Images/logo.png")}
                        style={{ height: 28, width: 25, resizeMode: 'contain' }}
                    /> : <Image
                        source={require("../../Assets/Images/logo.png")}
                        style={{ height: 28, width: 25, resizeMode: 'contain' }}
                    />}
                </TouchableOpacity >
                <Pressable onPress={() => settingHandlePress('ResetPassword')}>
                    {setting ?
                        <Card style={{ height: 50, width: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                            <Image
                                source={require("../../Assets/Images/logo.png")}
                                style={{ height: 24, width: 20, resizeMode: 'contain' }}
                            />
                        </Card>

                        : <Card style={{ height: 50, width: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                            <Image
                                source={require("../../Assets/Images/logo.png")}
                                style={{ height: 24, width: 20, resizeMode: 'contain' }}
                            />
                        </Card>}
                </Pressable>
                <TouchableOpacity onPress={() => calenderHandlerPress('PracticeSets')}>
                    {wallet ? <Image
                        source={require("../../Assets/Images/logo.png")}
                        style={{ height: 26, width: 26, resizeMode: 'contain' }}
                    /> : <Image
                        source={require("../../Assets/Images/logo.png")}
                        style={{ height: 26, width: 26, resizeMode: 'contain' }}
                    />}
                </TouchableOpacity >


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 57,
        backgroundColor: 'white',
        elevation:10,
    },
    contanier: {
        height: 57,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 28,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
    }
})

export default TabBar;