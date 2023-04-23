import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from "react-native";
import CustomHeader from "../../Components/CustomHeader/index"
import CustomButton from '../../Components/CustomButton'
import CustomTextInput1 from '../../Components/CustomTextInput1/index'
import Colors from "../../Constants/Colors/index"
import Fonts from "../../Constants/Fonts/index"
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateUserDetailsFromEditScreen, getUserDetails } from '../../redux'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal'
import RNFetchBlob from 'rn-fetch-blob'
import { BASE_URL, IMG_URL } from '../../Api/baseUrl'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const EditProfile = props => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.user.userDetails)
    const user = useSelector(state => state.user);
    const [isUpdatePress, setIsUpdatePress] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [image, setImage] = useState("https://picsum.photos/400");
    const [imageData, setImageData] = useState()
    const [name, setName] = useState(userDetails && userDetails.name ? userDetails.name : "")
    const [email, setEmail] = useState(userDetails && userDetails.email ? userDetails.email : "")
    const [showModal, setShowModal] = useState(false)
    console.log(userDetails);
    const ValidateEmail = (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const uploadImage = async (imaged) => {
        let token = await AsyncStorage.getItem('token');
        // let imaged = JSON.parse(imageData);
        RNFetchBlob.fetch("POST", BASE_URL + "auth/uploadProfileImage", {
            "Content-Type": "multipart/form-data",
            "authorization": "Bearer " + token
        }, [
            { name: 'image', filename: 'image.jpg', type: imaged.mime, data: imaged.data }
        ])
            .then((resp) => {
                console.log(resp)
                dispatch(getUserDetails())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onOpenPhoto = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            setImage(image.path)
            setImageData(JSON.stringify(image));
            uploadImage(image)
            setShowModal(false);
        });
    }

    const onOpenCamera = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            setImage(image.path)
            setImageData(JSON.stringify(image));
            uploadImage(image)
            setShowModal(false);
        });
    }

    useEffect(() => {
        if (user.updateProfileError != "" && isUpdatePress) {
            Alert.alert(user.updateProfileError)
        } else if (isUpdatePress && user.updateProfileLoading) {
            Alert.alert("Profile Updated")
        }
    }, [user.updateProfileError, user.updateProfileLoading])

    const onSubmit = () => {
        if (name == "") {
            Alert.alert("Please enter name")
        } else if (!ValidateEmail(email)) {
            Alert.alert("Please enter valid email address.")
        } else {
            let obj = {
                name,
                email
            }
            setIsUpdatePress(true);
            dispatch(updateUserDetailsFromEditScreen(obj));
        }
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <CustomHeader
                title="Edit Profile"
                imageUrl={require("../../Assets/Images/drawer.png")}
                action={() => {
                    props.navigation.toggleDrawer();
                }}
            />
            <Modal
                backdropColor={"black"}
                backdropOpacity={.8}

                swipeDirection='right'
                avoidKeyboard={false}
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                onBackButtonPress={() => setShowModal(false)}
            >
                <View style={styles.modalView}>
                    <View style={{ marginTop: 25 }}>
                        <CustomButton title={'Camera'} action={() => onOpenCamera()} />
                        <View style={{ height: 20 }} />
                        <CustomButton title={'Gallery'} action={() => onOpenPhoto()} />

                    </View>


                </View>

            </Modal>
            <View style={{ marginTop: 20, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: wp(6) }} />
                    <View>
                        <TouchableOpacity style={{ width: wp(30), height: wp(30), alignSelf: "center", overflow: "hidden" }}
                            onPress={() => setShowModal(true)}
                        >
                            <View style={{ width: wp(6), height: wp(6), position: "absolute", zIndex: 2, backgroundColor: "rgba(255,255,255,0.8)", right: wp(1.5), top: wp(2), justifyContent: "center", alignItems: "center", borderRadius: wp(6) }}>
                                <Image
                                    style={{ width: wp(3), height: wp(3), zIndex: 3 }}
                                    source={require('../../Assets/Images/editblue.png')}
                                />
                            </View>
                            <Image
                                source={{ uri: userDetails && userDetails.imageUrl ? IMG_URL + userDetails.imageUrl : IMG_URL + "noimage.png" }}
                                style={{ width: wp(30), height: wp(30), borderRadius: wp(30), borderWidth: 3, borderColor: "#46ADF0" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: wp(6) }} />
                    <View style={{ padding: wp(4) }}>
                        <CustomTextInput1
                            placeholder="Full Name"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                        />
                        <CustomTextInput1
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <View style={{ width: wp(90), marginBottom: 20 }}>
                        <CustomButton
                            title={"Update"}
                            action={() => onSubmit()}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    mainView: {

    }
})
