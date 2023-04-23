import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Constants/Colors/index';
import Fonts from '../../Constants/Fonts/index';
import DeviceInfo from 'react-native-device-info';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFCActions, removeLastPageFlipCard} from '../../redux';
import {post} from '../../Api/post';
import {deleteApi} from '../../Api/delete';

const CustomHeader = props => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.flashCard);
  const questionKey = reduxData.activeCard;

  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const flagCard = () => {
    let obj = {
      flipCardId: reduxData.flipCards[questionKey]._id,
      action: 'Flag',
      categoryId: reduxData.flipCards[questionKey].category,
    };
    setLoading(true);
    post('flipcards/action', obj)
      .then(result => {
        if (result.success) {
          dispatch(fetchFCActions());
          let tabname = reduxData.cardsTypes[reduxData.selectedCardIndex].value;
          if (tabname == 'flagged') {
            dispatch(removeLastPageFlipCard(true));
            let navigateto = '';
            if (parseInt(questionKey) + 1 != reduxData.flipCards.length) {
              navigateto = 'QuestionsComponent_' + (parseInt(questionKey) + 1);
            } else {
              navigateto = 'HomeScreen';
            }
            props.navigation.navigate(navigateto);
          }
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const deleteAllData = () => {
    deleteApi('flipcards/actions/all')
      .then(() => {
        dispatch(fetchFCActions());
        // props.actionDelete
        props.navigation.navigate('FlipCardScreen');
      })
      .catch(error => {
        console.log(error);
      });
    //
  };

  const deleteConfirm = () =>
    Alert.alert(
      'Alert',
      'Do you want to remove all the flagged flash cards? ',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => deleteAllData()},
      ],
    );

  return (
    <View style={{marginTop: wp(2)}}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.screen}>
          <TouchableOpacity
            onPress={props.action}
            style={{
              paddingVertical: wp(2),
              paddingHorizontal: wp(5),
              borderTopRightRadius: 70,
              borderBottomRightRadius: 70,
              backgroundColor: Colors.drawerBlue,
            }}>
            <Image style={styles.icon} source={props.imageUrl} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          {props.cardView ? (
            <TouchableOpacity onPress={props.card}>
              <Image
                style={{
                  width: 40,
                  height: 23,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../Assets/Images/headercard.jpg')}
              />
            </TouchableOpacity>
          ) : null}
          {reduxData.flipCards.length > 0 &&
            props.flipheader &&
            questionKey != -1 && (
              <>
                {loading ? (
                  <View style={{paddingRight: 10}}>
                    <ActivityIndicator color="black" />
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    {console.log(reduxData.deletedIds)}
                    {console.log(reduxData.flipCards)}
                    {console.log(questionKey)}
                    {!reduxData.deletedIds.includes(
                      reduxData.flipCards[questionKey]._id,
                    ) && (
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                          borderColor: '#00000024',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}
                        onPress={() => {
                          flagCard();
                        }}>
                        <Image
                          style={{width: 14, height: 17}}
                          source={
                            reduxData.flagIds.includes(
                              reduxData.flipCards[questionKey]._id,
                            )
                              ? require('../../Assets/Images/flag.png')
                              : require('../../Assets/Images/flagInactive.png')
                          }
                        />
                      </TouchableOpacity>
                    )}
                    {reduxData.selectedCardIndex == 1 && (
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                          borderColor: '#00000024',
                          borderWidth: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}
                        onPress={() => deleteConfirm()}>
                        <Image
                          style={{width: 14, height: 17}}
                          source={require('../../Assets/Images/delete.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </>
            )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    height: wp(4),
    width: wp(4),
    resizeMode: 'contain',
  },
  title: {
    color: Colors.darkBlack,
    textAlign: 'center',
    fontSize: wp(DeviceInfo.isTablet() ? 3 : 3.5),
    // lineHeight: DeviceInfo.isTablet() ? 40 : 16,
    fontFamily: Fonts.AvenirNextLTPro_Demi,
    textTransform: 'uppercase',
  },
});

export default CustomHeader;
