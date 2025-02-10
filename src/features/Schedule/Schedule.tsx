import React from 'react'

import {Block} from '../../components/Block/Block'
import {InsetSubstitute} from '../../components/InsetSubstitute/InsetSubstitute'
import {Typo} from '../../components/Typo/Typo'
import {useTheme} from '../../context/ThemeProvider'
import {SpacingDefault} from '../../themes/Spacing'

const Schedule = () => {
  const {theme} = useTheme();

  return (
    <Block block>
      <InsetSubstitute />
      <Block paddingHorizontal={SpacingDefault.normal}>
        <Typo text="Coming soon" preset="b20" color={theme.primaryText} />
      </Block>
    </Block>
  )
}

export default Schedule