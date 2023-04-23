import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, Image, Alert } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CustomHeader from '../../../../Components/CustomHeader/index';
import Fonts from '../../../../Constants/Fonts';
import CustomButton from '../../../../Components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PraticeExplanation from './PraticeExplaination';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCurrectScreenIndex,
  updateRemainingTime,
  setExamNumber,
  continueAutoSelect,
  updateResultTime,
  updateResultDetails,
  updateAnswerForResult,
  updateAnswerForResultFinal,
  resetNavigationExam,
  setShowContinueModal,
  submitTimeoutNarrative,
  getCurrentQuestionsAndAnswers,
} from '../../../../redux';

const Stack = createStackNavigator();

const QuestionsComponent = (props) => {
  const dispatch = useDispatch();
  const currentData = useSelector(state => state.narrative.currentQuestionsAndAnswers);
  // const reduxData = useSelector(state => state.narrative);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const currentQuestion = currentData[currentQuestionIndex];
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
  
  console.log('Current Data', currentData);

  useEffect(() => {
    const correctIndex = currentQuestion.answers.findIndex(
      (answer) => answer.isCorrect
    );
    setCorrectAnswerIndex(correctIndex);
  }, [currentQuestion]);

  const navigation = useNavigation();

const handleEndOfQuestions = () => {
  if (currentData.practicepapermode === 'exam') {
    navigation.navigate('FinalReviewResult');
  } else {
    navigation.navigate('ViewPerformance');
  }
};


  const onSubmit = () => {
    if (selectedIndex >= 0) {
      // Submit your answer or save it somewhere
  
      // Check if it's the last question
      if (currentQuestionIndex + 1 < currentData.length) {
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
  
        // Reset the selectedIndex for the next question
        setSelectedIndex(-1);
      } else {
        // Handle the end of the question list, e.g., navigate to another screen or show a summary
        handleEndOfQuestions();
      }
    } else {
      Alert.alert('Please select your answer first.');
    }
  };
  
  // Add other functions and hooks from the old component as needed
  let navigateto = '';
  let buttonText = 'Next';
  if (currentQuestionIndex + 1 != currentData.length) {
    navigateto = currentQuestionIndex + 1;
    buttonText = 'Next';
  } else if (currentData.practicepapermode == 'exam') {
    navigateto = 'FinalReviewResult';
    buttonText = 'Submit';
  } else {
    navigateto = 'ViewPerformance';
    buttonText = 'Submit';
  }

  const toLetters = (num) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[num] || '';
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, marginTop: 15, padding: 10 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.parentTxt}>
            Question {currentQuestionIndex + 1}/{currentData.length}{' '}
          </Text>
          <Text style={styles.childTxt}>{currentQuestion.question}</Text>
          {currentQuestion.answers.map((choice, index) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                key={index}
                disabled={selectedIndex >= 0}
                style={{
                  backgroundColor:
                    selectedIndex == index
                      ? index === correctAnswerIndex
                        ? '#BDFFBC'
                        : '#E1E1E1'
                      : 'white',
                  borderRadius: 5,
                  height: 47,
                  width: '95%',
                  marginTop: 10,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ marginLeft: 20 }}>
                  {toLetters(index)}. {choice.answer}
                </Text>
              </TouchableOpacity>


            );
          })}
          <View style={{ height: 20 }} />

        </ScrollView>
        {selectedIndex >= 0 && currentData.practicepapermode != 'exam' && (
          <PraticeExplanation
            explainText={
              currentQuestion.answers[selectedIndex].explanation
                ? currentQuestion.answers[selectedIndex].explanation
                : ''
            }
            correctOption={toLetters(correctAnswerIndex)}
            tidbit={currentQuestion.tidbit ? currentQuestion.tidbit : 'N/A'}
          />
        )}

      </View>

      <CustomButton
        title={buttonText} // Add buttonText logic from the old component
        action={() => {
          onSubmit();
        }}
        isLoading={loading}
      />
    </View>
  );
};


const NavigationContainerQuestions = () => {
  const currentData = useSelector(state => state.narrative.currentQuestionsAndAnswers);
  console.log("currentData", currentData)
};

