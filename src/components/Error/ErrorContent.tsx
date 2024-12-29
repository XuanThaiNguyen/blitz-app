import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useTheme} from '../../context/ThemeProvider';
import images from '../../themes/Images';
import {BaseBottomModalContainer} from '../Modal';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';

interface ErrorContentProps {
  errMsg?: string;
  title: string;
}

const ErrorContent = ({errMsg = 'Unknown Error', title = ''}: ErrorContentProps) => {
  const {theme} = useTheme();

  return (
    <BaseBottomModalContainer>
      <FastImage source={images.ic_faill_cross_circle} style={styles.iconError} />
      <Spacer height={24} />
      <Typo center preset="b20" color={theme.primaryText}>{title}</Typo>
      <Spacer height={12} />
      <Typo center preset="r14" color={theme.secondaryText}>{errMsg}</Typo>
    </BaseBottomModalContainer>
  );
};

const styles = StyleSheet.create({
  iconError: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

export default ErrorContent;
