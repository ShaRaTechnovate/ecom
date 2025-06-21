import React, { useState, useEffect, useRef } from 'react';
import "./index.css"
import logo from "../../../assets/images/logo/logo.png"
import { otpSend, otpVerify } from '../../../ApiConfigs/ApiConfig';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '..';
import InteractiveHome from '../../home/interactive';
import FooterSection from '../../footer';
import AboutHome from '../../home/about';


const OtpVerification = () => {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const inputsRef = useRef([]);
    const buttonRef = useRef(null);

    useEffect(() => {
        inputsRef.current[0].focus();
    }, []);

    const handlePaste = (event) => {
        event.preventDefault();

        const pastedValue = (event.clipboardData || window.clipboardData).getData('text');
        const otpLength = otpValues.length;

        for (let i = 0; i < otpLength; i++) {
            if (i < pastedValue.length) {
                otpValues[i] = pastedValue[i];
                inputsRef.current[i].removeAttribute('disabled');
                inputsRef.current[i].focus();
            } else {
                otpValues[i] = '';
                inputsRef.current[i].setAttribute('disabled', true);
            }
        }

        setOtpValues([...otpValues]);
    };

    const handleInputChange = (index, e) => {
        const value = e.target.value;

        if (value.length > 1) {
            otpValues[index] = '';
        } else {
            otpValues[index] = value;
        }

        setOtpValues([...otpValues]);

        const nextIndex = index + 1;
        const prevIndex = index - 1;

        if (nextIndex < otpValues.length && otpValues[index] !== '') {
            inputsRef.current[nextIndex].removeAttribute('disabled');
            inputsRef.current[nextIndex].focus();
        }

        if (e.key === 'Backspace' && prevIndex >= 0) {
            inputsRef.current[index].setAttribute('disabled', true);
            otpValues[index] = '';
            inputsRef.current[prevIndex].focus();
        }

        setIsButtonActive(false);

        if (!inputsRef.current[otpValues.length - 1].disabled && otpValues[otpValues.length - 1] !== '') {
            setIsButtonActive(true);
        }
    };


    const mobile = localStorage.getItem('mobile')
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    const requestAgain = async () => {
        const payload = {
            name: name,
            mobile: mobile,
            email: email,
            password: password,
        }

        try {
            const response = await axios.post(otpSend, payload)
            setOtpValues(['', '', '', '', '', '']);
            inputsRef.current[0].focus();
        } catch (error) {
        }
    }


    const navigate = useNavigate()

    const handleButtonClick = async () => {

        const otp = otpValues.join('')

        const payload = {
            otp: otp,
            mobile: mobile,
        }

        try {
            const response = await axios.post(otpVerify, payload)
            localStorage.setItem('token', response?.data?.result?.tokens?.accessToken);
            localStorage.setItem('refreshToken', response?.data?.result?.tokens?.refreshToken);
            localStorage.setItem('role', response?.data?.result?.user?.role?.name);
            localStorage.setItem('userId', response?.data?.result?.user?._id);
            localStorage.setItem('name', response?.data?.result?.user?.name)
            navigate(-1)
        } catch (error) {
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid bg-body-tertiary d-block pb-5 pt-2">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4" style={{ height: '60vh' }}>
                        <div className="card bg-white mb-5 mt-5 border-0" style={{ boxShadow: '0 12px 15px rgba(0, 0, 0, 0.02)' }}>
                            <div className="card-body p-5 text-center shadow">
                                <div>
                                    <img src={logo} alt="" />
                                </div>
                                <p>Your OTP was sent to you via Mobile</p>

                                <div className="otp-field mb-4">
                                    {otpValues.map((value, index) => (
                                        <input
                                            key={index}
                                            type="number"
                                            value={value}
                                            onChange={(e) => handleInputChange(index, e)}
                                            onPaste={handlePaste}
                                            ref={(input) => (inputsRef.current[index] = input)}
                                        />
                                    ))}
                                </div>

                                <button className={`otp-button mb-3 ${isButtonActive ? 'active' : ''}`} onClick={handleButtonClick} disabled={!isButtonActive}>
                                    Verify
                                </button>

                                <p className="resend text-muted mb-0">
                                    Didn't receive OTP? <a href="#"><span onClick={requestAgain}>Request again</span></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSection />

        </>
    );
};

export default OtpVerification;
