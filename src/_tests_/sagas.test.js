import { put, call, select } from 'redux-saga/effects';
import { sendUserEvent, getAxiosSendConfig, getUserEvent } from '../sagas/formEvent';
import *as actions from '../store/actions/formEvent'

describe('saga', () => {
  it('send user event successfully',async () => {       
    const axios = require('axios');  
    const userEvent = jest.fn();
    const config = getAxiosSendConfig(userEvent)
    const generator = sendUserEvent(); 
    expect(generator.next().value)
    .toEqual(select(getUserEvent))
    expect(generator.next().value)
    .toEqual(call(axios, config));
    expect(generator.next().value)
    .toEqual(put(actions.successSendUserEvent()));   
  });
});