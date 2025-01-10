import isString from 'lodash/isString';
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

import {Theme, useTheme} from '../../context/ThemeProvider';
import colors from '../../themes/Colors';
import images from '../../themes/Images';
import {SpacingDefault} from '../../themes/Spacing';
import {useInterpolate, useInterpolateColor, useSharedTransition} from '../../utils/handleAnimated';
import {enhance} from '../../utils/handleStyle';
import {Block} from '../Block/Block';
import {Typo} from '../Typo/Typo';
import {CheckBoxProps} from './Checkbox.props';

// default values
const BORDER_RADIUS_CIRCLE = 16 / 2;
const CHECKBOX_WIDTH = 16;
const CHECKBOX_HEIGHT = 16;
const OPACITY_DISABLED = 0.6;

const CheckBox: React.ForwardRefRenderFunction<View, CheckBoxProps> = (
  {
    checked: checkedProp,
    indeterminate = false,
    disabled,
    onChange,
    typeCheck = 'square',
    color: colorProp,
    colorDisabled: colorDisabledProp,
    defaultColor: defaultColorProp,
    containerStyle,
    boxStyle,
    label,
    size: sizeProp,
    sizeBox,
    labelStyle,
    outline,
    labelPreset = 'b12',
    labelColor,
    disabledColor = colors.transparent,
    disabledBtn = false,
    checkedColor,
    checkedDisabledColor: checkedDisabledColorProp,
    ...restProps
  },
  ref
) => {
  // refs
  const checkBoxRef = useRef<View>(null);

  // states
  const [checked, setChecked] = useState(!!checkedProp);

  // provide refs
  useImperativeHandle(ref, () => checkBoxRef.current!);

  // hooks
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);

  // animtions
  const isPressed = useSharedValue(checked);
  const progress = useSharedTransition(checked);

  const scale = useInterpolate(progress, [0, 0.5, 1], [0, 0.7, 1]);
  const opacity = useInterpolate(progress, [0, 0.3, 1], [0, 0.8, 1]);

  const defaultColor = defaultColorProp
    ? defaultColorProp
    : (isDark ? colors.primary : colors.primary);

  const size = useMemo(
    () => (sizeProp ? sizeProp : CHECKBOX_WIDTH),
    [sizeProp]
  );

  const boxCheckStyle = useMemo(
    () =>
      typeCheck === 'square'
        ? boxStyle
        : enhance([boxStyle, styles.checBoxCircle]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [typeCheck, boxStyle]
  );

  const iconCheck = useMemo(
    () => (indeterminate ? 'minus' : 'ic_check_square'),
    [indeterminate]
  );

  const memorizedWrapperStyle = useMemo(() => {
    return {
      height: sizeBox ? sizeBox : size,
      width: sizeBox ? sizeBox : size
    };
  }, [size, sizeBox]);

  // When colorProp and effects are disabled, check rerender.
  const color = useMemo(() => {
    if (disabled) return colorDisabledProp ? colorDisabledProp : colors.gray;

    return colorProp || colors.primary;
  }, [colorProp, disabled, colorDisabledProp]);

  const borderColor = useInterpolateColor(
    progress,
    [0, 1],
    [defaultColor, checkedColor ? checkedColor : color]
  );
  const backgroundColor = useInterpolateColor(
    progress,
    [0, 1],
    [disabled ? disabledColor : colors.transparent, color]
  );

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}]
  }));

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
      backgroundColor: !outline
        ? backgroundColor.value
        : colors.transparent
    };
  }, [color]);

  const handleChangeValue = () => {
    if (disabled) return;
    // handle animation when onPress on Pressable
    isPressed.value = !checked;
    onChange?.(!checked);
    // uncontrolled
    setChecked(preChecked => !preChecked);
  };

  // effects
  useEffect(() => setChecked(!!checkedProp), [checkedProp]);

  const _size = sizeProp ? size / 2 : SpacingDefault.small;

  return (
    <Block row alignCenter>
      <Pressable
        disabled={disabledBtn}
        hitSlop={10}
        ref={checkBoxRef}
        onPress={handleChangeValue}
        style={[styles.container, typeCheck === 'radio' ? {transform: [{scale: 1}]} : {}, containerStyle]}
        {...restProps}>
        {typeCheck === 'radio'
          ? (
            <Animated.View style={[styles.wrapperRadio, {borderRadius: _size, width: _size, height: _size}]}>
              <Block h={_size - 1.2} w={_size - 1} borderRadius={_size} bgColor={checked ? colors.primary : theme.backgroundBox} />
            </Animated.View>
          )
          : (
            <Animated.View
              style={[
                styles.wrapper,
                styles.center,
                boxCheckStyle,
                disabled && styles.checkBoxdisabled,
                memorizedWrapperStyle,
                wrapperAnimatedStyle,
                colorDisabledProp ? {opacity: 1} : {}
              ]}>
              <Animated.View style={[styles.center, checkAnimatedStyle]}>
                {checked && <FastImage style={{width: _size, height: _size}} source={images.ic_check} tintColor={(disabled && checkedDisabledColorProp) ? checkedDisabledColorProp : checkedColor ? checkedColor : outline ? color : typeCheck === 'circle' ? (isDark ? colors.black : colors.white) : colors.white} />}
              </Animated.View>
            </Animated.View>
          )}
        {
          isString(label) && (
            <Typo
              style={[styles.checkBoxLabel, labelStyle]}
              text={label}
              preset={labelPreset}
              color={labelColor}
            />
          )
        }
      </Pressable >
      {React.isValidElement(label) && label}
    </Block >
  );
};

const useStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    wrapper: {
      width: CHECKBOX_WIDTH,
      height: CHECKBOX_HEIGHT,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: theme.divider
    },
    checBoxCircle: {
      borderRadius: BORDER_RADIUS_CIRCLE
    },
    checkBoxLabel: {
      marginLeft: SpacingDefault.small
    },
    checkBoxdisabled: {
      borderColor: colors.gray,
      opacity: OPACITY_DISABLED
    },
    wrapperRadio: {
      borderWidth: 0.5,
      borderColor: theme.divider,
      padding: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
};

export default React.forwardRef<View, CheckBoxProps>(CheckBox);
