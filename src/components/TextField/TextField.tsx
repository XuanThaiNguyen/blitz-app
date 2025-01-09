import React from 'react';
import {StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Theme, useTheme} from '../../context/ThemeProvider';
import colors from '../../themes/Colors';
import {Block} from '../Block/Block';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';
import {FontSizeDefault} from '../Typo/TypoSize';

interface TextFieldProps extends TextInputProps {
  value: string;
  error?: any;
  errorMessage?: string;
  placeholder?: string;
  editable?: boolean;
  iconLeft?: any;
  title?: string;
  mode?: 'default' | 'no-border';
  inputHeight?: number;
  multiline?: boolean;
  inputStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  blockInputStyle?: StyleProp<ViewStyle>;
}

const TextField = ({
  value,
  onBlur,
  onChangeText,
  error,
  errorMessage,
  placeholder,
  editable,
  iconLeft,
  title,
  inputHeight = 44,
  mode = 'default',
  multiline = false,
  inputStyle,
  blockInputStyle,
}: TextFieldProps) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <Block>
      {!!title && (
        <>
          <Typo text={title} preset="b16" color={theme.primaryText} />
          <Spacer height={8} />
        </>
      )}
      <Block
        borderRadius={8}
        h={inputHeight}
        row
        borderWidth={1}
        borderColor={error ? colors.red : colors.transparent}
        alignCenter
        bgColor={mode === 'default' ? theme.backgroundBox : colors.transparent}
        styleOverride={blockInputStyle}>
        {!!iconLeft && (
          <>
            <Spacer width="small" />
            <FastImage source={iconLeft} style={styles.icon} tintColor={theme.secondaryText} />
          </>
        )}
        <Spacer width="small" />
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          onBlur={onBlur}
          multiline={multiline}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          placeholderTextColor={theme.secondaryText}
          style={[styles.input, inputStyle]}
        />
      </Block>
      {error ? (
        <Block>
          <Spacer height={4} />
          <Typo text={errorMessage} preset="r12" color={colors.red} />
        </Block>
      ) : <></>}
    </Block>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      flex: 1,
      fontSize: FontSizeDefault.FONT_16,
      color: theme.primaryText,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });

export default TextField;
