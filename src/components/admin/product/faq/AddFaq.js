import React, { useEffect } from 'react'
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, Spinner } from 'reactstrap';
import { Upload, X } from 'react-feather'
import { productFAQ } from '../../../../ApiConfigs/ApiConfig';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddFaq({ modal, toggle, faqDataApi, editData, isEdit }) {

    const { id } = useParams()
    const formSchema = yup.object().shape({
        title: yup.string().required('Please Enter FAQ title'),
        description: yup.string().required('Please Enter FAQ description'),

    })
    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const submitForm = async (data) => {
        console.log(data);
        if (isEdit) {
            try {
                const response = await axios.put(`${productFAQ}/${id}?faq_id=${editData?._id}`, data)
                toggle()
                faqDataApi()
                toast.success(response?.data?.msg)
                reset({ title: '', description: '' })
            } catch (error) {
                toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
            }
        } else {
            try {
                const response = await axios.post(`${productFAQ}/${id}`, data)
                toggle()
                faqDataApi()
                toast.success(response?.data?.msg)
                reset({ title: '', description: '' })
            } catch (error) {
                toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
            }
        }
    }

    useEffect(() => {
        if (editData) {
            setValue('title', editData?.title)
            setValue('description', editData?.description)
        }
    }, [editData])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>
                    {isEdit ? 'Edit FAQ' : 'Add FAQ'}
                </h4>
                <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={toggle} />
            </div>
            <ModalBody className='flex-grow-1'>
                <Form
                    onSubmit={handleSubmit(submitForm)}
                >

                    <div className='mb-1'>
                        <Label className='modal-label'>FAQ Title <span className='text-danger'>*</span> </Label>
                        <Controller
                            name='title'
                            id='title'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    {...field}
                                    invalid={errors.title && true}
                                    placeholder="Enter FAQ Title"

                                />
                            )}
                        />
                        {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                    </div>
                    <div className='mb-1'>
                        <Label className='modal-label'>FAQ Description  <span style={{ color: 'red' }}>*</span></Label>
                        <Controller
                            name='description'
                            id='description'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (<Input type="text" {...field} invalid={errors.description && true} placeholder="Enter FAQ Description" />)} />
                        {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                    </div>
                    {/* <div className="mb-5 mt-3">
                        <Label className='modal-label'>Field Type Image</Label>
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
                                                        src={image}
                                                        style={{ width: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                                                    />
                                                    <div className="image-close ms-1" style={{ cursor: 'pointer', color: "#AF1B1B" }} onClick={() => setImage(null)}>
                                                        <X />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                    )}
                                </div>
                            )}
                        />
                    </div> */}
                    {/* <div style={{ width: "380px", marginTop: "-8%" }}>
                        <p style={{ color: '#06377E', fontSize: '13px' }}>*Upload Your Image Height 343px and width 512px</p>
                    </div> */}
                    <hr></hr>
                    <button className='mt-1 add-modal-btn' type='submit'>Submit</button>
                </Form >
            </ModalBody>
        </Modal>
    )
}

export default AddFaq
