import reducerFormEvent from './reducers/formEvent';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    formEvent: reducerFormEvent,   
});

export type RootReducer = ReturnType<typeof rootReducer> 