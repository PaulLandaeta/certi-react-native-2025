import { useRef } from "react";
import { Animated } from "react-native";

type FadeOptions = {
    to?: number;
    duration?: number;
    delay?: number;
    easing?: (value: number) => number;
};

// Libs Utils 
const getInitialOffSet = (direction, distance) => {
    switch (direction) {
        case 'up':
            return distance;
        case 'down':
            return -distance;
        case 'left':
            return distance;
        case 'right':
            return -distance;
    }
}

export const useFade = (initial:number, distance: number = 0, direction: string = 'down') => { 
    const opacity = useRef(new Animated.Value(initial)).current;
    const translate = useRef( new Animated.Value(-80)).current;


    const run = (toValue = 1, opts:FadeOptions = {}) => {
        new Promise<void>((resolve) => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue,
                    duration: opts.duration,
                    delay: opts.delay,
                    easing: opts.easing,
                    useNativeDriver: true
                }),
                Animated.timing(translate, {
                    toValue,
                    duration: opts.duration,
                    easing: opts.easing,
                    delay: opts.delay,
                    useNativeDriver: true
                })
            ]).start(()=> resolve());
        })
    }

    const transform = 
        direction === 'up' || direction === 'down'? 
            [{translateY: translate}] : [{translateX: translate}]
    const fadeIn = (opts?: FadeOptions) => run(opts?.to ?? 1, opts);
    const fadeOut = (opts?: FadeOptions) => run(opts?.to ?? 0, opts);

    return {
        fadeIn,
        fadeOut,
        opacity,
        transform
    }
};