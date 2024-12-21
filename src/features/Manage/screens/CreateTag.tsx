import React, {useState} from 'react';
import {Block} from '../../../components/Block/Block';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import Header from '../../../components/Header/Header';
import {SpacingDefault} from '../../../themes/Spacing';
import {useTheme} from '../../../context/ThemeProvider';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import TextField from '../../../components/TextField/TextField';
import {COLORS} from '../constant/Constant';
import {moderateScale} from '../../../utils/handleResponsive';
import Button from '../../../components/Button/Button';

const SIZE = (SpacingDefault.width - SpacingDefault.medium * 2 - moderateScale(64)) / 5;

const CreateTag = () => {
  const {theme} = useTheme();

  const [title, setTitle] = useState('');

  const renderColorItem = (item: string, index: number) => {
    return (
      <Button key={item}>
        <Block
          w={SIZE}
          h={SIZE}
          borderRadius={SIZE / 2}
          bgColor={item}
          mBottom={12}
          mRight={(index + 1) % 5 === 0 ? SpacingDefault.none : SpacingDefault.normal}
        />
      </Button>
    );
  };

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Header titleHeader="Create Tag" />
      <Spacer height={24} />
      <Block block>
        <Typo text="Title" preset="m18" color={theme.primaryText} />
        <Spacer height={8} />
        <TextField value={title} placeholder={'Enter task name'} onChangeText={setTitle} />
        <Spacer height={16} />
        <Typo text="Tag Color Mark" preset="m18" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row alignCenter flexWrap="wrap">
          {COLORS.map(renderColorItem)}
        </Block>
      </Block>
      <Block row alignCenter>
        <Button preset="primary" text="Cancel" block />
        <Spacer width={'normal'} />
        <Button preset="primary" text="Add" block />
      </Block>
      <InsetSubstitute type="bottom" />
    </Block>
  );
};

export default CreateTag;
