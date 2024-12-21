import React, {useState} from 'react';
import {Block} from '../../../components/Block/Block';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Typo} from '../../../components/Typo/Typo';
import colors from '../../../themes/Colors';
import {useTheme} from '../../../context/ThemeProvider';
import FastImage from 'react-native-fast-image';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {TIME_PROJECT_DEFAULT} from '../constant/Constant';
import FilterTimeItem from '../components/FilterTimeItem';
import Button from '../../../components/Button/Button';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Screen from '../../../navigation/Screen';
import {MainStackScreenProps} from '../../../navigation/MainStackSCreenProps';

const Manage = () => {
  const {theme} = useTheme();
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const [search, setSearch] = useState('');

  const onAddTask = () => {
    navigate(Screen.CreateTask);
  };

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Block row alignCenter justifyContent="space-between">
        <FastImage source={images.setting} style={styles.icon} tintColor={colors.primary} />
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
      <Typo text="Tasks" preset="b14" color={theme.secondaryText} />
      <Spacer height={24} />

      <Button style={styles.buttonAdd} onPress={onAddTask}>
        <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.white} />
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
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
