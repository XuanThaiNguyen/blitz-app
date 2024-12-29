import React, {useState} from 'react';
import Container from '../../../components/Container/Container';
import TextField from '../../../components/TextField/TextField';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {StyleSheet} from 'react-native';
import {SpacingDefault} from '../../../themes/Spacing';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import images from '../../../themes/Images';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';

const SearchTask = () => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const {goBack} = useNavigation();

  const [search, setSearch] = useState('');

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Block row alignCenter>
        <Block block>
          <TextField
            placeholder={'Search task'}
            value={search}
            onChangeText={setSearch}
            iconLeft={images.search} />
        </Block>
        <Spacer width={'normal'} />
        <Button
          onPress={goBack}
          style={styles.buttonClose}
        >
          <FastImage
            source={images.ic_close}
            style={styles.iconClose}
            tintColor={theme.primaryText}
          />
        </Button>
      </Block>
      <Spacer height={24} />
      <Typo text="Recent Searches" preset="b20" color={theme.primaryText} />
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
  buttonClose: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: theme.backgroundBox,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.divider,
  },
  iconClose: {
    width: 16,
    height: 16,
  },
}));

export default SearchTask;
