// TYPES
const CHANGE_LANGUAGE = 'global/changeLanguage';
const UPDATE_SIDEBAR = 'global/updateSidebar';
const SWITCH_ROLE = 'global/switchRole';

// INITIAL STATE
const initialState = {
  language: { locale: 'en', displayName: 'Eng', direction: 'ltr' },
  sidebarShow: 'responsive',
  role: 'admin',
};

// REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case UPDATE_SIDEBAR:
      return {
        ...state,
        sidebarShow: payload,
      };
    case SWITCH_ROLE:
      return {
        ...state,
        role: payload,
      };
    default:
      return state;
  }
}

// ACTIONS
export const changeLanguage = (language) => async (dispatch) => {
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: language,
  });
};

export const updateSidebar = (value) => async (dispatch) => {
  dispatch({
    type: UPDATE_SIDEBAR,
    payload: value,
  });
};

export const switchRole = (value) => async (dispatch) => {
  dispatch({
    type: SWITCH_ROLE,
    payload: value,
  });
};
