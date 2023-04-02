import { Bodies, Engine, World, Composite } from "matter-js";
import { createObject, removeObject } from "./gameutil";
import { Box } from "./renderer";

let boxIds = 0;

export const physics = (state, { time }) => {
    if(!state.game.isPlaying) return state;

    const engine = state.physics.engine;
    Engine.update(engine, time.delta);

    return state;
}

export const handleTouchSpawner = (state, { touches, screen }) => {
    if(!state.game.isSpawner) return state;

    const world = state.physics.world;

    touches.filter(t => t.type == "press").forEach(t => {
        const { event } = t;

        state.game.send(0x0, event.pageX / screen.width, event.pageY / screen.height);

        // createObject(world, state, screen, event.pageX, event.pageY, boxIds++);
    });

    return state;
}

const isWithinDist = ([x1, y1], [x2, y2], dist) => {
    const distSqr = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);

    return distSqr < Math.pow(dist, 2);
}

export const handleTouchBreaker = (state, { touches, screen }) => {
    if(state.game.isSpawner) return state;

    touches.filter(t => t.type == "press").forEach(t => {
        const { event } = t;
        const touchPos = [event.pageX, event.pageY];
        Object.keys(state).forEach(key => {
			let body = state[key].body;

			if(!body) return;
			
            distance([body.position.x, body.position.y], touchPos) < 25
		});
    });
}

export const cullBoxes = (state, { screen }) => {
    const world = state.physics.world;

    Object.keys(state)
    .filter(key => state[key].body && state[key].body.position.y > screen.height + 30)
    .forEach(key => {
        removeObject(state, key);
        // sta
        // Composite.remove(world, state[key].body);
        // delete state[key];
    });

    return state;
}