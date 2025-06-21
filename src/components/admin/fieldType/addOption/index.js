import React, { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'react-feather'
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, Spinner } from 'reactstrap'
import { toast } from 'react-hot-toast';
import { uploadImage } from '../../upload';
import { fieldOptionApi, fieldTypeApiNew, } from '../../../../ApiConfigs/ApiConfig';


function FieldOptionsModal({ modal, toggle, editData, additionalData, fieldId }) {
    const inputRef = useRef(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [loader, setLoader] = useState(false)
    const [image, setImage] = useState(null);


    const [data, setData] = useState([])

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter Field Option Name'),

    })
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: editData?.fieldType || "",
        }
    });

    const handleRest = () => {
        reset({
            description: "",
            name: "",
            image: "",
        },
            setProfileImageUrl('')
        )
    }
    const submitForm = async (data) => {
        delete data.image
        const image = profileImageUrl
        const fieldType = fieldId
        try {
            const response = await axios.post(fieldOptionApi, { ...data, image, fieldType })
            toggle()
            toast.success(response?.data?.msg)
            additionalData()
            handleRest()
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
        }
    }

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

    const getFieldOption = async () => {
        try {
            const response = await axios.get(fieldTypeApiNew)
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }



    const options = data?.map((item) => (
        {
            label: item?.fieldType,
            value: item?._id
        }
    ))

    useEffect(() => {
        getFieldOption()
    }, [])

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle}>

                <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>
                    <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>
                        Add Field Option
                    </h4>
                    <X style={{ color: 'white', cursor: 'pointer' }} className="addmodal-close fw-normal mt-25 me-2" size={25} onClick={toggle} />
                </div>
                <ModalBody className='flex-grow-1'>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <div className='mb-1 mt-3'>
                            <Label className='modal-label'>Field Option Name <span className='text-danger'>*</span></Label>
                            <Controller
                                name='name'
                                id='name'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.name && true} placeholder="Enter Field Option Name"

                                />)} />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </div>

                        <div className='mb-1'>
                            <Label className='modal-label'>Field Option Description</Label>
                            <Controller
                                name='description'
                                id='description'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (<Input type="text" {...field} invalid={errors.description && true} placeholder="Enter Your Description" />)} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <div className="mb-5 mt-3">
                            <Label className='modal-label'>Field Option Image</Label>
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
                                                    <span className='ms-1'>  Upload Image</span>
                                                </Button>

                                            }

                                            {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                        </div>
                                        {profileImageUrl && (
                                            <div className="mt-2 d-flex">
                                                {image && (
                                                    <>
                                                        <img
                                                            src={profileImageUrl}
                                                            alt="Preview Image"
                                                            style={{ maxWidth: '200px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
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
                        </div>
                        <hr></hr>

                        <button className='mt-1 add-modal-btn' type='submit'>Submit</button>
                    </Form >
                </ModalBody>

            </Modal>

        </div>
    );
}

export default FieldOptionsModal;