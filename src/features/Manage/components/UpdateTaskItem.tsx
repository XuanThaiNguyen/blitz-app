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
  iconTitle: string;
  canEdit?: boolean;
  onEdit?: () => void;
}

const UpdateTaskItem = ({title, value, iconTitle, canEdit, onEdit}: UpdateTaskItemProps) => {
  const {theme} = useTheme();

  return (
    <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
      <Block row alignCenter>
        <FastImage source={iconTitle || images.ic_logo} style={styles.icon} tintColor={theme.primaryText} />
        <Spacer width={'small'} />
        <Typo text={title} color={theme.primaryText} preset="r16" />
      </Block>
      <Block row alignCenter>
        <Typo text={value} preset="b16" color={theme.primaryText} />
        {canEdit ? (
          <>
            <Spacer width={'small'} />
            <Button onPress={onEdit}>
              <FastImage source={images.ic_edit} style={{width: 16, height: 16}} tintColor={theme.primaryText} />
            </Button>
          </>
        ) : <></>}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default UpdateTaskItem;
