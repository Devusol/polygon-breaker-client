import { GameEngine } from "react-native-game-engine";
import { Bodies, Constraint, Engine, World } from "matter-js";
import { handleTouchSpawner, physics, cullBoxes } from "./systems";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Box } from "./renderer";
import { createObject } from "./gameutil";
import { useState } from "react";

export const Game = () => {

    const screen = Dimensions.get("window");
    const { width, height } = screen;

    const boxSize = Math.trunc(Math.max(width, height) * .075);
    
    const engine = Engine.create();
    const world = engine.world;
    
    const body = Bodies.rectangle(width / 2, 0, boxSize, boxSize, { frictionAir: 0.021 });
    const body2 = Bodies.rectangle(width / 2 + 20, -30, boxSize, boxSize, { frictionAir: 0.021 });
    const floor = Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
    const constraint = Constraint.create({
        label: "Drag Constraint",
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        length: 0.01,
        stiffness: 0.1,
        angularStiffness: 1,
    });

    World.add(world, [body, body2, floor, ]);
    World.addConstraint(world, constraint);

    const ws = new WebSocket("ws://192.168.0.8:5005");
    const gameState = {
        isSpawner: false,
        isPlaying: false,
        send: (header, ...data) => {
            ws.send(JSON.stringify([header, ...data]));
        },
    }

    const state = {
        physics: { engine: engine, world: world, constraint: constraint },
        game: gameState,
        box: { body: body, size: [boxSize, boxSize], color: "pink", renderer: Box },
        box2: { body: body2, size: [boxSize, boxSize], color: "pink", renderer: Box },
        floor: { body: floor, size: [width, boxSize], color: "#86E9BE", renderer: Box },
    };

    
    ws.onmessage = (e) => {
        const parsed = JSON.parse(e.data);
        console.log(parsed);

        const data = parsed.slice(1);
        const header = parsed[0];

        if (header == 0x0) { // game init
            // setText("");
            gameState.isSpawner = data[0];
            gameState.isPlaying = true;
        } else if (header == 0x1) { // kick
            alert("You were kicked: " + data[0]);
        } else if (header == 0x2) { // spawn object
            const xPercentage = data[0];
            const yPercentage = data[1];
            const id = data[2];

            createObject(world, state, screen, xPercentage * width, yPercentage * height, id);
        } else if (header == 0x3) { // delete object

        }
    }

    ws.onopen = () => {
        console.log("SOCKET OPEN");
    }

    ws.onclose = () => {
        console.log("SOCKET CLOSED");
    }
    
    ws.onerror = (e) => {
        console.log("SOCKET ERROR", e);
    }

    return (
        <GameEngine
        systems={[physics, handleTouchSpawner, cullBoxes]}
        entities={state}
        >
        </GameEngine>
    )
}

const styles = StyleSheet.create({
    text: {
        left: 20,
        top: 25,
    }
})