import { Engine } from "matter-js";
import { removeObject } from "./gameutil";

let boxIds = 0;

export const physics = (state, { time }) => {
    if(!state.game.isPlaying) return state;

    const engine = state.physics.engine;
    Engine.update(engine, time.delta);

    return state;
}

export const handleTouchSpawner = (state, { touches, screen }) => {
    if(!state.game.isSpawner) return state;

    touches.filter(t => t.type == "press").forEach(t => {
        const { event } = t;
        state.game.socket.emit("spawnObj", event.pageX / screen.width, event.pageY / screen.height);
        // createObject(world, state, screen, event.pageX, event.pageY, boxIds++);
    });

    return state;
}

const isWithinDist = ([x1, y1], [x2, y2], dist) => {
    const distSqr = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    return distSqr < Math.pow(dist, 2);
}

export const handleTouchBreaker = (state, { touches, screen }) => {
    if(state.game.isSpawner || !state.game.isPlaying) return state;

    touches.filter(t => t.type == "press").forEach(t => {
        const { event } = t;
        const touchPos = [event.pageX, event.pageY];
        Object.keys(state).forEach(key => {
            const entity = state[key];
			let body = entity.body;

			if(!body || entity.noBreak) return;
			
            if(isWithinDist([body.position.x, body.position.y], touchPos, 25)) {
                // state.game.socket.emit("deleteObj", key);
                removeObject(state, key, false);
            }
		});
    });
    
    return state;
}

export const cullBoxes = (state, { screen }) => {

    Object.keys(state)
    .filter(key => state[key].body && state[key].body.position.y > screen.height + 30)
    .forEach(key => {
        removeObject(state, key, true);
        // sta
        // Composite.remove(world, state[key].body);
        // delete state[key];
    });

    return state;
}