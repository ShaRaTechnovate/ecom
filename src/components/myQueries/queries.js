import React, { useState } from 'react'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Col,
    Row,
} from 'reactstrap';
import "./index.css"
import { useNavigate } from 'react-router-dom';

function Queries() {


    const navigate = useNavigate()


    const navToHome = () => {
        navigate('/')
    }
    const navToSafeShopping = () => {
        navigate('/myQueries')
    }
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };


    return (
        <>
            <div className='pb-5 pt-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToSafeShopping}>Queries </span></p>

                <div className='mb-5'>
                    <h1 className='text-center mt-5'>My Queries </h1>
                    <Row className='mt-5 '>
                        <Col lg={12} md={12} sm={12}>
                            <div className='helpToics-Heading'>
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
                        <Col lg={12} md={12} sm={12}>
                            <div className='helpToics-Heading'>
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

        </>
    )
}

export default Queries

