import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './FormError/TextError'

function CheckboxGroup (props) {
  const { label, name, type } = props
  return ( 
       <div className='form-group' style={{height: '30px'}}>         
          <label>{label}</label>
          <Field
            style={{display: 'inline', width: '10%'}}
            type={type}
            name={name}
          />
          <ErrorMessage name={name}>   
          {(msg) => <TextError name={name}>{msg}</TextError>}
          </ErrorMessage>    
        </div>   
  )
}
export default CheckboxGroup