import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './FormError/TextError'
import 'react-datepicker/dist/react-datepicker.css'

interface Props{ 
  label:string;
  name:string;   
}

function DatePicker (props: Props) {
  const { label, name, ...rest } = props
  return (
    <div className='form-group'>
      <label  style={{display: 'block'}}   htmlFor={name} data-testid={`${name}Label`}>{label}</label>
      <Field name={name}  style={{display: 'block'}}>
        {({ form, field }: any) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <DateView 
              style={{display: 'block'}}          
              id={name}
              data-testid={`${name}Input`}
              {...field}
              {...rest}
              selected={value}
              onChange={val => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name}>   
       {(msg) => <TextError name={name}>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default DatePicker