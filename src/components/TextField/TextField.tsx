import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
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
  mode = 'default',
}: TextFieldProps) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <Block>
      {!!title && (
        <>
          <Typo text={title} preset="b24" color={theme.primaryText} />
          <Spacer height={8} />
        </>
      )}
      <Block
        borderRadius={8}
        paddingVertical={16}
        row
        alignCenter
        bgColor={
          mode === 'default' ? theme.backgroundInput : colors.transparent
        }>
        {!!iconLeft && (
          <>
            <Spacer width="small" />
            <FastImage source={iconLeft} style={styles.icon} tintColor={theme.secondaryText} />
          </>
        )}
        <Spacer width="small" />
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          placeholderTextColor={theme.secondaryText}
          style={[styles.input, error && styles.errorInput]}
        />
        <Spacer height={4} />
        {error && <Typo text={errorMessage} color={colors.red} />}
      </Block>
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
    errorInput: {
      borderColor: colors.red,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });

export default TextField;
