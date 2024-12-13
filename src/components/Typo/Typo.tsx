// import {t} from 'i18n-js';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';

import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
} from 'react-native';

import {TypoPresets} from './Typo.preset';
import {TypoProps} from './Typo.props';
import {useTheme} from '../../context/ThemeProvider';
import {enhance, propsToStyle} from '../../utils/handleStyle';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TypoComponent = (props: TypoProps) => {
  const {theme} = useTheme();

  // state
  const {
    // tx,
    // txOptions,
    text,
    children,
    flex,
    fontSize,
    fontWeight,
    color = theme.primaryText,
    center,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    preset = 'body12',
    style: styleOverride = {},
    applyDisabledStyle,
    ...rest
  } = props;
  // const i18nText = useMemo(() => tx && t(tx, txOptions), [tx, txOptions, t]);
  // const content = useMemo(
  //   () => i18nText || text || children,
  //   [i18nText, text, children]
  const content = useMemo(() => text || children, [text, children]);

  const styleComponent = useMemo(
    () =>
      enhance<StyleProp<TextStyle>>([
        preset && TypoPresets()?.[preset],
        fontSize && {fontSize: fontSize},
        [
          flex === true && styles.flex,
          center && {textAlign: 'center'},
          propsToStyle([
            {color},
            {fontWeight},
            {textAlign},
            {textTransform},
            {fontStyle},
            {letterSpacing},
            {lineHeight},
          ]),
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      preset,
      fontSize,
      fontWeight,
      color,
      center,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
      styleOverride,
    ],
  );

  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      disabled={applyDisabledStyle}
      {...rest}
      style={[styleComponent]}>
      {content}
    </ReactNativeText>
  );
};
export const Typo = memo(TypoComponent, equals);
