import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbar'
import FooterSection from '../../../footer'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import { product, productFAQ } from '../../../../ApiConfigs/ApiConfig'
import './index.css'
import { ArrowLeft, Edit, Edit3, X } from 'react-feather'
import AddFaq from './AddFaq'
import { Button, Col, Modal, ModalBody, Row } from 'reactstrap'

function FqaIndex() {
    const { id } = useParams()
    const [faqData, setFaqData] = useState([])
    const [editData, setEditData] = useState()
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [addModal, setModal] = useState(false);
    const toggleAdd = () => setModal(!addModal);
    const [editModal, setModalEdit] = useState(false);
    const toggleAddEdit = () => setModalEdit(!editModal);
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState();
    const [deleteModal, setDeleteModal] = useState(false);


    const faqDataApi = async () => {
        try {
            const response = await axios.get(`${product}/${id}`)
            setFaqData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const removeFaq = async (faqId) => {
        try {
            const response = await axios.delete(`${productFAQ}/${id}?faq_id=${faqId}`)
            faqDataApi()
            toast.success(response?.data?.msg);
            closeDeleteModal();
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
        }
    }


    const openDeleteModal = (id) => {
        setDeleteData(id);
        setDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }


    useEffect(() => {
        faqDataApi()
    }, [])

    const truncateTitle = (title) => {
        return title.length > 40 ? `${title.slice(0, 40)}...` : title;
    };

    console.log(faqData);

    return (
        <>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/product')}><ArrowLeft /><p>Back ProductPage</p> </div>
                <div className='d-flex justify-content-between'>
                    <h1>FAQ <span style={{ fontSize: '24px', color: 'gray' }}>({faqData?.name})</span></h1>
                    <div style={{ marginLeft: 'auto' }}>
                        <button className='productCategoryBtn mt-1' onClick={() => setModal(true)} >Add FAQ</button>
                    </div>
                </div>

                <div className='mt-4' style={{ height: '500px' }}>
                    <Row>
                        {faqData?.FAQ?.map((item, i) => (
                            <Col lg={6} md={6} sm={12}>
                                <div
                                    key={i}
                                    className='fqa-tab mb-2'
                                    onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
                                >
                                    <div className='d-flex justify-content-between '>
                                        <div>
                                            <h1 className='faq-title'>{truncateTitle(item?.title)}</h1>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='faq-edit'>
                                                <span onClick={() => {
                                                    setEditData(item)
                                                    setModalEdit(true)
                                                }}
                                                    className=' me-1 text-secondary'><Edit3 /></span>
                                            </div>
                                            <div className='faq-x'
                                                // onClick={() => removeFaq(item?._id)}
                                                onClick={() => openDeleteModal(item?._id)}

                                            >
                                                <span className='text-danger'><X /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`faq-content ${hoveredIndex === i ? 'open' : ''}`} >
                                        <hr style={{ margin: '0px', padding: '0px' }} />
                                        <div className='p-3'>
                                            <p className='faq-description'>{item?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

            </div>
            <AddFaq modal={addModal} toggle={toggleAdd} faqDataApi={faqDataApi} />
            <AddFaq modal={editModal} toggle={toggleAddEdit} faqDataApi={faqDataApi} isEdit={true} editData={editData} />

            <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
                <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this FAQ?</ModalBody>
                <div style={{ justifyContent: 'center' }} className="modal-footer">
                    <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={removeFaq} >
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={closeDeleteModal} >
                        Cancel
                    </Button>
                </div>
            </Modal>
            <FooterSection />
        </>
    )
}

export default FqaIndex
