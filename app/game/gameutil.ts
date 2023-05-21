import { World, Bodies, Composite, Body } from "matter-js";
import { ScaledSize } from "react-native/types";
import { BoxRenderer } from "./renderer";

export const createObject = (world, state, screen, x, y, objectID) => {
    const boxSize = Math.trunc(Math.max(screen.width, screen.height) * .075);
    const body = Bodies.rectangle(x, y, boxSize, boxSize, {frictionAir: .021});

    World.add(world, body);

    state[objectID] =  {
        body,
        size: [boxSize, boxSize],
        color: "#d42417",
        renderer: BoxRenderer
    };
}

export const removeObject = (state, objectID: string, didFallOff: boolean | undefined, noSend = false) => {
    if(!state[objectID]?.body) return;
    
    const world = state.physics.world;

    Composite.remove(world, state[objectID].body);
    if(!noSend) state.game.socket.emit("deleteObj", objectID, didFallOff);
    delete state[objectID];
}

export const updateObject = (state, screen, objectID, xPercentage, yPercentage, angle) => {
    if(!state[objectID]?.body) return;

    const body = state[objectID].body;
    Body.setPosition(body, {
        x: xPercentage * screen.width,
        y: yPercentage * screen.height,
    });

    Body.setAngle(body, angle);
}

export const getObjectIds = (state, screen: ScaledSize) => {
    return Object.keys(state)
    .filter(key => state[key].body);
}