import React from 'react'
import * as Yup from 'yup'
import FormEvent from '../../component/FormEvent/FormEvent'
import * as actionCreator from '../../store/actions/formEvent'
import { connect } from 'react-redux';
import { IFormEvent } from '../../store/actions/formEvent.d'

const formEventContainer = (props: any) => {
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
    }
    const initialValues: InitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        dateEvent: null,
    }
    const onSubmit = (values : IFormEvent) => {       
        performSendUserEvent(JSON.parse(JSON.stringify(values)))       
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
            .required('Required'),
        email: Yup
            .string()      
            .trim('The email cannot include leading and trailing spaces')
            .email('invalid email format')
            .required('Required'),
        dateEvent: Yup
            .date()                      
            .required('Required')
            .nullable()})

    return (
        <>
            <FormEvent
            isSuccess={isSuccess}
            isError={isError}          
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}/>
        </>
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

