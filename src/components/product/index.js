import React, { useEffect, useState } from 'react'
import typePic from "../../assets/images/banner/type.jpg"
import { v4 as uuidv4 } from 'uuid';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Card, Col, Row, Spinner } from 'reactstrap';
import "./index.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { product, productApi, productCategory } from '../../ApiConfigs/ApiConfig';
import axios from "axios"
import InteractiveHome from '../home/interactive';
import FooterSection from '../footer';
import Navbar from '../navbar';
import { ArrowRight } from 'react-feather';
import emptyCart from '../../assets/images/banner/2875607_8503 [Converted].png';
import toast from 'react-hot-toast';


function ProductType() {

    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState([]);
    const { id } = useParams();
    const [open, setOpen] = useState('1');

    const toggleAccordion = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const firstObject = dataa[0]


    const [categoryDataa, setCategorData] = useState();

    const categoryData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${productCategory}/${id}`)
            setCategorData(response?.data?.result)

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        categoryData()
    }, [])


    const additionalData = async () => {
        try {
            setLoading(true);
            let url = product
            const response = await axios.get(`${url}?productCategory=${id}`)
            setData(response?.data?.result);

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        additionalData()
    }, [])


    const navigate = useNavigate()

    // const navToPage = (dataa) => {
    //     const productName = dataa?.name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
    //     const productId = dataa?._id;
    //     navigate(`/products/viewProduct/${productName}/${productId}`);
    // };
    const navToPage = (product_url) => {
        navigate(`/products/viewProduct/${product_url}`);
    }

    const navToHome = () => {
        navigate(`/`)
    }

    const navToProduct = () => {
        navigate('/products')
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

    const truncateTitle = (title) => {
        return title.length > 70 ? `${title.slice(0, 70)}...` : title;
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
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToProduct}>Products</span> / <span>{firstObject?.productCategory?.name}</span> </p>
                    <h1 className='product-overall-title'> {firstObject?.productCategory?.name}</h1>
                    {dataa.length === 0 ? (
                        <div>
                            <h2 className='text-center pt-3 mb-5' style={{ color: 'grey' }}>"Oops! It seems like we're out of stock in this category. <br /> Explore other categories or visit us again soon."</h2>
                            <div className='d-flex justify-content-center'>
                                <img src={emptyCart} style={{ height: '250px' }} />
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <Link to='/products'>
                                    <button className='success-modal-btn'>Continue Shopping <ArrowRight size={17} /></button>
                                </Link>
                            </div>

                        </div>
                    ) : (
                        <div className='product-card-con'>
                            {dataa?.map((eachItem => (
                                // <Card onClick={() => navToPage(eachItem)} className='mt-3 product-card' key={eachItem?._id}>
                                //     <img src={eachItem?.image} className='img-fluid' alt="product-image" style={{ height: '200px', width: '100%' }} />
                                //     <div style={{ backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='p-3'>
                                //         <div className='p-1'>
                                //             <h6 className='text-center product-card-title'>{eachItem?.name}</h6>
                                //             <p className='text-center product-card-description'><span className='fw-bold'>₹{eachItem?.amount}</span> each for 100 pieces</p>
                                //         </div>
                                //     </div>
                                // </Card>
                                <Card className='p-0 fast-card' style={{ border: 'none', cursor: 'pointer', marginTop: "2%", marginLeft: "10px" }} onClick={() => navToPage(eachItem?.product_url)} >
                                    <img src={eachItem?.image} style={{ borderRadius: '2px', height: "200px", width: '300px' }} alt="" />
                                    <div className='banner-card-content d-flex'>
                                        <div className='banner-card-headcontent' style={{ top: "5px" }}>
                                            {/* <h6 className='banner-card-head m-0'
                                                style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {eachItem?.productCategory?.name?.substring(0, 25)} {eachItem?.productCategory?.name?.length > 20 ? '...' : ''}
                                            </h6> */}

                                            <h6 className='fw-bold text-center justifyContent-center alignItems-center' style={{ fontSize: '18px', marginTop: "17px", cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                                {eachItem?.name?.substring(0, 20)} {eachItem?.name?.length > 20 ? '...' : ''}
                                            </h6>

                                        </div>
                                        <div className='banner-card-prize'>
                                            <p className='banner-card-starts m-0' style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                                                As Low As
                                            </p>
                                            <h2 className='banner-card-amnt' style={{ fontSize: `${eachItem?.mimimumAmount && eachItem.mimimumAmount.toString().length > 1 ? (eachItem.mimimumAmount.toString().length > 4 ? '18px' : '24px') : '24px'}`, textAlign: `${eachItem?.mimimumAmount && eachItem.mimimumAmount.toString().length === 1 ? 'center' : 'center'}` }}>₹{eachItem?.mimimumAmount}</h2>
                                        </div>
                                    </div>

                                </Card>
                            )))}
                        </div>
                    )}
                </div>
            )}

            <div>
                <div style={{ marginTop: '60px' }}>
                    <div>
                        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Frequently Asked Questions</h3>
                    </div>
                    <div style={{ paddingLeft: '8%', paddingRight: '8%', marginTop: '20px' }}>
                        <Accordion open={open} toggle={toggleAccordion}>
                            <Row>
                                {categoryDataa?.FAQ?.map((details, i) => (
                                    <Col lg={6} md={6} sm={12} key={details?.id}>
                                        <AccordionItem>
                                            <AccordionHeader targetId={i}><h5>{truncateTitle(details?.title)}</h5></AccordionHeader>
                                            <AccordionBody accordionId={i}>
                                                {details?.description}
                                            </AccordionBody>
                                        </AccordionItem>
                                    </Col>
                                ))}
                            </Row>
                        </Accordion>

                    </div>
                </div>


                <InteractiveHome />
                <FooterSection />
            </div>


        </>
    )
}

export default ProductType