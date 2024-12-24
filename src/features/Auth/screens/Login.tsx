import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {LoginFormProps} from '../constant/Auth.props';
import {initialLoginForm, validationLoginSchema} from '../constant/Constrant';

const Login = () => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const [loading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormProps>({
    defaultValues: initialLoginForm,
    resolver: yupResolver(validationLoginSchema),
  });

  const onForgotPassword = () => { };
  const onLoginEmailPassword = () => { };
  const onSignup = () => {
    navigate(Screen.Register);
  };
  const onLoginGoogle = () => { };
  const goHome = () => {
    reset(Screen.MainTab);
  };

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
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
        Welcome back!
      </Typo>
      <Spacer height={8} />
      <Typo preset="r16" color={theme.secondaryText}>
        Let's get back to Productivity!
      </Typo>
      <Spacer height={28} />
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
            errorMessage={errors?.email?.message}
            iconLeft="email"
            title="Email"
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
            errorMessage={errors?.password?.message}
            iconLeft="password"
            title="Password"
          />
        )}
      />
      <Spacer height={16} />
      <Typo
        textAlign="right"
        preset="r14"
        color={colors.primary}
        onPress={onForgotPassword}
        disabled={loading}
        suppressHighlighting>
        Forgot password?
      </Typo>
      <Spacer height={16} />
      <Button
        preset="primary"
        text="Login"
        onPress={handleSubmit(onLoginEmailPassword)}
        disabled={loading}
        loading={loading}
        buttonColor={colors.primaryButton}
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
      <Button
        style={styles.loginSocialBtn}
        onPress={onLoginGoogle}
        disabled={loading}>
        <FastImage source={images.google} style={styles.icon} />
        <Spacer width="smaller" />
        <Typo preset="b16">Login with Google</Typo>
      </Button>
      <Spacer height={16} />
      <Spacer height={20} />
      <Typo preset="r14" center color={theme.primaryText}>
        Don't have Account?
        <Typo
          preset="b14"
          color={colors.primary}
          onPress={onSignup}
          disabled={loading}
          suppressHighlighting>
          {' '}
          Sign Up
        </Typo>
      </Typo>
      <Spacer height={16} />
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
    backgroundColor: theme.background,
    borderWidth: 0.5,
    borderColor: theme.secondaryText,
  },
  iconClose: {
    width: 16,
    height: 16,
  },
}));

export default Login;
