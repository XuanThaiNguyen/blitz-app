const images = {
  //graphics
  google: require('../assets/images/google.png'),
  empty_dark: require('../assets/images/empty_dark.png'),
  empty_light: require('../assets/images/empty_light.png'),

  //icon
  ic_logout: require('../assets/images/logout.png'),
  ic_notification: require('../assets/images/notification.png'),
  ic_left: require('../assets/images/left.png'),
  ic_search: require('../assets/images/search.png'),
  ic_email: require('../assets/images/ic_email.png'),
  ic_password: require('../assets/images/ic_password.png'),
  ic_setting: require('../assets/images/ic_setting.png'),
  ic_add: require('../assets/images/ic_add.png'),
  ic_tag: require('../assets/images/ic_tag.png'),
  ic_task: require('../assets/images/ic_task.png'),
  ic_logo: require('../assets/images/logo.png'),
  ic_close: require('../assets/images/close.webp'),
  ic_check: require('../assets/images/check.png'),
  ic_today: require('../assets/images/ic_today.png'),
  ic_tomorrow: require('../assets/images/ic_tomorrow.png'),
  ic_week: require('../assets/images/ic_week.png'),
  ic_planned: require('../assets/images/ic_planned.png'),
  ic_success_check_circle: require('../assets/images/ic_success_check_circle.png'),
  ic_faill_cross_circle: require('../assets/images/ic_faill_cross_circle.png'),
  ic_personal: require('../assets/images/ic_personal.webp'),
  ic_more: require('../assets/images/ic_more.webp'),

  //tabs
  tabs: {
    ic_main_tab_manage_active: require('../assets/images/tabs/ic_main_tab_manage_active.png'),
    ic_main_tab_manage_inactive: require('../assets/images/tabs/ic_main_tab_manage_inactive.png'),
    ic_main_tab_profile_active: require('../assets/images/tabs/ic_main_tab_profile_active.png'),
    ic_main_tab_profile_inactive: require('../assets/images/tabs/ic_main_tab_profile_inactive.png'),
  },
};

export default images;

export type IconTypes = keyof typeof images;
