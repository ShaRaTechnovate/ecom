import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button, FormFeedback, Form, Input, Label, Row, Col, Spinner, Card, Collapse, CardBody, CardHeader } from 'reactstrap';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, MinusCircle, PlusCircle, Trash2, X } from 'react-feather';
import { product, productCategory, productApi, productFAQ } from '../../../../ApiConfigs/ApiConfig';
import { multiImageUpload, uploadImage } from '../../upload/index';
import { fieldTypeApiNew } from '../../../../ApiConfigs/ApiConfig';
import Navbar from '../../../navbar';
import FooterSection from '../../../footer';
import { useNavigate, useParams } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';

function EditProductIndex({ faq }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [getEditData, setGetEditData] = useState([])
    const [getData, setGetData] = useState([])
    const [fieldTypeData, setFieldTypeData] = useState([])
    const inputRef = useRef(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const imageRef = useRef(null);
    const [imageUpload, setImageUpload] = useState([])
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [profileImages, setProfileImages] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileImages, setProfileImages] = useState([]);


    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const inputRef1 = useRef(null);

    const formSchema = yup.object().shape({
        // productName: yup.mixed().required('Please Enter Your productCategory '),
        name: yup.string().required('Please Enter Your productName'),
        fullDescription: yup.string().required('Please Enter Your fullDescription'),
        // shortDescription: yup.string().required('Please Enter Your shortDescription'),
    })

    const {
        reset,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });




    // console.log(faq);


    const submitForm = async (data) => {
        delete data?.img_url
        delete data?.galleryImages

        const payload = {
            ...data,
            galleryImages: profileImages,
            image: profileImageUrl,
        };

        try {
            const response = await axios.put(`${productApi}/${getEditData._id}`, payload)
            navigate('/admin/product')
            toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
        }

    }

    const removeImage = () => {
        setImage(null);
    };
    const handleImageUpload = async (e) => {
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




    const handleRemoveImage = (index) => {
        const updatedImages = [...profileImages];
        updatedImages.splice(index, 1);
        setProfileImages(updatedImages);
        setSelectedImageIndex(null);
    };

    const handleProfileUpload = async (e) => {
        if (e.target.files) {
            try {
                setLoading(true);
                const formData = new FormData();

                for (let i = 0; i < e.target.files.length; i++) {
                    formData.append('files', e.target.files[i]);
                }

                const uploadData = await multiImageUpload(formData);

                if (uploadData && uploadData.result && uploadData.result.length) {
                    const uploadedImages = uploadData.result.map(file => file.location);

                    setProfileImages(prevImages => [...prevImages, ...uploadedImages]);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            } finally {
                setLoading(false);
            }
        }
    };


    const getProduct = async () => {
        try {
            const response = await axios.get(productCategory)
            setGetData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const getFieldType = async (id) => {
        try {
            const response = await axios.get(fieldTypeApiNew)
            setFieldTypeData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const editData = async () => {
        try {
            const response = await axios.get(`${product}/${id}`)
            setGetEditData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getProduct()
        editData()
        getFieldType()
    }, [])


    useEffect(() => {
        if (getEditData) {
            reset({
                name: getEditData?.name,
                fullDescription: getEditData?.fullDescription,
                shortDescription: getEditData?.shortDescription,
                product_url: getEditData?.product_url,
                productOverview: getEditData?.productOverview?.map(item => ({ description: item.description })),
            });

            // Check if galleryImages is not undefined before setting profileImages
            setProfileImages(getEditData?.galleryImages || []);
            setImageUpload(getEditData?.image);
            setProfileImageUrl(getEditData?.image);
            setImage(getEditData?.image);
        }
    }, [getEditData]);



    return (
        <>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%', }}>
                <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/product')}><ArrowLeft /><p>Back ProductPage</p> </div>
                <h1 className='text-center pb-5'>Edit Product</h1>
                <Form onSubmit={handleSubmit(submitForm)}>

                    <Row >
                        <Col sm={4} md={6}>
                            <div className='mb-2'>
                                <Label>Product Name</Label>
                                <Controller
                                    name='name'
                                    id='name'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (<Input type="text" {...field} invalid={errors.name && true} placeholder="Enter Name" />)} />
                                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                            </div>
                        </Col>

                        <Col sm={6} md={6}>
                            <div className='mb-2'>
                                <Label>Full Description</Label>
                                <Controller
                                    name='fullDescription'
                                    id='fullDescription'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (<Input type="text" rows={5} cols={60} {...field} invalid={errors.fullDescription && true} placeholder="Enter fullDescription" />)} />
                                {errors.fullDescription && <FormFeedback>{errors.fullDescription.message}</FormFeedback>}
                            </div>
                        </Col>
                        {/* <Col sm={6} md={6}>
                            <div className='mb-2'>
                                <Label>Short Description</Label>
                                <Controller
                                    name='shortDescription'
                                    id='shortDescription'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (<Input type="text" rows={5} cols={60} {...field} invalid={errors.shortDescription && true} placeholder="Enter shortDescription" />)} />
                                {errors.shortDescription && <FormFeedback>{errors.shortDescription.message}</FormFeedback>}
                            </div>
                        </Col> */}
                        <Col sm={6} md={6}>
                            <div className='mb-2'>
                                <Label>Product URL</Label>
                                <Controller
                                    name='product_url'
                                    id='product_url'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (<Input type="text" rows={5} cols={60} {...field} invalid={errors.product_url && true} placeholder="Enter Product URL" />)} />
                                {errors.product_url && <FormFeedback>{errors.product_url.message}</FormFeedback>}
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <div className='mb-1'>
                                <Label>Product Overview</Label>
                                <Controller
                                    name='productOverview'
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <div>
                                            {field.value.map((item, index) => (
                                                <div key={index} className='mb-2 d-flex'>
                                                    <Input
                                                        type='text'
                                                        name={`productOverview[${index}].description`}
                                                        value={field.value[index]?.description || ''}
                                                        invalid={errors.productOverview && errors.productOverview[index] && errors.productOverview[index].description && true}
                                                        placeholder={`Enter description ${index + 1}`}
                                                        onChange={(e) => {
                                                            const updatedValues = [...field.value];
                                                            updatedValues[index] = { description: e.target.value };
                                                            field.onChange(updatedValues);
                                                        }}
                                                    />
                                                    {errors.productOverview && errors.productOverview[index] && errors.productOverview[index].description && (
                                                        <FormFeedback>{errors.productOverview[index].description.message}</FormFeedback>
                                                    )}
                                                    <div
                                                        className='ms-2 mt-2 text-danger'
                                                        size='sm'
                                                        onClick={() => {
                                                            const updatedValues = [...field.value];
                                                            updatedValues.splice(index, 1);
                                                            field.onChange(updatedValues);
                                                        }}
                                                    >
                                                        <Trash2 />
                                                    </div>
                                                </div>
                                            ))}
                                            <Button
                                                className='mt-3 overview-btn'
                                                color='primary'
                                                size='sm'
                                                onClick={() => {
                                                    field.onChange([...field.value, { description: '' }]);
                                                }}
                                            >
                                                <PlusCircle /> Description
                                            </Button>
                                        </div>
                                    )}
                                />
                            </div>
                        </Col>

                        <Col sm={4} md={6}>
                            <div className="mb-3">
                                <Label>
                                    <div className='d-flex'>
                                        <div>Product Image</div>
                                    </div>
                                </Label>

                                <Controller
                                    name='image'
                                    id='image'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <div className="d-flex" style={{ cursor: 'pointer' }}>
                                            <input
                                                style={{ display: 'none' }}
                                                id="image"
                                                type="file"
                                                {...field}
                                                accept=".jpeg,.png,.jpg"
                                                invalid={errors.image && true}
                                                ref={imageRef}
                                                onChange={handleImageUpload}
                                            />

                                            {loader ? (
                                                <Spinner color='primary' />
                                            ) : (
                                                <Card style={{ width: "250px", height: "160px", justifyContent: "center", alignItems: "center" }} onClick={() => imageRef?.current?.click()}>
                                                    {image ? (
                                                        <>
                                                            <img
                                                                alt="uploaded image"

                                                                src={image}
                                                                style={{ width: '140px', objectFit: 'cover' }}
                                                            />
                                                            <div
                                                                className='image-remove'
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '5px',
                                                                    right: '1px',
                                                                    cursor: 'pointer',
                                                                    color: 'red',
                                                                }}
                                                                onClick={() => setImage(null)} >
                                                                <X />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className='text-primary text-center'>
                                                            <h1 style={{ color: "primary" }}><RiImageAddFill /></h1>
                                                            <p>*Upload your Cover Images</p>
                                                            {/* <p style={{ marginTop: '-15px' }}>(Preferably Vector Image)</p> */}
                                                        </div>
                                                    )}
                                                </Card>
                                            )}

                                            {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                        </div>
                                    )}
                                />
                            </div>

                        </Col>

                        <Col sm={4} md={6} >
                            <div className='d-flex'>
                                <div> <b> Product Gallery Images</b></div>
                            </div>
                            <Card className='p-3 mt-1 mt-md-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "400px" }}>
                                <div className="">
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {profileImages?.map((image, index) => (
                                            <div key={index} className="m-2">
                                                <div className='d-flex'>
                                                    <img
                                                        alt={`preview image ${index + 1}`}
                                                        src={image}
                                                        style={{
                                                            width: '100px',
                                                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => setSelectedImageIndex(index)}
                                                    />
                                                    <div className="cursor-pointer image-close" style={{ cursor: 'pointer' }} onClick={() => handleRemoveImage(index)}>
                                                        <X />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="d-flex justify-content-center" style={{ cursor: 'pointer' }}>
                                        <input style={{ display: 'none' }} type="file" ref={inputRef1} accept=".jpeg,.png,.jpg" onChange={handleProfileUpload} multiple />
                                        {loading ? (
                                            <Spinner />
                                        ) : (
                                            <div className='text-center text-primary' onClick={() => inputRef1?.current?.click()}>

                                                {profileImages.length === 0 ? (
                                                    <>
                                                        <h1> <RiImageAddFill /></h1>
                                                        <p>*Upload your Gallery Images</p>
                                                        <p style={{ marginTop: '-15px' }}>(Preferably Vector Image)</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1> <RiImageAddFill /></h1>
                                                        <p>*Add more images</p>
                                                        <p style={{ marginTop: '-15px' }}>(Preferably Vector Image)</p>

                                                    </>
                                                )}

                                            </div>
                                        )}
                                    </div>

                                </div>
                            </Card>

                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button className='overview-btn' type='submit'>Submit</Button>
                    </div>


                </Form >

            </div >
            <FooterSection />
        </>
    )
}

export default EditProductIndex