/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '../../context/ThemeProvider';
import images from '../../themes/Images';
import {SpacingDefault} from '../../themes/Spacing';
import {sharedTiming, useSharedTransition} from '../../utils/handleAnimated';
import {Block} from '../Block/Block';
import Button from '../Button/Button';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';
import {
  BG_DEFAULT,
  BG_ERROR,
  BG_INFO,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './Constants';
import {useStyles} from './Styles';
import {SnackBarItemProps, TypeMessage} from './Type';

const {height} = Dimensions.get('window');
const POSITION = 140;
const VIEW_HEIGHT = 48;
const TAB_HEIGHT = 50;

const getColor = (
  typeMessage: TypeMessage,
  borderLeftColor: Omit<SnackBarItemProps, 'item' | 'onPop'>,
): string => {
  const {
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
    borderLeftColorDefault,
  } = borderLeftColor;
  switch (typeMessage) {
    case 'success':
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
    case 'info':
      return borderLeftColorInfo ? borderLeftColorInfo : BG_INFO;
    case 'warn':
      return borderLeftColorWarn ? borderLeftColorWarn : BG_WARN;
    case 'error':
      return borderLeftColorError ? borderLeftColorError : BG_ERROR;
    default:
      return borderLeftColorDefault ? borderLeftColorDefault : BG_DEFAULT;
  }
};

const typeChecker = ['warn', 'success'];

export const SnackBarItem = memo(
  ({
    item,
    onPop,
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  }: SnackBarItemProps) => {
    //style
    const {theme} = useTheme();
    const styles = useStyles(theme);
    const insets = useSafeAreaInsets();

    // state
    const [isShow, setIsShow] = useState<boolean>(true);

    let initPosition = -POSITION;
    let showUpPosition = hasNotch() ? 0 : 10;
    if (item.position === 'bottom') {
      initPosition = height;
      showUpPosition = item.isIncludedBottomHeight
        ? height - VIEW_HEIGHT - TAB_HEIGHT - insets.bottom - (insets.top * 3) / 2
        : height - POSITION + 50 - insets.bottom - SpacingDefault.normal;
    }

    if (item.position === 'top_under_header') {
      showUpPosition += 52;
    }

    // reanimated
    const opacity = useSharedTransition(isShow, {
      duration: DURATION_ANIMATED,
    });
    const translateY = useSharedValue(initPosition);

    // function
    const _onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
    }, [item.interval]);

    useEffect(() => {
      if (isShow) {
        translateY.value = sharedTiming(showUpPosition, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        translateY.value = sharedTiming(initPosition, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      }
    }, [isShow]);

    useEffect(() => {
      let id: NodeJS.Timeout | null = null;
      if (!isShow) {
        id = setTimeout(() => {
          onPop(item);
        }, DURATION_ANIMATED);
      }
      return () => {
        if (id) {
          clearTimeout(id);
        }
      };
    }, [isShow, item, onPop]);

    // animated style
    const itemBarAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    }));

    const getIconByType = () => {
      switch (item.type) {
        case 'success':
          return !item.icon ? images.ic_success_check_circle : item.icon;
        default:
          return;
      }
    };

    const renderIcon = () => {
      if (React.isValidElement(item.icon)) {
        return item.icon;
      }

      return (
        <FastImage
          source={getIconByType()}
          style={{width: 24, height: 24}}
        />
      );
    };

    const onPressDetail = () => { };

    // render
    if (typeChecker.includes(item.type)) {
      return (
        <Animated.View
          style={[
            styles.defaultView,
            item?.bgTooltip ? {backgroundColor: item?.bgTooltip} : {},
            item?.disableHeight ? {} : styles.height,
            itemBarAnimatedStyle,
          ]}>
          <Block
            block
            row
            mHoz={SpacingDefault.small}
            pVer={item?.pVer || 0}
            alignCenter>
            {renderIcon()}
            <Spacer width={'small'} />
            <Typo flex preset="b12" color={theme.primaryText}>
              {item.msg}
            </Typo>
          </Block>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.defaultView,
          item?.disableHeight ? {} : styles.height,
          itemBarAnimatedStyle,
          styles.itemBar,
          {
            borderLeftColor: getColor(item.type, {
              borderLeftColorError,
              borderLeftColorInfo,
              borderLeftColorSuccess,
              borderLeftColorWarn,
              isIncludedBottomHeight: false,
            }),
          },
        ]}>
        <Block row alignCenter justifyContent="space-between">
          <Typo preset="b12" color={theme.primaryText}>
            {item.msg}
          </Typo>
          <Animated.View>
            <Button onPress={_onClose}>
              <FastImage source={images.ic_close} style={{width: 16, height: 16}} />
            </Button>
          </Animated.View>
        </Block>
      </Animated.View>
    );
  },
  () => true,
);
