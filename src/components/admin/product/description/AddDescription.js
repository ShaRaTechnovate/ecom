import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect } from 'react'
import { X } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Form, FormFeedback, Input, Label, Modal, ModalBody } from 'reactstrap';
import * as yup from "yup";
import { productDescription } from '../../../../ApiConfigs/ApiConfig';

function AddDescription({ modal, toggle, descriptionDataApi, editData, isEdit }) {

    const { id } = useParams()
    const formSchema = yup.object().shape({
        title: yup.string().required('Please Enter Product Description Title'),
        description: yup.string().required('Please Enter Product Description'),

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
                const response = await axios.put(`${productDescription}/${id}?description_id=${editData?._id}`, data)
                toggle()
                descriptionDataApi()
                toast.success(response?.data?.msg)
                reset({ title: '', description: '' })
            } catch (error) {
                toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
            }
        } else {
            try {
                const response = await axios.post(`${productDescription}/${id}`, data)
                toggle()
                descriptionDataApi()
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
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                    <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>
                        {isEdit ? 'Edit Product Description' : 'Add Product Description'}
                    </h4>
                    <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={toggle} />
                </div>
                <ModalBody className='flex-grow-1'>
                    <Form
                        onSubmit={handleSubmit(submitForm)}
                    >

                        <div className='mb-1'>
                            <Label className='modal-label'>Product Description Title <span className='text-danger'>*</span> </Label>
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
                                        placeholder="Enter Product Description Title"

                                    />
                                )}
                            />
                            {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                        </div>
                        <div className='mb-1'>
                            <Label className='modal-label'>Product Description  <span style={{ color: 'red' }}>*</span></Label>
                            <Controller
                                name='description'
                                id='description'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.description && true} placeholder="Enter Product Description" />)} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <hr></hr>
                        <button className='mt-1 add-modal-btn' type='submit'>Submit</button>
                    </Form >
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddDescription