import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {useTheme} from '../../../context/ThemeProvider';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {SpacingDefault} from '../../../themes/Spacing';

const Profile = () => {
  const {user} = useAppSelector((_state: AppState) => _state.user || {});
  const {theme} = useTheme();

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Header titleHeader="Profile" />
      <Spacer height={16} />
      <Block alignCenter>
        <FastImage source={{uri: user?.profileInfo.avatar || ''}} style={styles.avatar} />
      </Block>
      <Spacer height={24} />
      <TextField title="Full Name" value={user?.profileInfo.fullname || ''} editable={false} />
      <Spacer height={16} />
      <TextField title="Email" value={user?.profileInfo.email || ''} editable={false} />
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default Profile;
