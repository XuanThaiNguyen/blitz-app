import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {createProject} from '../../../services/api/project';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {moderateScale} from '../../../utils/handleResponsive';
import {isEmpty} from '../../../utils/handleUtils';
import {COLORS, initialCreateTaskForm, validationCreateTaskSchema} from '../constant/Constant';
import {CreateTaskFormProps} from '../constant/Model.props';

const SIZE = (SpacingDefault.width - SpacingDefault.medium * 2 - moderateScale(64)) / 5;

const CreateProject = () => {
  const {theme} = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<CreateTaskFormProps>({
    defaultValues: initialCreateTaskForm,
    resolver: yupResolver(validationCreateTaskSchema),
  });

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
            <FastImage source={images.ic_check} style={styles.iconCheck} tintColor={theme.backgroundBox} />
          </Block>
        ) : <></>}
      </Button>
    );
  };

  const onAddProject = async () => {
    setLoading(true);

    const randomColorIndex = Math.floor(Math.random() * 20);
    const params: any = {
      title: getValues().title,
      color: !isEmpty(color) ? color : COLORS[randomColorIndex],
    };
    if (!isEmpty(getValues().description)) {
      params.description = getValues().description;
    }

    try {
      const {data} = await createProject(params);
      if (data?.status === ApiStatus.OK) {
        alertBottomModal({
          title: 'Success',
          message: 'Create Project Successfully',
          status: 'success',
          dismissable: true,
          onCustomXPress: () => {
            goBack();
            DeviceEventEmitter.emit(EmitterKeys.RELOAD_PROJECTS);
          },
          buttons: [
            {
              text: 'Go to Project Detail',
              preset: 'primary',
              onPress: () => {
                DeviceEventEmitter.emit(EmitterKeys.RELOAD_PROJECTS);
                navigate(Screen.ProjectDetail, {
                  projectId: data.data._id,
                  fromScreen: Screen.CreateProject,
                  times: 2,
                });
              },
            },
          ],
        });
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
        <Typo preset="r16" color={theme.primaryText}>Title <Typo preset="r16" color={colors.primary}>*</Typo></Typo>
        <Spacer height={8} />
        <Controller
          name="title"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter project name"
              error={errors?.title}
              errorMessage={errors?.title?.message}
            />
          )}
        />
        <Spacer height={16} />
        <Typo preset="r16" color={theme.primaryText} text="Description" />
        <Spacer height={8} />
        <Controller
          name="description"
          control={control}
          render={({field: {onChange, onBlur, value = ''}}) => (
            <TextField
              multiline
              value={value}
              inputHeight={88}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter project description"
              error={errors?.description}
              errorMessage={errors?.description?.message}
              style={styles.input}
              blockInputStyle={styles.blockInput}
            />
          )}
        />
        <Spacer height={16} />
        <Typo text="Tag Color Mark" preset="r16" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row alignCenter flexWrap="wrap">
          {COLORS.map(renderColorItem)}
        </Block>
      </Block>
      <Button loading={loading} preset="primary" text="Create" style={styles.buttonAdd} onPress={handleSubmit(onAddProject)} />
      <InsetSubstitute type="bottom" />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    marginHorizontal: SpacingDefault.medium,
  },
  iconCheck: {
    width: 24,
    height: 24
  },
  input: {
    textAlignVertical: 'top'
  },
  blockInput: {
    alignItems: 'flex-start',
    paddingTop: 8
  }
});

export default CreateProject;
