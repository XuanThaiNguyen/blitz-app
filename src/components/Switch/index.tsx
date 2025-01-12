import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useContext,
    useMemo
} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';

// hooks

// utils

// types
import {SwitchProps} from './Switch.props';
import {useTheme} from '../../context/ThemeProvider';
import {useInterpolateColor, useSharedTransition} from '../../utils/handleAnimated';
import colors from '../../themes/Colors';

// default values
const SWITCH_WIDTH = 24;
const CIRCLE_WIDTH = 20;
const BORDER_RADIUS_CONTAINER = SWITCH_WIDTH;

const Switch: React.ForwardRefRenderFunction<View, SwitchProps> = (
    {
        checked: checkedProp,
        disabled,
        size: sizeProp,
        trackColor,
        thumbColor,
        ios_backgroundColor,
        onChange,
        containerStyle,
        isLoading,
        ...restProps
    },
    ref
) => {
    //refs
    const switchRef = useRef<View>(null);

    // states
    const [checked, setChecked] = useState(!!checkedProp);

    // provide ref
    useImperativeHandle(ref, () => switchRef.current!);

    // hooks
    const {theme, isDark} = useTheme();;
    const styles = useStyles();

    // animtions
    const isPressed = useSharedValue(checked);
    const progress = useSharedTransition(checked);

    // memorized
    const memorizedContainerStyle = useMemo(() => {
        return {
            width: sizeProp ? sizeProp * 2 : SWITCH_WIDTH * 2,
            borderRadius: sizeProp ? sizeProp : BORDER_RADIUS_CONTAINER
        };
    }, [sizeProp]);

    const memorizedCircleStyle = useMemo(() => {
        return {
            width: sizeProp ? sizeProp : CIRCLE_WIDTH,
            height: sizeProp ? sizeProp : CIRCLE_WIDTH,
            borderRadius: sizeProp ? sizeProp / 2 : CIRCLE_WIDTH
        };
    }, [sizeProp]);

    const isSize = useMemo(
        () => (sizeProp ? sizeProp : SWITCH_WIDTH),
        [sizeProp]
    );

    const unCheckedBackground = useMemo(() => {
        if (ios_backgroundColor) return ios_backgroundColor as string;

        if (trackColor?.false) {
            return trackColor?.false as string;
        }
        return isDark ? colors.darkDisabledSwitchBg : colors.lightDisabledSwitchBg;
    }, [ios_backgroundColor, trackColor?.false, isDark]);

    const checkedBackground = useMemo(() => {
        if (trackColor?.true) return trackColor?.true as string;

        if (isDark) {
            return colors.primary;
        }
        return colors.primary;
    }, [isDark, trackColor?.true]);

    const backgroundColorContainer = useInterpolateColor(
        progress,
        [0, 1],
        [unCheckedBackground, checkedBackground],
    );

    const backgroundCircle = useInterpolateColor(
        progress,
        [0, 1],
        [colors.white, colors.white]
    );

    const handleChangeValue = () => {
        if (disabled) return;
        // handle animation when onPress on Pressable
        isPressed.value = !checked;
        // controlled
        onChange?.(!checked);
        // uncontrolled
        setChecked(preChecked => !preChecked);
    };

    const translateXCursorAnim = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(checked ? isSize - 1 : 1, {
                        duration: 200
                    })
                }
            ]
        };
    });

    const bgCursorAnim = useAnimatedStyle(() => {
        return {
            backgroundColor: disabled ? (isDark ? `${colors.white}60` : colors.white) : !thumbColor ? backgroundCircle.value : thumbColor
        };
    });

    const containerAnimated = useAnimatedStyle(() => ({
        backgroundColor: disabled ? (checked ? (isDark ? `${colors.primary}40` : `${colors.primary}80`) : (isDark ? `${colors.darkDisabledSwitchBg}60` : `${colors.lightDisabledSwitchBg}60`)) : backgroundColorContainer.value
    }));

    // effects
    useEffect(() => setChecked(!!checkedProp), [checkedProp]);

    return (
        <Pressable
            disabled={isLoading}
            ref={switchRef}
            onPress={handleChangeValue}
            style={containerStyle}
            {...restProps}>
            <Animated.View
                style={[
                    styles.container,
                    memorizedContainerStyle,
                    containerAnimated
                ]}>
                <Animated.View
                    style={[
                        styles.circle,
                        memorizedCircleStyle,
                        translateXCursorAnim,
                        styles.center
                    ]}  >
                    <Animated.View style={[
                        {
                            height: CIRCLE_WIDTH,
                            width: CIRCLE_WIDTH,
                            borderRadius: CIRCLE_WIDTH / 2
                        },
                        bgCursorAnim
                    ]} />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

const useStyles = () => {
    return StyleSheet.create({
        container: {
            width: SWITCH_WIDTH * 2,
            borderRadius: BORDER_RADIUS_CONTAINER,
            padding: 2
        },
        circle: {
            width: SWITCH_WIDTH / 2,
            height: SWITCH_WIDTH / 2,
            borderRadius: SWITCH_WIDTH / 4
        },
        center: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
};

export default React.forwardRef<View, SwitchProps>(Switch);
