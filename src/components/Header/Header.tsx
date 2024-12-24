import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useTheme} from '../../context/ThemeProvider';
import images from '../../themes/Images';
import {Block} from '../Block/Block';
import Button from '../Button/Button';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';

interface HeaderProps {
  titleHeader: string;
  color?: string;
  renderRight?: any;
}

const Header = ({titleHeader, color, renderRight}: HeaderProps) => {
  const {goBack} = useNavigation();
  const {theme} = useTheme();

  const _color = color ? color : theme.primaryText;

  return (
    <Block row alignCenter justifyContent="space-between" h={52}>
      <Button onPress={goBack} style={styles.button}>
        <FastImage source={images.left} style={styles.iconLeft} tintColor={_color} />
        <Spacer width={'smaller'} />
        <Typo text={titleHeader} preset="b16" lineHeight={24} color={_color} />
      </Button>
      {renderRight ? renderRight() : <></>}
    </Block>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    width: 24,
    height: 24,
  },
});

export default Header;
