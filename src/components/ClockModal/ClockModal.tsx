import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Theme, useTheme} from '../../context/ThemeProvider';
import images from '../../themes/Images';
import {SpacingDefault} from '../../themes/Spacing';
import {Block} from '../Block/Block';
import Button from '../Button/Button';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';
import {WheelPickerItem} from './Clock.props';
import WheelPicker from './WheelPicker';

interface ClockModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  type?: SELECT_TIME_ENUM;
  onChange: (type: any) => void;
}

interface DateState {
  day: number | string;
  month: number | string;
  year: number | string;
}

const DATES: WheelPickerItem[] = [
  {label: '01', value: 1},
  {label: '02', value: 2},
  {label: '03', value: 3},
  {label: '04', value: 4},
  {label: '05', value: 5},
  {label: '06', value: 6},
  {label: '07', value: 7},
  {label: '08', value: 8},
  {label: '09', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},
  {label: '13', value: 13},
  {label: '14', value: 14},
  {label: '15', value: 15},
  {label: '16', value: 16},
  {label: '17', value: 17},
  {label: '18', value: 18},
  {label: '19', value: 19},
  {label: '20', value: 20},
  {label: '21', value: 21},
  {label: '22', value: 22},
  {label: '23', value: 23},
  {label: '24', value: 24},
  {label: '25', value: 25},
  {label: '26', value: 26},
  {label: '27', value: 27},
  {label: '28', value: 28}
];

const TIMES: WheelPickerItem[] = [
  {label: '00', value: 0},
  {label: '01', value: 1},
  {label: '02', value: 2},
  {label: '03', value: 3},
  {label: '04', value: 4},
  {label: '05', value: 5},
  {label: '06', value: 6},
  {label: '07', value: 7},
  {label: '08', value: 8},
  {label: '09', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},
  {label: '13', value: 13},
  {label: '14', value: 14},
  {label: '15', value: 15},
  {label: '16', value: 16},
  {label: '17', value: 17},
  {label: '18', value: 18},
  {label: '19', value: 19},
  {label: '20', value: 20},
  {label: '21', value: 21},
  {label: '22', value: 22},
  {label: '23', value: 23}
];

const DAYS: WheelPickerItem[] = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '0', value: 0}
];

export enum SELECT_TIME_ENUM {
  TIME = 'TIME',
  DAY = 'DAY',
  DATE = 'DATE',
  TIME_DAY = 'TIME_DAY',
  TIME_WEEK = 'TIME_WEEK',
  TIME_MONTH = 'TIME_MONTH',
  TIME_CUSTOM = 'TIME_CUSTOM'
}

const ClockModal = ({isVisible, onCloseModal, type = SELECT_TIME_ENUM.TIME, onChange}: ClockModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();

  const [selectedValue, setSelectedValue] = useState<WheelPickerItem>({
    label: '',
    value: ''
  });

  const _onConfirmDate = () => {
    onChange && onChange(selectedValue?.value);
    onCloseModal();
  };

  const _onChangeDateByKey = (_key: keyof DateState) => (_value: WheelPickerItem) => {
    setSelectedValue(_value);
  };

  const _customLabel = useCallback(
    (_v: {item: WheelPickerItem}) => {
      switch (type) {
        case SELECT_TIME_ENUM.TIME:
          return `${_v.item.label}:00`;
        case SELECT_TIME_ENUM.DAY:
          return `${_v.item.label}`;
        default:
          break;
      }
      return `${_v.item.value}`;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [isVisible]
  );

  const _renderWheelDay = useMemo(() => {
    let _values = DATES;
    switch (type) {
      case SELECT_TIME_ENUM.DAY:
        _values = DAYS;
        break;
      case SELECT_TIME_ENUM.TIME:
        _values = TIMES;
        break;
      default:
        break;
    }
    return (
      <WheelPicker
        selectedValue={selectedValue.value}
        onChangeValue={_onChangeDateByKey('day')}
        data={_values}
        isOpen={true}
        bgColorTheme="bg6"
        customLabel={_customLabel}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, isVisible]);

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SpacingDefault.height}
      deviceWidth={SpacingDefault.width}
      style={styles.modal}
      onBackdropPress={onCloseModal}
      avoidKeyboard={false}
      onModalHide={onCloseModal}
      backdropOpacity={0.4}
    >
      {!!isVisible ? (
        <Block style={styles.block}>
          <Spacer height={32} />
          <Button onPress={onCloseModal} style={styles.buttonClose}>
            <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
          </Button>
          <Spacer height={24} />
          <Typo text="Time" preset="b20" color={theme.primaryText} />
          <Spacer height={32} />
          <Block row alignCenter bgColor="transparent">
            <Block
              w={'5%'}
              h={ITEM_HEIGHT}
              bgColor={theme.backgroundBox}
              style={styles.borderLeftRadius}
            />
            <Block block row center>
              {_renderWheelDay}
            </Block>
            <Block
              w={'10%'}
              h={ITEM_HEIGHT}
              bgColor={theme.backgroundBox}
              style={styles.borderRightRadius}
            />
          </Block>
          <Spacer height={8} />
          <Button preset="primary" text="Confirm" onPress={_onConfirmDate} />
          <Spacer height={insets.bottom + 16} />
        </Block>
      ) : <></>}
    </RNModal>
  )
}

const ITEM_HEIGHT = 44;

const useStyles = ((theme: Theme) => StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  iconClose: {
    width: 24,
    height: 24,
  },
  block: {
    backgroundColor: theme.background,
    paddingHorizontal: SpacingDefault.medium,
  },
  borderLeftRadius: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  borderRightRadius: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  }
}));

export default ClockModal