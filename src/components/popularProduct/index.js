import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import FooterSection from '../footer'
import { useNavigate } from 'react-router-dom';
import { speedSale } from '../../ApiConfigs/ApiConfig';
import axios from 'axios'
import { Badge, Card, Col, Row, Spinner } from 'reactstrap';

function PopularProducts() {

    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState([]);

    const navigate = useNavigate()


    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${speedSale}`)
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
        <>
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
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span>Popular Products</span> </p>
                    <h1 className='product-overall-title'>Popular Products of Printon</h1>
                    <div className='product-card-con'>
                        {dataa?.map((eachItem => (

                            <Card onClick={() => navToPage(eachItem?._id)} className='mt-3 product-card' >
                                <img
                                    src={eachItem?.image}
                                    className='img-fluid'
                                    alt="product-image"
                                    style={{ height: "200px", width: "100%" }}
                                />

                                <div style={{ backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='p-3'>
                                    <div className='p-1'>
                                        <h6 className='text-center product-card-title'>{eachItem?.name}</h6>
                                        <p className='text-center product-card-description'><span className='fw-bold'>₹{eachItem?.amount}</span> each for 100 pieces</p>
                                    </div>
                                </div>
                            </Card>

                        )))}
                    </div>
                </div>
            )}
            <FooterSection />
        </>
    )
}

export default PopularProducts
