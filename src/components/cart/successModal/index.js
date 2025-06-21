import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.css'
import { ArrowRight, X } from 'react-feather';
import correct from "../../../assets/images/logo/correct.png"
import { useNavigate } from 'react-router-dom';

function SuccessModalComponent({ modal, toggle }) {


    const navigate = useNavigate()

    const navToAllProduct = () => {
        navigate('/products')
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <div style={{ background: '#47c9a2', height: '150px' }} className='p-2' >
                    <div className='d-flex justify-content-end'>
                        <span style={{ color: '#dfdfdf', cursor: 'pointer' }} onClick={toggle}><X /></span>
                    </div>
                    <div style={{ height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='success-circle'>
                            <img src={correct} height={100} alt="" />
                        </div>
                    </div>

                </div>

                <ModalBody>
                    <div className='pt-4 pb-4'>
                        <div className='text-center'>
                            <h3>Congratulation!</h3>
                            <p className='mt-3'>Your Order has been Placed successfully.</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='success-modal-btn' onClick={navToAllProduct}>Continue Shopping <ArrowRight size={17} /></button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    );
}

export default SuccessModalComponent;