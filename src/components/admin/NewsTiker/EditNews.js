import { news, productDropdown } from '../../../ApiConfigs/ApiConfig';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, Row, Spinner } from 'reactstrap';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import * as yup from 'yup';
import axios from 'axios';
import { Trash2, Upload, X } from 'react-feather';
import { uploadImage } from '../upload';

function EditNews({ open, handleEdit, editData, newsData }) {
    const [getData, setGetData] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const inputRef = useRef(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [loader, setLoader] = useState(false)
    const [image, setImage] = useState(null)


    const formSchema = yup.object().shape({
        title: yup.string().required('Please Enter News Ticker Title '),
        description: yup.string().required('Please Enter News Ticker Description'),

    });

    const { reset, control, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    });


    const getProduct = async () => {
        try {
            const response = await axios.get(productDropdown);
            setProductCat(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getProduct()
    }, []);


    const onSubmit = async (data) => {
        try {
            const payload = {
                title: data?.title,
                description: data?.description,
                icon: profileImageUrl,
                link_url: data?.link_url?.label

            };
            console.log('Payload:', payload);

            const response = await axios.put(`${news}/${editData._id}`, payload);
            handleEdit();
            newsData();

            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        if (editData) {
            setValue('title', editData?.title);
            setValue('description', editData?.description);
            setValue('link_url', { value: editData?.link_url, label: editData?.link_url }); // Setting both value and label
            setProfileImageUrl(editData?.icon || '');
            setImage(editData?.icon || '');
        }
    }, [editData, setValue]);


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
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setProfileImageUrl(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            } finally {
                setLoader(false)
            }
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setProfileImageUrl('');
    };


    return (
        <>
            <Modal
                isOpen={open}
                toggle={handleEdit}
                className="sidebar-lg"
                modalClassName="modal-slide-in sidebar-todo-modal"
                contentClassName="p-0"
            >
                <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                    <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>Edit News Ticker</h4>
                    <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={handleEdit} />
                </div>
                <ModalBody className="flex-grow-1">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-1 mt-3'>
                            <Label className='modal-label'>  News Ticker Title  <span style={{ color: 'red' }}>*</span></Label>
                            <Controller name='title'
                                id='title'
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input type="text"
                                    {...field}
                                    invalid={errors.title && true}
                                    placeholder="Enter News Ticker Title" />} />
                            {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                        </div>
                        <div className="mb-1">
                            <Label className="modal-label"> News Ticker Description <span style={{ color: 'red' }}>*</span></Label>
                            <Controller name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Input type="text"
                                        {...field} invalid={errors.description && true}
                                        placeholder="Enter News Ticker Description" />} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <div className='mb-1 mt-3'>
                            <Label className='modal-label'>Product <span style={{ color: 'red' }}>*</span></Label>
                            <Controller name='link_url'
                                id='link_url'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <Select
                                            isSearchable={false}
                                            {...field}
                                            options={productCat}
                                        />
                                        {errors.link_url && <FormFeedback>{errors.link_url.value.message}</FormFeedback>}
                                    </>
                                )}
                            />
                        </div>
                        <Label className='modal-label'>Icon <span style={{ color: 'red' }}>*</span> </Label>
                        <div className="mb-5 mt-2 ">
                            <Controller
                                name='icon'
                                id='icon'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <div>
                                        <div className="d-flex" style={{ cursor: 'pointer' }}>
                                            <input style={{ display: 'none' }} id="image" type="file" {...field} ref={inputRef} onChange={handleProfileUpload} />
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
                                                    <span className='ms-1'>{image ? 'Change Icon' : 'Upload Icon'}</span>
                                                </Button>

                                            }

                                            {image && (
                                                <div className="image-close ms-1"
                                                    style={{ cursor: 'pointer', color: "#AF1B1B" }}
                                                    onClick={handleRemoveImage}>
                                                    <X />
                                                </div>
                                            )}

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
                                                            {/* <X /> */}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <hr />
                        <button className="mt-1 add-modal-btn" type="submit">Submit</button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default EditNews
