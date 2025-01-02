import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {showLoginModal} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getTasks} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import FilterTimeItem from '../components/FilterTimeItem';
import TaskItem from '../components/TaskItem';
import {TIME_PROJECT_DEFAULT} from '../constant/Constant';
import {TaskProps} from '../../../model/Task.props';

const Manage = () => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const user = useAppSelector((state: AppState) => state.user.user);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!isEmpty(user)) {
      onGetTasks();
    }
  }, [user]);

  useEffect(() => {
    const taskListener = DeviceEventEmitter.addListener(EmitterKeys.RELOAD_TASKS, onGetTasks);
    return () => {
      taskListener.remove();
    };
  }, []);

  const onAddTask = () => {
    if (!user) {
      return showLoginModal();
    }
    navigate(Screen.CreateTask);
  };

  const onGetTasks = async () => {
    try {
      const {data} = await getTasks();
      if (data?.status === ApiStatus.OK) {
        setTasks(data?.data);
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const renderItem = ({item}: {item: TaskProps}) => <TaskItem item={item} style={styles.taskItem} />;

  const onSearchTask = () => {
    navigate(Screen.SearchTask);
  };

  const onLogin = () => {
    showLoginModal();
  };

  return (
    <Container>
      <InsetSubstitute />
      <Block h={52} row alignCenter paddingHorizontal={SpacingDefault.medium}>
        <Block row alignCenter block>
          {!isEmpty(user?.profileInfo.avatar) ? (
            <FastImage source={{uri: user?.profileInfo.avatar}} style={styles.avatarUser} resizeMode="contain" />
          ) : (
            <Button style={styles.buttonAvatar} onPress={onLogin}>
              <FastImage source={images.ic_personal} style={styles.iconAvatar} tintColor={theme.secondaryText} />
            </Button>
          )}
          <Spacer width={'small'} />
          <Button style={styles.buttonSearch} onPress={onSearchTask}>
            <FastImage source={images.ic_search} style={styles.iconSearch} tintColor={theme.secondaryText} />
            <Spacer width={'small'} />
            <Typo text="Search" preset="r16" color={theme.secondaryText} />
          </Button>
        </Block>
      </Block>
      <Spacer height={32} />
      <Block row alignCenter flexWrap="wrap" paddingHorizontal={SpacingDefault.medium}>
        {TIME_PROJECT_DEFAULT.map((item, index) => <FilterTimeItem key={item.title} item={item} index={index} />)}
      </Block>
      <Spacer height={24} />
      <Block row alignCenter overflow="hidden" paddingHorizontal={SpacingDefault.medium}>
        <Typo text="Tasks" preset="b14" color={theme.secondaryText} />
        <Spacer width={'small'} />
        <Divider width={'100%'} height={1} />
      </Block>
      <Spacer height={24} />
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={renderItem} />

      <Button style={styles.buttonAdd} onPress={onAddTask}>
        <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.white} />
      </Button>
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  avatarUser: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  buttonAdd: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 16,
    right: SpacingDefault.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdd: {
    width: 36,
    height: 36,
  },
  buttonSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundBox,
    flex: 1,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: SpacingDefault.small,
  },
  iconSearch: {
    width: 20,
    height: 20,
  },
  buttonAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAvatar: {
    width: 24,
    height: 24,
  },
  taskItem: {
    marginBottom: 16,
    marginHorizontal: SpacingDefault.medium,
  },
}));

export default Manage;
