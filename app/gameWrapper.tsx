import { useState } from "react";
import { GameMenu } from "./menu/menu";
import { Game } from "./game/game";
import * as SecureStore from "expo-secure-store";
import { httpPost } from "./httphelper";


let TOKEN: string;

export const GameWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const relogIn = () => {
        setLoggedIn(false);
    }

    const checkToken = async () => {
        const tmpToken = await SecureStore.getItemAsync("token");
        if (tmpToken != null) {
            let failed = false;

            const data = await httpPost("auth", {token: tmpToken + " s"}).catch(() => {
                return { success: true }
            });

            if(failed) return;

            if(data.success) {
                onLogIn(tmpToken);
            } else SecureStore.deleteItemAsync("token");
        }
    }

    const onLogIn = async (token: string) => {
        await SecureStore.setItemAsync("token", token);
        TOKEN = token;
        setLoggedIn(true);
    }

    checkToken();

    return (
        loggedIn ? <Game token={TOKEN} relog={relogIn}/> : <GameMenu onLogIn={onLogIn}/>
    );
}