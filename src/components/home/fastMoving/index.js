import React, { useEffect, useState } from 'react'
import { speedSale } from '../../../ApiConfigs/ApiConfig';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Badge, Card, Col, Row, Spinner } from 'reactstrap';
import "./index.css"
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

function FastMoving() {


    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState();
    const [eightData, setEightData] = useState();
    const navigate = useNavigate()


    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(speedSale);
            setData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        additionalData();
    }, []);

    useEffect(() => {
        if (dataa && dataa.length >= 8) {
            const shuffledData = [...dataa].sort(() => Math.random() - 0.5);
            setEightData(shuffledData.slice(0, 8));
        } else {
            setEightData(dataa);
        }
    }, [dataa]);

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncateDescription = (description, maxLength) => {
        return description?.length > maxLength
            ? `${description?.slice(0, maxLength)}...`
            : description;
    };

    return (
        <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>

            <Row>
                <Col lg={4} md={4} sm={4}>
                    <hr className='fast-head-line mt-4' />
                </Col>

                <Col lg={4} md={4} sm={4}>
                    <h1 className='fast-head'>Popular Products</h1>
                </Col>

                <Col lg={4} md={4} sm={4}>
                    <hr className='fast-head-line  mt-4' />
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
                        {eightData?.map((eachItem, i) => (
                            <Col sm={6} md={4} lg={3} key={i}>
                                <Card className='p-0 fast-card' style={{ border: 'none', cursor: 'pointer', marginTop: "2%" }} onClick={() => navigate(`/products/viewProduct/${eachItem?.product_url}`)}>
                                    <img src={eachItem?.image} style={{ borderRadius: '4px', height: "250px", width: '100%' }} alt="" />
                                    <div className='banner-card-content d-flex'>
                                        <div className='banner-card-headcontent' style={{ top: "5px" }}>
                                            <h6 className='banner-card-head m-0'
                                                style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {eachItem?.name?.substring(0, 25)}{eachItem?.name?.length > 20 ? "..." : ''}

                                            </h6>

                                            <p className='fw-bold' style={{ fontSize: '16px', marginTop: "10px", cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                                {eachItem?.productCategory?.name?.substring(0, 20)} {eachItem?.productCategory?.name?.length > 20 ? '...' : ''}

                                            </p>

                                        </div>
                                        <div className='banner-card-prize'>
                                            <p className='banner-card-starts m-0' style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                                                As Low As
                                            </p>
                                            <h2 className='banner-card-amnt' style={{ fontSize: `${eachItem?.mimimumAmount && eachItem.mimimumAmount.toString().length > 1 ? (eachItem.mimimumAmount.toString().length > 4 ? '18px' : '24px') : '24px'}`, textAlign: `${eachItem?.mimimumAmount && eachItem.mimimumAmount.toString().length === 1 ? 'center' : 'center'}` }}>₹{eachItem?.mimimumAmount}</h2>
                                        </div>
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <p className='view-all-fast' onClick={() => navigate('/popularProducts')}>View All <ArrowRight /></p>
                </>
            )}
        </div>
    )
}

export default FastMoving
