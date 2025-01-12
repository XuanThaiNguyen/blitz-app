import {ViewProps, ColorValue, StyleProp, ViewStyle} from 'react-native';

export interface SwitchProps extends ViewProps {
    /**
     * If true, disableButton
     * @default false
     */
    isLoading?: boolean;

    /**
     * If true, the component is checked
     * @default false
     */
    checked?: boolean;
    /**
     * If true, the component is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * The IOS backgroundColor in component
     * @default undefined
     */
    ios_backgroundColor?: ColorValue;
    /**
     * The color of cirlce in component
     * @default undefined
     */
    thumbColor?: ColorValue;
    /**
     * The backgroundColor of  uncheck/check of in component
     * @default undefined
     */
    trackColor?: {
        false?: ColorValue;
        true?: ColorValue;
    };
    /**
     * The size of component
     * @default undefined
     */
    size?: number;
    /**
     * Overwrite style for containerStyle
     * @default undefined
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The callback function that is triggered when the state changes
     * @default undefined
     */
    onChange?: (nextChecked: boolean) => void;
}
