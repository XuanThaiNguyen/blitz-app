import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import colors from '../../../themes/Colors';
import {NONE_VALUE} from '../../../themes/Constant';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';

interface SelectOptionProps {
  value: string;
  title: string;
  onSelect?: () => void;
  isOptional?: boolean;
  onClearValue?: () => void;
}

const SelectOption = ({value = '', title = '', onSelect, isOptional = true, onClearValue}: SelectOptionProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Block>
      {isOptional ? (
        <Typo text={title} preset="r12" color={theme.primaryText} />
      ) : (
        <Typo preset="r12" color={theme.primaryText}>{title} <Typo preset="r12" color={colors.primary}>*</Typo></Typo>
      )}
      <Spacer height={8} />
      <Button onPress={onSelect} style={styles.button}>
        <Typo text={value} preset="r14" color={theme.primaryText} />
        {isOptional && !isEmpty(value) && value !== NONE_VALUE ? (
          <Button onPress={onClearValue} hitSlop={5}>
            <FastImage source={images.ic_close} style={styles.icon} tintColor={theme.secondaryText} />
          </Button>
        ) : (
          <FastImage source={images.ic_arrow_down} style={styles.icon} tintColor={theme.secondaryText} />
        )}
      </Button>
    </Block>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.backgroundInput,
    paddingHorizontal: SpacingDefault.small,
    height: 44,
  },
  icon: {
    width: 16,
    height: 16,
  },
}));

export default SelectOption;
