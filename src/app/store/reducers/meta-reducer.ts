import { ActionTypes } from "../actions/redux-flush-action";
export function clearState(reducer: any) {
  return function (state: any, action: any) {
    if (action.type === ActionTypes.REDUX_STATE_FLUSH) {
      state = undefined;
    }

    return reducer(state, action);
  };
}