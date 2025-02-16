import React, {useEffect} from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {useTheme} from '../../context/ThemeProvider';
import colors from '../../themes/Colors';
import {SpacingDefault} from '../../themes/Spacing';
import {enhance} from '../../utils/handleStyle';
import {Block} from '../Block/Block';
import Button from '../Button/Button';
import {Typo} from '../Typo/Typo';

interface TabByLabelProps {
  onTab: (index: number) => void;
  isCollapse: boolean;
  labels: string[];
  indexActive?: number | undefined;
  style?: StyleProp<ViewStyle>;
  leftTabStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const TAB_WIDTH = (SpacingDefault.width - 34) / 2;

const TabByLabel = ({onTab, isCollapse, labels, indexActive, style, leftTabStyle, indicatorStyle}: TabByLabelProps) => {
  const {theme} = useTheme();
  const animation = React.useRef(new Animated.Value(0)).current;
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TAB_WIDTH]
  });

  const _onTab = (index: number) => () => {
    onTab && onTab(index);
    Animated.timing(animation, {
      toValue: index,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    if (indexActive !== undefined) {
      Animated.timing(animation, {
        toValue: indexActive,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexActive]);

  return (
    <Block
      row
      alignCenter
      bgColor={theme.backgroundBox}
      block
      borderWidth={1}
      borderColor={theme.divider}
      borderRadius={6}
      styleOverride={style}>
      <Button onPress={_onTab(0)} style={[styles.tab, leftTabStyle]}>
        <Typo
          preset={isCollapse ? 'r14' : 'b14'}
          color={!isCollapse ? colors.white : theme.secondaryText}
          text={labels?.[0]} />
      </Button>
      <Button onPress={_onTab(1)} style={[styles.tab]}>
        <Typo
          preset={isCollapse ? 'b14' : 'r14'}
          color={isCollapse ? colors.white : theme.secondaryText}
          text={labels?.[1]} />
      </Button>
      {/* @ts-ignore */}
      <Animated.View style={enhance([styles.indicator, isCollapse ? styles.rightBorder : styles.leftBorder, {transform: [{translateX}]}, indicatorStyle])} />
    </Block>
  );
};

const styles = StyleSheet.create({
  tab: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    height: 36
  },
  indicator: {
    width: TAB_WIDTH,
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.primary,
    zIndex: 1
  },
  leftBorder: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  rightBorder: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  }
})

export default TabByLabel;
