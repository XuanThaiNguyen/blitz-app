import React, {useEffect, useMemo, useRef, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import {Divider} from '../../../components/Divider/DIvider'
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute'
import {Spacer} from '../../../components/Spacer/Spacer'
import TabByLabel from '../../../components/TabByLabel/TabByLabel'
import {Typo} from '../../../components/Typo/Typo'
import {useTheme} from '../../../context/ThemeProvider'
import {TaskProps} from '../../../model/Task.props'
import {ApiStatus} from '../../../services/api/ApiStatus'
import {getTasks} from '../../../services/api/task'
import colors from '../../../themes/Colors'
import images from '../../../themes/Images'
import {SpacingDefault} from '../../../themes/Spacing'
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime'
import TaskItem from '../../Manage/components/TaskItem'
import {getDaysInMonth, WEEKDAYS} from '../constant/Constant'

const Schedule = () => {
  const {theme, isDark} = useTheme();
  const flatlistRef = useRef<FlatList<any>>(null);

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isList, setIsList] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => {
    loadData();
  }, [selectedDate])

  useEffect(() => {
    setTimeout(() => {
      scrollToCurrentDay();
    }, 300)
  }, [])

  const scrollToCurrentDay = () => {
    const today = new Date();
    const currentDate = today.getDate();
    flatlistRef.current?.scrollToIndex({animated: true, index: currentDate - 2, viewPosition: 0.3});
  }

  const loadData = async () => {
    try {
      const {data: dataTasks} = await getTasks();
      if (dataTasks?.status === ApiStatus.OK && dataTasks?.data?.length > 0) {
        let todayTasks: TaskProps[] = [];
        dataTasks?.data?.map((item: TaskProps) => {
          if (item.timing?.startDate && formatDate(selectedDate, DATE_FORMAT.FIRST) === formatDate(item.timing?.startDate, DATE_FORMAT.FIRST)) {
            todayTasks.push(item);
          }
          if (item.timing?.endDate && formatDate(selectedDate, DATE_FORMAT.FIRST) === formatDate(item.timing?.endDate, DATE_FORMAT.FIRST)) {
            todayTasks.push(item);
          }
          return todayTasks;
        })
        setTasks(todayTasks);
      }
    } catch (err) {

    }
  }

  const {days} = getDaysInMonth(selectedDate)

  const daysOfMonth = useMemo(() => {
    const _days: string[] = [];
    for (let i = 1; i <= days; i++) {
      _days.push(i.toString());
    }
    return _days;
  }, [days])

  const _renderItem = ({item}: {item: string, index: number}) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), Number(item));
    const dateToNumber = date.getDate();
    const weekDay = date.getDay();
    const isToday = new Date().toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dateToNumber).toDateString();
    const isSelectedDate = new Date(selectedDate).toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dateToNumber).toDateString();
    const _day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dateToNumber)

    return (
      <Button
        onPress={onSelectDate(_day, dateToNumber)}
        buttonColor={isSelectedDate ? colors.primary : theme.background}
        center
        key={item}
        mRight={Number(item) === days ? SpacingDefault.none : SpacingDefault.normal}
        style={styles.dayStyle}
        height={ITEM_HEIGHT}
        width={ITEM_WIDTH}>
        <Typo text={`${dateToNumber}`} color={isSelectedDate ? colors.white : isToday ? colors.primary : theme.primaryText} preset="b18" />
        <Spacer height={4} />
        <Typo text={`${WEEKDAYS[weekDay]}`} color={isSelectedDate ? colors.white : theme.secondaryText} preset="b14" />

        {/* {isToday ? <Block w={6} h={6} borderRadius={4} bgColor={colors.primary} position="absolute" alignCenter top={6} /> : <></>} */}
      </Button>
    )
  }

  const onSelectDate = (_day: Date, _index: number) => () => {
    setSelectedDate(_day);
    flatlistRef.current?.scrollToIndex({animated: true, index: _index - 2, viewPosition: 0.3});
  }

  const onChangeMonth = (unit: 'add' | 'minus') => () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + (unit === 'minus' ? -1 : 1), 1));
  }

  const _renderTask = ({item}: {item: TaskProps}) => <TaskItem item={item} style={styles.taskItem} />

  const _renderEmpty = () => {
    return (
      <Block center mTop={24}>
        <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
        <Spacer height={12} />
        <Typo text="You have no tasks right now" preset="r16" color={theme.primaryText} center />
        <Spacer height={12} />
      </Block>
    )
  }

  return (
    <Block block>
      <InsetSubstitute />
      <Spacer height={16} />
      <Block row alignCenter mHoz={SpacingDefault.normal}>
        <TabByLabel labels={['List', 'Month']} isCollapse={isList} onTab={(index) => setIsList(!!index)} />
      </Block>
      <Spacer height={24} />
      <Block mHoz={SpacingDefault.normal} row alignCenter justifyContent="space-between">
        <Button onPress={onChangeMonth('minus')}>
          <FastImage source={images.ic_left} style={styles.iconLeft} tintColor={theme.primaryText} />
        </Button>
        <Typo text={selectedDate.toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        })} color={theme.primaryText} preset="b18" />
        <Button onPress={onChangeMonth('add')}>
          <FastImage source={images.ic_left} style={styles.iconRight} tintColor={theme.primaryText} />
        </Button>
      </Block>
      <Spacer height={16} />
      <Divider height={1} />
      <Spacer height={16} />
      <Block>
        <FlatList
          ref={flatlistRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={daysOfMonth}
          contentContainerStyle={styles.calendarContainer}
          keyExtractor={(item) => item.toString()}
          renderItem={_renderItem} />
      </Block>
      <Spacer height={16} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={_renderEmpty}
        renderItem={_renderTask}
        contentContainerStyle={styles.flatlistContainer} />
    </Block>
  )
}

const ITEM_WIDTH = 52;
const ITEM_HEIGHT = 72;

const styles = StyleSheet.create({
  taskItem: {
    marginBottom: 16,
    marginHorizontal: SpacingDefault.normal,
  },
  iconEmpty: {
    width: 168,
    height: 168
  },
  iconLeft: {
    width: 28,
    height: 28
  },
  iconRight: {
    width: 28,
    height: 28,
    transform: [{rotate: '180deg'}]
  },
  dayStyle: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendarContainer: {
    paddingHorizontal: SpacingDefault.normal
  },
  flatlistContainer: {
    paddingTop: 16
  }
})

export default Schedule