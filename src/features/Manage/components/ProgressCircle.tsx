import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

import {Block} from '../../../components/Block/Block';
import {Typo} from '../../../components/Typo/Typo';
import {TypoPresetNames} from '../../../components/Typo/Typo.preset';
import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';

const CIRCLE_LENGTH = 220;
const SIZE = 200;
const STROKE_WIDTH_OUTSIDE = 6;
const STROKE_WIDTH_INSIDE = 6;

const MAX_PERCENT = 100;
const TWO_SECONDS = 2000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  textPreset?: TypoPresetNames;
  mRight?: number;
}

const ProgressCircle = ({value = 0, size = 0, strokeWidth = 0, textPreset = 'b16', mRight = SpacingDefault.none}: ProgressCircleProps) => {
  const progress = useSharedValue(0);
  const _size = size || CIRCLE_LENGTH;
  const _r = _size / (2 * Math.PI);
  const _strokeWidthOutside = strokeWidth || STROKE_WIDTH_OUTSIDE;
  const _strokeWidthInside = strokeWidth || STROKE_WIDTH_INSIDE;

  useEffect(() => {
    if (value) {
      const _value = value > MAX_PERCENT ? MAX_PERCENT : value;
      progress.value = withTiming(_value / MAX_PERCENT, {duration: TWO_SECONDS});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: _size * (1 - progress.value)
  }));

  return (
    <Block center mRight={mRight}>
      <Typo preset={textPreset} color={colors.primary}>{`${value > MAX_PERCENT ? MAX_PERCENT : value}%`}</Typo>
      <Svg style={styles.svg} width={SIZE} height={SIZE}>
        <Circle
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={_r}
          stroke={colors.secondary}
          strokeWidth={_strokeWidthOutside}
        />
        <AnimatedCircle
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={_r}
          stroke={colors.primary}
          strokeWidth={_strokeWidthInside}
          strokeDasharray={_size}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>

    </Block>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    transform: [{rotate: '-90deg'}]
  }
});

export default ProgressCircle;
