import React, { useEffect, useState } from 'react'
import {
    Card, Col, Row,
    Collapse,
    Modal,
    ModalBody,
    Button,
    Spinner
} from 'reactstrap'
import { cart, cartCount, removeCart } from '../../ApiConfigs/ApiConfig';
import axios from 'axios'
import './index.css'
import { ArrowRight, Check, ChevronDown, ChevronRight, Edit3, ExternalLink, Tag, Trash, X } from 'react-feather';
import { useNavigate } from 'react-router';
import emptyCart from '../../assets/images/banner/carttt (1).png'
import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import toast from 'react-hot-toast';
import FooterSection from '../footer';



function MyCartIndex() {

    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState([]);

    const cartId = dataa?._id
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const [orderModal, setOrderModal] = useState(false);
    const orderToggle = () => setOrderModal(!orderModal);
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

    const orderNowFunc = () => {

        navigate(`/placeOrder/${cartId}`)

    }

    const deleteProductCart = async (id) => {
        try {
            const response = await axios.delete(`${cart}/${cartId}?product=${id}`)

            additionalData()
        } catch (error) {
        }
    }


    const navigate = useNavigate()

    const navToProductView = (id) => {
        navigate(`/products/viewProduct/${id}`)
    }



    const [deleteData, setDeleteData] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);


    const openDeleteModal = (id) => {
        setDeleteData(id);

        setDeleteModal(true);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${removeCart}/${cartId}?product=${deleteData}`)
            closeDeleteModal()
            additionalData()
            toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }

    }


    const [productNewId, setId] = useState('')
    const [productQ, setQuantity] = useState()



    const [isEdit, setIsEdit] = useState({});
    const [editedQuantity, setEditedQuantity] = useState({});

    const editQuantity = (id, quantity) => {
        setIsEdit((prevIsEdit) => ({
            ...prevIsEdit,
            [id]: true,
        }));
        setId(id);
        setQuantity(quantity);
    };

    const handleQuantityChange = async (e) => {
        const value = e.target.value;
        if (!value.includes('+') && !value.includes('-')) {
            setEditedQuantity((prevEditedQuantity) => ({
                ...prevEditedQuantity,
                [productNewId]: value,
            }));
        };
    }
    const confirmQuantity = async () => {
        const payload = {
            product: productNewId,
            quantity: editedQuantity[productNewId] || productQ,
        };

        try {
            const response = await axios.post(`${cartCount}/${cartId}`, payload);
            setIsEdit((prevIsEdit) => ({
                ...prevIsEdit,
                [productNewId]: false,
            }));
            additionalData();
            toast.success(response?.data?.msg);
        } catch (error) {
        }
    };

    const closeInput = () => {
        setIsEdit(false)
    }



    const [newQuantity, setNewQuantity] = useState('')
    const [newId, setNewId] = useState('')

    const handleQuantityChangeNew = (e, id) => {
        const value = e.target.value;
        setNewQuantity(value)
        setNewId(id)
    }

    const confirmQuantityNew = async () => {
        const payload = {
            product: newId,
            quantity: newQuantity,
        };

        try {
            const response = await axios.post(`${cartCount}/${cartId}`, payload);
            additionalData();
            toast.success(response?.data?.msg);
        } catch (error) {
        }
    };
    return (
        <>

            <Navbar />

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
                            {numberOfItem ? (
                                <div className='mt-5'>
                                    <h1>My Cart</h1>
                                    <h5 className='mb-4 text-secondary'><span>{numberOfItem}</span> item</h5>

                                    <Row>
                                        <Col sm={12} lg={8}>
                                            <Card style={{ border: 'none' }}>
                                                <h5 style={{ backgroundColor: 'rgb(237, 237, 237)' }} className='p-3 cart-title m-0'>All Jobs - {numberOfItem} items</h5>
                                                {dataa?.products?.map((eachItem, i) => (
                                                    <div key={i} className='cart-card  p-3'>
                                                        <div className='cart-left'>
                                                            <img
                                                                alt={`product image`}
                                                                src={eachItem?.file[0] || eachItem?.file}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </div>

                                                        <div className='cart-right'>
                                                            <div className='d-flex'>
                                                                <h5 className='mt-1'>{eachItem?.product?.name}</h5>
                                                                <span className='ms-2' style={{ cursor: 'pointer', color: '#e6703a' }} onClick={() => navToProductView(eachItem?.product?._id)}><ExternalLink /></span>
                                                            </div>

                                                            <div className='d-flex justify-content-between'>
                                                                {isEdit[eachItem?._id] ? (
                                                                    <>
                                                                        <div className='mt-2'>
                                                                            <label className='text-dark'>Quantity </label>
                                                                            <input
                                                                                className='ms-2 editQuantityInput'
                                                                                name='editQuantity'
                                                                                value={editedQuantity[eachItem?._id] || productQ}
                                                                                onChange={handleQuantityChange}
                                                                                placeholder='Enter Your Quantity'
                                                                                type="number"
                                                                                pattern="[0-9]+"
                                                                                title="Please enter only digits (0-9)"
                                                                            />

                                                                            <span className='ms-2' style={{ cursor: 'pointer', color: 'green' }} onClick={confirmQuantity}><Check /></span>
                                                                            <span className='text-danger ms-2' style={{ cursor: 'pointer' }} onClick={closeInput}><X /></span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <p className='mt-2 cart-quantity'>
                                                                        Quantity: <span className='text-dark'>{eachItem?.quantity}</span>
                                                                        <span style={{ color: '#e6703a', cursor: 'pointer' }} onClick={() => editQuantity(eachItem?._id, eachItem?.quantity)}>
                                                                            <Edit3 />
                                                                        </span>
                                                                    </p>
                                                                )}
                                                                <span style={{ cursor: 'pointer' }} onClick={() => openDeleteModal(eachItem?._id)}><Trash /></span>
                                                            </div>
                                                            <div className='mt-2'>
                                                                <div className='accordion-header' style={{ cursor: 'pointer' }} onClick={() => toggleAccordion(eachItem?._id)}>
                                                                    <div className='d-flex justify-content-between pb-3'>
                                                                        <h6 className='mt-1 p-0'>Product Specifications</h6>
                                                                        <span className='m-0 p-0'><ChevronDown /></span>
                                                                    </div>
                                                                </div>
                                                                <Collapse isOpen={openAccordion === eachItem?._id}>
                                                                    <div className='accordion-body'>
                                                                        <div>
                                                                            {/* <p style={{ color: '#e6703a' }}>Edit Details</p> */}

                                                                            {eachItem?.field?.map((eachDetail, k) => (
                                                                                <div className='d-flex justify-content-between' key={k}>
                                                                                    <p className='text-secondary'><ChevronRight /> {eachDetail?.fieldType?.name}</p>
                                                                                    <p className='pe-5 text-dark' style={{ fontWeight: '500' }}>- {eachDetail?.option?.name}</p>
                                                                                </div>
                                                                            ))}

                                                                        </div>
                                                                    </div>
                                                                </Collapse>
                                                            </div>
                                                            <hr />
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fw-bold'>Item Total</p>
                                                                <p className='fw-bold'>{eachItem?.amount?.toLocaleString('en-IN', {
                                                                    maximumFractionDigits: 2,
                                                                    style: 'currency',
                                                                    currency: 'INR'
                                                                })}</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Card>
                                        </Col>
                                        <Col sm={12} lg={4}>
                                            <Card style={{ border: 'none' }} className='mt-4 mt-lg-0'>
                                                <div className='cart-summary p-3'>
                                                    <h5>Summary</h5>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='cart-summary-para'>Item Subtotal</p>
                                                        <p>{dataa?.totalAmount.toLocaleString('en-IN', {
                                                            maximumFractionDigits: 2,
                                                            style: 'currency',
                                                            currency: 'INR'
                                                        })}</p>
                                                    </div>
                                                    <hr className='p-0 m-0 mb-3' />
                                                    <div className='d-flex justify-content-between'>
                                                        <h6>Item Total (inclusive of all tax)</h6>
                                                        <h5 className='fw-bold ms-3'>{dataa?.totalAmount.toLocaleString('en-IN', {
                                                            maximumFractionDigits: 2,
                                                            style: 'currency',
                                                            currency: 'INR'
                                                        })}</h5>
                                                    </div>
                                                </div>
                                                <div className='cart-summary-voucher p-4 mb-3'>
                                                    <p className='cart-summary-para p-0 m-0'><Tag /> Vouchers are now moved to checkout</p>
                                                </div>
                                                <button className='order-now-btn' onClick={orderNowFunc}>

                                                    Continue to Checkout

                                                </button>
                                            </Card>
                                        </Col>
                                    </Row>



                                    <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
                                        <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Item?</ModalBody>
                                        <div style={{ justifyContent: 'center' }} className="modal-footer">
                                            <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={handleConfirmDelete} >
                                                Confirm
                                            </Button>
                                            <Button color="secondary" onClick={closeDeleteModal} >
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
                                    <h4 className='text-center m-0 p-0 cart-empty-para'>This is embarrassing!<br />Your cart is empty at the moment.</h4>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Link to='/products'>
                                            <button className='success-modal-btn'>Continue Shopping <ArrowRight size={17} /></button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </>)

                }

            </div >

            <FooterSection />

        </>
    )
}

export default MyCartIndex
