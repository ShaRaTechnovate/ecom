import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormFeedback, Input, Label } from 'reactstrap';
import { otpSend } from '../../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';


function MobileSend({ toggleAuth }) {

    const SignInEmailSchema = yup.object().shape({
        mobile: yup.string().required('Enter Your Mobile Number').matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    });

    const {
        handleSubmit: handleMobileFormSubmit,
        control: emailControl,
        setValue: setEmailValue,
        formState: { errors: emailErrors },
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignInEmailSchema) });

    const handleMobileSignIn = async (data) => {

        try {
            const response = await axios.post(otpSend, data);
            toast.success(response?.data?.msg);
            localStorage.setItem('SignInMobile', data.mobile)
            toggleAuth()
        }
        catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <>
            <Form onSubmit={handleMobileFormSubmit(handleMobileSignIn)}>
                <div className='ps-3 pe-3 mb-3'>
                    <div className='mb-2'>
                        <Label>Mobile Number</Label>
                        <Controller
                            name='mobile'
                            id='mobile'
                            control={emailControl}
                            defaultValue=''
                            render={({ field }) => (
                                <Input type='text' {...field} invalid={emailErrors.mobile && true} placeholder='Enter Your Mobile Number' />
                            )}
                        />
                        {emailErrors.mobile && <FormFeedback>{emailErrors.mobile.message}</FormFeedback>}
                    </div>
                </div>
                <div className='modern-modal-footer p-3'>
                    <button className='auth-button' type='submit'>
                        LOGIN NOW
                    </button>
                </div>
            </Form>


        </>
    )
}

export default MobileSend
