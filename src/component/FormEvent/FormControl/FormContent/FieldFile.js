import React, { useState} from 'react';
import { Field } from 'formik'
import TextError from './FormError/TextError'

const FieldFile = (props) => {
    const { label, name, type, setFieldValue, form, errors, touched, ...rest} = props;  
    const [thumb, setThumb] = useState();

    const handlePhotoChange = (e)=>  {
      e.preventDefault();
      let image = new Image();    
      let reader = new FileReader();
      let file = e.target.files[0];            
     
      if (file) {      
        reader.onloadend = () =>{         
          image.src = reader.result        
        if(image){        
          image.onload = () =>{           
          if(image.height) file.height = image.height
          if(image.width) file.width = image.width      
          setFieldValue(`${name}`, file, true); 
          }
        }
          setThumb(reader.result)                         
        };         
        reader.readAsDataURL(file);    
    }
    };  

  
    const inputFile = () => {
        return (
        <input
        accept="image/x-png,image/gif,image/jpeg"
          type="file"
          onChange= {(e) => {
            e.persist = () => {}
            handlePhotoChange(e)            
          }}  
        />
        )
      }

   
    return (
      <div className='media-group'>
          <label data-testid={`${name}Label`} htmlFor={name}>{label}</label>
          <Field
            type="file"
            name={name}
            id={name}
            data-testid={`${name}Input`}
            {...rest}            
            component={inputFile}    
            errorMessage = {errors.photoFile && "cccc"}    
          />    
            {(thumb && !errors.photoFile) &&       
       
       <img
         src={thumb}
         alt={name}             
         className="img-thumbnail mt-2"
         height={100}
         width={100}
    />     
     }     
      
     {(errors.photoFile)?<TextError name={name}>{errors.photoFile}</TextError>: null}
         
      </div>
    )
}

export default FieldFile
