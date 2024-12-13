import {Dimensions} from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 680;

const [shortDimension, longDimension] =
  DEVICE_WIDTH < DEVICE_HEIGHT
    ? [DEVICE_WIDTH, DEVICE_HEIGHT]
    : [DEVICE_HEIGHT, DEVICE_WIDTH];

//Guideline sizes are based on standard ~5" screen mobile device
const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

// !Only using scaleSize with horizontal properties
export const scaleSize = (size: number) =>
  +((DEVICE_WIDTH / guidelineBaseWidth) * size).toFixed(2);
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
