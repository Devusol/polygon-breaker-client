import React, { useState } from "react"
import { Button, Pressable, TextInput, View } from "react-native"
import { httpPost } from "../httphelper";
import { LoginMenu } from "./loginmenu";
import { styles, MenuTextField, MenuProps, MenuButton } from "./menuutil";
import { SignUpMenu } from "./signupmenu";

const enum LoginState {
    DEFAULT,
    SIGNUP,
    LOGIN
}

export const GameMenu: React.FC<MenuProps> = ({ onLogIn }) => {
    const [loginState, setLoginState] = useState(LoginState.DEFAULT);

    const loginMenu = () => {
        setLoginState(LoginState.LOGIN);
    }

    const signupMenu = () => {
        setLoginState(LoginState.SIGNUP);
    }

    const defaultMenu = () => {
        setLoginState(LoginState.DEFAULT);
    }

    const ChooseMenu = () => {
        return (
            <>
                <MenuButton title="Login" onPress={loginMenu}></MenuButton>
                <MenuButton title="Signup" onPress={signupMenu}></MenuButton>
            </>
        )
    }

    return (
        <View style={[styles.center, styles.menu]}>
            <View style={[styles.inputHolder, styles.center]}>
                { loginState != LoginState.DEFAULT ? <MenuButton title="Back" onPress={defaultMenu} /> : null }
                {
                    loginState == LoginState.SIGNUP ?
                        <SignUpMenu onLogIn={onLogIn}/> :
                    loginState == LoginState.LOGIN ? 
                        <LoginMenu onLogIn={onLogIn}/> :
                        <ChooseMenu />
                    }
            </View>
        </View>
    )

    // return (
    //     <View style={[styles.center, styles.menu]}>
    //         <View style={[styles.inputHolder, styles.center]}>
    //             <MenuTextField placeholder="email" oc={setEmail}></MenuTextField>
    //             <MenuTextField placeholder="password" oc={setPwd}></MenuTextField>
    //             <View style={styles.sendCreds}>
    //                 <Button title="Login" onPress={login}></Button>
    //                 <View style={styles.spacer}></View>
    //                 <Button title="Signup" onPress={signup}></Button>
    //             </View>
                
    //         </View>
    //     </View>
    // )
}

