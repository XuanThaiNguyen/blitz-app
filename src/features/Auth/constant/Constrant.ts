import * as yup from 'yup';

import {LoginFormProps, RegisterFormProps} from './Auth.props';

export const initialLoginForm: LoginFormProps = {
  email: '',
  password: '',
};

export const validationLoginSchema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Trường này bắt buộc'),
  password: yup.string().required('Trường này bắt buộc'),
});

export const initialRegisterForm: RegisterFormProps = {
  email: '',
  password: '',
};

export const validationRegisterSchema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Trường này bắt buộc'),
  password: yup.string().required('Trường này bắt buộc'),
});
