import React from 'react'
import './index.css'
import { Modal, ModalBody } from 'reactstrap';
import { X } from 'react-feather';


function LoginPopup({ modal, toggle }) {

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} style={{ maxWidth: '820px', maxHeight: '500px' }}>
                <ModalBody className='login-popup-body'>
                    <div className='d-flex justify-content-end mt-1 me-1'>
                        <X className='login-popup-close' onClick={toggle} />
                    </div>
                    <div>
                        <h1 className='login-popup-head ms-3 mb-2'>Signup for ₹999 off your first order*</h1>
                        <p className='login-popup-para  ms-5 mb-1'>*₹9999 minimum spend on order. T&Cs apply.</p>
                        <p className='login-popup-para1 fw-bold'><span style={{ color: 'white' }}>Sign up</span>  <span style={{ color: 'white' }}> for exclusive voucher codes, news and offers you'll not find anywhere else. </span></p>
                        <div className='login-popup-email d-flex ms-4 mb-4'>
                            <input type="text" placeholder='Enter your email address' className='login-popup-email-input' />
                            <button className='login-popup-email-btn'>
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>





        </div>
    )
}

export default LoginPopup