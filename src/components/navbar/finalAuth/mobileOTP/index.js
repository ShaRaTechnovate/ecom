import React, { useEffect, useState } from 'react'
import { Badge, Modal, ModalBody, ModalHeader } from 'reactstrap'
import logo from "../../../../assets/images/logo/logo.png"
import MobileSend from './MobileSend'
import OTPSend from './OTPSend'
import FinalAuthModal from '..'


function MobileOTPModal({ isOpen, toggleOTP, setCartKey, logout }) {

    const [isLogin, setIsLogin] = useState(true)
    const [isToggle, setToggle] = useState(false)

    const [getBoo, setBoo] = useState(logout)

    const toggleAuth = () => {
        setIsLogin(!isLogin)
    }

    const toggleEmail = () => {
        setToggle(!isToggle)
    }

    const handleEmail = () => {
        toggleOTP()
        toggleEmail()
    }
    useEffect(() => {
        if (getBoo === true) {
            setIsLogin(true)
            setBoo(true)
        }
    }, [getBoo])

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggleOTP} className="modern-modal" style={{ border: 'none' }}>
                <ModalHeader toggle={toggleOTP} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">Login</h1>
                    </div>
                </ModalHeader>
                <ModalBody className='p-0 m-0'>
                    <div className='ps-3 pe-3 mt-3 d-flex justify-content-end'>
                        {isLogin && (<h6 style={{ cursor: 'pointer' }} onClick={handleEmail}>
                            <Badge color='primary' pill>
                                Email Login !
                            </Badge>
                        </h6>)}
                    </div>
                    {isLogin ? (
                        <MobileSend toggleAuth={toggleAuth} />
                    ) : (
                        <div>
                            {setCartKey === 'yes' ? (
                                <OTPSend toggleAuth={toggleAuth} toggleOTP={toggleOTP} setCartKey={'yes'} />
                            ) : (
                                <OTPSend toggleAuth={toggleAuth} toggleOTP={toggleOTP} />
                            )}
                        </div>
                    )}

                </ModalBody>
            </Modal>
            {isToggle && <FinalAuthModal isOpen={isToggle} toggle={toggleEmail} />}
        </div>
    )
}

export default MobileOTPModal
