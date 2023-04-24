import { useState } from "react"
import { Button, StyleSheet, TextInput, View, Alert } from "react-native"

export const GameMenu = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const ValidateEmail = (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    // let email = "";
    // const setEmail = (e) => {
    //     email = e;
    // }

    // let password = "";
    // const setPwd = (pwd) => {
    //     password = pwd;
    // }

    const login = async () => {
        if (email == "") {
            Alert.alert("Please enter your email.");
        } else if (!ValidateEmail(email)) {
            Alert.alert("Please enter valid email address.")
        } else if (password.length < 5) {
            Alert.alert("Password should be 6 characters long.")
        } else {
            let obj = {
                email: email,
                password: password
            }
            setLoading(true)

        }
    }

    const signup = async () => {
        if (email == "") {
            Alert.alert("Please enter your email.");
        } else if (!ValidateEmail(email)) {
            Alert.alert("Please enter valid email address.")
        } else if (password.length < 5) {
            Alert.alert("Password should be 6 characters long.")
        } else {
            let obj = {
                email: email,
                password: password
            }
            setLoading(true)

            try {

                const resp = await fetch("http://192.168.1.149:3001/signup", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(obj)
                });
                const txt = await resp.json();
                console.log("TEXT HERE", txt);
            } catch (e) {
                console.log(e);
            }
            return;
        }
    }

    const Text = ({ placeholder, oc }) => {
        return (
            <TextInput style={styles.input} placeholder={placeholder} textContentType="emailAddress" autoCapitalize="none" autoCorrect={false} autoComplete="off" onTextInput={oc} />
        );
    }

    return (
        <View style={[styles.center, styles.menu]}>
            <View style={[styles.inputHolder, styles.center]}>
                <TextInput
                    placeholder="email"
                    //  oc={setEmail}
                    value={email}
                    onChangeText={(text) => {
                        console.log(text)
                        setEmail(text)
                    }}
                    title={"Email"}
                />


                <TextInput
                    placeholder="password"
                    //  oc={setPwd}
                    value={password}
                    onChangeText={(text) => {
                        console.log(text)
                        setPassword(text)
                    }}
                    title={"Password"}
                    secureTextEntry={true}
                    isPassword={true}
                />


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