import { 
    put, 
    call,   
    takeEvery,   
    select,   
}from  'redux-saga/effects'
import *as actions from '../store/actions/formEvent'
import *as actionType from '../store/actionsType/formEventType'

export const getUserEvent = (state: any) => state.formEvent.userEvent;

export const getAxiosSendConfig = (userEvent: any) =>{ 
  let qs = require('qs');  
  let data = qs.stringify(userEvent)
  return {
    method: 'post',
    url: 'http://localhost:8080/api/bio/', 
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };  
}

export function* sendUserEvent(){
  const axios = require('axios');  
  const  userEvent  = yield select(getUserEvent);
    try{    
      console.log(userEvent)
      const response = yield call( 
        axios, getAxiosSendConfig(userEvent)
      )
      console.log(response)
      yield put(actions.successSendUserEvent())     
    }catch(e){
      console.log(e)
      yield put(actions.errorSendUserEvent())
    }
}

export default function* (){       
    yield takeEvery(actionType.PERFORM_SEND_USER_EVENT, sendUserEvent);      
} 