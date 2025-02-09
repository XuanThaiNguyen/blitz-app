import {ReactNode} from 'react';
import {StyleProp} from 'react-native';

export type ReactChildren = ReactNode;

export type ModalData = {
  children: ReactChildren;
};

export type ModalOptions = {
  dismissable: boolean;
  animated?: boolean;
  position: 'center' | 'bottom';
  onCustomXPress?: () => void;
};

export type ModalShowParams = ModalData & ModalOptions;

export type ModalHideParams = {};

export type ModalRef = {
  show: (params: ModalShowParams) => void;
  hide: (params?: ModalHideParams) => void;
};

export type ModalConfig = {
  style?: StyleProp<any>;
};

export type ModalProps = {
  config?: ModalConfig;
};
