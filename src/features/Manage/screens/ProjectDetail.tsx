import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjectDetailById} from '../../../services/api/project';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {isEmpty} from '../../../utils/handleUtils';
import TaskItem from '../components/TaskItem';

const ProjectDetail = () => {
  const {dispatch, navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.ProjectDetail>>();
  const {times = 1, projectId = ''} = route.params;
  const popActions = StackActions.pop(times);
  const {theme} = useTheme();

  const user = useAppSelector((_state: AppState) => _state.user.user);

  const [project, setProject] = useState<ProjectProps | null>(null);

  const onBack = () => dispatch(popActions);

  useEffect(() => {
    if (!isEmpty(projectId)) {
      onGetProjectDetailById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const onGetProjectDetailById = async () => {
    try {
      const {data} = await getProjectDetailById(projectId);
      if (data.status === ApiStatus.OK) {
        setProject(data.data);
      }
    } catch (err) {

    }
  };

  const onCreateNewTask = () => {
    navigate(Screen.CreateTask, {projectId: project?._id});
  }

  const renderTaskItem = ({item, index}: {item: TaskProps, index: number}) => <TaskItem item={item} style={styles.taskItem} projects={[]} onCustomPress={() => { }} />;

  if (isEmpty(project)) return <></>;

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Project Detail" onPressLeft={onBack} />
      <FastImage source={images.project_cover_default} style={styles.cover} resizeMode="cover" />
      <Spacer height={16} />
      <Block paddingHorizontal={SpacingDefault.medium}>
        <Typo text={project?.projectInfo.title || ''} preset="b16" color={theme.primaryText} />
        <Spacer height={12} />
        <Block row alignCenter>
          <FastImage source={images.ic_calendar} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          <Typo text={formatDate(project?.createdAt!, DATE_FORMAT.FIVE)} preset="r14" color={theme.primaryText} />
        </Block>
        <Spacer height={4} />
        <Block row alignCenter>
          <FastImage source={images.ic_members} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          <FastImage source={{uri: user?.profileInfo?.avatar}} style={styles.avatar} />
        </Block>
        <Spacer height={4} />
        <Block row alignCenter>
          <FastImage source={images.ic_document} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          <Typo text={project?.projectInfo.description || ''} preset="r14" color={theme.primaryText} />
        </Block>
      </Block>
      <Spacer height={16} />
      <Divider height={1} />
      <Spacer height={16} />
      <Block paddingHorizontal={SpacingDefault.medium}>
        <Block row alignCenter justifyContent="space-between">
          <Typo text="Progress" preset="b16" color={theme.primaryText} />
          <Typo text="50%" preset="r16" color={theme.primaryText} />
        </Block>
        <Spacer height={16} />
        <Block w={'100%'} h={6} bgColor={theme.backgroundBox} borderRadius={100}>
          <Block position="absolute" w={'50%'} h={6} top={0} left={0} bgColor={project?.projectInfo.color} styleOverride={styles.progressBar}>
            <Block w={20} h={20} borderRadius={12} borderWidth={6} borderColor={project?.projectInfo.color} bgColor={theme.background} position="absolute" top={-8} right={-8} />
          </Block>
        </Block>
      </Block>
      <Spacer height={16} />
      <Divider height={1} />
      <Spacer height={16} />
      <Block paddingHorizontal={SpacingDefault.medium}>
        <Block row alignCenter justifyContent="space-between">
          <Typo text="Task" preset="b16" color={theme.primaryText} />
          <Button style={styles.buttonAdd} onPress={onCreateNewTask}>
            <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.primary} />
            <Spacer width={'tiny'} />
            <Typo text="Add new" preset="r14" color={colors.primary} />
          </Button>
        </Block>
        <Spacer height={16} />
        <FlatList data={project?.tasks || []} keyExtractor={item => item._id} renderItem={renderTaskItem} />
      </Block>
    </Container>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  iconAdd: {
    width: 16,
    height: 16
  },
  buttonAdd: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cover: {
    width: SpacingDefault.width,
    height: 124
  },
  taskItem: {
    marginBottom: 16
  },
  icon: {
    width: 24,
    height: 24
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  }
});

export default ProjectDetail;
