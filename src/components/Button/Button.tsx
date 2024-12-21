import React, {useMemo, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, ViewStyle} from 'react-native';
import {enhance, onCheckType} from '../../utils/handleStyle';
import {Typo} from '../Typo/Typo';
import colors from '../../themes/Colors';
import {primaryTextChecker, stylesView} from './Button.preset';
import {ButtonProps} from './Button.props';

const Button = (props: ButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const {
    preset = '',
    textPreset = 'b16',
    textColor,
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    buttonColor,
    mTop,
    mBottom,
    mLeft,
    mRight,
    mHoz,
    mVer,
    pTop,
    pBottom,
    pLeft,
    pRight,
    pHoz,
    pVer,
    activeOpacity = 0.5,
    padding = 0,
    disabled = false,
    width,
    height,
    loading,
    hitSlop,
    loadingColor = colors.white,
    onPress,
    block,
    center,
    selfCenter,
    pressedColor,
    ...rest
  } = props;

  // style
  const viewStyle = useMemo(
    () =>
      enhance<ViewStyle>([
        block && {flex: 1},
        center && {alignItems: 'center', justifyContent: 'center'},
        selfCenter && {alignSelf: 'center'},
        preset && stylesView()?.[preset],
        buttonColor && {backgroundColor: buttonColor},
        disabled && {backgroundColor: colors.disabledButton},
        mTop && {marginTop: mTop},
        mBottom && {marginBottom: mBottom},
        mLeft && {marginLeft: mLeft},
        mRight && {marginRight: mRight},
        mHoz && {marginHorizontal: mHoz},
        mVer && {marginVertical: mVer},
        pHoz && {paddingHorizontal: pHoz},
        pVer && {paddingVertical: pVer},
        pBottom && {
          paddingBottom: pBottom,
        },
        pLeft && {
          paddingLeft: pLeft,
        },
        pRight && {
          paddingRight: pRight,
        },
        pTop && {
          paddingTop: pTop,
        },
        padding && {
          padding: padding,
        },
        pressedColor && isPressed && {backgroundColor: pressedColor},
        {padding},
        {width},
        height && {height: height},
        styleOverride as ViewStyle,
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      buttonColor,
      preset,
      styleOverride,
      width,
      height,
      block,
      center,
      isPressed,
    ],
  );

  let content = useMemo(() => {
    let _typoColor = textColor;
    if (primaryTextChecker.includes(preset)) {
      _typoColor = colors.white;
    }
    if (preset === 'outline') {
      _typoColor = colors.gray;
    }

    if (preset === 'outlineChip') {
      _typoColor = colors.black;
    }

    return (
      children || (
        <Typo
          tx={tx}
          text={text}
          preset={textPreset}
          color={_typoColor}
          style={textStyleOverride}
        />
      )
    );
  }, [children, tx, text, textStyleOverride, textPreset, textColor, preset]);

  const _hitSlop =
    hitSlop !== undefined
      ? onCheckType(hitSlop, 'number')
        ? {top: hitSlop, left: hitSlop, right: hitSlop, bottom: hitSlop}
        : hitSlop
      : undefined;

  const colorLoading = loadingColor;
  if (loading) {
    content = <ActivityIndicator size="small" color={colorLoading} />;
  }
  return (
    <TouchableOpacity
      //@ts-ignore
      hitSlop={_hitSlop}
      activeOpacity={activeOpacity}
      style={[viewStyle]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...rest}
      disabled={disabled}>
      {content}
    </TouchableOpacity>
  );
};

export default Button;
