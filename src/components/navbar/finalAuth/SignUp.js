import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Form, FormFeedback, Input, Label } from 'reactstrap'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from '../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import axios from 'axios';

function SignUp({ toggleAuth }) {

    const [isUser, setIsUser] = useState(false);

    const SignupSchema = yup.object().shape({
        name: yup.string().required('Enter Your Name'),
        email: yup.string().email('Invalid email format').required('Enter Your Email'),
        mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile number').required('Enter Your Mobile Number'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Enter Your Password'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Your Password'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) });

    const handlesignup = async (data) => {

        const payload = {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            password: data.password
        }
        try {
            const responseSignUp = await axios.post(signUp, payload);
            toast.success(responseSignUp?.data?.msg);
            localStorage.setItem('signUpEmail', data.email)
            localStorage.setItem('signUpPassword', data.password)
            toggleAuth()
        } catch (error) {
            toast.error(error.response.data.msg)
            setIsUser(true)
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(handlesignup)();
    };
    return (
        <>
            <div >
                <Form onSubmit={handleFormSubmit}>
                    <div className='p-3'>
                        <div className='mb-2'>
                            <Label>Name </Label>
                            <Controller
                                name='name'
                                id='name'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.name && true} placeholder="Enter Your Name" />)} />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label>Email </Label>
                            <Controller
                                name='email'
                                id='email'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="email" {...field} invalid={errors.email && true} placeholder="Enter Your Email Id" />)} />
                            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label>Mobile Number </Label>
                            <Controller
                                name='mobile'
                                id='mobile'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="number" {...field} invalid={errors.mobile && true} placeholder="Enter Your Mobile Number" />)} />
                            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label>Password </Label>
                            <Controller
                                name='password'
                                id='password'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="password" {...field} invalid={errors.password && true} placeholder="Enter Your Password" />)} />
                            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label>Confirm Password</Label>
                            <Controller
                                name='confirmPassword'
                                id='confirmPassword'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="password" {...field} invalid={errors.confirmPassword && true} placeholder="Enter Your Confirm Password" />)} />
                            {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                        </div>

                        {isUser ? (
                            <span className='text-danger'>Email or Mobile Already Exist! <span className='text-primary' style={{ cursor: 'pointer' }} onClick={toggleAuth}>Try Login...</span></span>
                        ) : (
                            <span className="auth-toggle text-primary" style={{ cursor: 'pointer' }} onClick={toggleAuth}>
                                Already have an account? Login
                            </span>
                        )}
                    </div>
                    <div className="modern-modal-footer p-3">
                        <button className="auth-button" type='submit'>
                            SIGN UP NOW
                        </button>
                    </div>
                </Form>
            </div>

        </>
    )
}

export default SignUp
