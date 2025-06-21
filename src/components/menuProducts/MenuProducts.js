import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import FooterSection from '../footer'
import toast from 'react-hot-toast';
import axios from 'axios';
import { menuProduct } from '../../ApiConfigs/ApiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'reactstrap';

function MenuProducts() {

    const [menuGetData, setMenuGetData] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()



    const handleMenuData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${menuProduct}/${id}`);
            setMenuGetData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg)

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleMenuData()
    }, [])

    const navToHome = () => {
        navigate('/');
    };

    const navToPage = (product_url) => {
        navigate(`/products/viewProduct/${product_url}`);
    };

    return (
        <div>
            <Navbar />
            {loading ? (
                <div style={{ height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        color="primary"
                    >
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <div className='pt-3 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span >{menuGetData?.menu_url}</span></p>
                    {menuGetData?.category?.map(details => (
                        <div>
                            <div key={details?._id} className='mt-4'>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>
                                        <hr className='fast-head-line mt-4' />
                                    </Col>

                                    <Col lg={4} md={4} sm={4}>
                                        <h1 className='fast-head'>{details?.productCategory?.name}</h1>
                                    </Col>

                                    <Col lg={4} md={4} sm={4}>
                                        <hr className='fast-head-line  mt-4' />
                                    </Col>
                                </Row>
                            </div>
                            <div className='product-card-con mt-1'>
                                {details?.products?.map(eachItem => (
                                    <Card key={eachItem?._id} onClick={() => navToPage(eachItem?.product_url)} className='mt-3 product-card'>
                                        <img src={eachItem?.image} className='img-fluid' alt="product-image" style={{ height: '200px', width: '100%' }} />
                                        <div style={{ backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='p-3'>
                                            <div className='p-1'>
                                                <h6 className='text-center product-card-title'>{eachItem?.name}</h6>
                                                <p className='text-center product-card-description'><span className='fw-bold'>₹{eachItem?.amount}</span> each for 100 pieces</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            )}
            <FooterSection />
        </div>
    )
}

export default MenuProducts