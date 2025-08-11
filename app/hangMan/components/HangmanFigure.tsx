import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface HangmanFigureProps {
    wrongGuesses: number;
}

const FadeInPart = ({ visible, style }: { visible: boolean; style: any }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    if (!visible) return null;

    return <Animated.View style={[style, { opacity }]} />;
};

export default function HangmanFigure({ wrongGuesses }: HangmanFigureProps) {
    return (
        <View style={styles.figureContainer}>
            {/* Gallows */}
            <View style={styles.gallowsBase} />
            <View style={styles.verticalPost} />
            <View style={styles.horizontalBeam} />
            <View style={styles.rope} />

            {/* Animated body parts */}
            <FadeInPart visible={wrongGuesses >= 1} style={styles.head} />
            <FadeInPart visible={wrongGuesses >= 2} style={styles.body} />
            <FadeInPart visible={wrongGuesses >= 3} style={[styles.arm, styles.leftArm]} />
            <FadeInPart visible={wrongGuesses >= 4} style={[styles.arm, styles.rightArm]} />
            <FadeInPart visible={wrongGuesses >= 5} style={[styles.leg, styles.leftLeg]} />
            <FadeInPart visible={wrongGuesses >= 6} style={[styles.leg, styles.rightLeg]} />
        </View>
    );
}

const styles = StyleSheet.create({
    figureContainer: {
        width: 150,
        height: 220,
        alignItems: 'center',
        marginBottom: 20,
        // position: 'relative',
    },
    gallowsBase: {
        width: 100,
        height: 10,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        bottom: 0,
    },
    verticalPost: {
        width: 10,
        height: 180,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        bottom: 10,
        left: 0,
    },
    horizontalBeam: {
        width: 70,
        height: 10,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        top: 0,
        left: 10,
    },
    rope: {
        width: 4,
        height: 30,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        top: 10,
        left: 70,
    },
    head: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#4f6d7a',
        position: 'absolute',
        top: 40,
        left: 50,
    },
    body: {
        width: 6,
        height: 60,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        top: 80,
        left: 68,
    },
    arm: {
        width: 40,
        height: 6,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        top: 90,
    },
    leftArm: {
        left: 30,
        transform: [{ rotate: '-45deg' }],
    },
    rightArm: {
        left: 68,
        transform: [{ rotate: '45deg' }],
    },
    leg: {
        width: 40,
        height: 6,
        backgroundColor: '#4f6d7a',
        position: 'absolute',
        top: 135,
    },
    leftLeg: {
        left: 30,
        transform: [{ rotate: '45deg' }],
    },
    rightLeg: {
        left: 68,
        transform: [{ rotate: '-45deg' }],
    },
});
