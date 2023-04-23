import { useState } from "react"
import { Button, StyleSheet, TextInput, View } from "react-native"

export const GameMenu = () => {
    let email = "";
    const setEmail = (e) => {
        email = e;
    }

    let password = "";
    const setPwd = (pwd) => {
        password = pwd;
    }

    const login = () => {

    }

    const signup = async () => {
        try {
            console.log("EMAIL PWD", email, password)
        const resp = await fetch("http://192.168.0.10:3001/signup", {
            method: "POST",
            body: JSON.stringify({
                email: email.replaceAll(" ", ""),
                name: "temp",
                password,
            }),
        });
        console.log("BLOB", resp.blob);
        const txt = await resp.blob();
        console.log("TEXT HERE", txt);
    } catch(e) {
        console.error(e);
    }
        return;
        const json = await resp.json();

        console.log("SIGN UP RESULT", json);
    }

    const Text = ({placeholder, oc}) => {
        return (
            <TextInput style={styles.input} placeholder={placeholder} textContentType="emailAddress" autoCapitalize="none" autoCorrect={false} autoComplete="off" onTextInput={oc}/>
        );
    }

    return (
        <View style={[styles.center, styles.menu]}>
            <View style={[styles.inputHolder, styles.center]}>
                <Text placeholder="email" oc={setEmail}></Text>
                <Text placeholder="password" oc={setPwd}></Text>
                <View style={styles.sendCreds}>
                    <Button title="Login" onPress={login}></Button>
                    <View style={styles.spacer}></View>
                    <Button title="Signup" onPress={signup}></Button>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#c4bca5",
        width: "100%",
        height: "100%",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",        
    },
    inputHolder: {
        top: 100,
        width: "60%",
        height: 250,
        backgroundColor: "#807966",
        borderRadius: 12,
        borderColor: "#000",
        borderWidth: 6,
    },
    input: {
        backgroundColor: "#c4bca5",
        marginVertical: 20,
        width: "80%",
        textAlign: "center",
    },
    sendCreds: {
        flexDirection: "row",
    },
    spacer: {
        width: 40
    }
})