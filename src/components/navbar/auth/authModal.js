import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import './authModal.css'
import logo from "../../../assets/images/logo/logo.png"
import { Cast, Check, ChevronLeft, ChevronsLeft, ChevronsRight, EyeOff, Gift, Lock, Mail, Phone, Pocket, User } from 'react-feather';
import axios from 'axios'
import { emailChecking, mobileCheck, otpSend, signIn, signUp } from '../../../ApiConfigs/ApiConfig';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';

function AuthModal({ isOpen, toggle }) {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [emailOrMobileMethod, setEmailOrMobileMethod] = useState('email')
    const [validationErrors, setValidationErrors] = useState({});
    const [emailExists, setEmailExists] = useState(false);
    const [mobileExists, setMobileExists] = useState(false);
    const [emailCheck, setEmailCheck] = useState('')
    const [signUpMsg, setSignUpMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [errorMsgShow, setErrorMsgShow] = useState(false)


    const resetForm = () => {
        setName('');
        setMobile('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLogin(true);
        setEmailOrMobileMethod('email');
        setValidationErrors({});
        setEmailExists(false);
        setMobileExists(false);
    };

    const handleToggleForm = () => {
        resetForm();
        setLogin(!isLogin);
    };

    const toggleAndReset = () => {
        resetForm();
        toggle();
    };




    const validationSchema = yup.object().shape({
        name: !isLogin ? yup.string().required('Name is required') : yup.string(),
        email: !isLogin ? yup.string().email().required('Email is required') : yup.string().email(),
        mobile: !isLogin ? yup.string().required('Mobile is required') : yup.string(),
        password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters long'),
        confirmPassword: !isLogin
            ? yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').min(4, 'Password must be at least 4 characters long')
            : yup.string(),
    });

    const navigate = useNavigate()

    const clearValidation = (field) => {
        setValidationErrors({ ...validationErrors, [field]: null });
    };

    const handleAuthAction = async () => {
        try {
            setValidationErrors({});

            if (isLogin) {
                if (!email || !password) {
                    setValidationErrors({ email: 'Email is required', password: 'Password is required' });
                    return;
                }

                const payload = {
                    email: email,
                    password: password,
                    ip: '12'
                };

                try {
                    const response = await axios.post(signIn, payload);
                    localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
                    localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
                    localStorage.setItem('role', response?.data?.result?.user?.role?.name);
                    localStorage.setItem('userId', response?.data?.result?.user?._id);
                    localStorage.setItem('name', response?.data?.result?.user?.name);
                    toggle();
                    setErrorMsg('')
                    setErrorMsgShow(false)
                } catch (error) {
                    console.error('Login error:', error);
                    setErrorMsg(error?.response?.data?.msg)
                    setErrorMsgShow(true)
                }
            } else {
                const fieldsToValidate = { name, email, mobile, password, confirmPassword };
                try {
                    await validationSchema.validate(fieldsToValidate, { abortEarly: false });
                    const payload = {
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: password,
                        confirmPassword: confirmPassword,
                    };

                    const SignInPayload = {
                        email: mobile,
                        password: password,
                        ip: '12'
                    };

                    localStorage.setItem('name', name);
                    localStorage.setItem('mobile', mobile);
                    localStorage.setItem('email', email);

                    try {
                        const responseSignUp = await axios.post(signUp, payload);
                        const response = await axios.post(signIn, SignInPayload);
                        localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
                        localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
                        localStorage.setItem('role', response?.data?.result?.user?.role?.name);
                        localStorage.setItem('userId', response?.data?.result?.user?._id);
                        localStorage.setItem('name', response?.data?.result?.user?.name);
                        handleToggleForm();
                    } catch (error) {
                        console.error('Signup error:', error);
                    }
                } catch (error) {
                    const errors = {};
                    error.inner.forEach((e) => {
                        errors[e.path] = e.message;
                    });
                    setValidationErrors(errors);
                }
            }
        } catch (error) {
            console.error('Error in handleAuthAction:', error);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setMobile('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLogin(true);
            setEmailOrMobileMethod('email');
            setValidationErrors({});
            setEmailExists(false);
            setMobileExists(false);
        }
    }, [isOpen]);

    const checkExistingEmail = async (email) => {
        try {
            const response = await axios.post(emailChecking, { email, });
            setEmailCheck(response?.data?.msg)
            setEmailCheck('')
            return response.data.exists;
        } catch (error) {
            setEmailCheck(error?.response?.data?.msg)
            setSignUpMsg(true)
            return false;
        }
    };

    const checkExistingMobile = async (mobile) => {
        try {
            const response = await axios.post(mobileCheck, { mobile });
            toast.success(response?.data?.msg)
            return response.data.exists;
        } catch (error) {
            console.error('Error checking existing mobile number:', error);
            return false;
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggleAndReset} className="modern-modal" style={{ border: 'none' }}>
                <ModalHeader toggle={toggle} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        {!isLogin && (
                            <FormGroup>
                                <Label for="name">
                                    <User /> Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        clearValidation('name');
                                        setValidationErrors({ ...validationErrors, name: null });
                                    }}
                                    invalid={!!validationErrors.name}
                                />
                                <FormFeedback>{validationErrors.name}</FormFeedback>
                            </FormGroup>
                        )}
                        {!isLogin && (
                            <FormGroup>
                                <Label for="email">
                                    <Mail /> Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email Id"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        clearValidation('email');
                                        setValidationErrors({ ...validationErrors, email: null });
                                        checkExistingMobile(e.target.value)
                                    }}
                                    invalid={!!validationErrors.email}
                                />
                                <FormFeedback>{validationErrors.email}</FormFeedback>
                                {signUpMsg && (
                                    <div className='text-primary' >
                                        <span className='text-danger'>{emailCheck}?</span> <span className='cursor-pointer' onClick={handleToggleForm}>Login !</span>
                                    </div>
                                )}
                            </FormGroup>
                        )}
                        {!isLogin && (
                            <FormGroup>
                                <Label for="mobile">
                                    <Phone /> Mobile
                                </Label>
                                <Input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    placeholder="Enter your Mobile Number"
                                    value={mobile}
                                    onChange={(e) => {
                                        const trimmedValue = e.target.value.replace(/\D/g, '');
                                        setMobile(trimmedValue);
                                        clearValidation('mobile');
                                        // checkExisting(trimmedValue);

                                    }}
                                    invalid={!!validationErrors.mobile || (mobile.length !== 10 && mobile.length > 0)}
                                />
                                {mobile.length > 0 && mobile.length !== 10 && (
                                    <FormFeedback>Mobile number must be 10 digits</FormFeedback>
                                )}
                                <FormFeedback>{validationErrors.mobile}</FormFeedback>
                            </FormGroup>
                        )}
                        {isLogin && (
                            <>
                                <FormGroup tag="fieldset">
                                    <div className='d-flex'>
                                        <legend>
                                            <ChevronLeft /> Login with
                                        </legend>
                                        <FormGroup check className='mt-1 '>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="loginMethod"
                                                    checked={emailOrMobileMethod === 'email'}
                                                    onChange={() => {
                                                        setEmailOrMobileMethod('email')
                                                        clearValidation('email');
                                                        setValidationErrors({ ...validationErrors, email: null });


                                                    }}
                                                />{' '}
                                                Email
                                            </Label>

                                        </FormGroup>
                                        <FormGroup check className='mt-1 ms-3'>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="loginMethod"
                                                    checked={emailOrMobileMethod === 'mobile'}
                                                    onChange={() => setEmailOrMobileMethod('mobile')}
                                                />{' '}
                                                Mobile
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </FormGroup>
                                {emailOrMobileMethod === 'email' && (
                                    <FormGroup>
                                        <Label for="email">
                                            <Mail /> Email
                                        </Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your Email Id"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                clearValidation('email');
                                                setValidationErrors({ ...validationErrors, email: null });

                                            }
                                            }
                                            invalid={!!validationErrors.email}
                                        />


                                        <FormFeedback>{validationErrors.email}</FormFeedback>


                                    </FormGroup>
                                )}
                                {emailOrMobileMethod === 'mobile' && (
                                    <FormGroup>
                                        <Label for="mobile">
                                            <Phone /> Mobile
                                        </Label>
                                        <Input
                                            type="number"
                                            name="mobile"
                                            id="mobile"
                                            placeholder="Enter your Mobile Number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            invalid={!!validationErrors.mobile}
                                        />
                                        <FormFeedback>{validationErrors.mobile}</FormFeedback>
                                    </FormGroup>
                                )}
                            </>
                        )}
                        <FormGroup>
                            <Label for="password">
                                <Lock /> Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    clearValidation('password');

                                }}
                                invalid={!!validationErrors.password}
                            />
                            <FormFeedback>{validationErrors.password}</FormFeedback>
                        </FormGroup>
                        {!isLogin && (
                            <FormGroup>
                                <Label for="confirmPassword">
                                    <EyeOff /> Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm your Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        clearValidation('confirmPassword');
                                    }}
                                    invalid={!!validationErrors.confirmPassword}
                                />
                                <FormFeedback>{validationErrors.confirmPassword}</FormFeedback>
                            </FormGroup>
                        )}
                    </Form>
                    <span className="auth-toggle text-primary" style={{ cursor: 'pointer' }} onClick={handleToggleForm}>
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                        {
                            isLogin && errorMsgShow ? (<div className='text-danger text-center'>
                                {errorMsg}</div>)
                                : ''
                        }
                    </span>
                </ModalBody>
                <ModalFooter className="modern-modal-footer">
                    <button className="auth-button" onClick={handleAuthAction}>
                        {isLogin ? 'LOGIN NOW' : 'SIGN UP NOW'}
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AuthModal;