import { Animated, Text } from "react-native";

export const Box = (props) => {
    const [width, height] = props.size;
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const angle = props.body.angle;

    return (
        <Animated.View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                transform: [{ rotate: angle + "rad" }],
                backgroundColor: props.color || "pink",
            }}
        />
    );
}

export const TextRenderer = ({ mutStr, x, y }) => {
    return (
        <Text style={{
            left: x,
            top: y,
            position: "absolute",
        }}>{mutStr.str}</Text>
    )
}