const PresentingPraticeProblem = props => {
  console.log("IN OTHER SCREEEEEENZZZ")

  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.narrative);
  const remainingTime = useSelector(state => state.narrative.examTimeRemaining);
  const isTimer = useSelector(state => state.narrative.navigateStateExam);
  const [choosenAnswer, setChoosenAnswer] = useState('');
  // const [isTimer, setIsTimer] = useState(true);
  const [time, setTime] = useState(remainingTime);
  const [showScroll, setShowScrool] = useState(false);

  const clockify = () => {
    let hours = Math.floor(time / 60 / 60);
    let mins = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  // const startTimer = () => {
  //   BackgroundTimer.runBackgroundTimer(() => {
  //     // console.log("Narrative" + remainingTime + " " + parseInt(Math.random() * 1000));
  //     setTime(time => {
  //       if (time > 0) {
  //         return time - 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // };
  // useEffect(() => {
  //   if (time === 0) {
  //     BackgroundTimer.stopBackgroundTimer();
  //   } else {
  //     if (time / 10) {
  //       let num = time / 10;
  //       if (!String(num).includes('.')) {
  //         dispatch(updateResultTime(reduxData.resultDetails._id, time));
  //       }
  //     }
  //   }
  // }, [time]);

  // useEffect(() => {
  //   dispatch(resetNavigationExam(true));
  // }, [false]);
  // useEffect(() => {
  //   if (isTimer) startTimer();
  //   else BackgroundTimer.stopBackgroundTimer();
  //   return () => {
  //     BackgroundTimer.stopBackgroundTimer();
  //   };
  // }, [isTimer]);


  return (
    <View style={styles.mainView}>
      {reduxData.showContinueModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999999,
            justifyContent: 'center',
            padding: 10,
          }}>
          <View
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 15 }}>
            <Text
              style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
              Timeout!
            </Text>
            <View style={{ height: 10 }} />
            <Text style={{ textAlign: 'center' }}>Do you wish to continue ?</Text>
            <View style={{ height: 10 }} />
            {/* <CustomButton
              title={'Continue'}
              action={() => {
                console.log('WORK');
                dispatch(setShowContinueModal(false));
                dispatch(submitTimeoutNarrative('continue'));
              }}
              isLoading={false}
            />
            <View style={{height: 10}} />
            <CustomButton
              title={'Finish'}
              action={() => {
                dispatch(setShowContinueModal(false));
                dispatch(submitTimeoutNarrative('yes'));
              }}
              isLoading={false}
            /> */}
          </View>
        </View>
      )}
      <View style={{ height: 20 }}></View>
      <View style={{ flex: 0.1 }}>
        <CustomHeader
          title={
            reduxData.updateNarrativeExam.length > 0
              ? reduxData.updateNarrativeExam[reduxData.examNumber].name
              : ''
          }
          imageUrl={require('../../../../Assets/Images/drawer.png')}
          action={() => {
            props.navigation.toggleDrawer();
          }}
          cardView={true}
          card={() => {
            props.navigation.navigate('NarrativeBackgroundReturn');
          }}
        />
      </View>

      {/* TIMER SECTION  */}
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: reduxData.practicepapermode == 'exam' ? 10 : 0,
            }}>
            <View style={{ flex: 1, justifyContent: 'center' }}></View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.AvenirNextLTPro_Regular,
                  fontSize: 12,
                  lineHeight: 14,
                  color: '#3B3B3B',
                }}>
                {clockify().displayMins + ':' + clockify().displaySecs}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.AvenirNextLTPro_Demi,
                    fontSize: 12,
                    lineHeight: 14,
                    color: '#3B3B3B',
                  }}>
                  Timer
                </Text>
                {reduxData.practicepapermode != 'exam' && (
                  <Switch
                    trackColor={{ false: '#717171', true: '#41c67f' }}
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                    onValueChange={() =>
                      dispatch(resetNavigationExam(!isTimer))
                    }
                    value={isTimer}
                  />
                )}
              </View>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: '#DFDFDF', height: 5 }}>
              <View
                style={{
                  backgroundColor: isTimer ? '#41C67F' : '#FEC687',
                  flex: 1,
                  width: 100 - (time / reduxData.examTime) * 100 + '%',
                  height: 5,
                }}></View>
            </View>
          </View>
        </View>

        {/* NEW NAVIGATION */}
        <QuestionsComponent />

      </View>
    </View>
  );
};
export default PresentingPraticeProblem;

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  parentTxt: {
    lineHeight: 16,
    fontSize: 14,
    marginVertical: 20,
    fontFamily: Fonts.AvenirNextLTPro_BoldCn,
  },
  childTxt: {
    lineHeight: 16,
    fontSize: 14,
    marginBottom: 20,
    fontFamily: Fonts.AvenirNextLTPro_Regular,
  },
};
