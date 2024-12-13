import React from 'react';
import {Block} from '../../../components/Block/Block';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Typo} from '../../../components/Typo/Typo';
import colors from '../../../themes/Colors';
import {useTheme} from '../../../context/ThemeProvider';
import FastImage from 'react-native-fast-image';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

const Manage = () => {
  const {theme} = useTheme();

  return (
    <Block paddingHorizontal={SpacingDefault.normal}>
      <InsetSubstitute />
      <Block row alignCenter justifyContent="space-between">
        <FastImage source={images.setting} style={styles.icon} tintColor={colors.primary} />
        <Typo text="Blitz" preset="body24B" color={theme.primaryText} />
        <FastImage source={images.notification} style={styles.icon} tintColor={theme.primaryText} />
      </Block>
    </Block>
  );
};

const styles = {
  icon: {
    width: 20,
    height: 20,
  },
};

export default Manage;
