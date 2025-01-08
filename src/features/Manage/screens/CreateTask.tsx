import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DeviceEventEmitter, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
import {getProjects} from '../../../services/api/project';
import {createTask} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import {NONE_VALUE} from '../../../themes/Constant';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {isEmpty} from '../../../utils/handleUtils';
import SelectOption from '../components/SelectOption';
import SelectPriorityModal from '../components/SelectPriorityModal';
import SelectProjectModal from '../components/SelectProjectModal';
import SelectStatusModal from '../components/SelectStatusModal';
import SelectTagModal from '../components/SelectTagModal';
import SelectTimeModal from '../components/SelectTimeModal';
import {initialCreateTaskForm, PRIORITIES, STATUSES, validationCreateTaskSchema} from '../constant/Constant';
import {CreateTaskFormProps, PriorityProps, StatusProps} from '../constant/Model.props';

const CreateTask = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const {navigate, goBack} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.CreateTask>>();
  const {projectId = ''} = route.params;

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<CreateTaskFormProps>({
    defaultValues: initialCreateTaskForm,
    resolver: yupResolver(validationCreateTaskSchema),
  });

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [status, setStatus] = useState(STATUSES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  const [isPriorityVisible, setIsPriorityVisible] = useState(false);
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);

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

  const openProjectModal = () => setIsProjectVisible(true);
  const closeProjectModal = () => setIsProjectVisible(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

  // const openStatusModal = () => setIsStatusVisible(true);
  const closeStatusModal = () => setIsStatusVisible(false);

  const openTagModal = () => setIsTagVisible(true);
  const closeTagModal = () => setIsTagVisible(false);

  const openTimeModal = () => {
    setIsTimeVisible(true);
  };
  const closeTimeModal = () => setIsTimeVisible(false);

  const onSelectPriority = (item: PriorityProps) => {
    setPriority(item);
  };

  const onSelectProject = (item: ProjectProps) => {
    setProject(item);
  };

  const onSelectStatus = (item: StatusProps) => {
    setStatus(item);
  };

  const onSelectTag = (item: string) => {
    setTags(prev => ([...prev, item]));
  };

  const onSelectTime = (date: {startDate: Date, endDate: Date}) => {
    if (!isEmpty(date.startDate)) {
      setStartDate(new Date(date.startDate));
    }
    if (!isEmpty(date.endDate)) {
      setEndDate(new Date(date.endDate));
    }
  };

  const onCreateTask = async () => {
    setLoading(true);
    let _timing: any = {};
    if (startDate) {
      _timing.startDate = moment(startDate).startOf('day').toDate();
      _timing.endDate = moment(startDate).endOf('day').toDate();
    }
    if (endDate) {
      _timing.endDate = moment(endDate).endOf('day').toDate();
    }
    // estimation: getEstimationDays(endDate),
    const params = {
      title: getValues().title,
      timing: _timing,
      priority: priority.key,
      projectId: project?._id,
    };
    console.log('params', params);

    try {
      const {data} = await createTask(params);
      if (data?.data) {
        alertBottomModal({
          title: 'Success',
          message: 'Create Task Successfully',
          status: 'success',
          dismissable: true,
          onCustomXPress: () => {
            goBack();
            DeviceEventEmitter.emit(EmitterKeys.RELOAD_TASKS);
          },
          buttons: [
            {
              text: 'Go to Task Detail',
              preset: 'primary',
              onPress: () => {
                DeviceEventEmitter.emit(EmitterKeys.RELOAD_TASKS);
                navigate(Screen.TaskDetail, {
                  taskId: data.data._id,
                  fromScreen: Screen.CreateTask,
                  times: 2,
                  project: project!,
                });
              },
            },
          ],
        });
      }
    } catch (err: any) {
      alertBottomModal({
        title: 'Fail',
        message: err?.message || 'Create Task Failed',
        status: 'error',
        dismissable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onClearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };


  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Create Task" />
      <Spacer height={24} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                placeholder="Enter task name"
                error={errors?.title}
                errorMessage={errors?.title?.message}
              />
            )}
          />
          {/* <TextField value={title} placeholder={'Enter task name'} onChangeText={setTitle} /> */}
          <Spacer height={16} />
          <SelectOption title="Project" value={project?.projectInfo.title || ''} onSelect={openProjectModal} isOptional={false} />
          <Spacer height={16} />
          <SelectOption title="Priority" value={priority.value} onSelect={openPriorityModal} isOptional={false} />
          <Spacer height={16} />
          <SelectOption title="Due Date" value={endDate && startDate ? `${formatDate(startDate, DATE_FORMAT.FIRST)} - ${formatDate(endDate, DATE_FORMAT.FIRST)}` : (!endDate && startDate) ? formatDate(startDate, DATE_FORMAT.FIRST) : NONE_VALUE} onSelect={openTimeModal} onClearValue={onClearDate} />
          <Spacer height={16} />
          <SelectOption title="Tags" value={tags?.length === 0 ? NONE_VALUE : ''} onSelect={openTagModal} />
        </Block>
      </TouchableWithoutFeedback>
      <Button mHoz={SpacingDefault.medium} preset="primary" text="Create Task" onPress={handleSubmit(onCreateTask)} loading={loading} />
      <Spacer height={insets.bottom + 16} />

      <SelectTimeModal
        minDate={new Date()}
        title={'Select Due Date'}
        mode="multiple"
        isVisible={isTimeVisible}
        onCloseModal={closeTimeModal}
        onSelectTime={onSelectTime} />
      <SelectPriorityModal priority={priority.key} onSelectPriority={onSelectPriority} isVisible={isPriorityVisible} onCloseModal={closePriorityModal} />
      <SelectStatusModal status={status} onSelectStatus={onSelectStatus} isVisible={isStatusVisible} onCloseModal={closeStatusModal} />
      <SelectTagModal tags={tags} onSelectTag={onSelectTag} isVisible={isTagVisible} onCloseModal={closeTagModal} />
      <SelectProjectModal selectedProject={project} projects={projects} onSelectProject={onSelectProject} isVisible={isProjectVisible} onCloseModal={closeProjectModal} />
    </Container>
  );
};

export default CreateTask;
