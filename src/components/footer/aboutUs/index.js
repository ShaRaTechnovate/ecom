import React from 'react'
import Navbar from '../../navbar'
import FooterSection from '..'
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap';
import logo1 from '../../../assets/images/logo/Group 1410108925.png';
import logo2 from '../../../assets/images/logo/Group 1410108926.png';
import logo3 from '../../../assets/images/logo/Group 1410108927.png';

function AboutUs() {
    const navigate = useNavigate();
    const navToHome = () => {
        navigate('/')
    }
    const navToAboutUs = () => {
        navigate('/aboutUs')
    }
    return (
        <div>
            <Navbar />
            <div>
                <div className='pb-5 pt-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToAboutUs}>About Us</span></p>


                    <p className='aboutUs-para'>Pavan Kumar Reddy, the brain behind Printon India Private Limited,
                        embarked on his entrepreneurial journey after a successful stint in academia and industry.
                        Armed with a solid educational background M.Tech from SRM University — He kickstarted his
                        career at BOSCH (RBEI) after being handpicked during campus recruitment. Pavan's dedication
                        and talent even earned him an opportunity to work onsite in Germany, broadening his horizons
                        and enriching his experience.
                    </p>
                    <p className='aboutUs-para'>In 2010, fueled by a passion for
                        innovation and an aversion to complacency, Pavan took the leap
                        of faith and bid farewell to his corporate job to dive headfirst
                        into entrepreneurship. Printon India Pvt. Ltd. initially focused
                        on traditional printing services such as photocopying, scanning,
                        and binding. However, the onset of the pandemic proved to be a turning point,
                        prompting Pavan to pivot the business towards meeting emerging market demands.
                    </p>

                    <p className='aboutUs-para'>Seizing the opportunity presented by the crisis, Printon India Pvt.
                        Ltd. diversified into producing custom masks, T-shirts, and ventured into the garment industry.
                        This strategic move not only ensured the survival of the business but also positioned Printon
                        as a versatile player in the market. Moreover, recognizing the growing need for personalized
                        gifting solutions among corporates, Printon expanded its offerings to cater to this niche
                        market segment.
                    </p>
                    <p className='aboutUs-para'>Pavan's forward-thinking approach extended
                        to embracing e-commerce through the establishment of an online store,
                        facilitating greater accessibility and convenience for customers.
                        Despite the evolution of Printon's business model, one thing remained constant:
                        a commitment to delivering exceptional customer service.
                    </p>

                    <p className='aboutUs-para'>Behind every successful entrepreneur is a strong support
                        system, and Pavan found this in his wife, Mrs. Neetha. With her background
                        in B.Tech and MBA, she brings invaluable expertise to the realm of digital
                        printing, complementing Pavan's vision and leadership.
                    </p>
                    <p className='aboutUs-para'>
                        With Pavan and Mrs. Neetha at the helm, Printon continues to thrive,
                        propelled by innovation, resilience, and a dedication to exceeding
                        customer expectations. As a co-founder duo, they steer the company
                        towards continued success, adapting to market dynamics while staying
                        true to their core values.
                    </p>
                    <p className='aboutUs-para'>Hemanth Kumar plays a pivotal role at Printon India Pvt Ltd as
                        a mentor, providing invaluable guidance and support to the team. His
                        expertise spans various aspects of the business, from order processing
                        to managing the online platform. Hemanth's contributions serve as a
                        cornerstone for Printon's operations, ensuring efficiency and excellence
                        in every aspect of the business. As a trusted advisor and mentor, he is
                        instrumental in driving Printon's growth and success.</p>

                    <div className='mt-5 mb-5'>
                        <Row>
                            <Col lg={4} md={4} sm={6}>
                                <div className='d-flex'>
                                    <img className='aboutUs-logo' src={logo3} alt='logo' />
                                    <div className='ms-3'>
                                        <h5 className='fw-bold'>Super Fast</h5>
                                        <h5>Great Service With quick Delivery</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={6}>
                                <div className='d-flex'>
                                    <img className='aboutUs-logo' src={logo1} alt='logo' />
                                    <div className='ms-3'>
                                        <h5 className='fw-bold'>Trusted</h5>
                                        <h5>Quality Build For 15+ Years</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={6}>
                                <div className='d-flex'>
                                    <img className='aboutUs-logo' src={logo2} alt='logo' />
                                    <div className='ms-3'>
                                        <h5 className='fw-bold'>Easy Order</h5>
                                        <h5>No minimum order quantity required</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>


                    <h2 className='fw-bold'>How do I Shop from Printon?</h2>
                    <p className='aboutUs-para'>1.At a Printon store located near you.</p>
                    <p className='aboutUs-para'>2.You can place your order online at  <NavLink> Order@printon.co.in </NavLink></p>
                    <p className='aboutUs-para'>3.Call us at (+91 998 009 7005)</p>
                    <p className='aboutUs-para'>We deliver the prints across India, making print buying as easy and stress-free as possible! Printon customers can also create and order print products and have them shipped anywhere in India or abroad. </p>
                    <h2 className='fw-bold'>Talk to Us</h2>
                    <p className='aboutUs-para'>If you would like to know more about us, email us at  <NavLink> Order@printon.co.in </NavLink> and we'll answer your queries. Remember, we go the extra mile to bring innovative ideas that make printing and gifting easy and fun. Try us and experience the difference!</p>
                </div>
            </div>

            <FooterSection />
        </div>
    )
}

export default AboutUs