export const SET_WELCOME_PAGE = 'ROUTER:SET_WELCOME_PAGE';
export const SET_HOME_PAGE = 'ROUTER:SET_HOME_PAGE';
export const SET_QUESTIONNAIRE_PAGE = 'ROUTER:SET_QUESTIONNAIRE_PAGE';
export const SET_PLAN_PAGE = 'ROUTER:SET_PLAN_PAGE';
export const SET_EXPLORE_PAGE = 'ROUTER:SET_EXPLORE_PAGE';
export const SET_TASK_DETAIL_PAGE = 'ROUTER:SET_TASK_DETAIL_PAGE';
export const SET_EXPLORE_SECTION_PAGE = 'ROUTER:SET_EXPLORE_SECTION_PAGE';
export const SET_ARTICLE_DETAIL_PAGE = 'ROUTER:SET_ARTICLE_DETAIL_PAGE';
export const SET_HELP_PAGE = 'ROUTER:SET_HELP_PAGE';
export const ROUTE_CHANGED = 'ROUTER:ROUTE_CHANGED';

export const REMOVE_NOTIFICATION = 'NOTIFICATIONS:REMOVE_NOTIFICATION';

export const LOAD_FONTS_REQUEST = 'UI:LOAD_FONTS_REQUEST';
export const LOAD_FONTS_SUCCESS = 'UI:LOAD_FONTS_SUCCESS';
export const LOAD_FONTS_FAILURE = 'UI:LOAD_FONTS_FAILURE';

export const OPEN_LOCALE_SWITCHER = 'UI:OPEN_LOCALE_SWITCHER';

export const SET_LOCALE_REQUEST = 'I18N:SET_LOCALE_REQUEST';
export const SET_LOCALE_SUCCESS = 'I18N:SET_LOCALE_SUCCESS';
export const SET_LOCALE_FAILURE = 'I18N:SET_LOCALE_FAILURE';
export const LOAD_CURRENT_LOCALE_REQUEST = 'I18N:LOAD_CURRENT_LOCALE_REQUEST';
export const LOAD_CURRENT_LOCALE_SUCCESS = 'I18N:LOAD_CURRENT_LOCALE_SUCCESS';
export const LOAD_CURRENT_LOCALE_FAILURE = 'I18N:LOAD_CURRENT_LOCALE_FAILURE';

export const CHOOSE_ANSWER = 'QUESTIONNAIRE:SELECT_ANSWER';
export const SET_ACTIVE_QUESTION = 'QUESTIONNAIRE:SET_ACTIVE_QUESTION';
export const DISMISS_NEWLY_ADDED_POPUP = 'QUESTIONNAIRE:DISMISS_NEWLY_ADDED_POPUP';

export const SAVE_USER_DATA_SUCCESS = 'SAVE_USER_DATA_SUCCESS';
export const SAVE_USER_DATA_FAILURE = 'SAVE_USER_DATA_FAILURE';
export const LOAD_USER_DATA_REQUEST = 'LOAD_USER_DATA_REQUEST';
export const LOAD_USER_DATA_SUCCESS = 'LOAD_USER_DATA_SUCCESS';
export const LOAD_USER_DATA_FAILURE = 'LOAD_USER_DATA_FAILURE';

export const CLEAR_ERROR_STATE = 'REDUCERS:CLEAR_ERROR_STATE';

export const ADD_TO_SAVED_TASKS = 'ADD_TO_SAVED_TASKS';
export const SAVE_THESE_TASKS_TO_MY_PLAN = 'SAVE_THESE_TASKS_TO_MY_PLAN';
export const REMOVE_FROM_SAVED_TASKS = 'REMOVE_FROM_SAVED_TASKS';
export const TOGGLE_IS_TASK_COMPLETED = 'TOGGLE_IS_TASK_COMPLETED';
export const LOAD_SERVICES_REQUEST = 'LOAD_SERVICES_REQUEST';
export const LOAD_SERVICES_SUCCESS = 'LOAD_SERVICES_SUCCESS';
export const LOAD_SERVICES_FAILURE = 'LOAD_SERVICES_FAILURE';

export const PREFERENCES_LOCALE_CODE = 'PREFERENCES:LOCALE_CODE';
export const USER_DATA_STORAGE_KEY = 'QUESTIONNAIRE_LOCAL_STORAGE_KEY';

export namespace Taxonomies {
  export const EXPLORE_TAXONOMY_ID = 'explore';
  export const RECOMMENDATION_TAXONOMY_ID = 'recommendation';
  export const RECOMMEND_TO_ALL_TAXONOMY_TERM_ID = 'recommendToAll';
}
