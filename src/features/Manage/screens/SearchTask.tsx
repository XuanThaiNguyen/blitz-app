import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../../components/Container/Container';
import TextField from '../../../components/TextField/TextField';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {FlatList, StyleSheet} from 'react-native';
import {SpacingDefault} from '../../../themes/Spacing';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import images from '../../../themes/Images';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {isEmpty} from '../../../utils/handleUtils';
import {searchTasks} from '../../../services/api/task';
import useDebounce from '../../../hooks/useDebounce';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {TaskProps} from '../../../model/Task.props';
import TaskItem from '../components/TaskItem';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {actions as UserActions} from '../../../redux/user';

const SearchTask = () => {
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);
  const {goBack} = useNavigation();
  const dispatch = useAppDispatch();

  const searchHistories = useAppSelector((_state: AppState) => _state.user.searchHistories || []);

  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const searchDebounced = useDebounce(search, 500);

  useEffect(() => {
    if (!isEmpty(searchDebounced)) {
      onSearchTask();
    } else {
      setTasks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);

  const onSearchTask = async () => {
    try {
      const {data} = await searchTasks(searchDebounced);
      if (data?.status === ApiStatus.OK && data?.data?.length) {
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
      <TaskItem item={item} style={{marginBottom: 12}} onCustomPress={onSaveSearchKey(item.title)} />
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
        <Block>
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
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem} />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced, tasks, searchHistories]);

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Block row alignCenter>
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
      {renderSearchedTasks()}
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
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
}));

export default SearchTask;
