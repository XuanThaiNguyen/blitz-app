import React from 'react';
import {StyleSheet} from 'react-native';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {SpacingDefault} from '../../../themes/Spacing';

interface SelectOptionProps {
  value: string;
  title: string;
  onSelect?: () => void;
}

const SelectOption = ({value = '', title = '', onSelect}: SelectOptionProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Block>
      <Typo text={title} preset="r12" color={theme.primaryText} />
      <Spacer height={8} />
      <Button onPress={onSelect} style={styles.button}>
        <Typo text={value} preset="r14" color={theme.primaryText} />
      </Button>
    </Block>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundInput,
    paddingHorizontal: SpacingDefault.small,
    height: 44,
  },
}));

export default SelectOption;
