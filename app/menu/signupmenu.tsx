import { Button, View } from "react-native"
import { httpPost } from "../httphelper";
import { styles, MenuTextField, MenuProps, MenuButton } from "./menuutil"

export const SignUpMenu: React.FC<MenuProps> = ({ onLogIn }) => {
    let email = "";
    const setEmail = (e: string) => {
        email = e;
    }

    let password = "";
    const setPwd = (pwd: string) => {
        password = pwd;
    }

    let name = "";
    const setName = (n: string) => {
        name = n;
    }
    
    const signup = async () => {
        try {
            const data = await httpPost("signup", {
                email: email.replaceAll(" ", ""),
                name,
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
                <MenuTextField placeholder="name" oc={setPwd} isEmail={false}/>
                <View style={styles.sendCreds}>
                    <MenuButton title="Signup" onPress={signup} />
                </View>
            </>
        )
}