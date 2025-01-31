// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import {
    View,
    PanResponder,
    PanResponderInstance,
    PanResponderGestureState,
    GestureResponderEvent,
    I18nManager,
} from 'react-native';
import * as R from 'ramda';
import { colors } from '../../application/styles';

const requiredSwipDistanceValue = 75;

interface SwipeableContentComponentProps {
    readonly contentItems: ReadonlyArray<JSX.Element>;
}

interface State {
    readonly currentIndex: number;
}

type SetState = React.Dispatch<React.SetStateAction<State>>;

export const SwipeableContentComponent = (props: SwipeableContentComponentProps): JSX.Element => {
    const [state, setState]: [State, SetState] = buildState();
    const itemCount = props.contentItems.length;
    const panResponder = buildPanResponder(state.currentIndex, itemCount, setState);
    return (
        <View {...panResponder.panHandlers} style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            {props.contentItems[state.currentIndex]}
            <NavigationDots currentIndex={state.currentIndex} count={itemCount} />
        </View>
    );
};

const buildState = (): [State, SetState] =>
    useState({
        currentIndex: 0,
    });

const buildPanResponder = (currentIndex: number, itemCount: number, setState: SetState): PanResponderInstance => (
    PanResponder.create({
        onStartShouldSetPanResponder,
        onPanResponderEnd: onPanResponderEnd(currentIndex, itemCount, setState),
    })
);

const onStartShouldSetPanResponder = (_event: GestureResponderEvent, _gestureState: PanResponderGestureState): boolean => (
    true
);

type OnPanResponderMoveCallback = (_event: GestureResponderEvent, _gestureState: PanResponderGestureState) => void;

const onPanResponderEnd = (currentIndex: number, itemCount: number, setState: SetState): OnPanResponderMoveCallback => {
    return (_event: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
        if (isSwipeToNext(gestureState.dx)) {
            setState({ currentIndex: getNextIndex(currentIndex, itemCount) });
        } else if (isSwipeToPrevious(gestureState.dx)) {
            setState({ currentIndex: getPreviousIndex(currentIndex) });
        }
    };
};

const NavigationDots = (props: { readonly currentIndex: number, readonly count: number }): JSX.Element => {
    const renderDot = (_: undefined, loopIndex: number): JSX.Element => {
        return <NavigationDot key={loopIndex} currentIndex={props.currentIndex} loopIndex={loopIndex} />;
    };
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {R.range(0, props.count).map(renderDot)}
        </View>
    );
};

const NavigationDot = (props: { readonly currentIndex: number, readonly loopIndex: number}): JSX.Element => {
    const dotSize = 8;
    const dotStyle = { width: dotSize, height: dotSize, borderRadius: dotSize / 2, marginHorizontal: 5 };
    if (props.currentIndex === props.loopIndex) {
        return <View style={{ ...dotStyle, backgroundColor: colors.topaz }} />;
    }
    return <View style={{ ...dotStyle, backgroundColor: colors.lightGrey }} />;
};

const getNextIndex = (currentIndex: number, itemCount: number): number => (
    R.min(currentIndex + 1, itemCount - 1)
);

const getPreviousIndex = (currentIndex: number): number => (
    R.max(currentIndex - 1, 0)
);

const isSwipeToNext = (horizontalMovementValue: number): boolean => {
    if (I18nManager.isRTL) {
        return isRightSwipe(horizontalMovementValue);
    }
    return isLeftSwipe(horizontalMovementValue);
};

const isSwipeToPrevious = (horizontalMovementValue: number): boolean => {
    if (I18nManager.isRTL) {
        return isLeftSwipe(horizontalMovementValue);
    }
    return isRightSwipe(horizontalMovementValue);
};

const isRightSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue > requiredSwipDistanceValue
);

const isLeftSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue < -1.0 * requiredSwipDistanceValue
);
