import React from 'react';

import {Block} from '../../../components/Block/Block';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {SpacingDefault} from '../../../themes/Spacing';

const Profile = () => {
  const {theme} = useTheme();

  return (
    <Block block paddingHorizontal={SpacingDefault.medium} bgColor={theme.background}>
      <InsetSubstitute />
      <Typo text="Profile" preset="b24" color={theme.primaryText} />
    </Block>
  );
};

export default Profile;
