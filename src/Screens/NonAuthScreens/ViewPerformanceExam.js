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
import CustomHeader from '../../Components/CustomHeader/index';
import CustomButton from '../../Components/CustomButton/index';
import CustomButton1 from '../../Components/CustomButton';
import Fonts from '../../Constants/Fonts';
import ViewPerformance from './ViewPerformance';
import {get} from '../../Api/get';

import {
  updateResultCreateData,
  setExamNumber,
  updateCurrectScreenIndex,
  updateResultDetails,
} from '../../redux';
import {Container, Header, Content, Icon, Accordion} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
const ViewPerformanceExam = props => {
  const dispatch = useDispatch();
  const [examData, setExamData] = useState(null);
  const [printableData, setPrintableData] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState('');
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [fullPageLoading, setFullpageLoading] = useState(true);
  const [allExamData, setAllExamData] = useState(null);
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
        let alldata = result.data[0];
        let answers = [];
        let questions = [];
        for (let i in result.data) {
          console.log('THE RESULT', result.data[i]._id);
          let data = calculateData(result.data[i]);
          let obj = {
            titleKey: parseInt(i) + 1,
            data,
            resultId: result.data[i]._id,
          };
          let ansNew = [...answers, ...result.data[i].answer];
          let queNew = [...questions, ...result.data[i].fullexam.questions];
          answers = ansNew;
          questions = queNew;
          arrNew.push(obj);
        }
        alldata.answer = answers;
        alldata.fullexam.questions = questions;
        // console.log('ARR NEW', arrNew);
        setAllData(arrNew);
        setAllExamData(alldata);
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
      props.navigation.navigate('HomeScreen');
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
    // console.log('Exam ID', item._id);
    return (
      <View style={{marginBottom: 40}} key={item.index}>
        {/* <ViewPerformance examid={item._id} /> */}
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
              {'View Performance for ' + special[item.titleKey] + ' Narrative'}
            </Text>
          </View>
          <View style={{padding: 18}}>
            <Image
              style={{width: 16, height: 16}}
              source={
                expanded
                  ? require('../../Assets/Images/minus.png')
                  : require('../../Assets/Images/add.png')
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const _renderContent = item => {
    console.log('The ITEM', item);
    return (
      <View style={{padding: 15}}>
        {/* {item.resultId} */}
        <ViewPerformance examid={item.resultId} />
        {/* <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.index = index)}
          contentContainerStyle={{padding: 10, marginTop: 20}}
        /> */}
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
        title="VIEW PERFORMANCE"
        imageUrl={require('../../Assets/Images/drawer.png')}
        action={() => {
          props.navigation.toggleDrawer();
        }}
      />

      <View style={{flex: 1}}>
        {reduxData.totalExams == reduxData.examNumber &&
        reduxData.totalExams > 0 ? (
          <View style={{padding: 15, flex: 1}}>
            {allExamData && (
              <ViewPerformance
                allExamData={allExamData}
                examid={allExamData._id}
              />
            )}
            {/* <Accordion
              dataArray={allData}
              animation={true}
              renderHeader={_renderHeader}
              expanded={[]}
              renderContent={_renderContent}
            /> */}
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
            ? 'Done'
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
export default ViewPerformanceExam;

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
