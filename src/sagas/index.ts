import { all, call } from 'redux-saga/effects';
import formEventSaga from './formEvent';

function* watchAll() {
  yield all([
    call(formEventSaga),  
  ]);
}

export default watchAll;