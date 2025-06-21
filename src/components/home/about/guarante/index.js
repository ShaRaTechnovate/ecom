import React from 'react'
import Navbar from '../../../navbar'
import FooterSection from '../../../footer'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import './index.css';
import logo1 from '../../../../assets/images/logo/Group 1410108920.png';
import logo2 from '../../../../assets/images/logo/Group 1410108919.png';
import logo3 from '../../../../assets/images/logo/Group 1410108918.png';
import logo4 from '../../../../assets/images/logo/Group 1410108921.png';
import leftimg from '../../../../assets/images/banner/man-working-printing-house-with-paper-paints.jpg';
import InteractiveHome from '../../interactive'

function AboutGuarante() {


    const navigate = useNavigate()


    const navToHome = () => {
        navigate('/')
    }
    const navToGuarante = () => {
        navigate('/printonGuarante')
    }
    return (
        <div>
            <Navbar />
            <div className='pb-5 pt-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToGuarante}>Guarante</span></p>
            </div>
            <div className='pb-5 pt-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <h2 className='fw-bold'>Printon Guarantee</h2>
                <Row>
                    <Col lg={4} md={4} sm={6}>
                        <img className='guarante-left' src={leftimg} alt='logo' />
                    </Col>
                    <Col lg={8} md={8} sm={6}>
                        <p className='guarante-para mt-5' style={{ color: 'rgb(119,119,119)' }}>We're only truly happy when you are. We want you to be satisfied, of course, but we'd prefer it if you were absolutely thrilled with us.</p>
                        <p style={{ color: 'rgb(119,119,119)' }}>We take great pride in the work we do. So if you ever receive a job from us and we have made a mistake in printing or finishing your job please get in touch as soon as possible and we'll do everything we can to fix it and reprint it for you.</p>
                    </Col>
                </Row>
                <h5 className='fw-bold mt-5' style={{ color: 'rgb(119,119,119)' }}>This is how it works:</h5>
                <div className='d-flex mt-5'>
                    <img className='guarante-images' src={logo1} alt='logo' />
                    <div className='mt-4 ms-4'>
                        <h5>STEP 1</h5>
                        <h6>If you're not completely satisfied with your order please tell us. Please use live chat for a fast response.</h6>
                    </div>
                </div>
                <hr />
                <div className='d-flex'>
                    <img className='guarante-images' src={logo2} alt='logo' />
                    <div className='mt-4 ms-4'>
                        <h5>STEP 2</h5>
                        <h6>In the event we cannot resolve it immediately, a member of our customer service team will come back to you to obtain details of the problem. In the first instance, we will need photos of the defective job to help us find the right solution.</h6>
                    </div>
                </div>
                <hr />
                <div className='d-flex'>
                    <img className='guarante-images' src={logo3} alt='logo' />
                    <div className='mt-4 ms-4'>
                        <h5>STEP 3</h5>
                        <h6>We'll come back with a solution. We're very confident we can help. The most important thing for us is that you're happy.</h6>
                    </div>
                </div>
                <hr />
                <div className='d-flex'>
                    <img className='guarante-images' src={logo4} alt='logo' />
                    <div className='mt-4 ms-4'>
                        <h5>STEP 4</h5>
                        <h6>In the unlikely event we can't fix our printing error, we'll give you a full refund*</h6>
                        <h6 className='mt-5'>That's the Digital Printing Guarantee.</h6>
                    </div>
                </div>
                <p className='mt-5 mb-5'>*Please note we cannot be held responsible in any way for any errors, omissions or problems with your artwork as we are an 'upload to print' service and print the artwork you supply. We do not check each supplied piece of artwork for errors. Goods must be returned in full for a refund.</p>
                <hr />

            </div>
            <InteractiveHome />
            <FooterSection />
        </div>
    )
}

export default AboutGuarante