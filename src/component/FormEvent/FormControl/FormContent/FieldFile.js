import React, { useState} from 'react';
import { ErrorMessage, Field } from 'formik'
import TextError from './FormError/TextError'

const FieldFile = (props) => {
    const { label, name, type, setFieldValue, ...rest} = props;
    const [fileName, setFileName] = useState("");

    const handlePhotoChange = (e)=> {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.currentTarget.files[0];
      if (file) {
        reader.onloadend = () => setFileName(file.name);
        reader.readAsDataURL(file);
        setFieldValue(`${name}`, file);
      }
    };  

    const inputFile = () => {
        return (
        <input
        type="file"
        onChange= {(e) => {
              e.persist = () => {}
              handlePhotoChange(e) 
         } }  
          />
        )
      }
  
    return (
        <div className='form-group'>
            <label data-testid={`${name}Label`} htmlFor={name}>{label}</label>
            <Field
                type="file"
                name={name}
                id={name}
                data-testid={`${name}Input`}
                {...rest}
                component={inputFile}           
            />
             <ErrorMessage name={name}>   
                {(msg) => <TextError name={name}>{msg}</TextError>}
            </ErrorMessage>
        </div>
    )
}

export default FieldFile