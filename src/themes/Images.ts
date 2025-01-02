const images = {
  right: require('../assets/images/right.png'),
  left: require('../assets/images/left.png'),
  notification: require('../assets/images/notification.png'),
  logout: require('../assets/images/logout.png'),
  search: require('../assets/images/search.png'),
  google: require('../assets/images/google.png'),
  email: require('../assets/images/ic_email.png'),
  password: require('../assets/images/ic_password.png'),
  manage: require('../assets/images/manage.png'),

  //new
  ic_email: require('../assets/images/ic_email.png'),
  ic_password: require('../assets/images/ic_password.png'),
  ic_setting: require('../assets/images/ic_setting.png'),
  ic_setting_active: require('../assets/images/ic_setting_active.png'),
  ic_manage: require('../assets/images/ic_manage.png'),
  ic_manage_active: require('../assets/images/ic_manage_active.png'),
  ic_add: require('../assets/images/ic_add.png'),
  ic_tag: require('../assets/images/ic_tag.png'),
  ic_task: require('../assets/images/ic_task.png'),

  //new
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

  empty_dark: require('../assets/images/empty_dark.png'),
  empty_light: require('../assets/images/empty_light.png'),

  tabs: {
    ic_main_tab_manage_active: require('../assets/images/tabs/ic_main_tab_manage_active.png'),
    ic_main_tab_manage_inactive: require('../assets/images/tabs/ic_main_tab_manage_inactive.png'),
    ic_main_tab_profile_active: require('../assets/images/tabs/ic_main_tab_profile_active.png'),
    ic_main_tab_profile_inactive: require('../assets/images/tabs/ic_main_tab_profile_inactive.png'),
  },
};

export default images;

export type IconTypes = keyof typeof images;
