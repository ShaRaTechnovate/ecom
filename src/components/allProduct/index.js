import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InteractiveHome from '../home/interactive'
import { product, productApi } from '../../ApiConfigs/ApiConfig';
import axios from 'axios'
import { Badge, Card, Col, Row, Spinner } from 'reactstrap';
import Navbar from '../navbar';
import FooterSection from '../footer';

function AllProduct() {

    // Product Get
    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState([]);
    const navigate = useNavigate()

    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${product}`);

            // setData(response?.data?.result);
            const productsWithOffer = response?.data?.result?.filter(product => !product.offer);
            setData(productsWithOffer);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        additionalData();
    }, []);

    const navToHome = () => {
        navigate('/');
    };

    const navToProduct = () => {
        navigate('/products');
    };

    const navToPage = (product_url) => {
        navigate(`/products/viewProduct/${product_url}`);
    };

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
                    <Spinner color="primary">
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <div className='pt-3 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToProduct}>Products</span></p>
                    <h1 className='product-overall-title'>All Products</h1>
                    <div className='product-card-con'>
                        {dataa?.map(eachItem => (
                            <Card key={eachItem?._id} onClick={() => navToPage(eachItem?.product_url)} className='mt-3 product-card'>
                                <img src={eachItem?.image} className='img-fluid' alt="product-image" style={{ height: '200px', width: '100%' }} />
                                <div style={{ backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='p-3'>
                                    <div className='p-1'>
                                        <h6 className='text-center product-card-title'>{eachItem?.name}</h6>
                                        <p className='text-center product-card-description'><span className='fw-bold'>₹{eachItem?.mimimumAmount}</span> each for 100 pieces</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            <InteractiveHome />
            <FooterSection />
        </>
    )
}

export default AllProduct;
