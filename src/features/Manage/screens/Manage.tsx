import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {showLoginModal} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {AppState} from '../../../redux/reducer';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import FilterTimeItem from '../components/FilterTimeItem';
import {TIME_PROJECT_DEFAULT} from '../constant/Constant';

const Manage = () => {
  const {theme} = useTheme();
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const user = useSelector((state: AppState) => state.user.user);

  const [search, setSearch] = useState('');

  const onAddTask = () => {
    if (!user) {
      return showLoginModal();
    }
    navigate(Screen.CreateTask);
  };

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Block row alignCenter justifyContent="space-between">
        <FastImage source={images.ic_logo} style={styles.icon} tintColor={colors.primary} />
        <Typo text="Blitz" preset="b24" color={theme.primaryText} />
        <FastImage source={images.notification} style={styles.icon} tintColor={theme.primaryText} />
      </Block>
      <Spacer height={16} />
      <TextField
        iconLeft={images.search}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <Spacer height={24} />
      <Block row alignCenter flexWrap="wrap">
        {TIME_PROJECT_DEFAULT.map((item, index) => <FilterTimeItem key={item.title} item={item} index={index} />)}
      </Block>
      <Spacer height={16} />
      <Block row alignCenter overflow="hidden">
        <Typo text="Tasks" preset="b14" color={theme.secondaryText} />
        <Spacer width={'small'} />
        <Divider width={'100%'} height={1} />
      </Block>
      <Spacer height={24} />

      <Button style={styles.buttonAdd} onPress={onAddTask}>
        <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.white} />
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
  icon: {
    width: 20,
    height: 20,
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
});

export default Manage;
