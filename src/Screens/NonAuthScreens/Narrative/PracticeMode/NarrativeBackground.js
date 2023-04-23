import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation, CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../../../Constants/Colors/index';
import CustomHeader from '../../../../Components/CustomHeader/index';
import Fonts from '../../../../Constants/Fonts/index';
import CustomButton from '../../../../Components/CustomButton';

import {createNarrativeResult, updateResultCreateData} from '../../../../redux';

const NarrativeBackground = props => {
  const dispatch = useDispatch();
  const route = useRoute();
  const routeName = route.name;
  const getIndex = useSelector(state => state.narrative.currentquestion);
  const examset = useSelector(state => state.narrative.updateNarrativeExam);
  // console.log('Exam Set', examset);
  const narrative = useSelector(state => state.narrative);

  const resultDetails = useSelector(state => state.narrative.resultDetails);
  
  const [isLoad, setIsLoad] = useState(false);
  const show = false;
  const screenName = 'props.route.params.screenName';
  const camelToTextConverter = text => {
    var result = text.replace(/([A-Z])/g, ' $1');
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const resetNavigation = () => {
    props.navigation.dispatch(state => {
      console.log(state);
      const routes = state.routes.filter(r => r.name !== 'FinalReviewResult');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };
  useEffect(() => {
    resetNavigation();
  }, []);

  useEffect(() => {
    if (routeName != 'NarrativeBackgroundReturn') {
      console.log('ROUTE NAME', routeName);
      // console.log('RD', resultDetails);
      if (resultDetails != null && !isLoad) {
        console.log('Result Details', resultDetails);
        props.navigation.navigate('PresentingPraticeProblem');
        // setIsLoad(true);
        console.log("GOING TO NEXT SCREEN")
      }
    }
  }, [resultDetails]);
  
  const moveToNextScreen = () => {
    // console.log("MOVE NEXT BUTTON: ", examset)
    const examDetails = narrative.updateNarrativeExam[narrative.examNumber];
    console.log("EXAM DETAILS: ", examDetails)
    const narrativeSectionId = examDetails.narrativeID;
    const narrativeSetId = examDetails.narrativeSetID;
    const narrativeId = examDetails.narrativeID;
    const totalTime = 100;
    const remainingTime = 100;
    const questionKey = 0;
    const uuid = narrative.UUID;
    const narrativeTab = narrative.narrativeTab;
    const practicepapermode = narrative.practicepapermode;
    const examNumber = narrative.examNumber;
    let obj = {
      narrativeSectionId,
      narrativeSetId,
      narrativeId,
      totalTime,
      remainingTime,
      questionKey,
      uuid,
      narrativeTab,
      practicepapermode,
      examNumber,
    };


    // console.log("OBJ: ", obj)

    dispatch(createNarrativeResult(obj));
    // console.log(narrative.updateNarrativeExam);
  };

  const nonAllowedFields = [
    '_id',
    'questions',
    'name',
    '__v',
    'updateBy',
    'createsAt',
    'narrativeSetId',
    'narrativeSectionId',
    'active',
    'totalTime',
  ];
  
  return (
    <View style={styles.mainView}>
      {narrative.resultLoading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      <View style={{flex: 0.1}}>
        <CustomHeader
          title="NARRATIVE BACKGROUND"
          imageUrl={require('../../../../Assets/Images/drawer.png')}
          action={() => {
            props.navigation.toggleDrawer();
          }}
          cardView={false}
          card={() => {}}
        />
      </View>
      <View style={{flex: 0.9, padding: 15}}>
        <ScrollView
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {examset && examset[narrative.examNumber] && (
            <>
              {Object.keys(examset[narrative.examNumber]).map((key, index) => {
                if (!nonAllowedFields.includes(key)) {
                  if (examset[narrative.examNumber][key]) {
                    return (
                      <Text key={index}>
                        <Text style={styles.parentTxt}>
                          {camelToTextConverter(key)} :{' '}
                        </Text>
                        <Text style={styles.childTxt}>
                          {examset[narrative.examNumber][key]}
                        </Text>
                      </Text>
                    );
                  }
                }
              })}
            </>
          )}
        </ScrollView>
      </View>
      {routeName == 'NarrativeBackgroundReturn' ? (
        <CustomButton
          title="Return"
          action={() => {
            props.navigation.goBack();
          }}
        />
      ) : (
        <CustomButton
          title="Next"
          action={() => {
            moveToNextScreen();
          }}
        />
      )}
    </View>
  );
};
export default NarrativeBackground;

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  section: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: Fonts.AvenirNextLTPro_BoldCn,
  },
  parentTxt: {
    lineHeight: 30,
    fontSize: 14,
    marginVertical: 20,
    fontFamily: Fonts.AvenirNextLTPro_Demi,
  },
  childTxt: {
    lineHeight: 16,
    fontSize: 14,
    marginVertical: 20,
    fontFamily: Fonts.AvenirNextLTPro_Regular,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: Fonts.AvenirNextLTPro_Demi,
  },
  gradient: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
