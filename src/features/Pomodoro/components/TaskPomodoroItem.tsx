import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {TaskProps} from '../../../model/Task.props';
import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';
import {getColorsByPriority} from '../../../utils/handleStyle';

interface TaskPomodoroItemProps {
  task: TaskProps;
  style?: StyleProp<ViewStyle>;
}

const TaskPomodoroItem = ({task, style}: TaskPomodoroItemProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Button style={[styles.buttonTask, style, {borderLeftColor: getColorsByPriority({priority: task.priority})}]}>
      <Block w={24} h={24} bgColor={theme.backgroundBox} borderWidth={3} borderColor={colors.primary} borderRadius={16} center />
      <Spacer width={'small'} />
      <Typo text={task?.title || ''} color={theme.primaryText} preset="b16" flex />
    </Button>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  buttonTask: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    paddingHorizontal: SpacingDefault.normal,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.backgroundBox,
  },
}));

export default TaskPomodoroItem;
