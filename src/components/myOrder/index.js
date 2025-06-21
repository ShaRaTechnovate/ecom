import React, { useEffect, useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { customerProducts, orderPost, rateandreview } from '../../ApiConfigs/ApiConfig';
import { Card, Col, Row } from 'reactstrap';
import Navbar from '../navbar';
import FooterSection from '../footer';
import { Edit3, ExternalLink } from 'react-feather';
import toast from 'react-hot-toast';

function MyOrderIndex() {


    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState([]);
    const [selectedRating, setSelectedRating] = useState();
    const [cartData, setCartData] = useState([]);


    const navigate = useNavigate()

    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${customerProducts}`)
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    }

    const numberOfData = cartData?.length;


    useEffect(() => {
        additionalData()

    }, [])

    const handleStarClick = async (ratingValue, id, userId) => {
        setSelectedRating(ratingValue);

        const payload = {
            user: userId,
            order: id,
            rating: ratingValue,
            review: 'good product'
        }
        try {
            setLoading(true);
            await axios.post(rateandreview, payload);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <h1>My Orders</h1>
                <div className='mt-5'>
                    <Row>
                        <Col sm={8} lg={10}>
                            <h5 style={{ backgroundColor: 'rgb(237, 237, 237)' }} className='p-3 cart-title m-0'>
                                All Jobs - items
                            </h5>
                            <Card className='p-3 mt-3'>
                                {dataa?.map((eachItem, i) => (
                                    <div key={i} className='orderList'>
                                        <div key={i} className='flex-column'>
                                            <Row>
                                                <div className=' d-flex'>
                                                    <Col lg={2} md={2} sm={2}>
                                                        <div className='cart-left img-fluid' >
                                                            <img src={eachItem?.file[0] || eachItem?.file}
                                                                height={100}
                                                                width={130}
                                                            />


                                                        </div>
                                                        {/* <div
                                                            className='cart-left img-fluid'
                                                            style={{
                                                                backgroundImage: `url(${eachItem?.file[0] || eachItem?.file})`,
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat',
                                                                width: '100px',
                                                                height: '100px',
                                                            }}
                                                        > </div> */}
                                                    </Col>
                                                    <Col lg={4} md={4} sm={4}>

                                                        <div className='d-flex'>
                                                            <h5 className='mt-2 ms-5'>{eachItem?.product?.name}</h5>
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='cart-quantity ms-5 mt-2'>
                                                                Quantity: <span className='text-dark'>{eachItem?.quantity}</span>
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4} md={4} sm={4}>
                                                        {/* <div className='d-flex justify-content-between'>
                                                            <p className='mt-2'>
                                                                Payment Method: <span>{eachItem?.payment?.mode}</span>
                                                            </p>
                                                        </div> */}
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='d-flex'>
                                                                <p> Rate This Product :  </p>
                                                                <div class="rating ms-2">
                                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                                        <React.Fragment key={value}>
                                                                            <input
                                                                                value={value}
                                                                                name='rating'
                                                                                id={`star${value}`}
                                                                                type='radio'
                                                                                checked={selectedRating === value}
                                                                                onChange={() => handleStarClick(value, eachItem?._id, eachItem?.customer?._id)}
                                                                            />
                                                                            <label htmlFor={`star${value}`} />
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={2} md={2} sm={2}>
                                                        <div className='justify-content-between'>
                                                            <div className='mt-2 d-flex'>
                                                                <span>Ordered: </span> <span className='ms-1'>
                                                                    {new Date(eachItem?.date).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between orderList mt-2'>
                                                            <p className='fw-bold ml-auto'>₹{eachItem?.amount}</p>
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Row>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div >
            <FooterSection />
        </>
    )
}

export default MyOrderIndex