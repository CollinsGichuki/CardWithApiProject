//This file controls the api network call status

//The action types
const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  //If the network call is successful, we pass the response
  success: (payload) => ({ type: types.SUCCESS, payload }),
};

export const initialState = {
  loading: true,
  error: false,
  posts: [],
};

//The reducer function
//takes in the previous state and an action
//returns new state according to the action
export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.SUCCESS:
      return { loading: false, error: false, posts: action.payload };
    case types.FAILURE:
      return { ...state, loading: false, error: true };
  }
}
