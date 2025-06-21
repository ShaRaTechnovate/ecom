import React from 'react'
import Navbar from '../../navbar'
import './index.css';

import banner from '../../../assets/images/banner/Group 1410108923 (2).jpg';
import FooterSection from '..';
import { NavLink, useNavigate } from 'react-router-dom';

function Shipping() {

    const navigate = useNavigate()
    const navToHome = () => {
        navigate('/')
    }
    const navToTerms = () => {
        navigate('/shippingPolicy')
    }

    return (
        <div>
            <Navbar />
            <div className='pb-5 pt-3' style={{ paddingLeft: '18%', paddingRight: '18%' }}>
                <div>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToTerms}>Shipping Policy</span></p>
                </div>
                {/* <img className='delivery-images' src={banner} alt='banner' /> */}
                <div>
                    <div className='delivery-para'>
                        <p>
                            #### Delivery Fees–
                        </p>
                        <p>Delivery fees and times vary for different products and are calculated based
                            on the size and weight of your order and its destination. The delivery price
                            for each order will be displayed during the checkout process, prior to payment
                            and order confirmation and included in the total price of your order.</p>
                        <p>#### Delivery time</p>
                        <p>Typically, delivery occurs within 10 working days of us
                            receiving your payment authorisation and cleared funds.
                            In some cases the estimated delivery time frame will be
                            longer, for example where items are made to order.
                            From time to time the delivery of specific items will
                            exceed our usual 10 working day  delivery window for
                            reasons outside our control. We work hard to process
                            all orders as quickly as possible and we will send you
                            an email to let you know when your item has been dispatched by us</p>
                        <p>Risk in the products passes to you on delivery.
                            We do not accept liability for any loss, theft or
                            damage to the products after delivery
                        </p>
                        <p>#### Delivery methods & locations
                        </p>
                        <p>We work with a number of delivery partners
                            including Australia Post and courier companies.
                            Your order will be delivered to the delivery
                            address provided by you.</p>
                        <p>We deliver most products Australia-wide. In some cases,
                            we will only be able to deliver products in metropolitan areas.
                            This information will be shown on the product listing.We are not
                            able to accept orders for international delivery at this time.</p>
                        <p>#### Delivery failure
                        </p>
                        <p>
                            It is important that you verify your information is correct,
                            especially your delivery address. If the address provided is
                            incorrect and the package is returned, you may be billed for
                            the additional shipping charges in order for your delivery to reach you.
                            You agree to this by placing an order with us, we reserve the right to
                            pass on applicable charges to you if you provide wrong address information.</p>
                        <p>#### Returns Policy
                        </p>
                        <p>If for any reason you are not satisfied with your purchase
                            it can be returned for an exchange or refund within 30 days,
                            no questions asked.
                            The returned item must be in original condition and in original packaging.</p>
                        <p>We guarantee to replace, exchange or refund any goods that are
                            delivered to you damaged or faulty. This guarantee requires you
                            to inform us immediately of the problem. Shipping costs for returned goods
                            are the responsibility of the customer.</p>
                        <p>#### Incorrectly described goods
                        </p>
                        <p>We guarantee to exchange or refund any goods that do not
                            match the description on our website. This guarantee
                            requires you to inform us immediately of the problem.
                            Shipping costs for returned goods are the responsibility of the customer
                        </p>
                        <p>
                            #### Goods that cannot be returned
                        </p>
                        <p>
                            Products that have been used cannot be returned.
                        </p>
                    </div>
                </div>
            </div>
            <FooterSection />
        </div>
    )
}

export default Shipping