import {NavigationProp, useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {Theme, useTheme} from '../../../context/ThemeProvider'
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps'
import {showLoginModal} from '../../../navigation/navigationUtil'
import Screen from '../../../navigation/Screen'
import {useAppSelector} from '../../../redux/hook'
import {AppState} from '../../../redux/reducer'
import colors from '../../../themes/Colors'
import images from '../../../themes/Images'
import {SpacingDefault} from '../../../themes/Spacing'
import {isEmpty} from '../../../utils/handleUtils'
import ProgressCircle from './ProgressCircle'

const HEIGHT_HEADER = 140;

const ManageHeader = () => {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const user = useAppSelector((state: AppState) => state.user.user);

  const onAccount = () => {
    navigate(Screen.Account);
  }

  const onLogin = () => {
    showLoginModal();
  };

  const onSearchTask = () => {
    navigate(Screen.SearchTask);
  };

  return (
    <Block bgColor={'#d1fae5'} pTop={8} h={HEIGHT_HEADER}>
      <Block
        paddingHorizontal={SpacingDefault.normal}
        paddingVertical={16} w={SpacingDefault.width - SpacingDefault.normal * 2}
        h={HEIGHT_HEADER} position="absolute" bottom={-HEIGHT_HEADER / 2}
        bgColor={colors.white}
        styleOverride={styles.shadow}
        zIndex={100}
        alignSelf="center"
        borderRadius={16}>
        <Block row alignCenter justifyContent="space-between">
          <Typo text="Daily Tasks" preset="r14" color={theme.secondaryText} />
          <Typo text="Task Progress" preset="r14" color={theme.secondaryText} />
        </Block>
        <Spacer height={20} />
        <Block row alignCenter justifyContent="space-between">
          <Block>
            <Block row alignCenter>
              <FastImage source={images.ic_success_check_circle} style={styles.iconCheck} tintColor={colors.green} />
              <Spacer width={'small'} />
              <Typo text="2/3 Project" preset="b16" color={theme.primaryText} />
            </Block>
            <Spacer height={8} />
            <Block row alignCenter>
              <FastImage source={images.ic_success_check_circle} style={styles.iconCheck} tintColor={colors.green} />
              <Spacer width={'small'} />
              <Typo text="4/5 Task Today" preset="b16" color={theme.primaryText} />
            </Block>
          </Block>
          <ProgressCircle value={88} mRight={SpacingDefault.medium} />
        </Block>
      </Block>
      <Block row alignItems="flex-start" paddingHorizontal={SpacingDefault.normal}>
        <Block row justifyContent="space-between" block>
          <Block>
            <Typo text={`Welcome to Blitz,`} preset="b16" color={colors.black} />
            <Spacer height={4} />
            <Typo text={user?.profileInfo?.fullname} preset="b16" color={colors.black} />
          </Block>
          {!isEmpty(user?.profileInfo.avatar) ? (
            <Block row alignCenter>
              <Button onPress={onSearchTask}>
                <FastImage source={images.ic_search} style={styles.iconSearch} tintColor={colors.black} />
              </Button>
              <Spacer width={'normal'} />
              <Button onPress={onAccount}>
                <FastImage source={{uri: user?.profileInfo.avatar}} style={styles.avatarUser} resizeMode="contain" />
              </Button>
            </Block>
          ) : (
            <Button style={styles.buttonAvatar} onPress={onLogin}>
              <FastImage source={images.ic_personal} style={styles.iconAvatar} tintColor={theme.secondaryText} />
            </Button>
          )}
        </Block>
      </Block >
    </Block >
  )
}

const useStyles = ((theme: Theme) => StyleSheet.create({
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 18,
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
  iconSearch: {
    width: 24,
    height: 24,
  },
  shadow: {
    backgroundColor: theme.background,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  iconCheck: {
    width: 24,
    height: 24
  }
}));

export default ManageHeader