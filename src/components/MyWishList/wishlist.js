import React, { useEffect, useState } from 'react'
import { wishList } from '../../ApiConfigs/ApiConfig';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Card, Col, Collapse, Modal, ModalBody, Row, Spinner } from 'reactstrap';
import { ArrowRight, ChevronDown, ChevronRight, ExternalLink } from 'react-feather';
import emptyCart from '../../assets/images/banner/carttt (1).png'
import "./index.css"


function Wishlist() {

    const [loading, setLoading] = useState(false);
    const [wishlistData, setWishlistData] = useState([]);
    // const queryClient = useQueryClient();



    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const numberOfData = wishlistData?.length;

    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${wishList}`)
            setWishlistData(response?.data?.result)

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    const removeItemFromWishlist = async (productId) => {
        try {
            setLoading(true);
            const response = await axios.post(`${wishList}`, { product: productId });
            additionalData()
            // setWishlistData((prevData) => prevData.filter((item) => item.product._id !== productId));
            toast.success(response?.data?.msg);
        } catch (error) {
            console.error('Error removing item from wishlist', error);
            toast.error('Error removing item from wishlist');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if (localStorage.getItem('token')) {
            additionalData()
        }

    }, [localStorage.getItem('token')])

    const navigate = useNavigate()

    const navToProductView = (id) => {
        navigate(`/products/viewProduct/${id}`)
    }

    return (
        <>

            {/* <Navbar /> */}

            <div className='pt-0 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                {
                    loading ? (
                        <div style={{ height: '310px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner
                                color="primary"
                                size=""
                            >
                                Loading...
                            </Spinner>
                        </div>
                    ) :
                        (<>
                            {numberOfData ? (
                                <div className='mt-5'>
                                    <h1>My Wishlist</h1>
                                    <h5 className='mb-4 text-secondary'><span>{numberOfData}</span> item</h5>

                                    <Row>
                                        <Col sm={12} lg={8}>
                                            <Card style={{ border: 'none' }} >
                                                <h5 style={{ backgroundColor: 'rgb(237, 237, 237)' }} className='p-3 cart-title m-0'>All Jobs - {numberOfData} items</h5>
                                                {wishlistData?.map((eachItem, i) => (

                                                    <div key={eachItem._id} className='cart-card p-3'  >
                                                        <div
                                                            className='cart-left'
                                                            style={{
                                                                backgroundImage: `url(${eachItem?.product?.image})`,
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat',
                                                            }}>
                                                        </div>
                                                        <div className='cart-right'>
                                                            <div className='d-flex'>
                                                                <h5 className='mt-1 cursor-pointer' onClick={() => navToProductView(eachItem?.product?._id)}>{eachItem?.product?.name}</h5>
                                                                <span className='ms-2' style={{ cursor: 'pointer', color: '#e6703a' }} onClick={() => navToProductView(eachItem?.product?._id)}><ExternalLink /></span>
                                                                <div class="con-like" onClick={() => removeItemFromWishlist(eachItem?.product?._id)}>
                                                                    <input class="like" defaultChecked={true} type="checkbox" title="like" />
                                                                    <div class="checkmark">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" class="outline" viewBox="0 0 24 24">
                                                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
                                                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
                                                                            <polygon class="poly" points="10,10 20,20"></polygon>
                                                                            <polygon class="poly" points="10,50 20,50"></polygon>
                                                                            <polygon class="poly" points="20,80 30,70"></polygon>
                                                                            <polygon class="poly" points="90,10 80,20"></polygon>
                                                                            <polygon class="poly" points="90,50 80,50"></polygon>
                                                                            <polygon class="poly" points="80,80 70,70"></polygon>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className='mt-4'>
                                                                <h6 className='mt-1'>{eachItem?.product?.shortDescription}</h6>
                                                            </div>
                                                            <div className='mt-4 d-flex align-items-center'>
                                                                <h6 className='mb-0'>Price:</h6>
                                                                <h6 className='mb-0 ml-5'>{eachItem?.product?.amount}</h6>
                                                            </div>



                                                            <div className='mt-4'>
                                                                <div className='accordion-header' style={{ cursor: 'pointer' }} onClick={() => toggleAccordion(eachItem?._id)}>
                                                                    <div className='d-flex justify-content-between pb-3'>
                                                                        <h6 className='mt-1 p-0'>Product Specifications</h6>
                                                                        <span className='m-0 p-0'><ChevronDown /></span>
                                                                    </div>
                                                                </div>
                                                                <Collapse isOpen={openAccordion === eachItem?._id}>
                                                                    <div className='accordion-body'>
                                                                        <div>
                                                                            {eachItem.product?.fieldType?.map((field, fieldIndex) => (
                                                                                <div key={fieldIndex}>
                                                                                    {
                                                                                        field.options?.map((option, optionIndex) => (
                                                                                            <div className='d-flex justify-content-between' key={optionIndex}>
                                                                                                <p className='text-secondary'>
                                                                                                    <ChevronRight /> {option?.name}
                                                                                                </p>
                                                                                                <p className='pe-5 text-dark' style={{ fontWeight: '500' }}>- {option?.name}</p>


                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                    </div>
                                                                </Collapse>



                                                            </div>
                                                            <hr />
                                                            {/* <div className='d-flex justify-content-between'>
                                                                <p className='fw-bold'>Item Total</p>
                                                                <p className='fw-bold'>₹{eachItem?.amount}</p>

                                                            </div> */}
                                                        </div>
                                                    </div>
                                                ))}
                                            </Card>
                                        </Col>
                                        <Col sm={12} lg={4}>
                                            {/* <Card style={{ border: 'none' }} className='mt-4 mt-lg-0'>
                                                <div className='cart-summary p-3'>
                                                    <h5>Summary</h5>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='cart-summary-para'>Item Subtotal</p>
                                                        <p>₹{dataa?.totalAmount}</p>
                                                    </div>
                                                    <hr className='p-0 m-0 mb-3' />
                                                    <div className='d-flex justify-content-between'>
                                                        <h6>Item Total (inclusive of all tax)</h6>
                                                        <h5 className='fw-bold ms-3'>₹{dataa?.totalAmount}</h5>
                                                    </div>
                                                </div>
                                                <div className='cart-summary-voucher p-4 mb-3'>
                                                    <p className='cart-summary-para p-0 m-0'><Tag /> Vouchers are now moved to checkout</p>
                                                </div>
                                                <button className='order-now-btn' onClick={orderNowFunc}>

                                                    Continue to Checkout

                                                </button>
                                            </Card> */}
                                        </Col>
                                    </Row>



                                    <Modal className="modal-dialog-centered modal-xs">
                                        {/* <ModalHeader style={{ paddingLeft: '20px', fontFamily: 'italic', textAlign: 'center' }} toggle={closeDeleteModal}>Confirm Delete</ModalHeader> */}
                                        <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Item?</ModalBody>
                                        <div style={{ justifyContent: 'center' }} className="modal-footer">
                                            <Button style={{ backgroundColor: "#E4510B", border: 'none' }} >
                                                Confirm
                                            </Button>
                                            <Button color="secondary"  >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (
                                <>

                                    <div className='d-flex justify-content-center'>

                                        <img src={emptyCart} className="img-fuild empty-card-img" alt="empty-cart" />
                                    </div>
                                    <h4 className='text-center m-0 p-0 cart-empty-para'>This is embarrassing!<br />Your Wishlist is empty at the moment.</h4>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Link to='/products'>
                                            <button className='success-modal-btn'>Continue Shopping <ArrowRight size={17} /></button>
                                            {/* <p className='text-center text-danger p-0 m-0' style={{ textDecoration: 'underline' }}>countinue Shopping</p> */}
                                        </Link>
                                    </div>
                                </>
                            )}
                        </>)

                }

            </div >

            {/* <FooterSection /> */}

        </>
    )
}

export default Wishlist
