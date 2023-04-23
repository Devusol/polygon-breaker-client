import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import RNIap from 'react-native-iap';
import CustomHeader from '../../../../Components/CustomHeader';
import Colors from '../../../../Constants/Colors';
import Fonts from '../../../../Constants/Fonts/index';
import {PRACTICE_SET, EXAM_SET} from '../constants';

import {
  updatePracticeMode,
  fetchNarrativeExamFromSetId,
  updateNarrativeTab,
  resetAllExam,
  updateUUIDRedux,
  updateLoadingStateAll,
} from '../../../../redux';

const HeaderButton = props => {
  let page = props.page;

  const {practice, exam} = useSelector(state => state.common);
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: wp(2.5)}}>
      <View style={{flex: 1, paddingHorizontal: wp(5)}}>
        <TouchableOpacity
          style={{
            backgroundColor:
              page == 'PracticeSets' ? Colors.darkBlue : Colors.white,
            padding: DeviceInfo.isTablet() ? 15 : 10,
            borderRadius: 50,
            borderColor: '#BFBFBF',
            borderWidth: page == 'PracticeSets' ? 0 : 1,
          }}
          onPress={() => props.navigation.navigate('PracticeSets')}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              fontSize: DeviceInfo.isTablet() ? 18 : 14,
              color: page == 'PracticeSets' ? Colors.white : Colors.darkBlack,
            }}>
            {practice}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: wp(5)}}>
        <TouchableOpacity
          style={{
            backgroundColor:
              page == 'ExamSets' ? Colors.darkBlue : Colors.white,
            padding: DeviceInfo.isTablet() ? 15 : 10,
            borderRadius: 50,
            borderColor: '#BFBFBF',
            borderWidth: page == 'ExamSets' ? 0 : 1,
          }}
          onPress={() => props.navigation.navigate('ExamSets')}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              fontSize: DeviceInfo.isTablet() ? 18 : 14,
              color: page == 'ExamSets' ? Colors.white : Colors.darkBlack,
            }}>
            {exam}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExamSets = props => {
  const dispatch = useDispatch();
  const practiceData = useSelector(state => state.narrative.examCategoryies);
  const narrative = useSelector(state => state.narrative);
  const paymentIds = useSelector(state => state.user.paymentIds);
  const {exam} = useSelector(state => state.common);
  const purchase = async id => {
    try {
      dispatch(updateLoadingStateAll(true));
      await AsyncStorage.setItem('examID', id);
      await RNIap.requestPurchase('001', false);
    } catch (err) {
      dispatch(updateLoadingStateAll(false));
      console.warn(err.code, err.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(updatePracticeMode('exam'));
      dispatch(updateNarrativeTab('exam'));
      dispatch(updateUUIDRedux(uuid.v4()));
      dispatch(resetAllExam());
    }, [false]),
  );

  useEffect(() => {
    if (narrative.updateNarrativeExam.length > 0) {
      props.navigation.navigate('NarrativeBackground');
    } else if (narrative.updateNarrativeError != '') {
      alert(narrative.updateNarrativeError);
    }
  }, [narrative.updateNarrativeExam, narrative.updateNarrativeError]);

  const getNarrativeData = ({contentID}) => {
    console.log("GET NARRATIVE DATA", contentID)
    dispatch(fetchNarrativeExamFromSetId(contentID));
    // props.navigation.navigate("NarrativeBackground")
  };

  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: wp(90),
            height: 62,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#DCDCDC',
            justifyContent: 'center',
            marginTop: 10,
          }}
          key={item.index}
          onPress={() => {
            console.log("PRESSED EXAM!!!")
            if (item.isPaid && !paymentIds.includes(item._id)) {
              purchase(item._id);
            } else {
              getNarrativeData(item);
            }
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontFamily: Fonts.AvenirNextLTPro_Demi,
            }}>
            {item.name}
          </Text>
          {item.isPaid && !paymentIds.includes(item._id) && (
            <Image
              style={{
                height: 22,
                width: 17,
                resizeMode: 'contain',
                position: 'absolute',
                right: 20,
              }}
              source={require('../../../../../assets/Images/lock.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {narrative.updateNarrativeLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            zIndex: 9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      <CustomHeader
        title={exam}
        imageUrl={require('../../../../Assets/Images/drawer.png')}
        action={() => {
          props.navigation.toggleDrawer();
        }}
      />

      <View style={{height: wp(2)}} />
      <View style={{flex: 1}}>
        <HeaderButton page={props.route.name} {...props} />
        <View style={{height: wp(2)}} />
        <FlatList
          data={practiceData}
          renderItem={renderItem}
          keyExtractor={(item, index) => (index = index)}
        />
      </View>
    </View>
  );
};
export default ExamSets;
