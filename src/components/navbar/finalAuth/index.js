import React, { useState } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import logo from "../../../assets/images/logo/logo.png"
import { Badge, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import MobileOTPModal from './mobileOTP'

function FinalAuthModal({ isOpen, toggle }) {

    const [isMobileOTP, setIsMobileOTP] = useState(false);

    const toggleMobileOTP = () => {
        setIsMobileOTP(!isMobileOTP);
    };

    const handleMobileOTP = () => {
        toggle();
        toggleMobileOTP()
    }

    const [isLogin, setIsLogin] = useState(true)

    const toggleAuth = () => {
        setIsLogin(!isLogin)
    }


    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} className="modern-modal" style={{ border: 'none' }}>
                <ModalHeader toggle={toggle} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">{isLogin ? 'Login' : 'Sign Up'}</h1>
                    </div>
                </ModalHeader>
                <ModalBody className='p-0 m-0'>
                    <div className='ps-3 pe-3 mt-3 d-flex justify-content-end'>
                        <h6 style={{ cursor: 'pointer' }}>
                            <Badge color='primary' pill onClick={handleMobileOTP}>
                                Mobile Login !
                            </Badge>
                        </h6>
                    </div>
                    {isLogin ? (
                        <SignIn toggleAuth={toggleAuth} toggle={toggle} />
                    ) : (
                        <SignUp toggleAuth={toggleAuth} />
                    )}
                </ModalBody>
            </Modal>
            {isMobileOTP && <MobileOTPModal isOpen={isMobileOTP} toggleOTP={toggleMobileOTP} />}
        </div>
    )
}

export default FinalAuthModal
