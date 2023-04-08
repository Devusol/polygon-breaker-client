import { Animated, Button, Text, Touchable, View } from "react-native";

export const BoxRenderer = (props) => {
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

export const TextRenderer = ({ gameState, mutStr, x, y }) => {

    return (
        <Text style={{
            left: x,
            top: y,
            position: "absolute",
            zIndex: 1
        }}>{mutStr.str}</Text>
    )
}

export const ReconnectRenderer = ({ gameState, onPress }) => {
    return (
        gameState.socket.disconnected ? <>
            <View style={{
                width: "100%",
                height: "50%",
            }}></View>

            <Button title="Reconnect?" onPress={onPress}></Button>
        </> : null
    )
}