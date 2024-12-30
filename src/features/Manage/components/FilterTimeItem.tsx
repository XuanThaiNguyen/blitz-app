import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {TimeFilterKey, TimeProjectProps} from '../constant/Model.props';

interface FilterTimeItemProps {
  item: TimeProjectProps;
  index: number;
}

const FilterTimeItem = ({item, index}: FilterTimeItemProps) => {
  const {theme} = useTheme();

  const onManageTask = (_filterKey: TimeFilterKey) => () => {
    navigationRef.current?.navigate(Screen.TaskManageFilter, {filterKey: _filterKey});
  };

  return (
    <Button onPress={onManageTask(item.key)} key={item.title}>
      <Block
        mRight={(index + 1) % 2 === 0 ? 0 : 12}
        paddingVertical={16}
        paddingHorizontal={SpacingDefault.smaller}
        w={(SpacingDefault.width / 2) - SpacingDefault.medium - SpacingDefault.radius}
        mBottom={8}
        borderRadius={6}
        borderWidth={1}
        borderColor={item.color}
        bgColor={theme.backgroundBox}
      >
        <Block row alignCenter>
          <FastImage tintColor={item.color} source={images?.[item.icon]} style={styles.image} />
          <Spacer width={'tiny'} />
          <Typo preset="r16" color={theme.primaryText} text={item.title} />
        </Block>
        <Spacer height={8} />
        <Typo
          preset="b16"
          color={theme.primaryText}
          text={`${item.timeEst} (${item.total})`}
        />
      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});

export default FilterTimeItem;
