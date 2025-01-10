import {useEffect} from "react";
import Animated, {AnimationCallback, Easing, ExtrapolationType, interpolate, interpolateColor, useDerivedValue, useSharedValue, withTiming, WithTimingConfig} from "react-native-reanimated";

export const sharedTiming = (
  toValue: number,
  config?: WithTimingConfig,
  callBack?: AnimationCallback,
) => {
  'worklet';
  return withTiming(
    toValue,
    Object.assign(
      {
        duration: 500,
        easing: Easing.bezier(0.33, 0.01, 0, 1),
      },
      config,
    ),
    callBack,
  );
};

export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() =>
    withTiming(
      value.value,
      Object.assign(
        {duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1)},
        config,
      ),
    ),
  );
};

export const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';
  return value ? 1 : 0;
};

export const useInterpolate = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: number[],
  type?: ExtrapolationType
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

export const useInterpolateColor = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: (string)[],
  colorSpace?: 'RGB' | 'HSV' | undefined
) => {
  'worklet';
  return useDerivedValue(() =>
    interpolateColor(progress.value, input, output, colorSpace)
  );
};