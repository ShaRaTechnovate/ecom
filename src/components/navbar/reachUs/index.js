import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar';
import FooterSection from '../../footer';
import { Col, Row } from 'reactstrap';
import { Headphones, Mail, MapPin, Phone } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import ReportCard from './report';
import axios from 'axios';
import toast from 'react-hot-toast';


function ReachUs() {

    const [data, setData] = useState()
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const navigate = useNavigate()


    const navToHome = () => {
        navigate('/')
    }
    const navToHelp = () => {
        navigate('/reachUs')
    }

    const testing = async () => {
        try {
            const response = await axios.get('http://192.168.0.141:6011/auth/rishwan')
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)

        }
    }

    useEffect(() => {
        testing()
    })

    return (
        <div>
            <Navbar />
            <div style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToHelp}>Help </span></p>

                <h1 className='text-center mt-5'>Contact Center </h1>
                <p className='mt-2 text-center'>Our customer support team is here to assist you. If you can't find the answers you're looking for in our Help Center, feel free to reach out to us directly. We're dedicated to providing prompt and helpful assistance.</p>

                <Row className='mt-5'>
                    <Col lg={4} md={6} sm={12}>
                        <div className='d-flex flex-column align-items-center'>
                            <Headphones style={{ height: "170px", width: "170px", color: "#e4510b" }} />
                            <h4 className='text-center mt-3'>Call Us For  Immediate Assistance</h4>
                            <p className='text-center'><Phone /> : +91 98960 66994</p>
                            <p className='text-center'>(Mon - Sat: 10:00AM - 07:00PM)</p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div className='d-flex flex-column align-items-center'>
                            <Mail style={{ height: "170", width: "170", color: "#e4510b" }} />
                            <h4 className='text-center mt-3'>E-Mail Us</h4>
                            <p className='text-center'>Sales enquiries & Customer Support :</p>
                            <p className='text-center'><NavLink>Order@printon.co.in</NavLink></p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div className='d-flex flex-column align-items-center'>
                            <MapPin className='align-item-center' style={{ height: "170", width: "170", color: "#e4510b" }} />
                            <h4 className='text-center mt-3'>Visit Us</h4>
                            <p className='text-center'>PrintOn Services Pvt.Ltd.</p>
                            <p className='text-center'>No. 01/A, 5th A Cross, 24th Main, Manjunatha Colony,<br /> JP Nagar 2nd
                                Phase, Bangalore, Bengaluru <br /> (Bangalore) Rural, Karnataka, 560078</p>
                        </div>
                    </Col>
                </Row>
                {/* <ReportCard /> */}

                <div className='mb-5'>
                    <h1 className='text-center mt-5'>Help Topics </h1>
                    <Row className='mt-5'>
                        <Col lg={6} md={6} sm={12}>
                            <div>
                                <Accordion open={open} toggle={toggle}>
                                    <AccordionItem>
                                        <AccordionHeader targetId="1"><h5>Ordering Prints</h5></AccordionHeader>
                                        <AccordionBody accordionId="1">
                                            Learn how to place an order, customize your prints, and navigate our user-friendly online ordering system.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="2"><h5>Product Information</h5></AccordionHeader>
                                        <AccordionBody accordionId="2">
                                            Discover details about our wide range of products, from business cards to banners. Find specifications, materials, and design guidelines to create stunning prints.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="3"><h5>Payments & Pricing</h5></AccordionHeader>
                                        <AccordionBody accordionId="3">
                                            Pay on Delivery,
                                            EMI,
                                            Credit/Debit Card,
                                            Net Banking,
                                            UPI,
                                            Payment Issues and Restrictions,
                                            Amazon Pay ICICI Bank Credit Card .
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="4"><h5>Shipping and Delivery</h5></AccordionHeader>
                                        <AccordionBody accordionId="4">
                                            Get information on shipping options, delivery times, and tracking your orders. We're committed to delivering your prints on time and in perfect condition.
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <div>
                                <Accordion open={open} toggle={toggle}>
                                    <AccordionItem>
                                        <AccordionHeader targetId="5"><h5>Design Assistance</h5></AccordionHeader>
                                        <AccordionBody accordionId="5">
                                            Need help with design? Explore our design tips, templates, and guidelines to create eye-catching prints that leave a lasting impression.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="6"><h5>Account Management</h5></AccordionHeader>
                                        <AccordionBody accordionId="6">
                                            Learn how to manage your account, update your information, and track your order history for easy reordering.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="7"><h5>Troubleshooting</h5></AccordionHeader>
                                        <AccordionBody accordionId="7">
                                            Encountering issues? Our troubleshooting guides can help you resolve common problems quickly, ensuring a smooth printing process.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="8"><h5>More Help</h5></AccordionHeader>
                                        <AccordionBody accordionId="8">
                                            All Devices & Digital Services Help,
                                            Manage Your Content & Devices,
                                            Ask the Digital and Device Community.
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </Col>
                    </Row>

                </div>




            </div>
            <FooterSection />
        </div>
    )
}

export default ReachUs;
