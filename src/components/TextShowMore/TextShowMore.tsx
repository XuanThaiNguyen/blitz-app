import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import {NativeSyntheticEvent, StyleSheet, TextLayoutEventData, TextLayoutLine, TextStyle, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import colors from '../../themes/Colors';
import {isIOS} from '../../themes/Constant';
import {onCheckType} from '../../utils/handleStyle';
import {Block} from '../Block/Block';
import Button from '../Button/Button';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';
import {FontSize} from '../Typo/TypoSize';

interface TextShowMoreProps {
  txt?: string;
  fontSize: keyof FontSize;
  onPress?: () => void;
  titleStyle?: TextStyle;
  moreStyle?: TextStyle;
  isRequired?: boolean;
  readMoreTitle?: string;
  renderTail?: () => ReactNode;
  textColor?: string;
  setIsShowMore?: (value: boolean) => void;
  renderIcon?: () => ReactElement;
}
const TextShowMore = ({
  txt,
  fontSize,
  onPress,
  titleStyle,
  renderTail,
  renderIcon,
  moreStyle,
  isRequired,
  readMoreTitle = 'Read more',
  textColor,
  setIsShowMore
}: TextShowMoreProps) => {
  const [linesTxt, setLinesTxt] = useState<TextLayoutLine[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [isSetLines, setIsSetLines] = useState<boolean>(false);

  const _toggleShowMore = () => {
    if (typeof onPress === 'function') {
      onPress();
    } else {
      setIsShowMore && setIsShowMore(!showMore);
      setTimeout(() => {
        setShowMore(!showMore);
      }, 100);
    }
  };

  const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLinesTxt(event?.nativeEvent?.lines);
    setIsSetLines(true);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsReady(true);
    }, 250);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isReady]);

  const TouchComponent = isIOS ? Button : TouchableOpacity;
  const conditionShow = (linesTxt?.[1]?.text && !showMore && (linesTxt?.[1]?.width > linesTxt?.[0]?.width || linesTxt?.[2]?.width > 0)) || isRequired;

  return isReady ? (
    <>
      <View pointerEvents="none">
        <Typo
          onTextLayout={onTextLayout}
          numberOfLines={3}
          fontSize={fontSize}
          color={textColor}
          text={txt?.trim()}
          style={styles.txtOne} />
      </View>
      {
        isSetLines
          ? <Block>
            {!conditionShow
              ? <Block>
                {onCheckType(renderTail, 'function')
                  ? <Block row alignCenter>
                    <Typo fontSize={fontSize} numberOfLines={2} color={textColor} style={titleStyle}>
                      {txt?.trim()}{renderTail()}
                    </Typo>
                  </Block>
                  : <Typo fontSize={fontSize} color={textColor} style={titleStyle} text={txt?.trim()} />}
                {showMore && <Spacer height={4} />}
                {showMore && <Button onPress={_toggleShowMore}>
                  <Typo fontSize={fontSize} text={'Collapse'} color={colors.primary} style={moreStyle} />
                </Button>}
              </Block>
              : <></>}
            {conditionShow
              ? <Block>
                <Typo fontSize={fontSize} text={linesTxt?.[0]?.text?.trim()} color={textColor} style={titleStyle} onPress={_toggleShowMore} suppressHighlighting />
                <Block row alignItems="center">
                  <Typo flex numberOfLines={1} fontSize={fontSize} text={linesTxt?.[1]?.text?.trim()} color={textColor} style={titleStyle} onPress={_toggleShowMore} suppressHighlighting />
                  <TouchComponent style={styles.btnReadMore} onPress={_toggleShowMore}>
                    {onCheckType(renderIcon, 'function') ? renderIcon() : <Typo fontSize={fontSize} text={readMoreTitle} color={colors.primary} style={moreStyle} />}
                  </TouchComponent>
                </Block>
              </Block>
              : <></>}
          </Block>
          : <></>
      }
    </>
  ) : <></>;
};
const styles = StyleSheet.create({
  txtOne: {
    position: 'absolute',
    color: colors.transparent,
    width: '100%'
  },
  btnReadMore: {
    zIndex: 999
  }
});
export default TextShowMore;
