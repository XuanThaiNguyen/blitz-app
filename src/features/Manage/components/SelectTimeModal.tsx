import moment from 'moment';
import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {FontSizeDefault} from '../../../components/Typo/TypoSize';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import colors from '../../../themes/Colors';
import {calendarHeaderWeekDay} from '../../../themes/Constant';
import {FontDefault} from '../../../themes/Font';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';

interface SelectTimeModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  mode?: 'single' | 'multiple'; // default: single;
  minDate?: Date;
  title?: string;
  onSelectTime?: (
    time?: any,
    date?: {
      startDate: string;
      endDate: string;
    },
  ) => void;
}

const SelectTimeModal = ({isVisible, onCloseModal, mode = 'single', minDate, onSelectTime, title = 'Time'}: SelectTimeModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();

  let calendarDate = useRef(moment()).current;
  let monthCount = useRef(0);

  const [today, setToday] = useState(moment().format(DATE_FORMAT.FOUR));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const onDaySelected = (day: any) => {
    if (mode === 'single') {
      setStartDate(day.dateString);
      setButtonDisabled(false);
      return;
    }

    if (startDate.length === 0) {
      setStartDate(day.dateString);
      setButtonDisabled(false);
      return;
    }

    if (endDate.length === 0) {
      const selectedDay = Date.parse(day.dateString);
      const selectedStartDate = Date.parse(startDate);
      setButtonDisabled(false);
      if (selectedDay === selectedStartDate) {
        return;
      } else if (selectedDay < selectedStartDate) {
        setStartDate(day.dateString);
        setEndDate(startDate);
      } else {
        setEndDate(day.dateString);
      }
      return;
    }

    if (startDate.length > 0 && endDate.length > 0) {
      setStartDate(day.dateString);
      setEndDate('');
      setButtonDisabled(false);
      return;
    }
  };

  const convertSingleDayToMarker = () => {
    const objectDay: any = {};
    objectDay[today] = {
      customStyles: {
        container: {
          backgroundColor: theme.background,
        },
        text: {
          color:
            today === formatDate(new Date(), DATE_FORMAT.FOUR)
              ? colors.primary
              : theme.primaryText,
        },
      },
    };
    objectDay[startDate] = {
      customStyles: {
        container: {
          backgroundColor: colors.primary,
          borderRadius: 3,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          color: theme.background,
        },
      },
    };
    return objectDay;
  };

  const convertDaysToMarker = (days: any) => {
    return days.reduce((object: any, element: any) => {
      return (
        (object[element] = {
          startingDay: startDate === element ? true : false,
          endingDay: endDate === element ? true : false,
          color:
            startDate === element || endDate === element
              ? colors.primary
              : 'rgba(0, 122, 255, 0.1)',
          textColor:
            startDate === element || endDate === element
              ? theme.background
              : theme.primaryText,
          customContainerStyle: {
            borderTopLeftRadius: startDate === element ? 3 : 0,
            borderBottomLeftRadius: startDate === element ? 3 : 0,
            borderTopRightRadius: endDate === element ? 3 : 0,
            borderBottomRightRadius: endDate === element ? 3 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }),
        object
      );
    }, {});
  };

  const dateRange = () => {
    const start = moment(startDate);
    const end = moment(endDate);

    let list = [];
    for (var current = start; current <= end; current.add(1, 'd')) {
      list.push(current.format(DATE_FORMAT.FOUR));
    }
    return list;
  };

  const onPreviousMonth = () => {
    calendarDate = calendarDate.add(-1, 'month');
    monthCount.current = monthCount.current - 1;
    setToday(calendarDate.format(DATE_FORMAT.FOUR));
  };

  const onNextMonth = () => {
    calendarDate = calendarDate.add(1, 'month');
    monthCount.current = monthCount.current + 1;
    setToday(calendarDate.format(DATE_FORMAT.FOUR));
  };

  const renderArrow = (direction: any) => (
    <FastImage
      source={images.ic_left}
      style={[styles.iconArrow, direction === 'right' ? styles.rightArrow : styles.leftArrow]}
      tintColor={theme.secondaryText}
    />
  );

  const onConfirm = () => {
    onSelectTime?.(mode === 'single' ? startDate : {startDate, endDate});
    onCloseModal();
  };

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SpacingDefault.height}
      deviceWidth={SpacingDefault.width}
      style={styles.modal}
      onBackdropPress={onCloseModal}
      avoidKeyboard={false}
      onModalHide={onCloseModal}
      backdropOpacity={0.4}
    >
      <Block style={styles.block}>
        <Spacer height={32} />
        <Button onPress={onCloseModal} style={styles.buttonClose}>
          <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
        </Button>
        <Spacer height={24} />
        <Typo text={title} preset="b20" color={theme.primaryText} />
        <Spacer height={24} />
        <Calendar
          initialDate={today}
          onDayPress={onDaySelected}
          markingType={endDate.length === 0 ? 'custom' : 'period'}
          markedDates={
            endDate.length === 0
              ? convertSingleDayToMarker()
              : convertDaysToMarker(dateRange())
          }
          firstDay={1}
          minDate={minDate}
          style={styles.calendar}
          renderArrow={renderArrow}
          onPressArrowLeft={onPreviousMonth}
          onPressArrowRight={onNextMonth}
          theme={{
            ...calendarHeaderWeekDay,
            calendarBackground: theme.background,
            dayTextColor: theme.primaryText,
            arrowColor: theme.secondaryText,
            textDayHeaderFontSize: FontSizeDefault.FONT_12,
            textDayHeaderFontFamily: FontDefault.Bold,
            textDayHeaderFontWeight: '600',
            textDayFontSize: FontSizeDefault.FONT_14,
            textDayFontFamily: FontDefault.Regular,
            textDisabledColor: theme.secondaryText,
            textMonthFontSize: FontSizeDefault.FONT_16,
            textMonthFontFamily: FontDefault.Bold,
            textMonthFontWeight: '600',
            monthTextColor: theme.primaryText,
            todayTextColor: colors.primary,
          }}
        />
        <Spacer height={32} />
        <Button preset="primary" text="Confirm" onPress={onConfirm} disabled={buttonDisabled} />
        <Spacer height={insets.bottom + 16} />
      </Block>
    </RNModal>
  );
};

const useStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    buttonClose: {
      alignItems: 'flex-end',
    },
    iconClose: {
      width: 24,
      height: 24,
    },
    block: {
      backgroundColor: theme.background,
      paddingHorizontal: SpacingDefault.medium,
    },
    container: {
      width: '100%',
      justifyContent: 'flex-end',
    },
    contentContainer: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,
      elevation: 15,
    },
    btn: {
      marginHorizontal: SpacingDefault.medium,
    },
    rightArrow: {
      transform: [{scaleX: -1}],
      marginRight: -SpacingDefault.medium,
    },
    leftArrow: {
      marginLeft: -SpacingDefault.medium,
    },
    calendar: {
      backgroundColor: theme.background,
    },
    iconArrow: {
      width: 24,
      height: 24,
    },
  });

export default SelectTimeModal;
