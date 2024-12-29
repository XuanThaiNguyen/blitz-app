import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {RegisterFormProps} from '../constant/Auth.props';
import {initialRegisterForm, validationRegisterSchema} from '../constant/Constrant';

const Register = () => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormProps>({
    defaultValues: initialRegisterForm,
    resolver: yupResolver(validationRegisterSchema),
  });

  const onLoginGoogle = () => { };
  const onRegisterEmailPassword = () => { };

  const onLogin = () => {
    navigate(Screen.Login);
  };

  const goHome = () =>
    reset(Screen.MainTab);

  return (
    <Block block bgColor={theme.background} paddingHorizontal={SpacingDefault.medium}>
      <InsetSubstitute />
      <Spacer height={24} />
      <Button
        onPress={goHome}
        style={styles.buttonClose}
      >
        <FastImage
          source={images.ic_close}
          style={styles.iconClose}
          tintColor={theme.primaryText}
        />
      </Button>
      <Spacer height={48} />
      <Typo preset="b20" color={theme.primaryText}>
        Join Blitz!
      </Typo>
      <Spacer height={4} />
      <Typo preset="r16" color={theme.secondaryText}>
        Unlock your Productivity Potential!
      </Typo>
      <Spacer height={28} />
      <Block block>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Your email"
              error={errors?.email}
              iconLeft="email"
              title="Email"
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <Spacer height={16} />
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Your password"
              error={errors?.password}
              iconLeft="password"
              title="Password"
              errorMessage={errors?.password?.message}
            />
          )}
        />
        <Spacer height={16} />
        <Button
          preset="primary"
          text="Sign Up"
          buttonColor={colors.primaryButton}
          onPress={handleSubmit(onRegisterEmailPassword)}
        />
        <Spacer height={24} />
        <Block row alignCenter>
          <Block h={0.5} borderWidth={0.5} block bgColor={theme.primaryText} />
          <Spacer width="small" />
          <Typo text="Or" preset="r14" color={theme.primaryText} />
          <Spacer width="small" />
          <Block h={0.5} borderWidth={0.5} block bgColor={theme.primaryText} />
        </Block>
        <Spacer height={24} />
        <Button style={styles.loginSocialBtn} onPress={onLoginGoogle}>
          <FastImage source={images.google} style={styles.icon} />
          <Spacer width="smaller" />
          <Typo preset="b16" color={colors.lightPrimaryText}>Login with Google</Typo>
        </Button>
        <Spacer height={16} />
        <Typo preset="r14" center color={theme.primaryText}>
          Already have Account?
          <Typo
            preset="b14"
            color={colors.primaryButton}
            onPress={onLogin}
            suppressHighlighting>
            {' '}
            Login
          </Typo>
        </Typo>
        <Spacer height={16} />
      </Block>
    </Block>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  loginSocialBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 15,
    borderRadius: 8,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 256,
    backgroundColor: theme.backgroundBox,
    borderWidth: 0.5,
    borderColor: theme.secondaryText,
  },
  iconClose: {
    width: 16,
    height: 16,
  },
}));

export default Register;
