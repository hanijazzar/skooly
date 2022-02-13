// TYPES
const SHOW_STUDENT_MODAL = 'students/showStudentModal';
const HIDE_STUDENT_MODAL = 'students/hideStudentModal';
const SET_OPERATION = 'students/setOperation';

// INITIAL STATE
const initialState = {
  showStudentModal: false,
  operation: 'Add',
};

// REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_STUDENT_MODAL:
      return {
        ...state,
        showStudentModal: true,
      };
    case HIDE_STUDENT_MODAL:
      return {
        ...state,
        showStudentModal: false,
      };
    case SET_OPERATION:
      return {
        ...state,
        operation: payload,
      };
    default:
      return state;
  }
}

// ACTIONS
export const showStudentModal = () => async (dispatch) => {
  dispatch({
    type: SHOW_STUDENT_MODAL,
    payload: true,
  });
};

export const hideStudentModal = () => async (dispatch) => {
  dispatch({
    type: HIDE_STUDENT_MODAL,
    payload: false,
  });
};

export const setOperation = (op) => async (dispatch) => {
  dispatch({
    type: SET_OPERATION,
    payload: op,
  });
};
