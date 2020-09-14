import * as actionTypes from '../actionsType/formEventType';
import { IFormEventState, IFormEventTypes } from '../actions/formEvent.d'

const INITIAL_STATE: IFormEventState = {
    userEvent: {},
    isError: false,
    isSuccess: false,
};

export const reducerFormEvent = ( state = INITIAL_STATE, action: IFormEventTypes ): IFormEventState => {
    switch ( action.type ) {
        case actionTypes.PERFORM_SEND_USER_EVENT:
            return{
                ...state,              
                userEvent: action.payload,
            }
        case actionTypes.SUCCESS_SEND_USER_EVENT:
            return{
                ...state,              
                isError: false,     
                isSuccess: true,                    
            }
        case actionTypes.ERROR_SEND_USER_EVENT:
            return{
                ...state,
                isError: true,              
            }
        default: 
            return state;
    }
}

export default reducerFormEvent


