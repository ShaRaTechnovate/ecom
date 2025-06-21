import React, { useEffect, useState } from 'react'
import BannerHome from './banner'
import AboutHome from './about'
import InteractiveHome from './interactive'
import Navbar from '../navbar'
import FooterSection from '../footer'
import CartRecommendation from './cartRecommendation'
import FastMoving from './fastMoving'
import SocialFeeds from './socialmedia-feeds'
import LoginPopup from '../loginPopup'
import OfferPopup from '../offerPopup'
import TargetAudience from './targetAudience'
import ChatBot from '../chatBot'




function HomeIndex() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [offerModal, setOfferModal] = useState(false);
    const offertoggle = () => setOfferModal(!offerModal);

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            const timeoutId = setTimeout(() => {
                toggle();
            }, 120000);
            return () => clearTimeout(timeoutId);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            const timeoutId = setTimeout(() => {
                offertoggle();
            }, 220000);
            return () => clearTimeout(timeoutId);
        }
    }, []);


    return (
        <div>
            <Navbar />
            <BannerHome />
            <CartRecommendation />
            <FastMoving />
            <TargetAudience />
            <AboutHome />
            <SocialFeeds />
            <InteractiveHome />
            {/* <LoginPopup modal={modal} toggle={toggle} />
            <OfferPopup modal={offerModal} toggle={offertoggle} /> */}
            <FooterSection />
            {/* <ChatBot /> */}
        </div>
    )
}
export default HomeIndex
