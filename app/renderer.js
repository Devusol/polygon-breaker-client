import { Animated, Button, StyleSheet, Text, Touchable, View } from "react-native";

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
            <View style={styles.btnSpacer}></View>

            <Button title="Reconnect?" onPress={onPress}></Button>
        </> : null
    )
}

export const PlaceableAreaRenderer = ({ gameState }) => {
    return (
        gameState.isSpawner ? <>
            <View style={styles.spAreaHolder}>
                <View style={styles.spawnableArea}>
                </View>
            </View>
        </> : null
    )
}

const styles = StyleSheet.create({
    spawnableArea: {
        backgroundColor: "#419e60",
        opacity: .2,
        width: "50%",
        height: "50%",
        borderRadius: 8,
    },
    spAreaHolder: {
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    btnSpacer: {
        width: "100%",
        height: "50%",
    },
});