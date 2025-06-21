import React, { useEffect, useState } from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'react-feather'
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import whatsapp from "../../assets/images/logo/whatsapp.png"
import { otpSend, socialMedia } from '../../ApiConfigs/ApiConfig'
import axios from 'axios'
import award1 from '../../assets/images/banner/pic.png';
import award2 from '../../assets/images/banner/WORD.png';
import award3 from '../../assets/images/banner/BACKGROUND2.jpg';
import visa from '../../assets/images/logo/Visa-Logo.png';
import master from '../../assets/images/logo/MasterCard_Logo.svg.png';
import paypl from '../../assets/images/logo/068BjcjwBw0snwHIq0KNo5m-15.webp';
import america from '../../assets/images/logo/American_Express-4876c7d0db694256968485f3085dfa78.png';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormFeedback, Input } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import OTPSend from '../navbar/finalAuth/mobileOTP/OTPSend';


function FooterSection() {
    const [dataa, setData] = useState([]);
    const [socialMedias, setSocialMedias] = useState({})
    const [showOtpModal, setShowOtpModal] = useState(false); // State variable for modal visibility


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
            localStorage.setItem('SignInMobile', data.mobile);
            setShowOtpModal(true); // Show the OTP modal after successful submission
        }
        catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const SocialMediaData = async () => {
        try {

            const response = await axios.get(socialMedia)
            setData(response?.data?.result)
            setSocialMedias(response.data.result)

        } catch (error) {

        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            SocialMediaData()
        }

    }, [])

    const token = localStorage.getItem('token')


    return (
        <div className='footer-bg'>
            <div className='footer-con'>
                <div className='footer-top'>
                    <div>
                        <h1 className='footer-head'>Our Company</h1>
                        <p className='footer-para m-0 mb-1'><NavLink to='/aboutUs'>About us</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to='/products'>All Products</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to='/safeShopping'>Safe Shopping</NavLink></p>
                    </div>
                </div>
                <div className='footer-top'>
                    <div>
                        <h1 className='footer-head'>Support</h1>
                        <p className='footer-para m-0 mb-1'><NavLink to="/reachUs"> Help</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to="/myQueries"> FAQ</NavLink></p>

                    </div>
                </div>
                <div className='footer-top mt-3 mt-md-0'>
                    <div>
                        <h1 className='footer-head'>Customer Service</h1>
                        <p className='footer-para m-0 mb-1'><NavLink to='/Terms'> Terms & Conditions</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to="/refund-return" >Cookies</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to="/privacyPolicy"> Privacy policy</NavLink></p>
                        <p className='footer-para m-0 mb-1'><NavLink to="/shippingPolicy"> Shipping Policy</NavLink></p>
                        {/* <p className='footer-para-m-0 mb-1'><NavLink to="/CookiesIndex">Cookies</NavLink></p> */}

                    </div>
                </div>
                <div className='footer-top mt-3 mt-md-0'>
                    <div>
                        <h1 className='footer-head'>Socail & Blogs</h1>
                        <p className='footer-para m-0 mb-1'><NavLink>Our Blog</NavLink></p>
                        <div className='footer-social-con d-flex'>
                            <div className='footer-socail text-primary me-2'>
                                <a href={`https://www.facebook.com/profile.php?id=${socialMedias?.facebook?.facebookId}`} target='_blank' rel='noopener noreferrer'>
                                    <FaFacebookSquare size={23} />
                                </a>
                            </div>

                            <div className='footer-socail me-2'>
                                <a href={`https://twitter.com/${socialMedias?.twitter?.twitterId}`} target='_blank' rel='noopener noreferrer'>
                                    <FaXTwitter size={20} style={{ color: 'black' }} />
                                </a>
                            </div>

                            <div className='footer-socail'>
                                <a href={`https://www.youtube.com/${socialMedias?.youtube?.youtubeId}`} target='_blank' rel='noopener noreferrer'>
                                    <Youtube style={{ color: 'red' }} />
                                </a>
                            </div>
                            <div className='footer-socail text-primary ms-2'>
                                <a href={`https://www.instagram.com/${socialMedias?.instagram?.instagramId}`} target='_blank' rel='noopener noreferrer'>
                                    <Instagram style={{ color: '#F6028E' }} />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='footer-top mt-3 mt-lg-0'>
                    <div>
                        <h1 className='footer-head'>Recent Awards</h1>
                        {/* <div>
                            <img src={award1} className=' footer-award me-2' alt="logo" />
                            <img src={award2} className=' footer-award me-2' alt="logo" />
                            <img src={award3} className=' footer-award' alt="logo" />
                        </div> */}
                    </div>
                </div>
            </div>
            <hr className='mt-4 mb-4' />
            <div className='footer-bottom'>
                <div>
                    <p className='footer-bottom-head m-0 mb-2'>© 2024 printon.co.in</p>
                    <div className='d-flex'>
                        <p className='footer-bottom-para me-3'><NavLink>Site Map</NavLink></p>
                        <p className='footer-bottom-para me-3'><NavLink to="/privacyPolicy">Privacy Policy</NavLink></p>
                        <p className='footer-bottom-para me-3'><NavLink>Cookie Policy</NavLink></p>
                        <p className='footer-bottom-para me-3'><NavLink to='/Terms'>Terms</NavLink></p>
                    </div>
                </div>
                <div className='footer-bottom-img mt-2 mt-md-0'>
                    <img src={visa} height={40} className='me-3' alt="logo" />
                    <img src={master} height={40} className='me-3' alt="logo" />
                    <img src={paypl} height={40} className='me-3' alt="logo" />
                    <img src={america} height={40} alt="logo" />
                </div>
            </div>
            <div className='fixed-bottom footer-whatsapp right-50 ' style={{ zIndex: "6", left: "initial", marginLeft: "5px" }}>
                <a className='whatsappLink' href={`https://wa.me/${socialMedias?.whatsApp?.whatsAppNumber}?text=${socialMedias?.whatsApp?.text}`} target='_blank'>
                    <img src={whatsapp} width="100" alt='Whatsapp' />
                </a>
            </div>
            {/* {token ? null : (
                <div className='fixed-bottom'>
                    <div className='d-lg-none d-md-none'>
                        <div className='footer-log'>
                            <div >
                                <Form onSubmit={handleMobileFormSubmit(handleMobileSignIn)}>
                                    <div className='d-flex'>
                                        <div>
                                            <Controller
                                                name='mobile'
                                                id='mobile'
                                                control={emailControl}
                                                defaultValue=''
                                                render={({ field }) => (
                                                    <Input type='text' {...field} invalid={emailErrors.mobile && true} placeholder=' Mobile Number' />
                                                )}
                                            />
                                        </div>
                                        {emailErrors.mobile && <FormFeedback>{emailErrors.mobile.message}</FormFeedback>}
                                        <div>
                                            <button type='submit'>submit</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

        </div>
    )
}

export default FooterSection
