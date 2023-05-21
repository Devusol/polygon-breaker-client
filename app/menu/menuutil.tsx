import { Pressable, StyleSheet, Text, TextInput } from "react-native"

export type MenuProps = {
    onLogIn: (token: string) => void,
}

export const styles = StyleSheet.create({
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
        marginVertical: 13,
        width: "80%",
        textAlign: "center",
    },
    sendCreds: {
        flexDirection: "row",
    },
    spacer: {
        width: 40
    },
    menuBtn: {
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        backgroundColor: "#44779c",
        margin: 4,
    },
    menuBtnText: {
        fontSize: 16
    }
} as const);

type TextProps = {
    placeholder: string,
    oc: (value: string) => void,
    isEmail: boolean,
}

export const MenuTextField: React.FC<TextProps> = ({placeholder, oc, isEmail}) => {
    return (
        <TextInput style={styles.input} placeholder={placeholder}  autoCapitalize="none" autoCorrect={false} autoComplete={isEmail ? "email" : "off"} onChangeText={oc} inputMode={isEmail ? "email" : "none"}/>
    );
}

type MenuButtonProps = {
    title: string,
    onPress: () => void,
}

export const MenuButton: React.FC<MenuButtonProps> = ({ title, onPress }) => {
    return (
        <Pressable style={styles.menuBtn} onPress={onPress}>
            <Text style={styles.menuBtnText}>{title}</Text>
        </Pressable>
    )
}