import React from 'react';
import {StyleSheet} from 'react-native';

import {Block} from '../../../components/Block/Block';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';

interface TaskItemProps {
  item: any;
  index: number;
}

const Taskitem = ({item}: TaskItemProps) => {
  const {theme} = useTheme();

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
    <Block styleOverride={styles.block} paddingHorizontal={SpacingDefault.normal} pVer={16} borderRadius={6} bgColor={theme.backgroundBox} mBottom={16}>
      <Typo text={item.title} color={theme.primaryText} preset="b16" />
      <Spacer height={8} />
      <Typo text={formatDate(item.timing.endDate, DATE_FORMAT.FIVE)} color={theme.secondaryText} preset="r14" />
      {/* <Block row alignCenter>
        <FastImage source={iconTime} style={{width: 16, height: 16}} tintColor={iconColor} />
        <Spacer width={'small'} />
        <FastImage source={images.ic_today} style={{width: 16, height: 16}} tintColor={priorityColor} />
      </Block> */}
    </Block>
  );
};

const styles = StyleSheet.create({
  block: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
});

export default Taskitem;
