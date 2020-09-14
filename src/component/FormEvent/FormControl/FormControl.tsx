import React from 'react'
import Input from './FormContent/Input'
import DatePicker from './FormContent/DatePicker'

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
        default:
            return null
    }
}

export default FormControl
