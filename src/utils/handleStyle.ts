import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TypesBase = | 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

export const enhance = <T>(arrStyle: Array<T>) => {
  return StyleSheet.flatten<T>(arrStyle);
};

export const propsToStyle = <T>(arrStyle: Array<T>) => {
  return arrStyle
    .filter(
      x => x !== undefined && x && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: any, curr) => {
      return {...prev, ...curr};
    }, {});
};

export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const conditionalStyle = (condition: boolean, trueStyle: ViewStyle | TextStyle, falseStyle?: ViewStyle | TextStyle): ViewStyle | TextStyle => condition ? trueStyle : falseStyle ?? {};
