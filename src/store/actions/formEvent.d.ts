import { Action } from 'redux';


export interface IFormEvent {  
    firstName: string,
    lastName: string,
    email: string,
    dateEvent: Date | null,   
}

export interface IFormEventState {
    userEvent: IFormEvent | Object;  
    isError: boolean,
    isSuccess: boolean,
}

export interface IFormEventActions {
    type: string;
    payload?: any;
}

export interface ILoadingFormEventAction{
    payload: boolean
}

export type IFormEventTypes = IFormEventActions;

  export interface IPerformSendUserEvent extends Action {
    type: 'PERFORM_SEND_USER_EVENT',
    payload: IFormEvent
  }
  
  export interface ISuccessSendUserEvent extends Action {
    type: 'SUCCESS_SEND_USER_EVENT'   
  }
  
  export interface IErrorSendUserEvent extends Action {
    type: 'ERROR_SEND_USER_EVENT'   
  }