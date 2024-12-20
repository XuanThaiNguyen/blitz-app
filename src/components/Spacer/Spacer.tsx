import {scaleSize} from '../../utils/handleResponsive';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {View} from 'react-native';
import {SpacerProps} from './Spacer.props';
import {SpacingDefault} from '../../themes/Spacing';

const SpacerComponent = (props: SpacerProps) => {
  const {height = 0, width = 0} = props;

  const widthChecker =
    typeof width === 'number' ? width : SpacingDefault[width];
  const heightChecker = height;
  // style
  const actualStyle = useMemo(
    () => ({
      width: scaleSize(widthChecker),
      height: heightChecker,
    }),
    [widthChecker, heightChecker],
  );

  // render
  return <View style={actualStyle} />;
};
export const Spacer = memo(SpacerComponent, equals);
