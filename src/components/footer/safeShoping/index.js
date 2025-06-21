import React from 'react'
import './index.css';
import Navbar from '../../navbar';
import FooterSection from '..';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import logo1 from '../../../assets/images/logo/Group 1410108914.png';
import logo2 from '../../../assets/images/logo/Group 1410108910.png';
import logo3 from '../../../assets/images/logo/Group 1410108916 (1).png';
import paying from '../../../assets/images/banner/person-paying-with-its-smartphone-wallet-app.jpg';

function SafeShopping() {
    const navigate = useNavigate()


    const navToHome = () => {
        navigate('/')
    }
    const navToSafeShopping = () => {
        navigate('/safeShopping')
    }
    return (
        <div>
            <Navbar />
            <div>
                <div className='pb-5 pt-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToSafeShopping}>Safe Shopping </span></p>
                    <h2 className='text-center fw-bold mt-2'># Safe & Secure Shopping
                    </h2>
                </div>
                <div className='container'>
                    <p>

                        **Printon India Private Limited** understands its
                        responsibilities and obligations to protect your
                        personal information.  We have undertaken and
                        continue to undertake security measures and
                        testing to ensure a safe and secure shopping
                        experience.
                    </p>
                    <p>
                        #### Secure Online Shopping
                    </p>
                    <p>

                        Every time **Printon India Private Limited** collects your personal information (such as your delivery / billing address, contact details and so on), a secure connection via Secure Sockets Layer (SSL) technology is established with your web browser to ensure that your details are encrypted and securely communicated to us, safe from prying eyes or malicious threats. Secure Sockets Layer (SSL) is a protocol for enabling data encryption on the Internet and for helping web site users confirm the owner of the web site. Only authorised personnel from **Printon India Private Limited** can access this personal data for authorised reasons.
                    </p>
                    <p>
                        For more information, please see our [Privacy Policy](#).
                    </p>
                    <p>
                        #### Secure Credit Card Payment
                    </p>
                    <p>
                        Online payments for **Printon India Private Limited** are handled by ANZ eGate. All customer credit card information is securely submitted and processed entirely on ANZ eGate systems; **Printon India Private Limited** staff cannot access, view, process or store sensitive cardholder data (such as credit card numbers, PIN codes or CCV codes). Credit card details are encrypted by SSL in the customer’s browser before they are sent to ANZ, and are never exposed in clear-text.
                    </p>
                    <p>
                        #### Contact Details
                    </p>
                    <p>
                        If you have a question or concern regarding the security of your personal information or payment details, please [contact us](# "Contact us").
                    </p>
                </div>
                <div className='pb-5 pt-3' style={{ paddingLeft: '15%', paddingRight: '15%' }}>
                    {/* <Row>
                        <Col lg={4} md={4} sm={12}>
                            <img className='safe-shopping-logo mt-5' src={logo1} alt='logo' />
                            <h5 className='fw-bold mt-4'>Privacy of your photos</h5>
                            <li className='safeShopping-para mt-4'>Your photos are your memories.Your memories are secure with Printon.</li>
                            <li className='safeShopping-para mt-4'>When ordering prints and gifts, our manufacturing team will have access to your photos and we visually inspect each item before packaging and shipping them.</li>
                            <li className='safeShopping-para mt-4'>Your photos belong to you! We strongly believe that all rights of a photo uploaded to Printon rest with you. We do not use any customer photos for any purpose without your express, prior, written permission.</li>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <img className='safe-shopping-logo mt-5' src={logo2} alt='logo' />
                            <h5 className='fw-bold mt-4'>Privacy of your photos</h5>
                            <li className='safeShopping-para mt-4'>We have a strict no-spam policy. If you specifically “opt-in” when registering, we will occasionally send you e-mail updates and offers. Every e-mail we send has opt-out information. In addition, you can change your preferences at any time in the Profile section of Printon.</li>
                            <li className='safeShopping-para mt-4'>Printon does not rent or sell any personal information to Third Parties.</li>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <img className='safe-shopping-logo mt-5' src={logo3} alt='logo' />
                            <h5 className='fw-bold mt-4'>Privacy of your photos</h5>
                            <li className='safeShopping-para mt-4'>Paying online on Printon is safe.</li>
                            <li className='safeShopping-para mt-4'>We do not store credit card information in our systems - ever.</li>
                            <li className='safeShopping-para mt-4'>We use SSL (Secure Sockets Layer) to encrypt all information when you fill out the registration forms. This ensures that no one can intercept the data while it is in transit.</li>
                            <li className='safeShopping-para mt-4'>We only use reliable payment gateways to process your payment. We also implement Verified by Visa, MasterCard SecureCode and other measures as required by credit card issuers.</li>
                            <li className='safeShopping-para mt-4'>We also have implemented McAfee Secure which checks for potential risks. Even external links on our site are verified to ensure you are not inadvertently sent to risky web sites.</li>
                        </Col>
                    </Row> */}
                </div>


            </div>
            <FooterSection />
        </div>
    )
}

export default SafeShopping