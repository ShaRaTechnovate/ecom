import React, { useState } from 'react';
import './index.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { X } from 'react-feather';

function OfferPopup({ modal, toggle }) {
    return (
        <div>
            <Modal className='offer-popup-openmodal' style={{ maxWidth: '530px' }} isOpen={modal} toggle={toggle}>
                <ModalBody className='offer-popup-body' >
                    <div className='d-flex justify-content-end mt-1 me-1'>

                        <X className='login-popup-close' onClick={toggle} />
                    </div>
                    <h3 className='offer-popup-heading mt-3'>For Your Picture-Perfect Moments.</h3>
                    <p className='offer-popup-heading1'>@ FLAT 20% OFF on all Photobooks</p>

                </ModalBody>
            </Modal>
        </div>
    );
}

export default OfferPopup;