import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Colors from '../../Constants/Colors';
import CustomHeader from '../../Components/CustomHeader';
import {useRoute, useNavigation, CommonActions} from '@react-navigation/native';

import Fonts from '../../Constants/Fonts';
import {Container, Content} from 'native-base';
import CustomButton from '../../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {updateResultCreateData, resetAllExam} from '../../redux';

import {get} from '../../Api/get';
const ViewPerformance = props => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState(null);
  const examResult = useSelector(state => state.narrative.resultDetails);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [percentageAll, setPercentageAll] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showheaders, setShowheaders] = useState(true);
  // const pushAction = StackActions.replace('NarrativeBackground', { user: 'Wojtek' });
  const examId = props.examid ? props.examid : props.route.params.examId;

  useEffect(() => {
    if (props.examid) {
      setShowheaders(false);
    }
  }, [false]);
  const resetNavigation = () => {
    if (!props.examid) {
      props.navigation.dispatch(state => {
        console.log(state);
        const routes = state.routes.filter(
          r =>
            r.name !== 'PresentingPraticeProblem' &&
            r.name !== 'NarrativeBackground' &&
            r.name !== 'PracticeSubCategory',
        );
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }
  };
  const calculateData = exam => {
    let totalRight = 0;
    let totalWrong = 0;
    let answers = exam.answer;
    let fullexam = exam.fullexam.questions;

    //Categories

    let professional = {total: 0, right: 0, wrong: 0};
    let intake = {total: 0, right: 0, wrong: 0};
    let treatment = {total: 0, right: 0, wrong: 0};
    let counseling = {total: 0, right: 0, wrong: 0};
    let core = {total: 0, right: 0, wrong: 0};

    //Categories
    for (let j in fullexam) {
      let exist = false;
      for (let i in answers) {
        if (answers[i].questionID == fullexam[j]._id) {
          exist = true;
          let answerKey = -1;
          for (let k in fullexam[j].options) {
            if (fullexam[j].options[k].isTrue) {
              answerKey = k;
            }
          }
          if (fullexam[j].category == 'Professional Practice & Ethics') {
            if (answerKey == answers[i].answerKey) {
              professional.right++;
            } else {
              professional.wrong++;
            }
          } else if (fullexam[j].category == 'Intake, Assessment, Diagnosis') {
            if (answerKey == answers[i].answerKey) {
              intake.right++;
            } else {
              intake.wrong++;
            }
          } else if (fullexam[j].category == 'Treatment Planning') {
            if (answerKey == answers[i].answerKey) {
              treatment.right++;
            } else {
              treatment.wrong++;
            }
          } else if (
            fullexam[j].category == 'Counseling Skills, Interventions'
          ) {
            if (answerKey == answers[i].answerKey) {
              counseling.right++;
            } else {
              counseling.wrong++;
            }
          } else if (fullexam[j].category == 'Core Counseling Attributes') {
            if (answerKey == answers[i].answerKey) {
              core.right++;
            } else {
              core.wrong++;
            }
          }
          if (answerKey == answers[i].answerKey) {
            totalRight++;
          } else {
            totalWrong++;
          }
          // console.log(fullexam[j].options)
        }
      }
      if (!exist) {
        if (fullexam[j].category == 'Professional Practice & Ethics') {
          professional.wrong++;
        } else if (fullexam[j].category == 'Intake, Assessment, Diagnosis') {
          intake.wrong++;
        } else if (fullexam[j].category == 'Treatment Planning') {
          treatment.wrong++;
        } else if (fullexam[j].category == 'Counseling Skills, Interventions') {
          counseling.wrong++;
        } else if (fullexam[j].category == 'Core Counseling Attributes') {
          core.wrong++;
        }
        totalWrong++;
      }
    }

    let arr = [
      {
        text: 'Professional Practice & Ethics',
        totalRight: professional.right,
        totalWrong: professional.wrong,
        total: professional.right + professional.wrong,
        percentage:
          professional.right + professional.wrong == 0
            ? '0'
            : (professional.right / (professional.right + professional.wrong)) *
              100,
        color: '#E0A530',
      },
      {
        text: 'Intake, Assessment, Diagnosis',
        totalRight: intake.right,
        totalWrong: intake.wrong,
        total: intake.right + intake.wrong,
        percentage:
          intake.right + intake.wrong == 0
            ? '0'
            : (intake.right / (intake.right + intake.wrong)) * 100,
        color: '#2699FB',
      },
      {
        text: 'Treatment Planning',
        totalRight: treatment.right,
        totalWrong: treatment.wrong,
        total: treatment.right + treatment.wrong,
        percentage:
          treatment.right + treatment.wrong == 0
            ? '0'
            : (treatment.right / (treatment.right + treatment.wrong)) * 100,
        color: '#30E07B',
      },
      {
        text: 'Counseling Skills, Interventions',
        totalRight: counseling.right,
        totalWrong: counseling.wrong,
        total: counseling.right + counseling.wrong,
        percentage:
          counseling.right + counseling.wrong == 0
            ? '0'
            : (counseling.right / (counseling.right + counseling.wrong)) * 100,
        color: '#F73054',
      },
      {
        text: 'Core Counseling Attributes',
        totalRight: core.right,
        totalWrong: core.wrong,
        total: core.right + core.wrong,
        percentage:
          core.right + core.wrong == 0
            ? '0'
            : (core.right / (core.right + core.wrong)) * 100,
        color: '#F8EC2D',
      },
    ];
    // console.log(arr);
    setCategories(arr);
    let total = totalRight + totalWrong;
    setTotalQuestions(total);
    let percentage = (totalRight / total) * 100;
    setTotalPercentage(parseFloat(percentage).toFixed(1));

    // console.log("TOTAL RIGHT", totalRight)
    // console.log("TOTAL WRONG", totalWrong)
  };

  const getPercentageData = (setID, sectionID) => {
    get('narrativeresult/getposition/' + setID + '/' + sectionID + '/' + examId)
      .then(result => {
        if (result.success) {
          console.log(result.myRank);
          setPercentageAll(result.myRank);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getExamData = () => {
    console.log('here');
    if (props.examid) {
      setExamData(props.allExamData);
      calculateData(props.allExamData);
      getPercentageData(
        props.allExamData.narrativeSetId,
        props.allExamData.narrativeSectionId,
      );
    } else {
      get('narrativeresult/' + examId)
        .then(result => {
          if (result.success) {
            console.log('here1', result.data);
            setExamData(result.data);
            calculateData(result.data);
            getPercentageData(
              result.data.narrativeSetId,
              result.data.narrativeSectionId,
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getExamData();
    dispatch(updateResultCreateData(null));
    dispatch(resetAllExam());
  }, [false]);
  useEffect(() => {
    resetNavigation();
  }, [false]);
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      {/* HEADER SECTION  */}
      {showheaders && (
        <CustomHeader
          title="YOUR PERFORMANCE"
          imageUrl={require('../../Assets/Images/drawer.png')}
          action={() => {
            // props.navigation.dispatch(StackActions.popToTop())
            props.navigation.toggleDrawer();
          }}
        />
      )}

      {/* RANKING SECTION  */}

      <ScrollView style={{padding: 15}}>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Bold}}>
            Ranking
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingRight: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{
                    width: wp(25),
                    height: wp(25),
                    borderRadius: wp(14),
                    borderColor: '#3C9AEF',
                    borderWidth: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: Fonts.AvenirNextLTPro_Demi,
                        lineHeight: 30,
                      }}>
                      {totalPercentage}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: Fonts.AvenirNextLTPro_Demi,
                        lineHeight: 18,
                      }}>
                      pts.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontFamily: Fonts.AvenirNextLTPro_Regular,
                    textAlign: 'center',
                  }}>
                  Overall score of {totalQuestions} questions
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, paddingLeft: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{
                    width: wp(25),
                    height: wp(25),
                    borderRadius: wp(14),
                    borderColor: '#3C9AEF',
                    borderWidth: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: Fonts.AvenirNextLTPro_Demi,
                        lineHeight: 30,
                      }}>
                      {parseFloat(percentageAll).toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: Fonts.AvenirNextLTPro_Demi,
                        lineHeight: 18,
                      }}>
                      %
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontFamily: Fonts.AvenirNextLTPro_Regular,
                    textAlign: 'center',
                  }}>
                  Score comparison to other people.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 16, fontFamily: Fonts.AvenirNextLTPro_Bold}}>
            5 Subject Areas
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: '#DBDBDB',
            borderWidth: 1,
          }}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {categories.map((data, key) => {
              return (
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={key}>
                  <View
                    style={{
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AnimatedCircularProgress
                      size={120}
                      width={15}
                      fill={parseInt(data.percentage)}
                      tintColor={data.color}
                      onAnimationComplete={() =>
                        console.log('onAnimationComplete')
                      }
                      backgroundColor="#E8E8E8"
                      rotation={0}>
                      {fill => (
                        <Text
                          style={{
                            fontFamily: Fonts.AvenirNextLTPro_Demi,
                            fontSize: 16,
                          }}>
                          <Text style={{color: data.color}}>
                            {parseInt(data.percentage)}
                          </Text>
                          <Text style={{color: '#000000'}}>
                            /{data.total == 0 ? '0' : '100'}
                          </Text>
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                    <View style={{marginTop: 20}}>
                      <Text
                        style={{
                          fontFamily: Fonts.AvenirNextLTPro_Demi,
                          fontSize: 14,
                          textAlign: 'center',
                        }}>
                        {data.text}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default ViewPerformance;
