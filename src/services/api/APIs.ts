enum APIs {
  //authen
  LOGIN_WITH_GOOGLE = 'auth/signin/google',
  LOGOUT = 'auth/logout',

  //profile
  GET_PROFILE = 'accounts/profile',

  //tasks
  CREATE_TASK = 'tasks/create',
  GET_TASKS = 'tasks',
  GET_TASK_BY_ID = 'tasks/:taskId',

  //tags
  CREATE_TAG = 'tags/create',
  GET_TAGS = 'tags',

  //projects
  GET_PROJECTS = 'projects/my-projects',
  CREATE_PROJECT = 'projects/create',
  GET_PROJECT_BY_ID = 'projects/:projectId',

  //account
  FIND_USER = 'accounts/search'
}

export default APIs;
