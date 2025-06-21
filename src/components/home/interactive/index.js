import React from 'react'
import './index.css'
import star from '../../../assets/images/banner/star.png'
import { Col, Row } from 'reactstrap'
import TestimonialIndex from '../testimonial'
import logo1 from '../../../assets/images/logo/Group 1410108905 (1).png';
import logo2 from '../../../assets/images/logo/Group 1410108908.png';
import logo3 from '../../../assets/images/logo/ss.png';
import logo4 from '../../../assets/images/logo/dd.png';
import men from '../../../assets/images/banner/man-wearing-t-shirt-gesturing 1.png';
import books from '../../../assets/images/banner/Frame 1410109838 (1).png';

function InteractiveHome({ isLoggedIn }) {
    return (
        <>
            <div className='interactive-con text-center pt-5'>
                <h1 className='interactive-head pb-4'>We print Business Cards, Brochures, Banners,<br /> Wedding Invites and much more...</h1>
                <div className='pb-3'>
                    <img src={star} height={20} alt="star" />
                    <img src={star} height={20} alt="star" />
                    <img src={star} height={20} alt="star" />
                    <img src={star} height={20} alt="star" />
                    <img src={star} height={20} alt="star" />
                </div>
                <p className='interactive-para'>very satisfied with the service. brochures were of amazing quality and <br />fast shipping</p>
                <p className='fw-bold'>Review posted on 12 Jan 2024 by Arun.</p>
            </div>
            <TestimonialIndex />
            {isLoggedIn ? (
                null
            ) :
                <div className='newsletter-con'>
                    <Row>
                        <Col lg={3} md={3} sm={4}>
                            <img src={books} className='books-image' style={{ height: '300px', width: '100%' }} />
                        </Col>
                        <Col lg={6} md={6} sm={4}>
                            <div className='news-con1 text-center mt-5 mb-3 '>
                                <h1 className='email-head m-0 mb-1'>Signup for ₹999 off your first order*</h1>
                                <p className='email-para mb-1'>*₹9999 minimum spend on order. T&Cs apply.</p>
                                <p className='email-para1 fw-bold'>Sign up for exclusive voucher codes, news and offers  you'll not find anywhere else.</p>
                                <div className='d-flex'>
                                    <input type="text" placeholder='Enter your email address' className='email-input' />
                                    <button className='email-btn'>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={4}>
                            <img src={men} className='men-image img-fluid' style={{ height: '300px', width: '100%' }} />
                        </Col>

                    </Row>
                </div>
            }
            <div className='final-con'>
                <div className='final-card'>
                    <img className='final-card-image' src={logo1} alt="logo" />
                    <p style={{ color: '#777777' }}>Our promise to you: Simple,<br /> satisfaction guaranteed</p>
                </div>
                <div style={{ backgroundColor: '#DEDEDE', height: '80px', width: '1px' }} className='d-none d-md-block'></div>
                <div className='final-card'>
                    <img className='final-card-image' src={logo2} alt="logo" />
                    <p style={{ color: '#777777' }}>Fast and efficient turnarounds<br /> with speedy deliveries</p>
                </div>
                <div style={{ backgroundColor: '#DEDEDE', height: '80px', width: '1px' }} className='d-none d-md-block'></div>
                <div className='final-card'>
                    <img className='final-card-image' src={logo3} alt="logo" />
                    <p style={{ color: '#777777' }}>Need help? Contact us and we'll<br /> steer you on the right path</p>
                </div>
                <div style={{ backgroundColor: '#DEDEDE', height: '80px', width: '1px' }} className='d-none d-lg-block'></div>
                <div className='final-card'>
                    <img className='final-card-image' src={logo4} alt="logo" />
                    <p style={{ color: '#777777' }}>We like to reward our customers<br /> every time they buy our products</p>
                </div>
            </div>
        </>
    )
}

export default InteractiveHome
