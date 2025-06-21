import React, { useEffect, useRef, useState } from 'react';
import { X } from 'react-feather';
import * as yup from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Form, FormFeedback, Input, Label, Modal, ModalBody } from 'reactstrap';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import './index.css';
import { getOfferProduct, productCategory, product } from '../../../../ApiConfigs/ApiConfig';


function OfferProductAdd({ open, handleAdd, offerData }) {
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [getProductData, setGetProductData] = useState([]);
    const [getData, setGetData] = useState([]);
    const [productCat, setProductCat] = useState("")
    const [selectedProduct, setSelectedProduct] = useState('')

    const formSchema = yup.object().shape({
        description: yup.string().required('Please Enter Your Offer Product Description'),
        offerPercentage: yup.string().required('Please Enter Your  Percentage'),
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const selectedProductCategory = useWatch({
        control,
        name: 'productCategory',
    });

    const handleReset = () => {
        reset({
            description: '',
            productCategory: '',
            product: '',
            offerPercentage: '',
        });
        setProfileImageUrl('');
        setProductCat('')
        setSelectedProduct('')
    };

    const getproductCategory = async () => {
        try {
            const response = await axios.get(productCategory);
            setGetData(response?.data?.result);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const getProduct = async (id) => {
        try {
            const response = await axios.get(`${product}?productCategory=${id}`);
            setGetProductData(response?.data?.result);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const getOptions = getData?.map((item) => ({
        label: item?.name,
        value: item?._id,
    }));

    const getProductOptions = getProductData?.map((item) => ({
        label: item?.name,
        value: item?._id,
    }));

    const submitForm = async (data) => {
        const payload = {
            ...data,
            product: selectedProduct,
            productCategory: productCat
        }
        try {
            const response = await axios.post(getOfferProduct, payload);
            handleAdd();
            offerData();
            handleReset();
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getproductCategory();
    }, []);

    useEffect(() => {
        getProduct(productCat)
    }, [productCat])

    return (
        <div className="modal-page">
            <Modal
                isOpen={open}
                toggle={handleAdd}
                className="sidebar-lg"
                modalClassName="modal-slide-in sidebar-todo-modal"
                contentClassName="p-0"
            >
                <div
                    className="d-flex align-items-center justify-content-between mb-1 px-1"
                    style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}
                >
                    <h4
                        className="modal-title"
                        style={{
                            marginTop: '23px',
                            marginBottom: '23px',
                            paddingLeft: '10px',
                            fontFamily: 'roboto',
                            color: 'white',
                        }}
                    >
                        Add Offer Product
                    </h4>
                    <X
                        style={{ color: 'white', cursor: 'pointer' }}
                        className="addmodal-close fw-normal mt-25 me-2"
                        size={25}
                        onClick={handleAdd}
                    />
                </div>
                <ModalBody className="flex-grow-1">
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-1 mt-3">
                            <Label className="modal-label">Product Category Name <span style={{ color: 'red' }}>*</span></Label>

                            <Select
                                type="select"
                                options={getOptions}
                                onChange={(e) => setProductCat(e.value)}
                            />
                        </div>
                        {productCat && (
                            <div className="mb-1 mt-3">
                                <Label className="modal-label">Product Name</Label>
                                <Select
                                    type="select"
                                    options={getProductOptions}
                                    onChange={(e) => setSelectedProduct(e.value)}
                                />
                            </div>
                        )}
                        {!productCat && (
                            <div className="mb-1 mt-3">
                                <Label className="modal-label">Product Name</Label>
                                <Select
                                    type="select"
                                    options={[]}
                                    onChange={() => setSelectedProduct('')}
                                />
                            </div>
                        )}



                        <div className="mb-1">
                            <Label className="modal-label">Offer Product Description <span style={{ color: 'red' }}>*</span></Label>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.description && true}
                                        placeholder="Enter Your Offer Product Description"
                                    />
                                )}
                            />
                            {errors.description && (
                                <FormFeedback>{errors.description.message}</FormFeedback>
                            )}
                        </div>
                        <div className="mb-1">
                            <Label className="modal-label">Offer Percentage <span style={{ color: 'red' }}>*</span></Label>
                            <Controller
                                name="offerPercentage"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        {...field}
                                        invalid={errors.offerPercentage && true}
                                        placeholder="Enter Your Offer Percentage"
                                    />
                                )}
                            />
                            {errors.offerPercentage && (
                                <FormFeedback>{errors.offerPercentage.message}</FormFeedback>
                            )}
                        </div>
                        <hr />
                        <button className="mt-1 add-modal-btn" type="submit">
                            Submit
                        </button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default OfferProductAdd;
