import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import {StackActions} from '@react-navigation/native';
import {useRoute, useNavigation, CommonActions} from '@react-navigation/native';
import CustomHeader from '../../../../Components/CustomHeader/index';
import CustomButton from '../../../../Components/CustomButton/index';
import CustomButton1 from '../../../../Components/CustomButton';
import Fonts from '../../../../Constants/Fonts';
import {get} from '../../../../Api/get';
import {
  updateResultCreateData,
  setExamNumber,
  updateCurrectScreenIndex,
  updateResultDetails,
} from '../../../../redux';
import {Container, Header, Content, Icon, Accordion} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
const FinalReviewResult = props => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState(null);
  const [printableData, setPrintableData] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState('');
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [fullPageLoading, setFullpageLoading] = useState(true);
  const examId = props.route.params.examId;
  var special = [
    'Zeroth',
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Renth',
    'Eleventh',
    'Twelfth',
    'Thirteenth',
    'Fourteenth',
    'Fifteenth',
    'Sixteenth',
    'Seventeenth',
    'Eighteenth',
    'Nineteenth',
  ];
  const reduxData = useSelector(state => state.narrative);
  const resetNavigation = () => {
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
  };

  const calculateData = exam => {
    let arr = [];
    let answers = exam.answer;
    let fullexam = exam.fullexam.questions;
    for (let j in fullexam) {
      let answerKey = -1;
      for (let k in fullexam[j].options) {
        if (fullexam[j].options[k].isTrue) {
          answerKey = k;
        }
      }
      let exist = false;
      for (let i in answers) {
        if (answers[i].questionID == fullexam[j]._id) {
          exist = true;

          fullexam[j].rightAnswer = answerKey;
          fullexam[j].userAnswered = answers[i].answerKey;
          arr.push(fullexam[j]);
        }
      }
      if (!exist) {
        fullexam[j].rightAnswer = answerKey;
        fullexam[j].userAnswered = -1;
        arr.push(fullexam[j]);
      }
    }
    console.log(arr[0]);
    setPrintableData(arr);
    return arr;
  };
  const getExamData = () => {
    console.log('here');
    setLoading(true);
    get('narrativeresult/' + examId)
      .then(result => {
        if (result.success) {
          setExamData(result.data);
          calculateData(result.data);
          setSelectedResultId(result.data._id);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const getAllExamsData = () => {
    get('narrativeresult/resultuuid/' + reduxData.UUID)
      // get("narrativeresult/resultuuid/" + "42718a1f-c711-4acc-b116-0eb9a68f2f2a")
      .then(result => {
        console.log('Exam Data', result.data);
        setAllResults(result.data);
        let arrNew = [];

        for (let i in result.data) {
          let data = calculateData(result.data[i]);
          let obj = {
            titleKey: parseInt(i) + 1,
            data,
          };
          arrNew.push(obj);
        }
        console.log(arrNew);
        setAllData(arrNew);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(updateCurrectScreenIndex(0));
    dispatch(updateResultDetails());
  }, []);
  // useEffect(() => {
  //     dispatch(updateCurrectScreenIndex(0))
  // }, [false])
  useEffect(() => {
    resetNavigation();
    if (reduxData.totalExams == reduxData.examNumber) {
      dispatch(updateResultDetails());
      setFullpageLoading(false);
      getExamData();
      dispatch(updateCurrectScreenIndex(0));
      if (reduxData.narrativeTab == 'exam') {
        getAllExamsData();
      }
    } else {
      onSubmit();
    }
  }, [false]);
  const onSubmit = () => {
    // reduxData
    setButtonLoading(true);
    if (reduxData.totalExams == reduxData.examNumber) {
      if (reduxData.narrativeTab == 'exam') {
        // ViewPerformanceExam
        props.navigation.navigate('ViewPerformanceExam', {examId});
      } else {
        props.navigation.navigate('ViewPerformance', {examId});
      }

      setButtonLoading(false);
    } else {
      dispatch(updateResultCreateData(null));
      let number = parseInt(reduxData.examNumber) + 1;
      dispatch(setExamNumber(number));
      setTimeout(() => {
        setButtonLoading(false);
        props.navigation.navigate('NarrativeBackground');
        setFullpageLoading(false);
      }, 2000);
    }
  };
  const renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 40}} key={item.index}>
        <View style={{paddingBottom: 20}}>
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Bold,
              fontSize: DeviceInfo.isTablet() ? 18 : 14,
              lineHeight: DeviceInfo.isTablet() ? 20 : 16,
            }}>
            Question {parseInt(item.index) + 1}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#D8D8D8',
              width: wp(6),
              marginVertical: 6,
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              fontSize: DeviceInfo.isTablet() ? 16 : 12,
              color: '#3F3F3F',
            }}>
            {item.question}
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Regular,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#111111',
                }}>
                Your Answer
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Regular,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#111111',
                }}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Bold,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#FEC687',
                  textAlign: 'right',
                }}>
                {item.userAnswered == -1
                  ? 'Not Answered'
                  : item.options[item.userAnswered].text}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Regular,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#111111',
                }}>
                Correct Answer
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Regular,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#111111',
                }}>
                :
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: Fonts.AvenirNextLTPro_Bold,
                  fontSize: DeviceInfo.isTablet() ? 16 : 12,
                  color: '#41C67F',
                  textAlign: 'right',
                }}>
                {item.options[item.rightAnswer].text}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Bold,
              fontSize: DeviceInfo.isTablet() ? 18 : 14,
              lineHeight: 16,
            }}>
            Explanation
          </Text>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Fonts.AvenirNextLTPro_Regular,
                fontSize: DeviceInfo.isTablet() ? 15 : 11,
                color: '#000000',
              }}>
              {item.userAnswered == -1
                ? 'Not Answered'
                : item.options[item.userAnswered].explanation}
            </Text>
          </View>
        </View>
        <View style={{height: 15}} />
        <View>
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Bold,
              fontSize: DeviceInfo.isTablet() ? 18 : 14,
              lineHeight: 16,
            }}>
            Tidbit
          </Text>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Fonts.AvenirNextLTPro_Regular,
                fontSize: DeviceInfo.isTablet() ? 15 : 11,
                color: '#000000',
              }}>
              {item.userAnswered == -1 ? 'Not Answered' : item.tidbit}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const _renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
            <Text
              style={{
                fontSize: DeviceInfo.isTablet() ? 20 : 16,
                fontFamily: Fonts.AvenirNextLTPro_Bold,
              }}>
              {'View Result for ' + special[item.titleKey] + ' Narrative'}
            </Text>
          </View>
          <View style={{padding: 18}}>
            <Image
              style={{width: 16, height: 16}}
              source={
                expanded
                  ? require('../../../../Assets/Images/minus.png')
                  : require('../../../../Assets/Images/add.png')
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const _renderContent = item => {
    return (
      <View style={{padding: 15}}>
        <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.index = index)}
          contentContainerStyle={{padding: 10, marginTop: 20}}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {fullPageLoading && (
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 8,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <ActivityIndicator color="white" size="large" />
          </View>
        </View>
      )}
      <View style={{height: 20}}></View>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      <CustomHeader
        title="REVIEW RESULT"
        imageUrl={require('../../../../Assets/Images/drawer.png')}
        action={() => {
          props.navigation.toggleDrawer();
        }}
      />

      <View style={{flex: 1}}>
        {reduxData.totalExams == reduxData.examNumber &&
        reduxData.totalExams > 0 ? (
          <View style={{padding: 15}}>
            <Accordion
              dataArray={allData}
              animation={true}
              renderHeader={_renderHeader}
              expanded={[]}
              renderContent={_renderContent}
            />
          </View>
        ) : (
          <>
            <FlatList
              data={printableData}
              renderItem={renderItem}
              keyExtractor={(item, index) => (item.index = index)}
              contentContainerStyle={{padding: 10, marginTop: 20}}
            />

            {reduxData.totalExams == reduxData.examNumber &&
              reduxData.totalExams > 0 && (
                <View style={{padding: 20}}>
                  {allResults.map((data, key) => {
                    let num = key + 1;
                    if (selectedResultId != data._id) {
                      return (
                        <CustomButton1
                          key={key}
                          title={
                            'View Result for ' + special[num] + ' Narrative'
                          }
                          action={() => {
                            calculateData(data);
                            setSelectedResultId(data._id);
                          }}
                        />
                      );
                    }
                  })}
                </View>
              )}
          </>
        )}
      </View>
      <CustomButton1
        title={
          reduxData.totalExams == reduxData.examNumber
            ? 'View Performance'
            : 'Start Next Narrative'
        }
        action={() => {
          onSubmit();
        }}
        isLoading={buttonLoading}
      />
    </View>
  );
};
export default FinalReviewResult;

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  Screen: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  forward: {
    width: 15,
    height: 13,
    marginRight: 20,
  },
  gradient: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    marginLeft: 35,
    fontFamily: Fonts.AvenirNextLTPro_Demi,
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
