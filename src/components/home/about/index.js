import React from 'react'
import './index.css'
import { Card, Col, Row } from 'reactstrap'
import aboutlogo from "../../../assets/images/banner/Group 1410108924.jpg"
import aboutlogo2 from '../../../assets/images/banner/Group 1410108896 (2).jpg'
import aboutlogo3 from '../../../assets/images/banner/Group 1410108898 (1).jpg'
import aboutlogo4 from '../../../assets/images/banner/feature-tracking.png'
import star from '../../../assets/images/banner/star.png'
import { useNavigate } from 'react-router-dom'

function AboutHome() {

    const navigate = useNavigate()

    const navToGuarante = () => {
        navigate('/printonGuarante')
    }
    const navToDelivery = () => {
        navigate('/shippingPolicy')
    }
    const navToReach = () => {
        navigate('/reachUs')
    }

    return (
        <>
            <div className='about-con'>
                <div>
                    <h1 className='about-head mb-5'>About Print On</h1>
                </div>
                <div>
                    <Row>
                        <Col sm={12} md={6} lg={3}>
                            <Card>
                                <img src={aboutlogo} className='img-fluid' alt="" />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontWeight: '500', fontSize: '25px' }}>Printon Guarantee</h3>
                                    <p style={{ color: '#777', fontWeight: '400' }}>The most important thing is that you’re happy.
                                        We're only truly happy when you are. If you’re not completely satisfied with your order, we guarantee to reprint it straight away and organise next-day delivery to anywhere in India. In the unlikely event we can't fix our printing error, we'll give you a full refund
                                    </p>
                                    <button className='about-btn' style={{ background: '#e4510b' }} onClick={navToGuarante}>Find out more</button>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className='mt-3 mt-md-0'>
                                <img src={aboutlogo2} className='img-fluid' alt="" />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontWeight: '500', fontSize: '25px' }}>Our Services</h3>
                                    <p style={{ color: '#777', fontWeight: '400' }}>
                                        The most important thing is that you’re happy.
                                        We're only truly happy when you are.
                                        \If you’re not completely satisfied with your order,
                                        we guarantee to reprint it straight away and organise
                                        next-day delivery to anywhere in India. In the unlikely
                                        event we can't fix our printing error, we'll give you a full refund
                                    </p>
                                    <button className='about-btn' style={{ background: '#e4510b' }}>Find out more</button>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className='mt-3 mt-md-3 mt-lg-0'>
                                <img src={aboutlogo3} className='img-fluid' alt="" />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontWeight: '500', fontSize: '25px' }}>Reach Us</h3>
                                    <p style={{ color: '#777', fontWeight: '400' }}>The most important thing is that you’re happy.
                                        We're only truly happy when you are. If you’re not completely satisfied with your order, we guarantee to reprint it straight away and organise next-day delivery to anywhere in India. In the unlikely event we can't fix our printing error, we'll give you a full refund
                                    </p>
                                    <button className='about-btn' style={{ background: '#e4510b' }} onClick={navToReach}>Find out more</button>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} lg={3}>
                            <Card className='mt-3 mt-md-3 mt-lg-0'>
                                <img src={aboutlogo4} className='img-fluid' alt="" />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontWeight: '500', fontSize: '25px' }}>Delivery Options</h3>
                                    <p style={{ color: '#777', fontWeight: '400' }}>The most important thing is that you’re happy.
                                        We're only truly happy when you are. If you’re not completely satisfied with your order, we guarantee to reprint it straight away and organise next-day delivery to anywhere in India. In the unlikely event we can't fix our printing error, we'll give you a full refund
                                    </p>
                                    <button className='about-btn' style={{ background: '#e4510b' }} onClick={navToDelivery}>Find out more</button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default AboutHome
