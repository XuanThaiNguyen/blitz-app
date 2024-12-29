import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Block} from '../../../components/Block/Block';

import Button from '../../../components/Button/Button';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
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
import {ACCOUNT_BLOCKS, APP_BLOCKS} from '../constants/Constant';
import {SettingProps} from '../constants/Setting.props';

const Setting = () => {
  const {theme, setScheme, isDark} = useTheme();
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const user = useAppSelector((state: AppState) => state.user.user);

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
          <FastImage source={images.ic_setting} style={styles.icon} tintColor={colors.primary} />
          <Spacer width={'normal'} />
          <Typo text={item.key} preset="b16" color={theme.primaryText} />
        </Block>
        <FastImage source={images.right} style={styles.iconRight} tintColor={theme.primaryText} />
      </Button>
    );
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      const {status} = await http.post(APIs.LOGOUT, {
        userId: user?._id,
      });
      if (status === ApiStatus.OK) {
        dispatch(UserActions.setUser(null));
        if (user?.signinMethod === 'Google') {
          GoogleSignin.signOut();
        }
        reset(Screen.Login);
      }
    } catch (err) {
      // showErrorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Block block>
        <Block row alignCenter justifyContent="space-between">
          <FastImage source={images.setting} style={styles.icon} tintColor={colors.primary} />
          <Typo text="Setting" preset="b24" color={theme.primaryText} />
          <Block />
        </Block>
        <Spacer height={16} />
        {ACCOUNT_BLOCKS.map(renderBlockItem)}
        <Spacer height={16} />
        {APP_BLOCKS.map(renderBlockItem)}
      </Block>
      <Button preset="primary" text="Logout" onPress={onLogout} loading={loading} />
      <Spacer height={16} />
    </Block>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  iconRight: {
    width: 16,
    height: 16,
  },
  blockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Setting;
