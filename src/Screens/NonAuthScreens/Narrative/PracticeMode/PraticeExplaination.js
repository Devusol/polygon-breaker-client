import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Fonts from '../../../../Constants/Fonts';

const PraticeExplanation = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Explanation</Text>
      <View style={styles.explainationContanier}>
        <Text style={styles.explanationText}>{props.explainText}</Text>
        <Text style={styles.explanationText}>
          <Text style={{fontFamily: Fonts.AvenirNextLTPro_Demi}}>
            Option {props.correctOption}
          </Text>{' '}
          is correct.
        </Text>
      </View>

      <View style={{height: 30}}></View>
      {props.tidbit && (
        <>
          <Text style={styles.title}>Tidbit</Text>
          <View style={styles.explainationContanier}>
            <Text style={styles.explanationText}>{props.tidbit}</Text>
          </View>

          <View style={{height: 30}}></View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.AvenirNextLTPro_Demi,
    color: '#111111',
  },
  explainationContanier: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 200,
    borderRadius: 5,
    padding: 20,
  },
  explanationText: {
    fontFamily: Fonts.AvenirNextLTPro_Regular,
    fontSize: 11,
    color: '#000000',
    lineHeight: 20,
  },
});

export default PraticeExplanation;
