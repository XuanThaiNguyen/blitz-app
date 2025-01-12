import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import useDebounce from '../../../hooks/useDebounce';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {actions as UserActions} from '../../../redux/user';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {searchTasks} from '../../../services/api/task';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import TaskItem from '../components/TaskItem';
import {TASKS_BY_STATUS_WITH_SEARCH} from '../constant/Constant';

const SearchTask = () => {
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);
  const {goBack} = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.SearchTask>>();
  const status = route.params?.status || null;
  const projects = route.params?.projects || [];
  const flatlistRef = useRef<FlatList>(null);

  const searchHistories = useAppSelector((_state: AppState) => _state.user.searchHistories || []);

  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [currentStatus, setCurrentStatus] = useState('All');

  const searchDebounced = useDebounce(search, 500);

  // useEffect(() => {
  //   if (isEmpty(searchDebounced) && isEmpty(status)) {
  //     setTasks([])
  //   } else {
  //     onSearchTask();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchDebounced, status]);

  useEffect(() => {
    onSearchTask({filterStatus: currentStatus});
  }, [searchDebounced, status])

  const onSearchTask = async ({filterStatus}: {filterStatus?: any}) => {
    let params: any = {};
    if (!isEmpty(searchDebounced)) {
      params.query = searchDebounced;
    }
    if (filterStatus && filterStatus !== 'All') {
      params.status = filterStatus;
    }
    // params.status = ['NotStartYet', 'InProgress'];
    console.log('queryBuilder(params)', params);

    try {
      const {data} = await searchTasks(params);
      if (data?.status === ApiStatus.OK) {
        console.log('data.data', data.data);

        setTasks(data.data);
      }
    } catch (err) {
      console.log('errerr', err);
    }
  };

  const onSaveSearchKey = (searchKey: string) => () => {
    if (!searchHistories.includes(searchKey)) {
      dispatch(UserActions.setSearchHistories(searchKey));
    }
  };

  const renderItem = ({item}: {item: TaskProps}) => {
    return (
      <TaskItem item={item} style={{marginBottom: 12}} onCustomPress={onSaveSearchKey(item.title)} projects={projects} />
    );
  };

  const renderEmpty = () => {
    return (
      <Block center mTop={'40%'}>
        <FastImage source={isDark ? images.empty_light : images.empty_dark} style={{width: 124, height: 124}} />
        <Spacer height={12} />
        <Typo text="Không tìm thấy kết quả" preset="r14" color={theme.secondaryText} />
      </Block>
    );
  };

  const onDeleteSearchKey = (searchKey: string) => () => {
    dispatch(UserActions.deleteSearchHistories(searchKey));
  };

  const onSetSearch = (searchKey: string) => () => {
    setSearch(searchKey);
  };

  const renderSearchedTasks = useCallback(() => {
    if (isEmpty(searchDebounced)) {
      return !isEmpty(searchHistories) ? (
        <Block paddingHorizontal={SpacingDefault.normal}>
          <Typo text="Recent Searches" preset="b20" color={theme.primaryText} />
          <Spacer height={24} />
          {searchHistories.map((item: string, index: number) => (
            <Block key={`${item}-${index}`} row alignCenter mBottom={12}>
              <Button block onPress={onSetSearch(item)}>
                <Typo text={item} preset="r16" color={theme.primaryText} />
              </Button>
              <Button onPress={onDeleteSearchKey(item)}>
                <FastImage source={images.ic_close} style={{width: 16, height: 16}} />
              </Button>
            </Block>
          ))}
        </Block>
      ) : <></>;
    }

    return (
      <Block>
        {tasks?.length ? (
          <>
            <Block row alignCenter paddingHorizontal={SpacingDefault.normal} justifyContent="space-between">
              <Typo text="Search Results" preset="b20" color={theme.primaryText} />
              <Typo text={`${tasks?.length} ${tasks?.length === 1 ? 'Found' : 'Founds'}`} preset="r16" color={theme.primaryText} />
            </Block>
            <Spacer height={12} />
          </>
        ) : <></>}
        <FlatList
          data={tasks}
          keyExtractor={item => item._id}
          contentContainerStyle={[styles.flatlistContainer, {paddingTop: 12}]}
          ListEmptyComponent={renderEmpty}
          renderItem={renderItem} />
      </Block>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced, tasks, searchHistories]);

  const onSelectTab = (item: any, index: number) => () => {
    setCurrentStatus(item.key);
    flatlistRef.current?.scrollToIndex({animated: true, index, viewPosition: 0.3});
    onSearchTask({filterStatus: item.key});
  }

  const _renderFilterItem = ({item, index}: {item: any; index: number}) => {
    const isSelected = item.key === currentStatus;

    const isLastIndex = index === TASKS_BY_STATUS_WITH_SEARCH.length - 1;

    return (
      <Button onPress={onSelectTab(item, index)} style={{paddingVertical: 8, paddingHorizontal: SpacingDefault.smaller, borderRadius: 6, backgroundColor: isSelected ? theme.backgroundBox : undefined, marginRight: isLastIndex ? SpacingDefault.none : SpacingDefault.smaller}}>
        <Typo text={item.title} preset={isSelected ? 'b16' : 'r16'} color={isSelected ? theme.primaryText : theme.secondaryText} />
      </Button>
    )
  }

  return (
    <Container>
      <InsetSubstitute />
      <Block>
        <Block row alignCenter paddingHorizontal={SpacingDefault.normal}>
          <Block block>
            <TextField
              placeholder={'Search task'}
              value={search}
              onChangeText={setSearch}
              iconLeft={images.ic_search} />
          </Block>
          <Spacer width={'normal'} />
          <Button
            onPress={goBack}
            style={styles.buttonClose}
          >
            <FastImage
              source={images.ic_close}
              style={styles.iconClose}
              tintColor={theme.primaryText}
            />
          </Button>
        </Block>
        <Spacer height={24} />
        <FlatList
          ref={flatlistRef}
          horizontal
          contentContainerStyle={styles.flatlistContainer}
          data={TASKS_BY_STATUS_WITH_SEARCH}
          showsHorizontalScrollIndicator={false}
          renderItem={_renderFilterItem}
        />
        <Spacer height={24} />
        {renderSearchedTasks()}
      </Block>
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  buttonClose: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: theme.backgroundBox,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.divider,
  },
  iconClose: {
    width: 16,
    height: 16,
  },
  flatlistContainer: {
    paddingHorizontal: SpacingDefault.normal
  }
}));

export default SearchTask;
