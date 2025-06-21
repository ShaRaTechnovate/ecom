import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Phone } from 'react-feather';
import { otpSend, otpVerify } from '../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import axios from 'axios';
import logo from "../../../assets/images/logo/logo.png"

function NewAuthModal({ isOpen, toggle }) {
    const [isLogin, setLogin] = useState(true);
    const [showOtpField, setShowOtpField] = useState(false);
    const [showMobile, setMobileShow] = useState(false)
    const [mobileNum, setMobileNum] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);


    const resetForm = () => {
        setOtpVerified(false);
        setMobileNum('');
        mobileReset("");
        otpReset("");
    };

    const handleToggleForm = () => {
        resetForm();
        setLogin(!isLogin);
    };

    const toggleAndReset = () => {
        resetForm();
        toggle();
    };

    const mobileValidationSchema = yup.object().shape({
        mobile: yup
            .string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required()
    });

    const { control: mobileControl, handleSubmit: mobileValidation, formState: { errors: mobileError }, reset: mobileReset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(mobileValidationSchema),
    });

    const otpValidationSchema = yup.object().shape({
        otp: yup
            .string()
            .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')
            .required()
    });

    const { control: otpControl, handleSubmit: otpValidation, formState: { errors: otpError }, reset: otpReset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(otpValidationSchema),
    });

    const onSubmitMobile = async (data) => {
        try {
            const response = await axios.post(otpSend, { mobile: data.mobile });
            toast.success(response?.data?.msg);
            setMobileNum(data.mobile);
            setShowOtpField(true);
            setMobileShow(true)
        }
        catch (error) {
            toast.error(error?.response?.data?.msg);

        }
    }


    const onsubmitOtp = async (data) => {
        try {
            const response = await axios.post(otpVerify, { ...data, mobile: mobileNum });
            localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
            localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
            localStorage.setItem('role', response?.data?.result?.user?.role?.name);
            localStorage.setItem('userId', response?.data?.result?.user?._id);
            localStorage.setItem('name', response?.data?.result?.user?.name)
            toast.success(response?.data?.msg);
            toggle()
            setShowOtpField(false);

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    }
    useEffect(() => {
        if (showMobile) {
            mobileReset();
        }
    }, [showMobile, mobileReset]);

    useEffect(() => {
        if (!showOtpField) {
            otpReset();
        }
    }, [showOtpField, otpReset]);



    const mobileHandleReset = () => {
        mobileReset();
    };

    const otpHandleReset = () => {
        otpReset();
    };

    return (
        <>
            <Modal isOpen={!showOtpField && isOpen} toggle={toggleAndReset} className="modern-modal" style={{ border: 'none' }}>
                <ModalHeader toggle={toggle} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="mobile">
                            <Phone /> Mobile
                        </Label>
                        <Controller
                            control={mobileControl}
                            name="mobile"
                            render={({ field }) => (
                                <>
                                    <Input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        placeholder="Enter your Mobile Number"
                                        {...field}
                                        invalid={mobileError.mobile && true}
                                    />
                                    {mobileError?.mobile && <FormFeedback>{mobileError.mobile.message}</FormFeedback>}
                                </>
                            )}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="modern-modal-footer">
                    <button type="submit" className="auth-button" onClick={mobileValidation(onSubmitMobile)}>
                        SEND OTP
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showOtpField && isOpen} toggle={handleToggleForm} className="modern-modal" style={{ border: 'none' }}>
                <ModalHeader toggle={toggle} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="Enter otp">
                            <Phone /> OTP
                        </Label>
                        <Controller
                            control={otpControl}
                            name="otp"
                            render={({ field }) => (
                                <>
                                    <Input
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        placeholder="Enter your OTP"
                                        {...field}
                                        invalid={otpError.otp && true}
                                    />
                                    {otpError?.otp && <FormFeedback>{otpError.otp.message}</FormFeedback>}
                                </>
                            )}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="modern-modal-footer">
                    <button type='submit' className="auth-button" onClick={otpValidation(onsubmitOtp)}>
                        VERIFY OTP
                    </button>
                </ModalFooter>
            </Modal >
        </>
    );
}

export default NewAuthModal;
