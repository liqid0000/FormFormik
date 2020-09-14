import reducerFormEvent from '../store/reducers/formEvent'
import *as actions from '../store/actions/formEvent'

describe('reducer', () => {
    const initialState = {        
       isError: false,     
       isSuccess: false,
       userEvent: {}, 
    };  
    it('returns the initial state when an action type is not passed', () => {
      const reducer = reducerFormEvent(undefined, {});  
      expect(reducer).toEqual(initialState);
    });
    it('handles PERFORM_SEND_USER_EVENT as expected', () => {
        const userEventMock = jest.fn()
        const reducer = reducerFormEvent(initialState, actions.performSendUserEvent(userEventMock));
        expect(reducer).toEqual({       
            isSuccess: false,
            isError: false,              
            userEvent: userEventMock,
        });
      });
    it('handles SUCCESS_SEND_USER_EVENT as expected', () => {       
    const reducer = reducerFormEvent(initialState, actions.successSendUserEvent());
    expect(reducer).toEqual({       
        isSuccess: true,
        isError: false,          
        userEvent: {},
      });
    });
    it('handles SUCCESS_SEND_USER_EVENT as expected', () => {       
    const reducer = reducerFormEvent(initialState, actions.successSendUserEvent());
    expect(reducer).toEqual({       
        isSuccess: true,
        isError: false,          
        userEvent: {},
      });
    });
  });