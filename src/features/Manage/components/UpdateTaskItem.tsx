import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import images from '../../../themes/Images';

interface UpdateTaskItemProps {
  title: string;
  value: string;
  onUpdateTask?: () => void;
  canUpdate?: boolean;
  iconTitle: string;
}

const UpdateTaskItem = ({title, value, onUpdateTask, canUpdate = true, iconTitle}: UpdateTaskItemProps) => {
  const {theme} = useTheme();

  const _onUpdateItem = () => {
    if (!canUpdate) return;
    onUpdateTask?.();
  };

  return (
    <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
      <Block row alignCenter>
        <FastImage source={iconTitle || images.ic_logo} style={styles.icon} tintColor={theme.primaryText} />
        <Spacer width={'small'} />
        <Typo text={title} color={theme.primaryText} preset="r16" />
      </Block>
      <Button style={styles.buttonContent} onPress={_onUpdateItem} activeOpacity={canUpdate ? 0.5 : 1}>
        <Typo text={value} preset="b16" color={theme.primaryText} />
        {canUpdate ? (
          <>
            <Spacer width={'small'} />
            <FastImage source={images.ic_edit} style={styles.icon} tintColor={theme.primaryText} />
          </>
        ) : <></>}
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UpdateTaskItem;
