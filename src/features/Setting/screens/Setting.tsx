import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import Switch from '../../../components/Switch';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {actions as UserActions} from '../../../redux/user';
import APIs from '../../../services/api/APIs';
import {ApiStatus} from '../../../services/api/ApiStatus';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import http from '../../../utils/http';
import {ACCOUNT_BLOCKS, APP_BLOCKS, WORKSPACE_BLOCKS} from '../constants/Constant';
import {SettingKeyProps, SettingProps} from '../constants/Setting.props';

const Setting = () => {
  const {user} = useAppSelector((_state: AppState) => _state.user || {});
  const {theme, setScheme, isDark} = useTheme();
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const [loading, setLoading] = useState(false);

  const onPressBlock = (item: SettingProps) => () => {
    if (isEmpty(item.screenId)) {
      setScheme(isDark ? 'light' : 'dark');
    } else {
      navigate(item.screenId as any);
    }
  };

  const renderBlockItem = (item: SettingProps) => {
    return (
      <Button style={styles.blockItem} key={item.key} onPress={onPressBlock(item)}>
        <Block row alignCenter>
          <FastImage source={item.icon} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'normal'} />
          <Typo text={item.key} preset="b16" color={theme.primaryText} />
        </Block>
        {item.key === SettingKeyProps.AppAppearance ? (
          <Switch
            checked={false}
            onChange={onPressBlock(item)}
          />
        ) : (
          <FastImage source={images.ic_left} style={styles.iconRight} tintColor={theme.primaryText} />
        )}
      </Button>
    );
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      const {status} = await http.post(APIs.LOGOUT);
      if (status === ApiStatus.OK) {
        dispatch(UserActions.setUser(null));
        GoogleSignin.signOut();
        reset(Screen.Login);
      }
    } catch (err) {
      // showErrorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Spacer height={8} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={8} />
        <Block alignCenter>
          <FastImage source={{uri: user?.profileInfo.avatar || ''}} style={styles.avatar} />
        </Block>
        <Spacer height={12} />
        <Typo center text={user?.profileInfo.fullname || ''} preset="b20" color={theme.primaryText} />
        <Spacer height={4} />
        <Typo center text={user?.profileInfo.email || ''} preset="r16" color={theme.secondaryText} />
        <Spacer height={32} />
        <Typo text="Workspace" preset="b16" color={theme.primaryText} />
        <Spacer height={12} />
        {WORKSPACE_BLOCKS.map(renderBlockItem)}
        <Spacer height={24} />
        <Divider />
        <Spacer height={24} />
        <Typo text="Profile" preset="b16" color={theme.primaryText} />
        <Spacer height={12} />
        {ACCOUNT_BLOCKS.map(renderBlockItem)}
        <Spacer height={24} />
        <Divider />
        <Spacer height={24} />
        <Typo text="General" preset="b16" color={theme.primaryText} />
        <Spacer height={12} />
        {APP_BLOCKS.map(renderBlockItem)}
        <Spacer height={12} />
        <Button style={styles.logout} onPress={onLogout}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <FastImage source={images.ic_save} style={styles.iconLogout} tintColor={colors.primary} />
          )}
          <Spacer width={'normal'} />
          <Typo text={'Logout'} preset="b16" color={colors.primary} />
        </Button>
        <Spacer height={32} />
      </ScrollView>
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
  iconRight: {
    width: 16,
    height: 16,
    transform: [{rotate: '180deg'}],
  },
  blockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLogout: {
    width: 20,
    height: 20,
    transform: [{rotate: '90deg'}],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default Setting;
