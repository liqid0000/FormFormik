import React from 'react'
import { Formik, Form } from 'formik'
import FormControl from './FormControl/FormControl'
import { IFormEvent } from '../../store/actions/formEvent.d'
import { SuccessMessage } from '../Messages/SuccessMessage'
import { ErrorMessage } from '../Messages/ErrorMessage'

interface Props { 
    initialValues: IFormEvent;
    onSubmit: (formEvent: IFormEvent) => void;
    validationSchema: any;  
    isError: boolean,
    isSuccess: boolean,
} 

const formEvent = (props: Props) => {
    const {
        initialValues,
        validationSchema,
        onSubmit,    
        isError,
        isSuccess
    } = props
  
    return(
        <>
            <div className="panel"></div>
            {( isSuccess ) &&   
                <SuccessMessage />                
            }     
            {(isError) &&
                <ErrorMessage />
            }
            { (!isError && !isSuccess) &&
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount                                          
              >               
                {formik => {                                          
                    return (                        
                        <Form className='react-form'>
                        <h1>Event</h1>
                        <FormControl                        
                            control='input'
                            type='text'
                            label='First Name' 
                            name='firstName'                               
                            handleChange = {formik.handleChange}           
                        />
                        <FormControl 
                            control='input'
                            type='text'
                            label='Last Name'
                            name='lastName'                           
                            handleChange = {formik.handleChange}           
                        />
                        <FormControl 
                            control='input'
                            type='email' 
                            label='Email'
                            name='email'
                            handleChange = {formik.handleChange}                                             
                        />                    
                        <FormControl 
                            control='date'
                            label='Pick a date'
                            name='dateEvent'/>
                        <div className='form-group'>
                            <button
                                data-testid='buttonSubmit'
                                id='formButton'
                                className='btn'
                                type="submit" 
                                disabled={formik.isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}}
            </Formik>
            }          
        </>
    )
}

export default formEvent

