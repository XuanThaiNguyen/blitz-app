import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TaskProps} from '../../../model/Task.props';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {AppState} from '../../../redux/reducer';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {getColorsByPriority} from '../../../utils/handleStyle';
import {isEmpty} from '../../../utils/handleUtils';

interface TaskItemProps {
  item: TaskProps;
  style?: StyleProp<ViewStyle>;
  onCustomPress?: () => void;
  projects: ProjectProps[];
  project?: ProjectProps | null;
}

const TaskItem = ({item, style, projects, onCustomPress, project}: TaskItemProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const user = useSelector((_state: AppState) => _state.user.user);

  const onTaskDetail = () => {
    let _project;
    if (!isEmpty(project)) {
      _project = project;
    } else {
      _project = projects?.find((project: ProjectProps) => project._id === item.projectId);
    }
    navigationRef.current?.navigate(Screen.TaskDetail, {taskId: item._id, project: _project});
    onCustomPress?.();
  };

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
    <Button style={[styles.buttonTask, style, {borderLeftColor: getColorsByPriority({priority: item.priority})}]} onPress={onTaskDetail}>
      <Block row alignCenter justifyContent="space-between">
        <FastImage source={{uri: user?.profileInfo?.avatar}} style={{width: 24, height: 24, borderRadius: 12}} />
        <Block row alignCenter>
          <Typo text="1" preset="r14" color={theme.secondaryText} />
          <Spacer width={'tiny'} />
          <FastImage source={images.ic_document} style={{width: 16, height: 16}} tintColor={theme.secondaryText} />
          <Spacer width={'small'} />
          <Typo text="2" preset="r14" color={theme.secondaryText} />
          <Spacer width={'tiny'} />
          <FastImage source={images.ic_comment} style={{width: 16, height: 16}} tintColor={theme.secondaryText} />
        </Block>
      </Block>
      <Spacer height={12} />
      <Typo flex text={item.title} numberOfLines={2} color={theme.primaryText} preset="b16" />
      <Spacer height={4} />
      <Block row alignCenter>
        <FastImage source={images.ic_calendar} style={{width: 16, height: 16}} tintColor={theme.secondaryText} />
        <Spacer width={'smaller'} />
        {renderTime()}
      </Block>
    </Button>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  buttonTask: {
    borderLeftWidth: 4,
    paddingHorizontal: SpacingDefault.normal,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.background,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 1,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
}));

export default TaskItem;
