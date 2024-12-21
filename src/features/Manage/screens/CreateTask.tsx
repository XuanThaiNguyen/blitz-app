import React, {useState} from 'react';
import {Block} from '../../../components/Block/Block';
import {Typo} from '../../../components/Typo/Typo';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import Header from '../../../components/Header/Header';
import {SpacingDefault} from '../../../themes/Spacing';
import {Spacer} from '../../../components/Spacer/Spacer';
import {useTheme} from '../../../context/ThemeProvider';
import TextField from '../../../components/TextField/TextField';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import SelectOption from '../components/SelectOption';
import {PriorityProps} from '../constant/Model.props';
import SelectPriorityModal from '../components/SelectPriorityModal';
import {PRIORITIES} from '../constant/Constant';
import SelectTagModal from '../components/SelectTagModal';

const CreateTask = () => {
  const {theme} = useTheme();

  const [title, setTitle] = useState('');
  const [dueDate] = useState(new Date());
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [tags, setTags] = useState<string[]>([]);

  const [isPriorityVisible, setIsPriorityVisible] = useState(false);
  const [isTagVisible, setIsTagVisible] = useState(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

  const openTagModal = () => setIsTagVisible(true);
  const closeTagModal = () => setIsTagVisible(false);

  const onSelectPriority = (item: PriorityProps) => {
    setPriority(item);
  };
  const onSelectTag = (item: string) => {
    setTags(prev => ([...prev, item]));
  };

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Header titleHeader="Create Task" />
      <Spacer height={24} />
      <Typo text="Title" preset="m18" color={theme.primaryText} />
      <Spacer height={8} />
      <TextField value={title} placeholder={'Enter task name'} onChangeText={setTitle} />
      <Spacer height={16} />
      <SelectOption title="Due Date" value={formatDate(dueDate, DATE_FORMAT.FIRST)} />
      <Spacer height={16} />
      <SelectOption title="Priority" value={priority.value} onSelect={openPriorityModal} />
      <Spacer height={16} />
      <SelectOption title="Tags" value={tags?.length === 0 ? '-' : ''} onSelect={openTagModal} />

      <SelectPriorityModal priority={priority} onSelectPriority={onSelectPriority} isVisible={isPriorityVisible} onCloseModal={closePriorityModal} />
      <SelectTagModal tags={tags} onSelectTag={onSelectTag} isVisible={isTagVisible} onCloseModal={closeTagModal} />
    </Block>
  );
};

export default CreateTask;
