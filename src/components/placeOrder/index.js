import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Form, FormGroup, Label, Input, CardText, Button, Collapse } from 'reactstrap';
import { cart, payId, placeOrder, profile } from '../../ApiConfigs/ApiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, Check, ChevronDown, ChevronRight, CreditCard, Globe, Mail, Map, MapPin, Navigation, Phone, PhoneOff, Truck, User } from 'react-feather';
import badge from "../../assets/images/logo/png3.png"
import SuccessModalComponent from '../cart/successModal';
import Navbar from '../navbar';
import FooterSection from '../footer';
import './index.css';

function PlaceOrderIndex() {
    const [getProfile, setProfile] = useState('')
    const [orderDetails, setOrderDetails] = useState({
        personal: {
            name: getProfile?.name,
            mobile: getProfile?.mobile,
            email: getProfile?.email
        },
        shipping: {
            address: '',
            state: '',
            city: '',
            locality: '',
            // landmark: '',
            // alternateMobile: '',
            pincode: ''
        },
        payment: {
            mode: ''
        }
    });

    const navigate = useNavigate()

    // State for form validation
    const [validationError, setValidationError] = useState('');
    const [dataa, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const { cartId } = useParams()
    const [modal, setModal] = useState(false);


    const toggle = () => {
        setModal(!modal);
        navigate('/myOrder')
    }

    const myProfileDatails = async () => {
        try {
            const response = await axios.get(profile)
            setProfile(response?.data?.result)
        } catch (error) {

        }
    }

    useEffect(() => {
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            personal: {
                name: getProfile?.name || '',
                mobile: getProfile?.mobile || '',
                email: getProfile?.email || ''
            }
        }));
    }, [getProfile]);

    // Handle input change for personal details
    const handlePersonalDetailsChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            personal: {
                ...prevDetails.personal,
                [name]: value
            }
        }));
    };

    // Handle input change for shipping address
    const handleShippingAddressChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            shipping: {
                ...prevDetails.shipping,
                [name]: value
            }
        }));
    };

    // Handle select change for payment mode
    const handlePaymentModeChange = (e) => {
        const { value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            payment: {
                mode: value
            }
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (
            // !orderDetails.personal.name ||
            // !orderDetails.personal.mobile ||
            // !orderDetails.personal.email ||
            !orderDetails.shipping.address ||
            !orderDetails.shipping.state ||
            !orderDetails.shipping.city ||
            !orderDetails.shipping.locality ||
            !orderDetails.shipping.landmark ||
            !orderDetails.shipping.pincode ||
            !orderDetails.payment.mode
        ) {
            setValidationError('*Please fill out all required fields.');
        } else {
            // Clear validation error
            setValidationError('');
            try {
                if (orderDetails.payment.mode === 'gpay') {
                    try {
                        const response = await axios.post(placeOrder, orderDetails)
                        const responsePay = await axios.get(`${payId}/${cartId}`)
                        window.location.href = responsePay?.data?.result?.paymentLink;
                        setModal(true)
                    } catch (error) {
                        // toast.error(error)
                    }
                } else {
                    const response = await axios.post(placeOrder, orderDetails)
                    setModal(true)
                }
            } catch (error) {
            }
        }
    };

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${cart}`)
            setData(response?.data?.result)

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        additionalData()
        myProfileDatails()
    }, [])


    return (
        <>
            <Navbar />

            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='pb-4 d-flex'>
                    <img src={badge} height={100} alt="" />
                    <h1 className='pt-3'>Place your Order Now!</h1>
                </div>
                <Row>

                    <Col sm={12} lg={6}>
                        <Card style={{ border: 'none' }} className='mt-4 mt-lg-0'>
                            <div className='cart-summary p-3'>
                                {dataa?.products?.map((eachItem, i) => (
                                    <div className='mt-2'>
                                        <div className='d-flex'>
                                            <img
                                                src={eachItem?.file[0] || eachItem?.file}
                                                alt={eachItem?.product?.name}
                                                className='cart-left-pic'
                                            />
                                            <div>
                                                <h5 className='mt-1'>{eachItem?.product?.name}</h5>
                                                <p className='mt-2 cart-quantity'>
                                                    Quantity: <span className='text-dark'>{eachItem?.quantity}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='accordion-header' style={{ cursor: 'pointer' }} onClick={() => toggleAccordion(eachItem?._id)}>
                                            <div className='d-flex justify-content-between pt-3 pb-3'>
                                                <h6 className='mt-1 p-0'>Product Specifications</h6>
                                                <span className='m-0 p-0'><ChevronDown /></span>
                                            </div>
                                        </div>
                                        <Collapse isOpen={openAccordion === eachItem?._id}>
                                            <div className='accordion-body'>
                                                <div>
                                                    {eachItem?.field?.map((eachDetail, k) => (
                                                        <div className='d-flex justify-content-between' key={k}>
                                                            <p className='text-secondary'><ChevronRight /> {eachDetail?.fieldType?.name}</p>
                                                            <p className='pe-5 text-dark' style={{ fontWeight: '500' }}>- {eachDetail?.option?.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}
                                <h5>Summary</h5>
                                <div className='d-flex justify-content-between'>
                                    <p className='cart-summary-para'>Item Subtotal</p>
                                    <p>{dataa?.totalAmount?.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}</p>
                                </div>
                                <hr className='p-0 m-0 mb-3' />
                                <div className='d-flex justify-content-between'>
                                    <h6>Item Total (inclusive of all tax)</h6>
                                    <h5 className='fw-bold ms-3'>{dataa?.totalAmount?.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}</h5>
                                </div>
                            </div>
                        </Card>

                    </Col>
                    <Col sm={12} lg={6}>
                        <Card style={{ border: 'none' }}>
                            <h3 className='mb-3'>1 - Personal Details</h3>
                            <Form>
                                <FormGroup>
                                    <Label for="name"><User /> Name<span className='text-danger'>*</span></Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        defaultValue={getProfile?.name}
                                        onChange={handlePersonalDetailsChange}
                                        required
                                        style={{ border: '1px solid rgb(207, 207, 207)' }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mobile"><Phone /> Mobile<span className='text-danger'>*</span></Label>
                                    <Input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        placeholder="Enter your mobile number"
                                        defaultValue={getProfile?.mobile}
                                        onChange={handlePersonalDetailsChange}
                                        required
                                        style={{ border: '1px solid rgb(207, 207, 207)' }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email"><Mail /> Email<span className='text-danger'>*</span></Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        defaultValue={getProfile?.email}
                                        onChange={handlePersonalDetailsChange}
                                        required
                                        style={{ border: '1px solid rgb(207, 207, 207)' }}
                                    />
                                </FormGroup>
                            </Form>
                            <hr />
                            <h3 className='mt-3 mb-3'>2 - Shipping Details</h3>
                            <Form>
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="pincode"><MapPin /> Pincode<span className='text-danger'>*</span></Label>
                                            <Input
                                                type="number"
                                                name="pincode"
                                                id="pincode"
                                                placeholder="Enter your pincode"
                                                value={orderDetails.shipping.pincode}
                                                onChange={handleShippingAddressChange}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="locality"><Map /> Locality<span className='text-danger'>*</span></Label>
                                            <Input
                                                type="text"
                                                name="locality"
                                                id="locality"
                                                placeholder="Enter your locality"
                                                value={orderDetails.shipping.locality}
                                                onChange={handleShippingAddressChange}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12}>
                                        <FormGroup>
                                            <Label for="address"><Truck /> Address<span className='text-danger'>*</span></Label>
                                            <Input
                                                type="textarea"
                                                name="address"
                                                id="address"
                                                placeholder="Enter your shipping address"
                                                value={orderDetails.shipping.address}
                                                onChange={handleShippingAddressChange}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="city"><Navigation /> City<span className='text-danger'>*</span></Label>
                                            <Input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="Enter your city"
                                                value={orderDetails.shipping.city}
                                                onChange={handleShippingAddressChange}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="state"><Globe /> State<span className='text-danger'>*</span></Label>
                                            <Input
                                                type="select"
                                                name="state"
                                                id="state"
                                                onChange={handleShippingAddressChange}
                                                value={orderDetails.shipping.state}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            >
                                                <option value="">Select State</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Karnataka">Karnataka</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="landmark"><Bookmark /> Landmark</Label>
                                            <Input
                                                type="text"
                                                name="landmark"
                                                id="landmark"
                                                placeholder="Enter your landmark(optional)"
                                                value={orderDetails.shipping.landmark}
                                                onChange={handleShippingAddressChange}
                                                required
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Label for="alternateMobile"><PhoneOff /> Alternate Mobile</Label>
                                            <Input
                                                type="number"
                                                name="alternateMobile"
                                                id="alternateMobile"
                                                placeholder="Enter your alternate mobile(optional)"
                                                value={orderDetails.shipping.alternateMobile}
                                                onChange={handleShippingAddressChange}
                                                style={{ border: '1px solid rgb(207, 207, 207)' }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <hr />
                        </Card>
                        <Card style={{ border: 'none' }} className='mt-3 mt-lg-0'>
                            <h4 className='mb-3'>3 - Payment Mode</h4>
                            <Form>
                                <FormGroup>
                                    <Label for="paymentMode"><CreditCard /> Payment Mode<span className='text-danger'>*</span></Label>
                                    <Input
                                        type="select"
                                        name="paymentMode"
                                        id="paymentMode"
                                        onChange={handlePaymentModeChange}
                                        value={orderDetails.payment.mode}
                                        required
                                        style={{ border: '1px solid rgb(207, 207, 207)' }}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="cashOnDelivery">Cash on Delivery</option>
                                        <option value="gpay">Online Payment</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                            <hr />
                            <h4 className='mt-3'>4 - Confirm Order <Check size={35} style={{ color: 'green' }} /></h4>
                            <CardText>
                            </CardText>
                            <Button color="primary" onClick={handleFormSubmit}>Place Order</Button>
                            {validationError && (
                                <div className="text-danger mt-2">{validationError}</div>
                            )}
                        </Card>
                    </Col>
                </Row>
                <SuccessModalComponent modal={modal} toggle={toggle} />
            </div>
            <FooterSection />
        </>
    );
}

export default PlaceOrderIndex;