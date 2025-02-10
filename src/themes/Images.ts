const images = {
  //graphics
  google: require('../assets/images/google.png'),
  empty_dark: require('../assets/images/empty_dark.png'),
  empty_light: require('../assets/images/empty_light.png'),
  empty_search_light: require('../assets/images/empty_search_light.png'),
  empty_search_dark: require('../assets/images/empty_search_dark.png'),
  project_cover_default: require('../assets/images/project_cover_default.png'),

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
  ic_calendar: require('../assets/images/ic_calendar.webp'),
  ic_success_check_circle: require('../assets/images/ic_success_check_circle.png'),
  ic_faill_cross_circle: require('../assets/images/ic_faill_cross_circle.png'),
  ic_personal: require('../assets/images/ic_personal.webp'),
  ic_more: require('../assets/images/ic_more.webp'),
  ic_edit: require('../assets/images/ic_edit.webp'),
  ic_project: require('../assets/images/ic_project.png'),
  ic_pomodoro: require('../assets/images/ic_pomodoro.png'),
  ic_arrow_down: require('../assets/images/ic_arrow_down.webp'),
  ic_document: require('../assets/images/ic_document.webp'),
  ic_comment: require('../assets/images/ic_comment.webp'),
  ic_members: require('../assets/images/ic_members.webp'),
  ic_save: require('../assets/images/ic_save.webp'),
  ic_delete: require('../assets/images/ic_delete.png'),
  ic_guideline: require('../assets/images/ic_guideline.webp'),
  ic_filter: require('../assets/images/ic_filter.webp'),

  //tabs
  tabs: {
    ic_main_tab_manage_active: require('../assets/images/tabs/ic_main_tab_manage_active.png'),
    ic_main_tab_manage_inactive: require('../assets/images/tabs/ic_main_tab_manage_inactive.png'),
    ic_main_tab_profile_active: require('../assets/images/tabs/ic_main_tab_profile_active.png'),
    ic_main_tab_profile_inactive: require('../assets/images/tabs/ic_main_tab_profile_inactive.png'),
    ic_main_tab_bg: require('../assets/images/tabs/ic_main_tab_bg.webp'),
    ic_main_tab_bg_dark: require('../assets/images/tabs/ic_main_tab_bg_dark.webp'),
  },
};

export default images;

export type IconTypes = keyof typeof images;
