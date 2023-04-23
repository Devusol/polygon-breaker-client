import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomHeader from '../../../../Components/CustomHeader';
import Colors from '../../../../Constants/Colors';
import Fonts from '../../../../Constants/Fonts/index';
import RNIap from 'react-native-iap';
import {PRACTICE_SET, EXAM_SET} from '../constants';
import {
  updateSelectedPracticeCategory,
  updateLoadingStateAll,
  updateCurrectScreenIndex,
  fetchSubCategoryPractice,
  resetAllExam,
  updateNarrativeTab,
  updatePracticeSubCategory,
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

const PracticeSets = props => {
  // we are actually not passing down props for data, we are using a useSelector hook to get data anywhere in the app...
  const dispatch = useDispatch();
  const practiceData = useSelector(
    state => state.narrative.practiceCategoryies,
  );

  console.log('DATA FROM USESELCTORRR:   ', practiceData)

  const paymentIds = useSelector(state => state.user.paymentIds);
  const {practice} = useSelector(state => state.common);
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
      dispatch(updateCurrectScreenIndex(0));
      dispatch(updateNarrativeTab('practice'));
      dispatch(resetAllExam());
      dispatch(updatePracticeSubCategory([]));
    }, [false]),
  );

  const moveToNextPage = item => {
    console.log('item: ', item)
    dispatch(fetchSubCategoryPractice(item.contentID));
    dispatch(updateSelectedPracticeCategory(item));
    props.navigation.navigate('PracticeSubCategory');
  };

  const renderItem = ({item}) => {
    console.log('item: ', item)
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
            console.log('item PRESSED');
            if (!item.isFree && !paymentIds.includes(item._id)) {
              purchase(item._id);
            } else {
              moveToNextPage(item);
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
          {!item.isFree && !paymentIds.includes(item._id) && (
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
      <CustomHeader
        title={practice}
        imageUrl={require('../../../../Assets/Images/drawer.png')}
        action={() => {
          props.navigation.toggleDrawer();
        }}
      />

      {/* NAVIGATION BUTTONS  */}
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
export default PracticeSets;
