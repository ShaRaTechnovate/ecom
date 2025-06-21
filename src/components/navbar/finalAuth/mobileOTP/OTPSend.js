import React, { useState } from 'react';
import { otpSend, otpVerify } from '../../../../ApiConfigs/ApiConfig';
import axios from 'axios';
import { Form, FormFeedback, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';

function OTPSend({ toggleAuth, toggleOTP, setCartKey }) {
    const [otp, setOtp] = useState('');

    const handleEmailSignIn = async () => {
        const payload = {
            mobile: mobile,
            otp: otp
        }

        try {
            const response = await axios.post(otpVerify, payload);
            toast.success(response?.data?.msg);
            localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
            localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
            localStorage.setItem('role', response?.data?.result?.user?.role?.name);
            localStorage.setItem('userId', response?.data?.result?.user?._id);
            localStorage.setItem('name', response?.data?.result?.user?.name);
            localStorage.setItem('mobile', response?.data?.result?.user?.mobile);

            if (setCartKey === 'yes') {
                localStorage.setItem('AddCart', true);
            }
            localStorage.removeItem('SignInMobile');
            toggleOTP();
        }
        catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const mobile = localStorage.getItem('SignInMobile');

    const ResendOTP = async () => {
        const payload = {
            mobile: mobile
        }

        try {
            const response = await axios.post(otpSend, payload);
            toast.success(response?.data?.msg);
        }
        catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const { handleSubmit, control, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(handleEmailSignIn)}>
            <div className='mb-3' style={{ display: "flex", justifyContent: "center" }}>
                <div className='mb-2'>
                    <Label>OTP</Label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        separator={<span>-</span>}
                        renderInput={(inputProps, index) => (
                            <input {...inputProps} style={{ padding: "10px", width: "4rem", textAlign: "center", borderRadius: "8px", marginLeft: "4px", justifyContent: 'center', fontSize: "24px" }} />
                        )}
                    />
                    {errors.otp && <FormFeedback>{errors.otp.message}</FormFeedback>}
                </div>
            </div>
            <h6 className='text-center'>OTP has been sent to this mobile number! <span className='text-primary' style={{ cursor: 'pointer' }} onClick={toggleAuth}>{mobile}</span></h6>
            <p className='text-primary text-center' style={{ cursor: 'pointer' }} onClick={ResendOTP}>Resend OTP</p>
            <div className='modern-modal-footer p-3'>
                <button className='auth-button' type='submit'>LOGIN NOW</button>
            </div>
        </Form>
    );
}

export default OTPSend;

