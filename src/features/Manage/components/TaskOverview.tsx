import React from 'react'
import {StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {Theme, useTheme} from '../../../context/ThemeProvider'
import {TaskProps} from '../../../model/Task.props'
import images from '../../../themes/Images'
import {SpacingDefault} from '../../../themes/Spacing'
import {StatusTask} from '../constant/Model.props'

interface TaskOverviewProps {
  tasks: TaskProps[]
}

const TaskOverview = ({tasks}: TaskOverviewProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  const getTasksByStatus = (status: StatusTask) => {
    return tasks.filter(item => item.status === status);
  }

  const toDoTasks = getTasksByStatus(StatusTask.NotStartYet);
  const pendingTasks = getTasksByStatus(StatusTask.Pending);
  const inProgressTasks = getTasksByStatus(StatusTask.InProgress);
  const completedTasks = getTasksByStatus(StatusTask.Done);

  return (
    <Block paddingHorizontal={SpacingDefault.normal}>
      <Typo text="Task Overview" preset="b16" color={theme.primaryText} />
      <Spacer height={24} />
      <Block row alignCenter>
        <Button style={[styles.blockOverview, styles.shadow]}>
          <FastImage source={images.ic_today} style={styles.icon} tintColor={theme.primaryText} />
          <Spacer height={12} />
          <Typo text={`${toDoTasks?.length || 0} ${toDoTasks?.length && toDoTasks?.length > 1 ? 'Tasks' : 'Task'}`} preset="b16" color={theme.primaryText} />
          <Spacer height={4} />
          <Typo text="To do" preset="r14" color={theme.secondaryText} />
        </Button>
        <Spacer width={'small'} />
        <Button style={[styles.blockOverview, styles.shadow]}>
          <FastImage source={images.ic_faill_cross_circle} style={styles.icon} tintColor={theme.primaryText} />
          <Spacer height={12} />
          <Typo text={`${pendingTasks?.length || 0} ${pendingTasks?.length && pendingTasks?.length > 1 ? 'Tasks' : 'Task'}`} preset="b16" color={theme.primaryText} />
          <Spacer height={4} />
          <Typo text="Pending" preset="r14" color={theme.secondaryText} />
        </Button>
      </Block>
      <Spacer height={16} />
      <Block row alignCenter>
        <Button style={[styles.blockOverview, styles.shadow]}>
          <FastImage source={images.ic_planned} style={styles.icon} tintColor={theme.primaryText} />
          <Spacer height={12} />
          <Typo text={`${inProgressTasks?.length || 0} ${inProgressTasks?.length && inProgressTasks?.length > 1 ? 'Tasks' : 'Task'}`} preset="b16" color={theme.primaryText} />
          <Spacer height={4} />
          <Typo text="In Progress" preset="r14" color={theme.secondaryText} />
        </Button>
        <Spacer width={'small'} />
        <Button style={[styles.blockOverview, styles.shadow]}>
          <FastImage source={images.ic_success_check_circle} style={styles.icon} tintColor={theme.primaryText} />
          <Spacer height={12} />
          <Typo text={`${completedTasks?.length || 0} ${completedTasks?.length && completedTasks?.length > 1 ? 'Tasks' : 'Task'}`} preset="b16" color={theme.primaryText} />
          <Spacer height={4} />
          <Typo text="Completed" preset="r14" color={theme.secondaryText} />
        </Button>
      </Block>
      <Spacer height={24} />
    </Block>
  )
}

const useStyles = ((theme: Theme) => StyleSheet.create({
  blockOverview: {
    borderWidth: 1,
    borderColor: theme.divider,
    paddingVertical: 16,
    paddingHorizontal: SpacingDefault.normal,
    flex: 1,
    borderRadius: 12
  },
  icon: {
    width: 24,
    height: 24,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 5
  },
}))

export default TaskOverview