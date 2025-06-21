import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios';
import { getOfferProduct } from '../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import { Card, Col, Row, Spinner } from 'reactstrap';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';



function TargetAudience() {
    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState();
    const [offerData, setOfferData] = useState();
    const navigate = useNavigate()

    const additionalOfferData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(getOfferProduct)
            setData(response?.data?.result)

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            additionalOfferData()
        }
    }, [localStorage.getItem('token')])
    useEffect(() => {
        if (dataa && dataa.length >= 8) {
            const shuffledData = [...dataa].sort(() => Math.random() - 0.5);
            setOfferData(shuffledData.slice(0, 8));
        } else {
            setOfferData(dataa);
        }
    }, [dataa]);
    const token = localStorage.getItem('token')



    return (

        <>
            {
                token ?
                    (
                        <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                            <Row>
                                <Col lg={4} md={4} sm={4}>
                                    <hr className='fast-head-line mt-4' />
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <h1 className='fast-head'>Offer Products</h1>
                                </Col>

                                <Col lg={4} md={4} sm={4}>
                                    <hr className='fast-head-line mt-4' />
                                </Col>
                            </Row>

                            {loading ? (
                                <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Spinner
                                        color="primary"
                                        size=""
                                    >
                                        Loading...
                                    </Spinner>
                                </div>
                            ) : (
                                <>
                                    <Row>
                                        {offerData?.map((eachItem, i) => (
                                            <Col sm={6} md={4} lg={3} key={i}>
                                                <Card className='p-0 fast-card' style={{ border: 'none', cursor: 'pointer', height: '100%' }} onClick={() => navigate(`/products/viewProduct/${eachItem?.product?.product_url}`)}>
                                                    <div>
                                                        <img src={eachItem?.product?.image} height={200} style={{ borderRadius: '4px', height: '250px', width: '100%' }} alt="" />
                                                        <div
                                                            className='image-offer'
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5px',
                                                                right: '1px',
                                                            }}
                                                        >
                                                            <span className=' offer-tag ps-4 pe-1' style={{ background: '#37a003', color: 'white' }}><b>SPECIAL OFFER</b></span>
                                                        </div>
                                                    </div>
                                                    <div className='banner-card-content d-flex'>
                                                        <div className='banner-card-headcontent' style={{ top: "5px" }}>
                                                            <h6 className='banner-card-head m-0'
                                                                style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {eachItem?.product?.productCategory?.name?.substring(0, 20)} {eachItem?.product?.productCategory?.name?.length > 20 ? '...' : ''}
                                                            </h6>

                                                            <p className='fw-bold text-center' style={{ fontSize: '16px', marginTop: "10px", cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                                                {eachItem?.product?.name?.substring(0, 20)} {eachItem?.product?.name?.length > 20 ? "..." : ""}
                                                            </p>

                                                        </div>
                                                        <div className='banner-card-prize'>
                                                            <p className='banner-card-starts m-0' style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                                                                As Low As
                                                            </p>
                                                            <h2 className='banner-card-amnt' style={{ fontSize: `${eachItem?.price && eachItem.price.toString().length > 1 ? (eachItem.price.toString().length > 4 ? '18px' : '24px') : '24px'}`, textAlign: `${eachItem?.price && eachItem.price.toString().length === 1 ? 'center' : 'center'}` }}>₹{eachItem?.price}</h2>
                                                        </div>
                                                    </div>
                                                    {/* <p className='fw-bold text-center' style={{ fontSize: '12px' }}>
                                                        {eachItem?.product?.name}
                                                    </p> */}
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <p className='view-all-fast' onClick={() => navigate('/offerProducts')}>View All <ArrowRight /></p>
                                </>
                            )}



                        </div>
                    )
                    :
                    null

            }


        </>
    )
}

export default TargetAudience
