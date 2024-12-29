import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
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
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import FilterTimeItem from '../components/FilterTimeItem';
import Taskitem from '../components/Taskitem';
import {TIME_PROJECT_DEFAULT} from '../constant/Constant';

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

  const renderItem = ({item, index}: {item: any, index: number}) => <Taskitem item={item} index={index} />;

  const onSearchTask = () => {
    navigate(Screen.SearchTask);
  };

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Block h={52} row alignCenter>
        <Block row alignCenter block>
          <FastImage source={{uri: user?.profileInfo.avatar}} style={styles.avatar} resizeMode="contain" />
          <Spacer width={'small'} />
          <Button style={styles.buttonSearch} onPress={onSearchTask}>
            <FastImage source={images.search} style={styles.iconSearch} tintColor={theme.secondaryText} />
            <Spacer width={'small'} />
            <Typo text="Search" preset="r16" color={theme.secondaryText} />
          </Button>
        </Block>
      </Block>
      <Spacer height={32} />
      <Block row alignCenter flexWrap="wrap">
        {TIME_PROJECT_DEFAULT.map((item, index) => <FilterTimeItem key={item.title} item={item} index={index} />)}
      </Block>
      <Spacer height={24} />
      <Block row alignCenter overflow="hidden">
        <Typo text="Tasks" preset="b14" color={theme.secondaryText} />
        <Spacer width={'small'} />
        <Divider width={'100%'} height={1} />
      </Block>
      <Spacer height={24} />
      <FlatList data={tasks} keyExtractor={item => item._id} renderItem={renderItem} />

      <Button style={styles.buttonAdd} onPress={onAddTask}>
        <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.white} />
      </Button>
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
  icon: {
    width: 20,
    height: 20,
  },
  avatar: {
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
}));

export default Manage;
