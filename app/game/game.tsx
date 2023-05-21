import { GameEngine } from "react-native-game-engine";
import { Bodies, Constraint, Engine, World } from "matter-js";
import { handleTouchSpawner, physics, cullBoxes, handleTouchBreaker } from "./systems";
import { Dimensions } from "react-native";
import { BoxRenderer, RoundFinishRenderer, PlaceableAreaRenderer, ReconnectRenderer, TextRenderer, WinState } from "./renderer";
import { createObject, getObjectIds, removeObject } from "./gameutil";
import { io } from "socket.io-client";
import { mutStr } from "./mutstr";
import * as Device from "expo-device"

type GameProps = {
    token: string,
    relog: () => void,
}

export const Game: React.FC<GameProps> = ({ token, relog }) => {

    const screen = Dimensions.get("window");
    const { width, height } = screen;

    const boxSize = Math.trunc(Math.max(width, height) * .075);
    
    const engine = Engine.create();
    const world = engine.world;

    const floor = Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize * 2, { isStatic: true });

    const wallY = height * .7;
    const wallHeight = height / 4;
    const wallWidth = boxSize / 2;
    const rightWall = Bodies.rectangle(width, wallY, wallWidth, wallHeight, { isStatic: true });
    const leftWall = Bodies.rectangle(0, wallY, wallWidth, wallHeight, { isStatic: true });

    const constraint = Constraint.create({
        label: "Drag Constraint",
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        length: 0.01,
        stiffness: 0.1,
        angularStiffness: 1,
    });

    World.add(world, [floor, rightWall, leftWall]);
    World.addConstraint(world, constraint);

    const socket = io("ws://192.168.0.10:3001", {
        timeout: 4000,
        reconnection: false,
        auth: {
            token: token,
        },
    });
    
    const gameState = {
        isSpawner: false,
        isPlaying: false,
        isFinished: false,
        winState: WinState.DRAW,
        selfScoreVal: 0,
        opponentScoreVal: 0,
        socket,
        ping: 0,
        displayedText: mutStr("Connecting"),
        scoreDisp: mutStr("Score: 0"),
        oppScore: mutStr("Their Score: 0"),
        time: mutStr("30s"),
    }

    const wallColor = "#203b21";
    const state = {

        // Matter-JS world entities
        physics: { engine: engine, world: world, constraint: constraint },
        game: gameState,
        floor: { body: floor, size: [width, boxSize * 2], color: wallColor, noBreak: true, renderer: BoxRenderer },
        rightWall: { body: rightWall, size: [wallWidth, wallHeight], color: wallColor, noBreak: true, renderer: BoxRenderer },
        leftWall: { body: leftWall, size: [wallWidth, wallHeight], color: wallColor, noBreak: true, renderer: BoxRenderer },

        // Text HUD

        text: { gameState, mutStr: gameState.displayedText, x: 20, y: 25, renderer: TextRenderer },
        score: { gameState, mutStr: gameState.scoreDisp, x: 20, y: 75, renderer: TextRenderer },
        opponentScore: { gameState, mutStr: gameState.oppScore, x: 20, y: 100, renderer: TextRenderer },
        timeDisp: { gameState, mutStr: gameState.time, x: 300, y: 75, renderer: TextRenderer },

        placeableArea: { gameState, renderer: PlaceableAreaRenderer },
        gameFinish: { gameState, renderer: RoundFinishRenderer },
        reconnectBtn: { gameState, onPress: () => socket.open(), renderer: ReconnectRenderer },
    };

    let pingTime = 0;
    let pingInt;

    // Custom events

    socket.on("init", (isSpawner, breakerName, spawnerName) => {
        console.log("INIT", breakerName, spawnerName);
        gameState.displayedText.str = "Playing as " + (isSpawner ? "spawner" : "breaker");
        gameState.isSpawner = isSpawner;

        const ping = () => {
            pingTime = Date.now();
            socket.emit("p");
        }

        Object.keys(state).forEach(k => {
            const entity = state[k];

            if(entity.body && !entity.noBreak) {
                removeObject(state, k, false, true);
            }
        });

        pingInt = setInterval(ping, 1e4);

        ping();
    });

    socket.on("spawn", (xPercentage, yPercentage, id) => {
        createObject(world, state, screen, xPercentage * width, yPercentage * height, id);
    });

    socket.on("deleteObj", (id) => {
        removeObject(state, id, false, true);
    });

    socket.on("playerDisconnect", () => {
        socket.disconnect();
        console.log("other player disconnected");
        relog();
    });

    socket.on("p", () => {
        gameState.ping = Date.now() - pingTime;
    });

    socket.on("score", (spawnerScore, breakerScore) => {
        if(gameState.isSpawner) {
            gameState.selfScoreVal = spawnerScore;
            gameState.opponentScoreVal = breakerScore;
            gameState.scoreDisp.str = `Score: ${spawnerScore}`;
            gameState.oppScore.str = `Their Score: ${breakerScore}`;
        } else {
            gameState.opponentScoreVal = spawnerScore;
            gameState.selfScoreVal = breakerScore;
            gameState.scoreDisp.str = `Score: ${breakerScore}`;
            gameState.oppScore.str = `Their Score: ${spawnerScore}`;
        }
    });

    socket.on("time", (secondsLeft) => {
        console.log("DEVICENAME", Device.deviceName, secondsLeft, gameState.isSpawner ? "spawner" : "breaker");
        if(secondsLeft == 0) {
            gameState.isPlaying = false;
            gameState.isFinished = true;

            gameState.winState = gameState.selfScoreVal > gameState.opponentScoreVal ?
                WinState.WIN : gameState.selfScoreVal < gameState.opponentScoreVal ?
                        WinState.LOSE : WinState.DRAW;
        }
        gameState.time.str = `${secondsLeft}s`;
    });

    socket.on("reset", () => {
        getObjectIds(state, screen).forEach(id => {
            if(!state[id].noBreak) {
                removeObject(state, id, false, true);
            }
        });
    });

    socket.on("start", () => {
        gameState.isPlaying = true;
    });

    socket.on("nextRoundTime", (nextRoundTime) => {
        
    });

    // Built in events

    socket.on("connect", () => {
        console.log("connected as", socket.id, " device name ", Device.deviceName);
        gameState.scoreDisp.str = "Score: 0";
        gameState.oppScore.str = "Their Score: 0";
        gameState.time.str = "30s";
        gameState.displayedText.str = "Waiting for another player";
    });

    socket.on("disconnect", () => {
        gameState.isPlaying = false;
        gameState.displayedText.str = "Disconnected";
        clearInterval(pingInt);

        relog();
    });

    socket.on("connect_error", (e) => {
        console.log("er connecting", e);
        alert("there was an error connecting to the server");
    });

    return (
        <GameEngine
        systems={[handleTouchSpawner, cullBoxes, handleTouchBreaker, physics]}
        entities={state}
        >
        </GameEngine>
    );
}