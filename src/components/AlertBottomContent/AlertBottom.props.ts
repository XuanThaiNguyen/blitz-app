import {ButtonPresetNames} from '../Button/Button.preset';
import {ButtonProps} from '../Button/Button.props';

export interface AlertButtonProps {
  text?: string;
  preset?: ButtonPresetNames;
  onPress?: () => void;
  buttonOptions?: ButtonProps;
  onPressOverwrite?: () => void;
  loading?: boolean;
}

export interface AlertBottomContentProps {
  message: string;
  title: string;
  status: 'error' | 'success';
  showCloseIcon?: boolean;
  buttons?: AlertButtonProps[];
  onCustomXPress?: () => void;
}

export interface AlertErrorProps {
  title: string;
  message: string;
  dismissable?: boolean;
  status: 'error' | 'success';
  showCloseIcon?: boolean;
  buttons?: AlertButtonProps[];
  onCustomXPress?: () => void;
}
