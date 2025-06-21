import React, { useEffect, useState } from 'react'
import { X } from 'react-feather'
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Form, FormFeedback, Input, Label, Modal, ModalBody } from 'reactstrap'
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { getOfferProduct, productCategory, product } from '../../../../ApiConfigs/ApiConfig';

function OfferProductEdit({ open, handleEdit, editData, offerData }) {


    const [getData, setGetData] = useState([]);
    const [productCat, setProductCat] = useState("");
    const [getProductData, setGetProductData] = useState();
    const [selectedProduct, setSelectedProduct] = useState('');

    const formSchema = yup.object().shape({
        // product: yup.string().required('Please Enter Product Name'),
        description: yup.string().required('Please Enter Your Description'),
        offerPercentage: yup.string().required('Please Enter Your Offer Percentage'),
    });

    const {
        reset,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            productCategory: editData?.productCategory?.name || "",
            product: editData?.product?.name || "",
            description: editData?.description || "",
            offerPercentage: editData?.offerPercentage || "",
        }
    });

    const getproductCategory = async () => {
        try {
            const response = await axios.get(productCategory);
            setGetData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const getProduct = async (id) => {
        try {
            const response = await axios.get(`${product}?productCategory=${id}`);
            setGetProductData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
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
        const productId = selectedProduct;
        // data.product = productId;
        try {
            const response = await axios.put(`${getOfferProduct}/${editData._id}`, { ...data });
            handleEdit();
            offerData();
            setGetData();
            toast.success(response?.data?.result?.msg);
            reset();
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getproductCategory();
    }, []);

    useEffect(() => {
        reset({
            productCategory: { label: editData?.product?.productCategory?.name, value: editData?.productCategory?._id },
            product: { label: editData?.product?.name, value: editData?.product?._id },
            description: editData?.description,
            offerPercentage: editData?.offerPercentage,
        });
        if (editData?.productCategory?._id) {
            getProduct(editData?.productCategory?._id);
        }
    }, [editData, reset, setValue]);

    useEffect(() => {
        getProduct(productCat)
    }, [productCat])

    return (
        <div className='modal-page'>
            <Modal
                isOpen={open}
                toggle={handleEdit}
                className='sidebar-lg'
                modalClassName='modal-slide-in sidebar-todo-modal'
                contentClassName='p-0'>
                <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                    <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>
                        Edit Offer Product
                    </h4>
                    <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={handleEdit} />
                </div>
                <ModalBody className='flex-grow-1'>
                    <Form onSubmit={handleSubmit(submitForm)}>

                        <div className="mb-1 mt-3">
                            <Label className="modal-label">Product Category Name</Label>
                            <Controller
                                name='productCategory'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        type="select"
                                        options={getOptions}
                                        defaultValue=""
                                        onChange={(e) => setProductCat(e.value)}
                                    />
                                )}
                            />

                        </div>
                        <div className="mb-1 mt-3">
                            <Label className="modal-label">Product Name</Label>
                            <Controller
                                name='product'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        type="select"
                                        options={getProductOptions}
                                        defaultValue=""
                                        onChange={(e) => setSelectedProduct(e.value)}
                                    />
                                )}
                            />
                        </div>

                        <div className='mb-1'>
                            <Label className='modal-label'>Offer Product Description</Label>
                            <Controller
                                name='description'
                                id='description'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.description && true} placeholder="Enter Your Description" />)} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <div className='mb-1'>
                            <Label className='modal-label'>Offer Percentage</Label>
                            <Controller
                                name='offerPercentage'
                                id='offerPercentage'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.offerPercentage && true} placeholder="Enter Your Percentage" />)} />
                            {errors.offerPercentage && <FormFeedback>{errors.offerPercentage.message}</FormFeedback>}
                        </div>
                        <hr></hr>
                        <button className='mt-1 add-modal-btn' type='submit'>Submit</button>
                    </Form >
                </ModalBody>

            </Modal>
        </div >
    )
}

export default OfferProductEdit;
