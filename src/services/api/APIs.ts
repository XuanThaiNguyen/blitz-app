enum APIs {
  //authen
  LOGIN_WITH_GOOGLE = 'auth/signin/google',
  LOGOUT = 'auth/signout',

  //profile
  GET_PROFILE = 'accounts/profile',

  //tasks
  CREATE_TASK = 'tasks/create',
  GET_TASKS = 'accounts/tasks',
  GET_TASK_BY_ID = 'tasks/:taskId',

  //tags
  CREATE_TAG = 'tags/create',
  GET_TAGS = 'tags',
}

export default APIs;
