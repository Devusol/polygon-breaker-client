import { useState } from "react";
import { GameMenu } from "./menu";

export const GameWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        loggedIn ? <Game/> : <GameMenu />
    );
}