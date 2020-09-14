import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './FormError/TextError'

interface Props{
  type: string;
  label:string;
  name:string;
  handleChange:(text: string) => (e: React.ChangeEvent<any>)  => void;   
}

function Input (props: Props) {
  const { label, name, type,handleChange , ...rest } = props  
  return (
    <div className='form-group'>
      <label data-testid={`${name}Label`} htmlFor={name}>{label}</label>
      <Field
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          e.persist = () => {}
          handleChange(`${name}`)(e)
        }}
         // placeholder={`${name}`}
          data-testid={`${name}Input`}
          type={type}
          id={name}
          name={name}
          {...rest} /> 
      <ErrorMessage name={name}>   
      {(msg) => <TextError name={name}>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default Input