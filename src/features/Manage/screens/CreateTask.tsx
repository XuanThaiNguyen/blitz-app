import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {DeviceEventEmitter, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useFormik} from 'formik';
import {isEqual} from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import ClockModal from '../../../components/ClockModal/ClockModal';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {createTask, updateTaskById} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import {NONE_VALUE} from '../../../themes/Constant';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {isEmpty} from '../../../utils/handleUtils';
import SelectOption from '../components/SelectOption';
import SelectPriorityModal from '../components/SelectPriorityModal';
import SelectProjectModal from '../components/SelectProjectModal';
import SelectTimeModal from '../components/SelectTimeModal';
import {initialCreateTaskForm, validationCreateTaskSchema} from '../constant/Constant';
import {CreateTaskFormProps, PriorityProps} from '../constant/Model.props';

export const getDifferencesFromRoot = (root: any, obj: any) => {
  let differences: any = {};

  for (let key in obj) {
    if (key in root) {
      if (typeof root[key] === 'object' && typeof obj[key] === 'object' && !Array.isArray(root[key])) {
        // Recursively compare nested objects
        let nestedDiff = getDifferencesFromRoot(root[key], obj[key]);
        if (Object.keys(nestedDiff).length > 0) {
          differences[key] = nestedDiff;
        }
      } else if (root[key] !== obj[key]) {
        // Add to differences if values are different
        differences[key] = obj[key];
      }
    } else {
      // Key is in obj but not in root
      differences[key] = obj[key];
    }
  }

  return differences;
}


