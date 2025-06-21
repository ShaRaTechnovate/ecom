import React, { useEffect, useRef, useState } from 'react';
import { categoryDropdown, menuProduct, menuProductAd, productDropdown } from '../../../ApiConfigs/ApiConfig';
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, Row, Spinner } from 'reactstrap';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import * as yup from 'yup';
import axios from 'axios';
import { Trash2, Upload, X } from 'react-feather';
import './menu.css';
import { uploadImage } from '../upload';

function AddCombo({ open, handleAdd, menuData }) {
    const [getData, setGetData] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [image, setImage] = useState(null)
    const [loader, setLoader] = useState(false)
    const inputRef = useRef(null);

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter Menu Name'),
        description: yup.string().required('Please Enter Your Description'),
    });

    const { reset, control, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    });

    const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
        control,
        name: 'category'
    });

    const getProductcat = async () => {
        try {
            const response = await axios.get(categoryDropdown);
            setGetData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };


    // console.log(getData);

    const getProduct = async () => {
        try {
            const response = await axios.get(productDropdown);
            setProductCat(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    console.log('dropdown', productCat);
    const handleProfileUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                setLoader(true)
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await uploadImage(formData);
                if (uploadData && uploadData?.result && uploadData?.result?.length) {
                    setProfileImageUrl(uploadData.result[0].location);

                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            } finally {
                setLoader(false)
            }
        }
    };

    useEffect(() => {
        getProduct()
        getProductcat()
    }, []);

    const onSubmit = async (data) => {

        // const payload = {
        //     name: data?.name,
        //     description: data?.description,
        //     image: profileImageUrl,
        //     category: productFields?.map((field) => ({
        //         productCategory: field?.productCategory?.value,
        //         products: field?.productName?.map((product) =>
        //             product.value
        //         )
        //     }))
        // };

        const payload = {
            name: data?.name,
            description: data?.description,
            image: profileImageUrl,
            category: data.category?.map((field) => ({
                productCategory: field?.productCategory?.value,
                products: Array.isArray(field.productName) ? field.productName.map((product) => product.value) : []
            }))
        };
        console.log('Payload:', payload);
        try {

            const image = profileImageUrl;
            const response = await axios.post(menuProductAd, payload);
            handleAdd();
            menuData();
            reset({
                name: '',
                description: '',

            });
            setProfileImageUrl('')
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        if (!open) {
            reset({
                name: '',
                description: '',
                image: ''
            });
            setProfileImageUrl('');
            setImage(null);
        }
    }, [open, reset]);

    return (
        <>
            <Modal
                isOpen={open}
                toggle={handleAdd}
                className="sidebar-lg"
                modalClassName="modal-slide-in sidebar-todo-modal"
                contentClassName="p-0"
            >
                <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                    <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>Add Menu Product</h4>
                    <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={handleAdd} />
                </div>
                <ModalBody className="flex-grow-1">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-1 mt-3'>
                            <Label className='modal-label'>Menu Name <span style={{ color: 'red' }}>*</span></Label>
                            <Controller name='name'
                                id='name'
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input type="text"
                                    {...field}
                                    invalid={errors.name && true}
                                    placeholder="Enter Menu Name" />} />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </div>
                        <div className="mb-1">
                            <Label className="modal-label"> Description <span style={{ color: 'red' }}>*</span></Label>
                            <Controller name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Input type="text"
                                        {...field} invalid={errors.description && true}
                                        placeholder="Enter Your Description" />} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <Label className='modal-label'>Menu Combo Image <span style={{ color: 'red' }}>*</span></Label>
                        <div className="mb-5 mt-2 ">
                            <Controller
                                name='image'
                                id='image'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <div>
                                        <div className="d-flex" style={{ cursor: 'pointer' }}>
                                            <input style={{ display: 'none' }} id="image" type="file" {...field} invalid={errors.image && true} ref={inputRef} onChange={handleProfileUpload} />
                                            {loader ?
                                                <Spinner />
                                                :
                                                <Button
                                                    style={{ backgroundColor: '#E4510B', border: 'none' }}
                                                    color="primary"
                                                    onClick={() => {
                                                        inputRef?.current?.click();
                                                    }}
                                                >
                                                    <Upload size={15} />
                                                    <span className='ms-1'>Upload Image</span>
                                                </Button>

                                            }

                                            {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                        </div>
                                        {profileImageUrl && (
                                            <div className="mt-2 d-flex">
                                                {image && (
                                                    <>
                                                        <img
                                                            alt="preview image"
                                                            src={profileImageUrl}
                                                            style={{ width: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                                                        />
                                                        <div className="image-close ms-1"
                                                            style={{ cursor: 'pointer', color: "#AF1B1B" }}
                                                            onClick={() => setImage(null)}>
                                                            <X />
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        {productFields.map((field, index) => (
                            <Row key={field.id}>
                                <Col lg={5} sm={10}>
                                    <div className='mb-3'>
                                        <Label><div className='d-flex'>Product Category</div></Label>
                                        <Controller
                                            name={`category[${index}].productCategory`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    className='dropProduct'
                                                    isSearchable={false}
                                                    {...field}
                                                    options={getData}
                                                />
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col lg={5} sm={10}>
                                    <div className='mb-3'>
                                        <Label><div className='d-flex'>Product</div></Label>
                                        <Controller
                                            name={`category[${index}].productName`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    className='dropProduct'
                                                    isSearchable={false}
                                                    isMulti
                                                    {...field}
                                                    options={productCat}
                                                />
                                            )}
                                        />
                                    </div>
                                </Col>
                                <Col lg={2} sm={2} md={2}>
                                    <div className='mt-0 mb-5 pt-0 mt-lg-4 mb-lg-3 pt-lg-3' style={{ cursor: 'pointer', color: "#AF1B1B" }} onClick={() => removeProduct(index)}>
                                        <Trash2 />
                                    </div>
                                </Col>
                                {/* <Col lg={2} sm={2} md={2}>
                                    <div className="mt-1">
                                        <button className="add-modal-btn" type="button" onClick={() => appendProduct({ productCategory: '', productName: '' })}>
                                            <span style={{ marginRight: '5px', width: "50%" }}>+</span> Add Product
                                        </button>
                                    </div>
                                </Col> */}

                            </Row>
                        ))}

                        <div className="mt-1">
                            <button style={{ width: "50%", marginTop: "5%" }} className="add-modal-btn" type="button" onClick={() => appendProduct({ productCategory: '', productName: '' })}>
                                <span style={{ marginRight: '5px', width: "50%" }}>+</span> Add Combo
                            </button>
                        </div>
                        <hr />
                        {/* <div className="mt-1 add-modal-btn" type="button" onClick={() => appendProduct({ productCategory: '', productName: '' })}></div> */}
                        <button className="mt-1 add-modal-btn" type="submit">Submit</button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AddCombo;

