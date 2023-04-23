import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomHeader from '../../Components/CustomHeader'
import Colors from '../../Constants/Colors'
import Fonts from '../../Constants/Fonts/index'
import { fetchFCActions, updateLoadingStateAll } from '../../redux'
import RNIap from 'react-native-iap';
const FlipCardCategory = (props) => {
    const dispatch = useDispatch();
    const practiceData = useSelector(state => state.flashCard.flipCategories);
    useEffect(() => {
        dispatch(fetchFCActions())
    }, [])

    const paymentIds = useSelector(state => state.user.paymentIds);

    const purchase = async (id) => {
        try {
            dispatch(updateLoadingStateAll(true));
            await AsyncStorage.setItem("examID", id)
            await RNIap.requestPurchase("001", false);
        } catch (err) {
            dispatch(updateLoadingStateAll(false));
            console.warn(err.code, err.message);
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ width: wp(90), height: 62, borderRadius: 6, borderWidth: 1, borderColor: "#DCDCDC", justifyContent: "center", marginTop: 10 }}
                    key={item.index}
                    onPress={() => {
                        if (item.isPaid && !paymentIds.includes(item._id)) {
                            purchase(item._id);
                        } else {
                            props.navigation.navigate("FlipCardScreen", { categoryId: item._id })
                        }

                    }}
                >
                    <Text style={{ fontSize: 18, textAlign: "center", fontFamily: Fonts.AvenirNextLTPro_Demi }}>{item.displayName}</Text>
                    {item.isPaid && !paymentIds.includes(item._id) &&
                        <Image
                            style={{ height: 22, width: 17, resizeMode: 'contain', position: "absolute", right: 20 }}
                            source={require("../../../assets/Images/lock.png")}
                        />
                    }
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomHeader
                title="FLASH CARD SETS"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />


            <View style={{ flex: 1 }}>
                <View style={{ height: wp(2) }} />
                <FlatList
                    data={practiceData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index = index}
                />
            </View>
        </View>
    )
}
export default FlipCardCategory;