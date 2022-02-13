import { v4 as uuid } from 'uuid';

// TYPES
const SET_ALERT = 'alert/SET_ALERT';
const REMOVE_ALERT = 'alert/REMOVE_ALERT';

// INITIAL STATE

const initialState = [];

// REDUCER

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

// ACTIONS

export const setAlert = (msg, alertType, timeout = 7000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
