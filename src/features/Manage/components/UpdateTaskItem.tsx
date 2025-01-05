import React from 'react';
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
  onUpdateTask: () => void;
}

const UpdateTaskItem = ({title, value, onUpdateTask}: UpdateTaskItemProps) => {
  const {theme} = useTheme();

  return (
    <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
      <Block row alignCenter>
        <FastImage source={images.ic_logo} style={{width: 16, height: 16}} tintColor={'red'} />
        <Spacer width={'small'} />
        <Typo text={title} color={theme.primaryText} preset="r16" />
      </Block>
      <Button style={{flexDirection: 'row', alignItems: 'center'}} onPress={onUpdateTask}>
        <Typo text={value} preset="b16" color={theme.primaryText} />
        <Spacer width={'small'} />
        <FastImage source={images.ic_edit} style={{width: 16, height: 16}} tintColor={theme.primaryText} />
      </Button>
    </Block>
  );
};

export default UpdateTaskItem;
