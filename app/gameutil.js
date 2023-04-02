import { World, Bodies } from "matter-js";
import { Box } from "./renderer";

export const createObject = (world, state, screen, x, y, id) => {
    const boxSize = Math.trunc(Math.max(screen.width, screen.height) * .075);
    const body = Bodies.rectangle(x, y, boxSize, boxSize, {frictionAir: .021});

    World.add(world, body);

    state[id] =  {
        body,
        size: [boxSize, boxSize],
        color: "pink",
        renderer: Box
    };
}