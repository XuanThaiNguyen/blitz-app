import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {PriorityTask} from '../features/Manage/constant/Model.props';
import colors from '../themes/Colors';

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

export const getColorsByPriority = ({priority}: {priority: PriorityTask;}) => {
  let _color = colors.priorityLow;
  switch (priority) {
    case PriorityTask.LOW:
      _color = colors.priorityLow;
      break;
    case PriorityTask.MEDIUM:
      _color = colors.priorityMedium;
      break;
    case PriorityTask.HIGH:
      _color = colors.priorityHigh;
      break;
    case PriorityTask.Critical:
      _color = colors.priorityCritical;
      break;
    default:
      break;
  }
  return _color;
};
