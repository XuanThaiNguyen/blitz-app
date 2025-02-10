import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {DeviceEventEmitter, Keyboard, StyleSheet, TouchableNativeFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Yup from 'yup';

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
import {COLORS} from '../constant/Constant';

const SIZE = (SpacingDefault.width - SpacingDefault.medium * 2 - moderateScale(64)) / 5;

interface CreateProjectForm {
  title: string;
  description?: string;
}

const CreateProject = () => {
  const {theme} = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const {values, handleSubmit, errors, touched, handleBlur, handleChange} = useFormik<CreateProjectForm>({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Trường này bắt buộc')
    }),
    onSubmit: () => onAddProject()
  })

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
      title: values.title,
      color: !isEmpty(color) ? color : COLORS[randomColorIndex],
    };
    if (!isEmpty(values.description)) {
      params.description = values.description;
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
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <Block block paddingHorizontal={SpacingDefault.medium}>
          <Typo preset="r16" color={theme.primaryText}>Title <Typo preset="r16" color={colors.primary}>*</Typo></Typo>
          <Spacer height={8} />
          <TextField
            value={values.title}
            onBlur={handleBlur('title')}
            onChangeText={handleChange('title')}
            placeholder="Enter project name"
            error={errors?.title && touched?.title}
            errorMessage={errors?.title}
          />
          <Spacer height={24} />
          <Typo preset="r16" color={theme.primaryText} text="Description" />
          <Spacer height={8} />
          <TextField
            value={values.description || ''}
            onBlur={handleBlur('description')}
            onChangeText={handleChange('description')}
            placeholder="Enter project name"
            error={errors?.description && touched?.description}
            errorMessage={errors?.description}
          />
          <Spacer height={24} />
          <Typo text="Tag Color Mark" preset="r16" color={theme.primaryText} />
          <Spacer height={16} />
          <Block row alignCenter flexWrap="wrap">
            {COLORS.map(renderColorItem)}
          </Block>
        </Block>
      </TouchableNativeFeedback>
      <Button
        loading={loading}
        preset="primary"
        text="Create"
        style={styles.buttonAdd}
        disabled={isEmpty(values.title)}
        onPress={handleSubmit} />
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
  },
  iconAdd: {
    width: 16,
    height: 16
  }
});

export default CreateProject;
