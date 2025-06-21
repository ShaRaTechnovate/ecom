import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import './index.css';
import FooterSection from '../footer'
import axios from 'axios'
import { profile, profileEdit } from '../../ApiConfigs/ApiConfig'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Edit3, User } from 'react-feather'
import mobile from '../../assets/images/banner/Group 1410109338.png';
import email from '../../assets/images/banner/Asset 1.png';
import name from '../../assets/images/banner/Group 1410109339 (1).png';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


function MyProfile() {
    const [data, setData] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [mobileModalOpen, setMobileModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);

    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter Name'),
        email: yup.string().required('Please Enter Email'),

    });
    const {
        reset,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValue: {
            name: data?.name || "",
            email: data?.email || "",
        }
    });


    const submitForm = async (payload) => {
        try {
            const response = await axios.put(profileEdit, payload);
            getProfile();
            toast.success(response?.data?.result?.msg);
            reset();
            toggleModal();
            navigate('/MyProfile');
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    };

    // email
    const submitEmailForm = async (payload) => {
        try {
            const response = await axios.put(profileEdit, payload);
            getProfile();
            toast.success(response?.data?.result?.msg);
            reset();
            emailModal();
            navigate('/MyProfile');
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    };


    // profile get
    const getProfile = async () => {
        try {
            const response = await axios.get(profile)
            setData(response?.data?.result)
        } catch (error) {

        }
    }

    // profile edit
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    const mobileModal = () => {
        setMobileModalOpen(!mobileModalOpen);
    };
    const emailModal = () => {
        setEmailModalOpen(!emailModalOpen)
    };



    useEffect(() => {
        getProfile()
    }, ['']);

    useEffect(() => {
        reset({
            name: data?.name,
            email: data?.email,
        });
    }, [reset, setValue]);
    return (
        <div>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <h1>My Profile</h1>
                <Row>
                    <h3 className='mt-5'><User size={40} /> Profile Information</h3>
                    <Col lg={3} md={6} sm={6}>
                        <div className='mt-4' style={{ textAlign: 'start' }}>
                            <h6 className='mb-4'>Name</h6>
                            <h6 className='mb-4'>Mobile Number</h6>
                            <h6 className='mb-4'>Email Address</h6>
                        </div>
                    </Col>
                    <Col lg={9} md={6} sm={6}>
                        <div className='mt-4' style={{ textAlign: 'start' }}>
                            <h6 className='mb-4'>{data?.name || "Enter your Name"} <span onClick={toggleModal}><Edit3 style={{ cursor: 'pointer' }} /></span></h6>
                            <h6 className='mb-4'>{data?.mobile || "Mobile Number not Provided"} <span onClick={mobileModal}><Edit3 style={{ cursor: 'pointer' }} /></span></h6>
                            <h6>{data?.email || "Enter your Email"} <span onClick={emailModal}><Edit3 style={{ cursor: 'pointer' }} /></span></h6>
                        </div>
                    </Col>
                </Row>

            </div>
            {/* Name Modal */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Your Profile Name</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <img src={name} className='mobile-modal' style={{ height: '200px', width: '200px', display: 'block', margin: 'auto' }} />
                        <Label>Name</Label>
                        <Controller
                            name='name'
                            id='name'
                            control={control}
                            defaultValue={data?.name}
                            render={({ field }) => (<Input type="text" {...field} invalid={errors.name && true} placeholder="Enter Your Name" />)} />
                        {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        <button type='submit' className='mt-3' style={{ width: '100%', backgroundColor: '#e4510b', border: 'none', padding: '8px', borderRadius: '7px', color: 'white' }}>Submit</button>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Mobile Modal */}
            <Modal isOpen={mobileModalOpen} toggle={mobileModal}>
                <ModalHeader toggle={mobileModal}>Edit Your Mobile Number</ModalHeader>
                <ModalBody>
                    <img src={mobile} className='mobile-modal' style={{ height: '200px', width: '200px', display: 'block', margin: 'auto' }} />
                    <h5 className='text-center mt-2'>Verify Your Mobile Number <br /> To Proceed</h5>
                    <p style={{ fontSize: '14px' }}>We require this verification in order to confirm that you are a genuine user.</p>
                    <Label>Mobile</Label>
                    <Controller
                        name='mobile'
                        id='mobile'
                        control={control}
                        defaultValue={data?.mobile}
                        render={({ field }) => (<Input type="number" {...field} invalid={errors.mobile && true} placeholder="Enter Your Mobile" />)} />
                    {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                    <button type='submit' className='mt-3' style={{ width: '100%', backgroundColor: '#e4510b', border: 'none', padding: '8px', borderRadius: '7px', color: 'white' }}>Generate OTP</button>
                </ModalBody>
            </Modal>
            {/* Email Modal */}
            <Modal isOpen={emailModalOpen} toggle={emailModal}>
                <ModalHeader toggle={emailModal}>Edit Your Email</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(submitEmailForm)}>
                        <img src={email} className='mobile-modal' style={{ height: '250px', width: '200px', display: 'block', margin: 'auto' }} />
                        <h5 className='text-center mt-2'>Verify Your Email<br /> To Proceed</h5>
                        <Label>Email</Label>
                        <Controller
                            name='email'
                            id='email'
                            control={control}
                            defaultValue={data?.email}
                            render={({ field }) => (<Input type="email" {...field} invalid={errors.email && true} placeholder="Enter Your Email" />)} />
                        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        <button type='submit' className='mt-3' style={{ width: '100%', backgroundColor: '#e4510b', border: 'none', padding: '8px', borderRadius: '7px', color: 'white' }}>Submit</button>
                    </Form>
                </ModalBody>
            </Modal>



            <FooterSection />
        </div>
    )
}

export default MyProfile