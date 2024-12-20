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

const CreateTask = () => {
  const {theme} = useTheme();

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('No Priority');
  const [tags, setTags] = useState([]);

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
      <SelectOption title="Priority" value={priority} />
      <Spacer height={16} />
      <SelectOption title="Tags" value={tags?.length === 0 ? '-' : ''} />
    </Block>
  );
};

export default CreateTask;
