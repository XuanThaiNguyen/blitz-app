import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
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
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {createTask} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate, getEstimationDays} from '../../../utils/handleDateTime';
import SelectOption from '../components/SelectOption';
import SelectPriorityModal from '../components/SelectPriorityModal';
import SelectStatusModal from '../components/SelectStatusModal';
import SelectTagModal from '../components/SelectTagModal';
import SelectTimeModal from '../components/SelectTimeModal';
import {PRIORITIES, STATUSES} from '../constant/Constant';
import {PriorityProps, StatusProps} from '../constant/Model.props';

const CreateTask = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const {navigate, goBack} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [status, setStatus] = useState(STATUSES[0]);
  const [tags, setTags] = useState<string[]>([]);

  const [isPriorityVisible, setIsPriorityVisible] = useState(false);
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

  // const openStatusModal = () => setIsStatusVisible(true);
  const closeStatusModal = () => setIsStatusVisible(false);

  const openTagModal = () => setIsTagVisible(true);
  const closeTagModal = () => setIsTagVisible(false);

  const openTimeModal = () => setIsTimeVisible(true);
  const closeTimeModal = () => setIsTimeVisible(false);

  const onSelectPriority = (item: PriorityProps) => {
    setPriority(item);
  };

  const onSelectStatus = (item: StatusProps) => {
    setStatus(item);
  };

  const onSelectTag = (item: string) => {
    setTags(prev => ([...prev, item]));
  };

  const onSelectTime = (time: string) => {
    setDueDate(new Date(time));
  };

  const onCreateTask = async () => {
    setLoading(true);
    const params = {
      title,
      timing: {
        startDate: dueDate,
        estimation: getEstimationDays(dueDate),
      },
      priority: priority.key,
      status: status.key,
    };
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
                navigate(Screen.TaskDetail, {
                  taskId: data.data._id,
                  fromScreen: Screen.CreateTask,
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

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Create Task" />
      <Spacer height={24} />
      <Block block paddingHorizontal={SpacingDefault.medium}>
        <Typo text="Title" preset="r12" color={theme.primaryText} />
        <Spacer height={8} />
        <TextField value={title} placeholder={'Enter task name'} onChangeText={setTitle} />
        <Spacer height={16} />
        <SelectOption title="Due Date" value={formatDate(dueDate, DATE_FORMAT.FIRST)} onSelect={openTimeModal} />
        <Spacer height={16} />
        <SelectOption title="Priority" value={priority.value} onSelect={openPriorityModal} />
        {/* <Spacer height={16} />
        <SelectOption title="Status" value={status.value} onSelect={openStatusModal} /> */}
        <Spacer height={16} />
        <SelectOption title="Tags" value={tags?.length === 0 ? '-' : ''} onSelect={openTagModal} />
      </Block>
      <Button mHoz={SpacingDefault.medium} preset="primary" text="Create Task" onPress={onCreateTask} loading={loading} />
      <Spacer height={insets.bottom + 16} />

      <SelectTimeModal isVisible={isTimeVisible} onCloseModal={closeTimeModal} onSelectTime={onSelectTime} />
      <SelectPriorityModal priority={priority.key} onSelectPriority={onSelectPriority} isVisible={isPriorityVisible} onCloseModal={closePriorityModal} />
      <SelectStatusModal status={status} onSelectStatus={onSelectStatus} isVisible={isStatusVisible} onCloseModal={closeStatusModal} />
      <SelectTagModal tags={tags} onSelectTag={onSelectTag} isVisible={isTagVisible} onCloseModal={closeTagModal} />
    </Container>
  );
};

export default CreateTask;
