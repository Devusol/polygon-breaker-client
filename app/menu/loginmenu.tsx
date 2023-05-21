import { Button, View } from "react-native"
import { httpPost } from "../httphelper";
import { styles, MenuTextField, MenuProps, MenuButton } from "./menuutil"


export const LoginMenu: React.FC<MenuProps> = ({ onLogIn }) => {
    let email = "";
    const setEmail = (e: string) => {
        email = e;
    }

    let password = "";
    const setPwd = (pwd: string) => {
        password = pwd;
    }

    const login = async () => {
        try {
            const data = await httpPost("login", {
                email: email.replaceAll(" ", ""),
                password,
            });

            if(data.success) {
                return onLogIn(data.token);
            }

            alert(data.msg);
        } catch(e) {
            console.error("caught error", e);
        }
    }

    return (
        <>
            <MenuTextField placeholder="email" oc={setEmail} isEmail={true}/>
            <MenuTextField placeholder="password" oc={setPwd} isEmail={false}/>
            <View style={styles.sendCreds}>
                <MenuButton title="Login" onPress={login} />
            </View>
        </>
    )
}