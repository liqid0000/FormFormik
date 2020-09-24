import React from 'react'
import { Formik, Form } from 'formik'
import FormControl from './FormControl/FormControl'
import { IFormEvent } from '../../store/actions/formEvent.d'
import { SuccessMessage } from '../Messages/SuccessMessage'
import { ErrorMessage } from '../Messages/ErrorMessage'
import ExportCSV from '../../container/ExportCSV/ExportCSV'

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
        isSuccess,        
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
            {(!isError && !isSuccess) &&
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
                            control='input'
                            type='text' 
                            label='Phone number'
                            name='phoneNumber'
                            handleChange = {formik.handleChange}                                             
                        />                    
                        <FormControl 
                            control='date'
                            label='Pick a date'
                            name='dateEvent'                            
                        />
                         <FormControl 
                            control='file'
                            type='file'
                            label='Photo'
                            name='photoFile'
                            errors={formik.errors}
                            touched={formik.touched}
                            setFieldValue = {formik.setFieldValue}
                            
                        />                                                            
                        <FormControl
                            control='checkbox'
                            type='checkbox'
                            label='Terms1'
                            name='acceptTerms1'                                                        
                        />           
                        <FormControl                            
                            control='checkbox'
                            type='checkbox'
                            label='Terms2'
                            name='acceptTerms2'                                           
                        />                                         
                        <div className='form-group' style={{marginBottom:'20px'}}>
                            <ExportCSV
                                csvData={JSON.parse(JSON.stringify(formik.values))}
                                fileName={'form'}
                                type='button'                               
                                isDisabled={!(formik.isValid && formik.dirty)}
                            />
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

