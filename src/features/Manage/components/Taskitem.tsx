import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {TaskProps} from '../../../model/Task.props';

interface TaskItemProps {
  item: TaskProps;
  style?: StyleProp<ViewStyle>;
}

const TaskItem = ({item, style}: TaskItemProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  const onTaskDetail = () => {
    navigationRef.current?.navigate(Screen.TaskDetail, {taskId: item._id});
  };

  // let iconTime = images.ic_planned, iconColor = colors.orange;
  // const hours = moment(item.timing.endDate).diff(moment(new Date()), 'hours');
  // if (hours < 24) {
  //   iconTime = images.ic_today;
  //   iconColor = colors.green;
  // } else if (hours < 48) {
  //   iconTime = images.ic_tomorrow;
  //   iconColor = colors.blue;
  // } else if (hours < 168) {  // 7 days
  //   iconTime = images.ic_week;
  //   iconColor = colors.purple;
  // }

  // let priorityColor = colors.gray;
  // switch (item.priority) {
  //   case 'Low':
  //     priorityColor = colors.priorityLow;
  //     break;
  //   case 'Medium':
  //     priorityColor = colors.priorityMedium;
  //     break;
  //   case 'High':
  //     priorityColor = colors.priorityHigh;
  //     break;
  //   case 'Critical':
  //     priorityColor = colors.priorityCritical;
  //     break;
  //   default:
  //     break;
  // }

  const renderTime = () => {
    let _time = formatDate(item?.timing?.startDate || item?.timing?.endDate, DATE_FORMAT.FIVE);
    if (item?.timing?.startDate && item?.timing?.endDate) {
      _time = `${formatDate(item?.timing?.startDate, DATE_FORMAT.FIVE)} - ${formatDate(item?.timing?.endDate, DATE_FORMAT.FIVE)}`;
    }
    return (
      <Typo text={_time} color={theme.secondaryText} preset="r14" />
    );
  };

  return (
    <Button style={[styles.buttonTask, style]} onPress={onTaskDetail}>
      <Typo text={item.title} color={theme.primaryText} preset="b16" />
      <Spacer height={8} />
      {renderTime()}
      {/* <Block row alignCenter>
        <FastImage source={iconTime} style={{width: 16, height: 16}} tintColor={iconColor} />
        <Spacer width={'small'} />
        <FastImage source={images.ic_today} style={{width: 16, height: 16}} tintColor={priorityColor} />
      </Block> */}
    </Button>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  buttonTask: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingHorizontal: SpacingDefault.normal,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.backgroundBox,
  },
}));

export default TaskItem;
