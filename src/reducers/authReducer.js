import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/types";

const initialState = {
  currentUser: null,
  isAuth: false
};

const auth2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };

    default:
      return state;
  }
};

export default auth2Reducer;
