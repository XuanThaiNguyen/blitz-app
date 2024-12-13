import React, {forwardRef, memo, useMemo} from 'react';
import {BlockProps} from './Block.props';
import equals from 'react-fast-compare';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {enhance, propsToStyle} from '../../utils/handleStyle';
// import {ThemeContext} from 'react-native-elements';

const BlockComponent = forwardRef((props: BlockProps, ref: React.Ref<View>) => {
  // const {theme} = useContext(ThemeContext);
  const {
    w,
    h,
    block,
    flex,
    row,
    alignCenter,
    justifyCenter,
    center,
    bgColor,
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
    margin,
    padding,
    borderRadius,
    borderWidth,
    borderStyle,
    borderColor,
    borderBottomWidth,
    borderBottomColor,
    alignItems,
    alignSelf,
    justifyContent,
    selfCenter,
    children,
    shadow,
    shadowConfig,
    styleOverride,
    style,
    position,
    flexWrap,
    left,
    right,
    bottom,
    top,
    zIndex,
    overflow,
    opacity,
    flexGrow,
    display,
    ...more
  } = props;

  const styleComponent = useMemo(
    () =>
      enhance<StyleProp<TextStyle>>([
        [
          block && styles.block,
          row && styles.row,
          alignCenter && styles.alignCenter,
          justifyCenter && styles.justifyCenter,
          center && styles.center,
          w && {width: w},
          h && {height: h},
          bgColor && {backgroundColor: bgColor},
          mTop && {marginTop: mTop},
          mBottom && {marginBottom: mBottom},
          mLeft && {marginLeft: mLeft},
          mRight && {marginRight: mRight},
          mHoz && {marginHorizontal: mHoz},
          mVer && {marginVertical: mVer},
          pHoz && {paddingHorizontal: pHoz},
          pVer && {paddingVertical: pVer},
          selfCenter && styles.selfCenter,
          shadow && {...styles.shadow, ...shadowConfig},
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
          borderRadius && {
            borderRadius: borderRadius,
          },
          propsToStyle([
            {margin},
            {justifyContent},
            {alignItems},
            {flex},
            {position},
            {left},
            {right},
            {bottom},
            {top},
            {zIndex},
            {overflow},
            {opacity},
            {flexWrap},
            {borderBottomWidth},
            {borderBottomColor},
            {flexGrow},
            {alignSelf},
            {display},
            {borderColor},
            {borderStyle},
            {borderWidth},
          ]),
          enhance([style, styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      display,
      style,
      alignSelf,
      borderStyle,
      flexGrow,
      borderBottomWidth,
      borderBottomColor,
      flexWrap,
      left,
      right,
      bottom,
      top,
      zIndex,
      overflow,
      opacity,
      position,
      block,
      row,
      alignCenter,
      justifyCenter,
      center,
      flex,
      w,
      h,
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
      margin,
      padding,
      bgColor,
      borderRadius,
      borderWidth,
      borderColor,
      alignItems,
      justifyContent,
      shadow,
      shadowConfig,
      styleOverride,
      selfCenter,
    ],
  );

  return (
    <View style={[styleComponent]} {...more} ref={ref}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  shadow: {
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
});

export const Block = memo(BlockComponent, equals);
