import React from "react";
import configureStore from 'redux-mock-store';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent,cleanup, wait, screen,waitForElement   } from "@testing-library/react";
import { Provider } from 'react-redux';
import App from '../App' 
import {convertDate} from '../utils/utils'
afterEach(cleanup)

export const setup = () => {
    const onSubmit = jest.fn()
    const props = {formEvent: jest.fn()};  
    const mockStore = configureStore([]);
    const store = mockStore({formEvent:{userEvent: {}, isLoading: false, isError: false, isSuccess: false}});
    const mockDispatchfn = jest.fn();
    const { debug, getByTestId, getByLabelText, queryByTestId } = render(
        <Provider store={store}>
            <App {...props} dispatch={mockDispatchfn}/>
        </Provider>)   
    const emailInput = getByTestId('emailInput')
    const emailLabel = getByTestId('emailLabel')    
    const firstNameInput = getByTestId('firstNameInput')
    const firstNameLabel = getByTestId('firstNameLabel')    
    const lastNameInput = getByTestId('lastNameInput')
    const lastNameLabel = getByTestId('lastNameLabel') 
    const dateEventInput = getByLabelText('Pick a date')
    const dateEventLabel = getByTestId('dateEventLabel')
    const buttonSubmit = getByTestId('buttonSubmit')
    return {
      debug,
      getByTestId,
      queryByTestId,
      getByLabelText,      
      onSubmit,
      emailInput, emailLabel, 
      firstNameInput, firstNameLabel, 
      lastNameInput, lastNameLabel,      
      dateEventInput, dateEventLabel,
      buttonSubmit,
    }
  }
 
async function makeChangeInput(nameInput,targetName, value) {
    await wait(() =>{
        fireEvent.blur(nameInput)
        fireEvent.change(nameInput, {
            target: {
                name: `${targetName}`,
                value: `${value}`
            }
        })  
    })     
}

describe('should inputs change and doesnt show the error message',() =>{ 
    it('should Input Email change and doesnt show the error email message ', async () =>{
        const { emailInput, queryByTestId } = setup()       
        expect(emailInput).not.toBe(null)       
        await makeChangeInput(emailInput, 'email', 'aab@ss.cc')
        expect(emailInput.value).toBe('aab@ss.cc')        
        expect(queryByTestId('emailError')).toBeFalsy()
    })    
    it('should Input First Name change and doesnt show the error firstName message', async () =>{        
        const { firstNameInput, queryByTestId} = setup()                  
        expect(firstNameInput).not.toBe(null)      
        await makeChangeInput(firstNameInput, 'firstName', 'Anna')
        expect(firstNameInput.value).toBe('Anna')
        expect(queryByTestId('firstNameError')).toBeFalsy() 
    })
    it('should Input Last Name change and doesnt show the error lastName message', async () =>{        
        const { lastNameInput, queryByTestId} = setup()                  
        expect(lastNameInput).not.toBe(null)
        await makeChangeInput(lastNameInput, 'lastName', 'John')
        expect(lastNameInput.value).toBe('John')
        expect(queryByTestId('lastNameError')).toBeFalsy()
    })
    it('should Input Date Event change and doesnt show the error dateEvent message', async () =>{
        const { queryByTestId, dateEventInput } = setup()
        const date = new Date();
        const formatted_date = convertDate(date)      
        await makeChangeInput(dateEventInput, 'dateEvent', formatted_date)
        expect(dateEventInput.value).toBe(formatted_date)
        expect(queryByTestId("dateEventError")).toBe(null);     
    })    
})
 

describe('should shows errors message',() =>{    
    it('should show error email message invalid email format',async() =>{    
        const { emailInput, queryByTestId} = setup()             
        expect(emailInput).not.toBe(null)
        await makeChangeInput(emailInput, 'email', 'a')       
        const errorMessage = queryByTestId('emailError')   
        expect(errorMessage).toBeTruthy()
        expect(errorMessage.textContent ).toBe('invalid email format')       
    })
    it('should show error email message Required', async () => {
        const { emailInput, queryByTestId} = setup()          
        expect(emailInput).not.toBe(null)   
        await makeChangeInput(emailInput, 'email', '')      
        const errorMessage = queryByTestId('emailError')   
        expect(errorMessage).toBeTruthy()
        expect(errorMessage.textContent ).toBe('Required')     
    })
    it('should show error firstName message Required', async () => {
        const { firstNameInput, queryByTestId} = setup()          
        expect(firstNameInput).not.toBe(null)
        await makeChangeInput(firstNameInput, 'firstName', '')    
        const errorMessage = queryByTestId('firstNameError')   
        expect(errorMessage).toBeTruthy()
        expect(errorMessage.textContent ).toBe('Required')     
    })
    it('should show error lastName message Required', async () => {
        const { lastNameInput, queryByTestId} = setup()          
        expect(lastNameInput).not.toBe(null)
        await makeChangeInput(lastNameInput, 'lastName', '')    
        const errorMessage = queryByTestId('lastNameError')   
        expect(errorMessage).toBeTruthy()
        expect(errorMessage.textContent ).toBe('Required')     
    })
    it('should show error dateEvent message Required', async () =>{
        const { queryByTestId, dateEventInput } = setup()           
        await makeChangeInput(dateEventInput,'dateEvent', '')          
        const errorMessage = queryByTestId('dateEventError')    
        expect(errorMessage).toBeTruthy()
        expect(errorMessage.textContent ).toBe('Required')         
    })
})

describe('defines form fields', () => {    
    test('renders first name field', () => {     
        const { firstNameInput, firstNameLabel} = setup()   
        expect(firstNameInput).not.toBe(null)
        expect(firstNameLabel).not.toBe(null)      
        expect(firstNameLabel.textContent).toBe('First Name')
        expect(firstNameInput).toHaveAttribute('type', 'text')              
    });
    test('renders last name field', () => {   
        const { lastNameInput, lastNameLabel} = setup()        
        expect(lastNameLabel.textContent).toBe('Last Name')
        expect(lastNameInput).toHaveAttribute('type', 'text')        
    });
    test('renders email field', () => {   
        const { emailInput, emailLabel} = setup()        
        expect(emailLabel.textContent).toBe('Email')
        expect(emailInput).toHaveAttribute('type', 'email')         
    });
    test('renders Pick a date field', () => {   
        const { dateEventInput, dateEventLabel } = setup() 
        expect(dateEventLabel.textContent).toBe('Pick a date')
        expect(dateEventInput).toHaveAttribute('type', 'text')     
    });  
}) 


describe('defines the component <App>', () => {  
    const props = {handleSubmit: jest.fn()};  
    const mockStore = configureStore();
    const store = mockStore({formEvent:{userEvent: {}, isLoading: false, isError: false, isSuccess: false}});
    const mockDispatchfn = jest.fn();

    it("should render correctly", () => {
        const component = render(
        <Provider store={store}>
            <App {...props} dispatch={mockDispatchfn}/>
        </Provider>)
    })
});

describe('should display all error messages after click submit button', () => {  
    it('should display all error messages after click submit button', async () => {
        const { buttonSubmit, queryByTestId } = setup()
        await wait(() =>{
            fireEvent.click(buttonSubmit)
        })
        const errorMessageEmail = queryByTestId('emailError')
        const errorMessageFirstName = queryByTestId('firstNameError')
        const errorMessageLastName = queryByTestId('lastNameError')    
        expect(errorMessageEmail.textContent ).toBe('Required')     
        expect(errorMessageFirstName.textContent ).toBe('Required')     
        expect(errorMessageLastName.textContent ).toBe('Required')     
    })  
});

