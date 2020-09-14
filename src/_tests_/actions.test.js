import configureStore from 'redux-mock-store';
import {
    performSendUserEvent,
    successSendUserEvent,
    errorSendUserEvent,
} from '../store/actions/formEvent'

describe('perform send user event action', () => {
  const mockStore = configureStore();
  const reduxStore = mockStore();

  beforeEach(() => {
	reduxStore.clearActions();
  });

  const userEvent = {
      firstName: 'Aaaa',
      lastName: 'Bbbb',
      email: 'aaa@bbb.ccc',
      eventDate: '01/01/2020',
  }
 
	it('should dispatch the perform send user event action', () => {
		const expectedActions = [
			{
				payload: userEvent,
				type: 'PERFORM_SEND_USER_EVENT',
			},
		];
		reduxStore.dispatch(performSendUserEvent(userEvent));
		expect(reduxStore.getActions()).toEqual(expectedActions);
    });
    it('should dispatch the success send user event action', () => {
		const expectedActions = [
			{				
				type: 'SUCCESS_SEND_USER_EVENT',
			},
		];
		reduxStore.dispatch(successSendUserEvent());

		expect(reduxStore.getActions()).toEqual(expectedActions);
    });
    it('should dispatch the error send user event action', () => {
		const expectedActions = [
			{				
				type: 'ERROR_SEND_USER_EVENT',
			},
		];
		reduxStore.dispatch(errorSendUserEvent());

		expect(reduxStore.getActions()).toEqual(expectedActions);
	});
  });


