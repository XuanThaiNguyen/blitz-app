/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View
} from 'react-native';

import {useTheme} from '../../context/ThemeProvider';
import {Block} from '../Block/Block';
import {Typo} from '../Typo/Typo';
import {WheelPickerItem} from './Clock.props';

interface WheelPickerProps {
  data: WheelPickerItem[];
  onChangeValue?: (value: any) => void;
  selectedValue?: any;
  height?: number | string;
  isOpen?: boolean;
  itemHeight?: number;
  bgColorTheme?: string;
  customLabel?: (value: {item: WheelPickerItem; index: number}) => string;
}

const WheelPicker = (props: WheelPickerProps): JSX.Element => {
  const wheelPickerData = props.data || [];
  const _itemHeight = props.itemHeight || 44;
  const {theme} = useTheme();

  const [index, setIndex] = useState(0);
  const scrollIndexTmp = useRef(0);
  const scrollViewRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 85});

  useEffect(() => {
    const currentIndex = wheelPickerData.findIndex(
      item => item.value == props.selectedValue
    );
    if (currentIndex !== -1) {
      setTimeout(() => {
        try {
          scrollViewRef.current?.scrollToIndex({index: currentIndex, animated: false});
        } catch (error) { }
      }, 0);
    }
  }, [props.selectedValue]);

  useEffect(() => {
    if (props.isOpen) {
      const _currentIndex = wheelPickerData.findIndex(
        item => item.value == props.selectedValue
      );
      if (_currentIndex !== -1) {
        setTimeout(() => {
          setIndex(_currentIndex);
          try {
            scrollViewRef.current?.scrollToIndex({index: _currentIndex, animated: false});
          } catch (error) { }
        }, 0);
      } else {
        setIndex(0);
        try {
          scrollViewRef.current?.scrollToIndex({index: 0, animated: false});
        } catch (error) { }
      }
    } else {
      setIndex(0);
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.isOpen) {
      if (index >= 0 && wheelPickerData[index] != props.selectedValue) {
        if (props.onChangeValue) {
          props.onChangeValue(wheelPickerData[index]);
        }
      }
    }
  }, [index]);

  const headerFooterComponent = useCallback(() => {
    return <View style={{height: _itemHeight * 2}} />;
  }, []);

  const renderItem = useCallback(
    ({item, index: _index}: {item: WheelPickerItem; index: number}) => {
      const inputRange = [
        (_index - 4) * _itemHeight,
        (_index - 3) * _itemHeight,
        (_index - 2) * _itemHeight,
        (_index - 1) * _itemHeight,
        _index * _itemHeight,
        (_index + 1) * _itemHeight,
        (_index + 2) * _itemHeight,
        (_index + 3) * _itemHeight,
        (_index + 4) * _itemHeight
      ];

      const scaleX = scrollY.interpolate({
        inputRange,
        outputRange: [0.9, 0.88, 0.92, 0.98, 1, 0.98, 0.92, 0.88, 0.9]
      });

      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0, 0.7, 0.75, 0.8, 1.1, 0.8, 0.75, 0.7, 0]
      });

      const rotateX = scrollY.interpolate({
        inputRange,
        outputRange: [
          '80deg',
          '55deg',
          '40deg',
          '25deg',
          '0deg',
          '-25deg',
          '-40deg',
          '-55deg',
          '-80deg'
        ]
      });

      const translateY = scrollY.interpolate({
        inputRange,
        outputRange: [
          -_itemHeight - 80,
          -_itemHeight * 2 - 5,
          -_itemHeight + 5,
          -10 + 4,
          0,
          10 - 4,
          _itemHeight - 5,
          _itemHeight * 2 + 5,
          _itemHeight + 80
        ]
      });

      return (
        <Animated.View
          key={_index}
          style={{
            transform: [{scaleX}, {rotateX}, {translateY}],
            opacity
          }}>
          <Block h={_itemHeight} center>
            <Typo
              bold={index === _index}
              color={index === _index ? theme.primaryText : theme.secondaryText}
              preset={'r18'}
              text={
                !!props?.customLabel
                  ? props.customLabel({item, index: _index})
                  : item.label
              }
            />
          </Block>
        </Animated.View>
      );
    },
    [index]
  );

  const getItemLayout = useCallback(
    (_: any, _index: number): {length: number; offset: number; index: number} => ({
      length: _itemHeight,
      offset: _itemHeight * _index,
      index: _index
    }),
    []
  );

  const keyExtractor = useCallback((_: any, _index: number) => _index.toString(), []);

  const _onMomentumScrollEnd = (event: any): void => {
    const {y} = event.nativeEvent.contentOffset;
    const _index = Math.round(y / _itemHeight);
    setIndex(_index);
  };

  const _onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {y} = e.nativeEvent.contentOffset;
    if (y % _itemHeight === 0) {
      setIndex(y / _itemHeight);
    }
  };

  const FlatListMemo = useMemo(
    () => (
      <Animated.FlatList
        ref={scrollViewRef}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewConfigRef.current}
        snapToInterval={_itemHeight}
        getItemLayout={getItemLayout}
        pagingEnabled={true}
        scrollEventThrottle={16}
        directionalLockEnabled={true}
        bounces={false}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
          listener: _event => {
            // @ts-ignore
            const {y} = _event?.nativeEvent?.contentOffset;
            //@ts-ignore
            if (scrollIndexTmp.current != parseInt(y / _itemHeight)) {
              //@ts-ignore
              scrollIndexTmp.current = parseInt(y / _itemHeight);
            }
          }
        })}
        onScrollEndDrag={_onScrollEndDrag}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        data={wheelPickerData}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    ),
    [_itemHeight, index, wheelPickerData]
  );

  return (
    <Block block bottom={0} left={0} right={0} h={_itemHeight * 5}>
      <Block block justifyCenter overflow="hidden">
        <Block h={_itemHeight * 5}>
          <Block position="absolute" bottom={0} top={0} left={0} right={0}>
            <Block block />
            <Block
              h={_itemHeight}
              bgColor={!!props?.bgColorTheme ? props.bgColorTheme : theme.backgroundBox}
            />
            <Block block />
          </Block>
          {FlatListMemo}
        </Block>
      </Block>
    </Block>
  );
};

export default WheelPicker;
