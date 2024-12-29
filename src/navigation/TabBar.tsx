import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Block} from '../components/Block/Block';
import {Spacer} from '../components/Spacer/Spacer';
import {Typo} from '../components/Typo/Typo';
import {Theme, useTheme} from '../context/ThemeProvider';
import colors from '../themes/Colors';
import images from '../themes/Images';
import {SpacingDefault} from '../themes/Spacing';
import {conditionalStyle} from '../utils/handleStyle';
import Screen from './Screen';

const getIconTabBar = (key: Screen, isActive: Boolean) => {
  if (isActive) {
    switch (key) {
      case Screen.Manage:
        return {
          icon: images.tabs.ic_main_tab_manage_active,
          name: 'Manage',
        };
      case Screen.Profile:
        return {
          icon: images.tabs.ic_main_tab_profile_active,
          name: 'Setting',
        };
      default:
        return {
          icon: images.tabs.ic_main_tab_profile_active,
          name: 'Setting',
        };
    }
  } else {
    switch (key) {
      case Screen.Manage:
        return {
          icon: images.tabs.ic_main_tab_manage_inactive,
          name: 'Manage',
        };
      case Screen.Profile:
        return {
          icon: images.tabs.ic_main_tab_profile_inactive,
          name: 'Setting',
        };
      default:
        return {
          icon: images.tabs.ic_main_tab_profile_inactive,
          name: 'Setting',
        };
    }
  }
};

const TabBar = (props: any) => {
  const insets = useSafeAreaInsets();
  const {navigation, state} = props || {};
  const {routes = [], index: activeTabIndex} = state || {};
  const {theme} = useTheme();
  const styles = useStyles(theme);

  const onNavigateTab = (routeName: Screen) => () => {
    navigation.navigate(routeName);
  };

  const renderTab = (route: any, routeIndex: number) => {
    const isRouteActive = routeIndex === activeTabIndex;
    const tabbarInfo = getIconTabBar(
      route?.name,
      isRouteActive,
    );

    const _label = tabbarInfo?.name ? tabbarInfo?.name : '';

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={routeIndex}
        style={[
          styles.tabBarItem,
          conditionalStyle(routeIndex === 0, {marginLeft: SpacingDefault.none}),
          conditionalStyle(routeIndex !== 0, {marginLeft: SpacingDefault.small}),
        ]}
        onPress={onNavigateTab(route?.name)}>
        <FastImage
          resizeMode="contain"
          source={tabbarInfo.icon}
          tintColor={!isRouteActive ? theme.secondaryText : colors.primary}
          style={styles.iconTabBar}
        />
        <Spacer height={4} />
        <Typo
          preset={isRouteActive ? 'b10' : 'r10'}
          color={isRouteActive ? theme.primaryText : theme.secondaryText}>
          {_label}
        </Typo>
      </TouchableOpacity >
    );
  };

  return (
    <Block
      row
      alignItems="flex-start"
      borderWidth={0}
      pTop={8}
      pBottom={(insets.bottom > 30 ? (insets.bottom / 2) : insets.bottom) + 4}
      bgColor={theme.background}
      styleOverride={styles.boxShadow}
    >
      {routes.map(renderTab)}
    </Block>
  );
};

const useStyles = (theme: Theme) => StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 8,
  },
  iconTabBar: {
    width: 24,
    height: 24,
  },
  boxShadow: {
    paddingHorizontal: SpacingDefault.normal,
    borderTopWidth: 1,
    borderTopColor: theme.divider,
  },
});

export default TabBar;
