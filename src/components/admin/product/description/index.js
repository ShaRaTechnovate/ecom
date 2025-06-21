import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbar'
import FooterSection from '../../../footer'
import { ArrowLeft, Edit3, X } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom';
import { product, productDescription } from '../../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Col, Modal, ModalBody, Row } from 'reactstrap';
import AddDescription from './AddDescription';

function DescriptionIndex() {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { id } = useParams()
    const [descriptionData, setDescriptionData] = useState([])
    const [addModal, setModal] = useState(false);
    const toggleAdd = () => setModal(!addModal);
    const [editData, setEditData] = useState()
    const [editModal, setModalEdit] = useState(false);
    const toggleAddEdit = () => setModalEdit(!editModal);
    const [deleteData, setDeleteData] = useState();
    const [deleteModal, setDeleteModal] = useState(false);


    const descriptionDataApi = async () => {
        try {
            const response = await axios.get(`${product}/${id}`)
            setDescriptionData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const removeDescription = async (desId) => {
        try {
            const response = await axios.delete(`${productDescription}/${id}?description_id=${desId}`)
            descriptionDataApi()
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
        descriptionDataApi()
    }, [])

    const truncateTitle = (title) => {
        return title.length > 40 ? `${title.slice(0, 40)}...` : title;
    };

    return (
        <div>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/product')}><ArrowLeft /><p>Back ProductPage</p> </div>
                <div className='d-flex justify-content-between'>
                    <h1>Product Description <span style={{ fontSize: '24px', color: 'gray' }}></span></h1>
                    <div style={{ marginLeft: 'auto' }}>
                        <button className='productCategoryBtn mt-1' onClick={() => setModal(true)} >Add Description</button>
                    </div>
                </div>
                <div className='mt-4' style={{ height: '500px' }}>
                    <Row>
                        {descriptionData?.description?.map((item, i) => (
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


            <AddDescription modal={addModal} toggle={toggleAdd} descriptionDataApi={descriptionDataApi} />
            <AddDescription modal={editModal} toggle={toggleAddEdit} descriptionDataApi={descriptionDataApi} isEdit={true} editData={editData} />

            <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
                <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Description?</ModalBody>
                <div style={{ justifyContent: 'center' }} className="modal-footer">
                    <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={removeDescription} >
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={closeDeleteModal} >
                        Cancel
                    </Button>
                </div>
            </Modal>

            <FooterSection />
        </div>
    )
}

export default DescriptionIndex