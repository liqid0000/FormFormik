import * as formEventType from '../actionsType/formEventType'
import { 
    IFormEvent,
    IPerformSendUserEvent,
    ISuccessSendUserEvent,
    IErrorSendUserEvent}
from './formEvent.d'

export const performSendUserEvent = (payload : IFormEvent): IPerformSendUserEvent =>{
    return{
        type: formEventType.PERFORM_SEND_USER_EVENT,
        payload
    }
}

export const successSendUserEvent = (): ISuccessSendUserEvent  =>{
    return{
        type: formEventType.SUCCESS_SEND_USER_EVENT,       
    }
}

export const errorSendUserEvent = (): IErrorSendUserEvent  =>{
    return{
        type: formEventType.ERROR_SEND_USER_EVENT 
    }
}