import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {createProject} from '../../../services/api/project';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {moderateScale} from '../../../utils/handleResponsive';
import {COLORS} from '../constant/Constant';

const SIZE = (SpacingDefault.width - SpacingDefault.medium * 2 - moderateScale(64)) / 5;

const CreateProject = () => {
  const {theme} = useTheme();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const onSelectColor = (_color: string) => () => {
    if (color === _color) return;
    setColor(_color);
  };

  const renderColorItem = (item: string, index: number) => {
    const _bottom = 12;
    const _right = (index + 1) % 5 === 0 ? SpacingDefault.none : SpacingDefault.normal;

    return (
      <Button key={item} onPress={onSelectColor(item)}>
        <Block
          w={SIZE}
          h={SIZE}
          borderRadius={SIZE / 2}
          bgColor={item}
          mBottom={_bottom}
          mRight={_right}
        />
        {item === color ? (
          <Block center position="absolute" top={0} right={_right} bottom={_bottom} left={0}>
            <FastImage source={images.ic_check} style={{width: 24, height: 24}} tintColor={theme.backgroundBox} />
          </Block>
        ) : <></>}
      </Button>
    );
  };

  const onAddProject = async () => {
    setLoading(true);
    const params = {
      title,
      color,
    };

    try {
      const {data} = await createProject(params);
      if (data?.status === ApiStatus.OK) {
        console.log('data', data);
      }
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Create Project" />
      <Spacer height={24} />
      <Block block paddingHorizontal={SpacingDefault.medium}>
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
      <Button loading={loading} preset="primary" text="Add" style={styles.btuttonAdd} onPress={onAddProject} />
      <InsetSubstitute type="bottom" />
    </Container>
  );
};

const styles = StyleSheet.create({
  btuttonAdd: {
    marginHorizontal: SpacingDefault.medium,
  },
});

export default CreateProject;
