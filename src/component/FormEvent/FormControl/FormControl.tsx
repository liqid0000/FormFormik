import React from 'react'
import Input from './FormContent/Input'
import DatePicker from './FormContent/DatePicker'
import FieldFile from './FormContent/FieldFile'
import CheckboxGroup from './FormContent/CheckboxGroup'

const FormControl = (props: any) => {
    const {
        control,
        ...rest
    } = props
    switch (control) {
        case 'input':
            return <Input {...rest}/>
        case 'date':
            return <DatePicker {...rest}/>
        case 'file': 
            return <FieldFile {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />          
        default:
            return null
    }
}

export default FormControl
