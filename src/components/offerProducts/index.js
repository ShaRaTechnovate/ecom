import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import FooterSection from '../footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { getOfferProduct } from '../../ApiConfigs/ApiConfig';
import { Badge, Card, Col, Row, Spinner } from 'reactstrap';
import './index.css';

function OfferTargets() {


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const firstObject = data[0]
    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${getOfferProduct}`)
            setData(response?.data?.result)

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        additionalData()


    }, [])


    const navToHome = () => {
        navigate('/')
    }

    const navToProduct = () => {
        navigate('/products')
    }

    const navToPage = (id) => {
        navigate(`/products/viewProduct/${id}`)
    }

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength
            ? `${description.slice(0, maxLength)}...`
            : description;
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
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span>Offer Product</span> </p>
                    <h1 className='product-overall-title'>Latest Offer Products</h1>
                    <div className='product-card-con'>
                        {data?.map((eachItem => (

                            <Card onClick={() => navToPage(eachItem?.product._id)} className='mt-3 product-card' >
                                <div>
                                    <img src={eachItem?.product?.image} className='img-fluid' alt="product-image" />
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
                                <div style={{ backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='p-3'>
                                    <div className='p-1'>
                                        <h6 className='text-center product-card-title'>{eachItem?.product?.name}</h6>
                                        <p className='text-center product-card-description'><span className='fw-bold'>₹{eachItem?.price}</span> each for 100 pieces</p>
                                    </div>
                                </div>
                            </Card>

                        )))}
                    </div>
                </div>
            )}

            <FooterSection />
        </div>
    )
}

export default OfferTargets