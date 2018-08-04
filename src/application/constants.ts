export const SET_WELCOME_PAGE = 'ROUTER:SET_WELCOME_PAGE';
export const SET_HOME_PAGE = 'ROUTER:SET_HOME_PAGE';
export const SET_QUESTIONNAIRE_PAGE = 'ROUTER:SET_QUESTIONNAIRE_PAGE';
export const SET_PLAN_PAGE = 'ROUTER:SET_PLAN_PAGE';
export const SET_EXPLORE_PAGE = 'ROUTER:SET_EXPLORE_PAGE';
export const SET_TASK_DETAIL_PAGE = 'ROUTER:SET_TASK_DETAIL_PAGE';
export const SET_EXPLORE_SECTION_PAGE = 'ROUTER:SET_EXPLORE_SECTION_PAGE';
export const SET_ARTICLE_DETAIL_PAGE = 'ROUTER:SET_ARTICLE_DETAIL_PAGE';
export const SET_HELP_PAGE = 'ROUTER:SET_HELP_PAGE';

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

export const SELECT_ANSWER = 'QUESTIONNAIRE:SELECT_ANSWER';
export const SET_ACTIVE_QUESTION = 'QUESTIONNAIRE:SET_ACTIVE_QUESTION';
export const SAVE_ACTIVE_QUESTIONS_REQUEST = 'QUESTIONNAIRE:SAVE_ACTIVE_QUESTIONS_REQUEST';
export const SAVE_ACTIVE_QUESTIONS_SUCCESS = 'QUESTIONNAIRE:SAVE_ACTIVE_QUESTIONS_SUCCESS';
export const LOAD_ACTIVE_QUESTIONS_REQUEST = 'QUESTIONNAIRE:LOAD_ACTIVE_QUESTIONS_REQUEST';
export const LOAD_ACTIVE_QUESTIONS_SUCCESS = 'QUESTIONNAIRE:LOAD_ACTIVE_QUESTIONS_SUCCESS';
export const LOAD_ACTIVE_QUESTIONS_FAILURE = 'QUESTIONNAIRE:LOAD_ACTIVE_QUESTIONS_FAILURE';

export namespace Task {
  export const ADD_TO_SAVED_LIST = 'TASK:ADD_TO_SAVED_LIST';
  export const REMOVE_FROM_SAVED_LIST = 'TASK:REMOVE_FROM_SAVED_LIST';
  export const TOGGLE_COMPLETED = 'TASK:TOGGLE_COMPLETED';
  export const SHARE = 'TASK:SHARE';
  export const UPDATE_SERVICES_REQUEST = 'TASK:UPDATE_SERVICES_REQUEST';
  export const UPDATE_SERVICES_SUCCESS = 'TASK:UPDATE_SERVICES_SUCCESS';
  export const UPDATE_SERVICES_FAILURE = 'TASK:UPDATE_SERVICES_FAILURE';
}

export const PREFERENCES_LOCALE_CODE = 'PREFERENCES:LOCALE_CODE';
export const QUESTIONNAIRE_LOCAL_STORAGE_KEY = 'QUESTIONNAIRE_LOCAL_STORAGE_KEY';

export namespace Taxonomies {
  export const EXPLORE_TAXONOMY_ID = 'explore';
  export const RECOMMENDATION_TAXONOMY_ID = 'recommendation';
  export const RECOMMEND_TO_ALL_TAXONOMY_TERM_ID = 'recommendToAll';
}
