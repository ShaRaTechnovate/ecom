import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Badge, Form, FormFeedback, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { signIn } from '../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import MobileOTPModal from './mobileOTP';

function SignIn({ toggleAuth, toggle }) {
    const [isUser, setIsUser] = useState(false);


    const SignInEmailSchema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Enter Your Email'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Enter Your Password'),
    });

    const {
        handleSubmit: handleEmailFormSubmit,
        control: emailControl,
        setValue: setEmailValue,
        formState: { errors: emailErrors },
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignInEmailSchema) });

    const handleEmailSignIn = async (data) => {
        const payload = {
            ...data,
            ip: '12',
        };

        try {
            const response = await axios.post(signIn, payload);
            localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
            localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
            localStorage.setItem('role', response?.data?.result?.user?.role?.name);
            localStorage.setItem('userId', response?.data?.result?.user?._id);
            localStorage.setItem('name', response?.data?.result?.user?.name);
            localStorage.setItem('mobile', response?.data?.result?.user?.mobile)
            localStorage.removeItem('signUpEmail');
            localStorage.removeItem('signUpPassword');
            toggle();
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsUser(true);
        }
    };

    useEffect(() => {
        setEmailValue('email', localStorage.getItem('signUpEmail'));
        setEmailValue('password', localStorage.getItem('signUpPassword'));
    }, [localStorage.getItem('signUpPassword'), localStorage.getItem('signUpEmail')]);

    return (
        <>
            <div>
                <Form onSubmit={handleEmailFormSubmit(handleEmailSignIn)}>
                    <div className='ps-3 pe-3 mb-3'>
                        <div className='mb-2'>
                            <Label>Email </Label>
                            <Controller
                                name='email'
                                id='email'
                                control={emailControl}
                                defaultValue=''
                                render={({ field }) => (
                                    <Input type='text' {...field} invalid={emailErrors.email && true} placeholder='Enter Your Email Id' />
                                )}
                            />
                            {emailErrors.email && <FormFeedback>{emailErrors.email.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label>Password </Label>
                            <Controller
                                name='password'
                                id='password'
                                control={emailControl}
                                defaultValue=''
                                render={({ field }) => (
                                    <Input type='password' {...field} invalid={emailErrors.password && true} placeholder='Enter Your Password' />
                                )}
                            />
                            {emailErrors.password && <FormFeedback>{emailErrors.password.message}</FormFeedback>}
                        </div>

                        {isUser ? (
                            <span className='text-danger'>
                                Invalid Email or Password!{' '}
                                <span className='text-primary' style={{ cursor: 'pointer' }} onClick={toggleAuth}>
                                    Try Login...
                                </span>
                            </span>
                        ) : (
                            <div className=''>
                                <span className='auth-toggle text-primary' style={{ cursor: 'pointer' }} onClick={toggleAuth}>
                                    Don't have an account? Sign Up
                                </span>
                            </div>
                        )}
                    </div>
                    <div className='modern-modal-footer p-3'>
                        <button className='auth-button' type='submit'>
                            LOGIN NOW
                        </button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default SignIn;
