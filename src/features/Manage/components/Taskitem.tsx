import React from 'react';
import {StyleSheet} from 'react-native';

import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';

interface TaskItemProps {
  item: any;
  index: number;
}

const Taskitem = ({item}: TaskItemProps) => {
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

  // let priorityColor = colors.gray1;
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

  return (
    <Button style={styles.buttonTask} onPress={onTaskDetail}>
      <Typo text={item.title} color={theme.primaryText} preset="b16" />
      <Spacer height={8} />
      <Typo text={formatDate(item.timing.endDate, DATE_FORMAT.FIVE)} color={theme.secondaryText} preset="r14" />
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
    marginBottom: 16,
  },
}));

export default Taskitem;
