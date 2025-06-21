import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import { cart } from '../../../ApiConfigs/ApiConfig';
import { ArrowRight, ShoppingCart } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import banner1 from "../../../assets/images/banner/Frame1.jpg"
import banner2 from "../../../assets/images/banner/Frame2.jpg"
import banner3 from "../../../assets/images/banner/frame5.png"
import banner4 from "../../../assets/images/banner/Frame4.jpg"

function CartRecommendation() {

    const navigate = useNavigate()
    const [dataa, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const numberOfItem = dataa?.products?.length;



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
        if (localStorage.getItem('token')) {

            additionalData()
        }
    }, [localStorage.getItem('token')])

    return (
        <>
            {numberOfItem && (
                <div className='pt-1 pb-3' style={{ paddingLeft: '8%', paddingRight: '8%', cursor: 'pointer' }} onClick={() => navigate('/myCart')}>
                    <div className='cart-rec-con pt-3'>
                        <div className='d-flex'>
                            <span style={{ color: 'black' }} className='pe-1 mt-2'><ShoppingCart size={25} /></span>
                            {numberOfItem ? (
                                <>
                                    <div className='cart-count mb-4'>
                                        {numberOfItem}
                                    </div>
                                    <p className='ms-2' style={{ marginTop: '12px' }}>Items pending in your cart</p>
                                </>
                            ) : (
                                null
                            )}
                        </div>
                        <h6 style={{ color: '#e4510b' }}>View Cart <ArrowRight /></h6>
                    </div>
                </div>
            )}

            <div className='pt-3 pb-3' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='mb-4 d-none d-lg-block'>
                    <img src={banner3} alt="banner" className='img-fluid bannerAd' />
                </div>
                <div className='mb-4 d-lg-none'>
                    <img src={banner2} alt="banner" className='img-fluid' />
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <div className='d-none d-lg-block' onClick={() => navigate('/products')}>
                        <img src={banner1} className='img-fluid' alt="banner" />
                    </div>
                    <div className='d-lg-none' onClick={() => navigate('/products')}>
                        <img src={banner4} className='img-fluid' alt="banner" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartRecommendation
