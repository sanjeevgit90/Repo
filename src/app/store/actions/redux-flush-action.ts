import { Action } from "@ngrx/store";

export class ActionTypes {
    static REDUX_STATE_FLUSH = "Redux State Flush";
  }
  
  export class FlushTheReduxState implements Action {
    readonly type = ActionTypes.REDUX_STATE_FLUSH;
  }