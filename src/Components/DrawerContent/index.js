import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Constants/Colors/index';
import Fonts from '../../Constants/Fonts/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {updateState} from '../../redux';
import {IMG_URL} from '../../Api/baseUrl';
const DrawerContent = props => {
  const userDetails = useSelector(state => state.user.userDetails);
  const showImage = () => {
    let txt = '';
    if (userDetails && userDetails.name) {
      txt = userDetails.name.substring(0, 2);
    } else if (userDetails && userDetails.email) {
      txt = userDetails.email.substring(0, 2);
    }
    if (userDetails && userDetails.imageUrl) {
      return (
        <Image
          source={{
            uri:
              userDetails && userDetails.imageUrl
                ? IMG_URL + userDetails.imageUrl
                : 'https://picsum.photos/400',
          }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: '#46ADF0',
          }}
        />
      );
    } else {
      return (
        <Image
          source={{uri: IMG_URL + 'noimage.png'}}
          style={{
            width: 45,
            height: 45,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: '#46ADF0',
          }}
        />
      );
    }
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0.75}}
      end={{x: 1, y: 0.25}}
      colors={['#36D1DC', '#5B86E5']}
      style={styles.gradient}>
      {/* PROFILE SECTION  */}
      <View style={styles.container}>
        <View style={styles.row}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {showImage()}
              </View>
              <View style={{marginLeft: 15}}>
                {userDetails && userDetails.name && (
                  <Text
                    style={{
                      fontFamily: Fonts.AvenirNextLTPro_Demi,
                      color: Colors.white,
                    }}>
                    {userDetails && userDetails.name ? userDetails.name : ''}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: Fonts.AvenirNextLTPro_Regular,
                    color: Colors.white,
                    marginTop: 3,
                  }}>
                  {userDetails && userDetails.email
                    ? userDetails.email.length > 20
                      ? userDetails.email.substring(0, 20) + '..'
                      : userDetails.email
                    : ''}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              position: "absolute",  right: 0 
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('EditProfile')}>
              <Image
                style={{
                  width: 14,
                  height: 14,
                  margin: 25,
                  resizeMode: 'contain',
             
                }}
                source={require('../../Assets/Images/edit.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* DIVIDER SECTION  */}
      <View
        style={{
          backgroundColor: Colors.white,
          height: 1,
          width: '90%',
          alignSelf: 'flex-end',
        }}></View>
      <View
        style={{
          marginVertical: 0,
          backgroundColor: "transparent",
          height: "100%",
          width: '90%',
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 25, resizeMode: 'contain'}}
            source={require('../../Assets/Images/home.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('PracticeSets');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 25, resizeMode: 'contain'}}
            source={require('../../Assets/Images/notes.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Narratives
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MultipleChoiceCategory');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../../Assets/Images/book.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Multiple Choice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FlipCardCategory');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../../Assets/Images/book.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Flip Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ContinuePreviousNarrative');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../../Assets/Images/file.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Continue Previous Narratives
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ViewYourScore');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../../Assets/Images/phone.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            View Previous Scores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Logout');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('../../Assets/Images/logout.png')}
          />
          <Text
            style={{
              fontFamily: Fonts.AvenirNextLTPro_Demi,
              color: Colors.white,
              fontSize: 14,
              lineHeight: 16,
              marginLeft: 15,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    marginVertical: 10,
    
  },
});

export default DrawerContent;