const CreateTask = () => {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {navigate, goBack} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.CreateTask>>();
  const existingTaskRef = useRef<any>(null);

  const userProjects = useAppSelector((state: AppState) => state.user.projects || []);

  const isEdit = route.params?.isEdit || false;
  const existingTask = route.params?.task || null;
  const taskId = route.params?.taskId || '';

  const {
    values,
    setValues,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit
  } = useFormik<CreateTaskFormProps>({
    initialValues: initialCreateTaskForm,
    validationSchema: validationCreateTaskSchema,
    onSubmit: (values) => {
      isEdit ? onUpdateTask(values) : onCreateTask(values)
    },
  });

  useEffect(() => {
    if (isEdit) {
      const _existingProject = userProjects.find(item => item._id === existingTask?.project?._id);
      const _existingTask = {
        project: _existingProject,
        title: existingTask?.title,
        description: existingTask?.description,
        priority: existingTask?.priority,
        startDate: existingTask?.startDate,
        endDate: existingTask?.endDate
      }
      setValues((prev: any) => ({
        ...prev,
        ..._existingTask
      }));
      existingTaskRef.current = _existingTask;
    } else {
      setValues(prev => ({...prev, project: userProjects[0]}));
    }
  }, [isEdit, existingTask])

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'start' | 'end'>('start');

  const [isPriorityVisible, setIsPriorityVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isClockVisible, setIsClockVisible] = useState(false);

  const openProjectModal = () => setIsProjectVisible(true);
  const closeProjectModal = () => setIsProjectVisible(false);

  const openClockModal = (mode: 'start' | 'end') => () => {
    setMode(mode);
    setIsClockVisible(true);
  };
  const closeClockModal = () => setIsClockVisible(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

  const openTimeModal = (mode: 'start' | 'end') => () => {
    setMode(mode);
    setIsTimeVisible(true);
  };
  const closeTimeModal = () => setIsTimeVisible(false);

  const onSelectPriority = (item: PriorityProps) => {
    setValues(prev => ({...prev, priority: item.key}));
  };

  const onSelectProject = (item: ProjectProps) => {
    setValues(prev => ({...prev, project: item}));
  };

  const onSelectDate = (date: Date) => {
    if (mode === 'start') {
      setValues(prev => ({...prev, startDate: new Date(date)}));
    } else {
      setValues(prev => ({...prev, endDate: new Date(date)}));
    }
  };

  const onSelectTime = (time: number | string) => {
    let _time = time;
    if (+time < 10) {
      _time = `0${time}`
    }

    // @ts-ignore
    let date = mode === 'start' ? new Date(values.startDate) : new Date(values.endDate);
    date?.setHours(+_time, 0, 0, 0);
    mode === 'start' ? setValues(prev => ({...prev, startDate: new Date(date)})) : setValues(prev => ({...prev, endDate: new Date(date)}));;
  };

  const onUpdateTask = async (values: CreateTaskFormProps) => {
    setLoading(true);
    const differences = getDifferencesFromRoot(existingTaskRef.current, values);

    try {
      const {data} = await updateTaskById(taskId, differences);
      if (data.status === ApiStatus.OK && !isEmpty(data.data)) {
        setTimeout(() => {
          alertBottomModal({
            title: 'Success',
            message: 'Update Task Successfully',
            status: 'success',
            dismissable: true,
            onCustomXPress: () => {
              goBack();
              DeviceEventEmitter.emit(EmitterKeys.RELOAD_TASK_DETAIL);
            },
          });
        }, 500);
      }
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }

  const onCreateTask = async (values: CreateTaskFormProps) => {
    setLoading(true);
    let _timing: any = {};
    if (values.startDate) {
      _timing.startDate = values.startDate;
    }
    if (values.endDate) {
      _timing.endDate = values.endDate;
    }
    let params: any = {
      title: values.title,
      timing: _timing,
      priority: values.priority,
      projectId: values.project?._id,
    };
    if (!isEmpty(values.description)) {
      params.description = values.description;
    }

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
                  times: 2
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

  const onClearDate = (mode: 'start' | 'end') => () => {
    if (mode === 'start') {
      setValues(prev => ({...prev, startDate: ''}));
    } else {
      setValues(prev => ({...prev, endDate: ''}));
    }
  };

  const shouldDisableButton = useMemo(() => {
    if (isEdit) {
      return isEmpty(values.title) || isEqual(values, existingTaskRef.current)
    } else {
      return isEmpty(values.title)
    }
  }, [isEdit, values])

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader={isEdit ? 'Edit Task' : 'Create Task'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Spacer height={16} />
          <SelectOption isEdit={isEdit} title="Project" value={values.project?.projectInfo?.title || ''} onSelect={openProjectModal} isOptional={false} />
          <Spacer height={16} />
          <Typo preset="r14" color={theme.primaryText}>Title <Typo preset="r14" color={colors.primary}>*</Typo></Typo>
          <Spacer height={8} />
          <TextField
            value={values.title || ''}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            placeholder="Enter task name"
            error={errors?.title && touched?.title}
            errorMessage={errors?.title}
          />
          <Spacer height={16} />
          <Typo preset="r14" color={theme.primaryText}>Description</Typo>
          <Spacer height={8} />
          <TextField
            value={values.description || ''}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            multiline
            inputHeight={100}
            blockInputStyle={styles.blockInput}
            placeholder="Enter task description"
            error={errors?.description && touched?.description}
            errorMessage={errors?.description}
          />
          <Spacer height={16} />
          <SelectOption title="Priority" value={values.priority} onSelect={openPriorityModal} isOptional={false} />
          <Spacer height={16} />
          <Typo preset="r14" color={theme.primaryText}>Start Date</Typo>
          <Spacer height={8} />
          <Block row alignCenter>
            <Block block style={styles.button}>
              <Typo text={values.startDate ? formatDate(values.startDate, DATE_FORMAT.THIRD) : NONE_VALUE} preset="r16" />
              {values.startDate ? (
                <Button onPress={onClearDate('start')}>
                  <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
                </Button>
              ) : <></>}
            </Block>
            <Spacer width={'smaller'} />
            <Button onPress={openTimeModal('start')} style={styles.buttonTimeModal}>
              <FastImage source={images.ic_calendar} style={styles.iconCalendar} tintColor={theme.primaryText} />
            </Button>
            <Spacer width={'smaller'} />
            <Button onPress={openClockModal('start')} style={styles.buttonTimeModal}>
              <FastImage source={images.ic_pomodoro} style={styles.iconCalendar} tintColor={theme.primaryText} />
            </Button>
          </Block>
          <Spacer height={16} />
          <Typo preset="r14" color={theme.primaryText}>End Date</Typo>
          <Spacer height={8} />
          <Block row alignCenter>
            <Block block style={styles.button}>
              <Typo text={values.endDate ? formatDate(values.endDate, DATE_FORMAT.THIRD) : NONE_VALUE} preset="r16" />
              {values.endDate ? (
                <Button onPress={onClearDate('end')}>
                  <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
                </Button>
              ) : <></>}
            </Block>
            <Spacer width={'smaller'} />
            <Button onPress={openTimeModal('end')} style={styles.buttonTimeModal}>
              <FastImage source={images.ic_calendar} style={styles.iconCalendar} tintColor={theme.primaryText} />
            </Button>
            <Spacer width={'smaller'} />
            <Button onPress={openClockModal('end')} style={styles.buttonTimeModal}>
              <FastImage source={images.ic_pomodoro} style={styles.iconCalendar} tintColor={theme.primaryText} />
            </Button>
          </Block>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Button
        mTop={16}
        mBottom={insets.bottom + 16}
        mHoz={SpacingDefault.medium}
        preset="primary"
        disabled={shouldDisableButton}
        text={isEdit ? 'Edit Task' : "Create Task"}
        onPress={handleSubmit}
        loading={loading} />

      <SelectTimeModal
        minDate={formatDate(new Date(), DATE_FORMAT.FOUR)}
        title={'Select Due Date'}
        mode="single"
        isVisible={isTimeVisible}
        onCloseModal={closeTimeModal}
        onSelectTime={onSelectDate} />
      <ClockModal
        isVisible={isClockVisible}
        onCloseModal={closeClockModal}
        onChange={onSelectTime} />

      <SelectProjectModal
        selectedProject={values.project}
        projects={userProjects}
        onSelectProject={onSelectProject}
        isVisible={isProjectVisible}
        onCloseModal={closeProjectModal} />
      <SelectPriorityModal
        priority={values.priority}
        onSelectPriority={onSelectPriority}
        isVisible={isPriorityVisible}
        onCloseModal={closePriorityModal} />
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.backgroundInput,
    paddingHorizontal: SpacingDefault.small,
    height: 44,
  },
  scrollViewContainer: {
    paddingHorizontal: SpacingDefault.normal
  },
  blockInput: {
    alignItems: 'flex-start',
    paddingTop: 8
  },
  iconClose: {
    width: 16,
    height: 16
  },
  buttonTimeModal: {
    height: 44,
    width: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.divider,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCalendar: {
    width: 24,
    height: 24
  }
}))

export default CreateTask;
