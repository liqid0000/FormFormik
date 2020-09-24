import React from 'react'
import * as Yup from 'yup'
import FormEvent from '../../component/FormEvent/FormEvent'
import * as actionCreator from '../../store/actions/formEvent'
import { connect } from 'react-redux';
import { IFormEvent } from '../../store/actions/formEvent.d'

const formEventContainer = (props: any) => {
    const phoneRegExp = /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/

    const FILE_SIZE = 10 * 1000 * 1024;

    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];

    const {
        performSendUserEvent,     
        isError,
        isSuccess,
    } = props

    type InitialValues = {
        firstName: string,
        lastName: string,
        email: string,
        dateEvent: Date | null,
        phoneNumber: string,
        acceptTerms1: boolean,
        acceptTerms2: boolean,
        photoFile: any,
    }

    
    const initialValues: InitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        dateEvent: null,
        phoneNumber: '',
        acceptTerms1: false,
        acceptTerms2: false,    
        photoFile: null,
    }
       
    const onSubmit = (values : IFormEvent) => {       
        performSendUserEvent(JSON.parse(JSON.stringify(values)))       
        console.log(JSON.parse(JSON.stringify(values)))         
    }      

    
      
    const validationSchema = Yup.object({
        firstName: Yup
            .string()       
            .trim('The first name cannot include leading and trailing spaces')
            .strict(true)
            .required('Required'),
        lastName: Yup
            .string()         
            .trim('The last name cannot include leading and trailing spaces')
            .strict(true)
            .required('Required'),
        email: Yup
            .string()      
            .trim('The email cannot include leading and trailing spaces')
            .strict(true)
            .email('invalid email format')
            .required('Required'),
        dateEvent: Yup
            .date()                  
            .required('Required')
            .nullable(),
        phoneNumber: Yup
            .string()
            .required('Required')
            .matches(phoneRegExp, 'Phone number is not valid'),
        acceptTerms1: Yup
            .bool()
            .oneOf([true], 'Required'),  
        acceptTerms2: Yup
            .bool()
            .oneOf([true], 'Required'),  
        photoFile: Yup     
            .mixed()
            .required("A file is required")
            .test(
              "fileHeight",
              "to big image resoltion",               
              value => !value || !value.height || !value.height || ( value.width < 1000 && value.width < 1000) )                
            .test(
              "fileSize",
              "File too large",            
              value => !value || (value && value.size <= FILE_SIZE))            
            .test(
              "fileFormat",
              "Unsupported Format",
              value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
            )        
              
        })
    return (      
        <FormEvent
            isSuccess={isSuccess}
            isError={isError}          
            initialValues={initialValues}
            validationSchema={validationSchema}           
            onSubmit={onSubmit}         
        />      
    )
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        performSendUserEvent: (userEvent: any) => {dispatch(actionCreator.performSendUserEvent(userEvent))}     
    }
};
const mapStateToProps = ({formEvent}:any) => ({   
    isSuccess: formEvent.isSuccess,
    isLoading: formEvent.isLoading,   
    isError: formEvent.isError,   
});

export default connect(mapStateToProps, mapDispatchToProps)(formEventContainer);

