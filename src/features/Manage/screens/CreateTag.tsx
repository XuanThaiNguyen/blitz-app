import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {SpacingDefault} from '../../../themes/Spacing';
import {moderateScale} from '../../../utils/handleResponsive';
import {COLORS} from '../constant/Constant';

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
    <Container style={styles.container}>
      <InsetSubstitute />
      <Header titleHeader="Create Tag" />
      <Spacer height={24} />
      <Block block>
        <Typo text="Title" preset="r16" color={theme.primaryText} />
        <Spacer height={8} />
        <TextField value={title} placeholder={'Enter task name'} onChangeText={setTitle} />
        <Spacer height={16} />
        <Typo text="Tag Color Mark" preset="r16" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row alignCenter flexWrap="wrap">
          {COLORS.map(renderColorItem)}
        </Block>
      </Block>
      <Button preset="primary" text="Add" />
      <InsetSubstitute type="bottom" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
});

export default CreateTag;
