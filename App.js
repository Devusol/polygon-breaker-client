import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Game } from './app/game';

export default function App() {
    return (
        <>
        <Game />
            {/* <View style={styles.container}>
                <Text>Waiting for a 2nd player</Text>
                
                
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});
