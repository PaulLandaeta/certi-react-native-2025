import { Animated } from "react-native"

export const FadeView = ({ opacity, styles, children }) => {
    return <Animated.View style={[{ opacity }, styles]}>
        {children}
    </Animated.View>
}