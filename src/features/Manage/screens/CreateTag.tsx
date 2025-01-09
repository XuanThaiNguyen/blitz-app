import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {ProjectProps} from '../../../model/Project.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjects, updateProjectById} from '../../../services/api/project';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {moderateScale} from '../../../utils/handleResponsive';
import {isEmpty} from '../../../utils/handleUtils';
import SelectOption from '../components/SelectOption';
import SelectProjectModal from '../components/SelectProjectModal';
import {COLORS, initialCreateTaskForm, validationCreateTaskSchema} from '../constant/Constant';
import {CreateTaskFormProps} from '../constant/Model.props';

const SIZE = (SpacingDefault.width - SpacingDefault.medium * 2 - moderateScale(64)) / 5;

const CreateTag = () => {
  const {theme} = useTheme();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.CreateTask>>();
  const projectId = route.params?.projectId || '';

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
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isProjectVisible, setIsProjectVisible] = useState(false);

  const openProjectModal = () => setIsProjectVisible(true);
  const closeProjectModal = () => setIsProjectVisible(false);

  useEffect(() => {
    onGetProjects();
  }, [projectId]);

  const onGetProjects = async () => {
    try {
      const {data} = await getProjects();
      if (data?.status === ApiStatus.OK) {
        setProjects(data.data);
        if (!isEmpty(projectId)) {
          const _project = data.data.find((item: ProjectProps) => item._id === projectId);
          if (!isEmpty(_project)) {
            setProject(_project);
          }
        } else {
          const defaultProject = data.data.find((item: ProjectProps) => item.projectInfo.isDefaultProject);
          if (!isEmpty(defaultProject)) {
            setProject(defaultProject);
          }
        }
      }
    } catch (err) {

    }
  };

  const onSelectColor = (_color: string) => () => {
    if (color === _color) return;
    setColor(_color);
  };

  const onSelectProject = (item: ProjectProps) => {
    setProject(item);
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

  const onAddTag = async () => {
    setLoading(true);
    const randomColorIndex = Math.floor(Math.random() * 20);
    const newTagColor: any = {
      name: getValues().title,
      color: !isEmpty(color) ? color : COLORS[randomColorIndex],
    };
    let projectTags = project?.tags || [];
    const params = {
      tags: [...projectTags, newTagColor]
    };
    try {
      const {data} = await updateProjectById(project?._id!, params);
      if (data.status === ApiStatus.OK && !isEmpty(data.data)) {
        setTimeout(() => {
          alertBottomModal({
            title: 'Success',
            message: 'Create Tag Successfully',
            status: 'success',
            dismissable: true,
            onCustomXPress: () => {
              DeviceEventEmitter.emit(EmitterKeys.RELOAD_PROJECTS);
            },
          });
        }, 500);
      }
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Create Tag" />
      <Spacer height={24} />
      <Block block paddingHorizontal={SpacingDefault.medium}>
        <Typo preset="r12" color={theme.primaryText}>Title <Typo preset="r12" color={colors.primary}>*</Typo></Typo>
        <Spacer height={8} />
        <Controller
          name="title"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter tag name"
              error={errors?.title}
              errorMessage={errors?.title?.message}
            />
          )}
        />
        <Spacer height={16} />
        <SelectOption title="Project" value={project?.projectInfo.title || ''} onSelect={openProjectModal} isOptional={false} />
        <Spacer height={16} />
        <Typo text="Tag Color Mark" preset="r16" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row alignCenter flexWrap="wrap">
          {COLORS.map(renderColorItem)}
        </Block>
      </Block>
      <Button preset="primary" text="Create" loading={loading} style={styles.buttonAdd} onPress={handleSubmit(onAddTag)} />
      <InsetSubstitute type="bottom" />

      <SelectProjectModal selectedProject={project} projects={projects} onSelectProject={onSelectProject} isVisible={isProjectVisible} onCloseModal={closeProjectModal} />
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
  }
});

export default CreateTag;
