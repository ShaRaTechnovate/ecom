import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button, FormFeedback, Form, Input, Label, Row, Col, Spinner, Card } from 'reactstrap';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { ArrowLeft, Info, PlusCircle, Trash2, X } from 'react-feather';
import { fieldOption, getFieldTypeOptions, productApi, productCategory } from '../../../../ApiConfigs/ApiConfig';
import { multiImageUpload, uploadImage } from '../../upload/index';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from '../../../navbar';
import category from "../../../../assets/images/logo/productName.png"
import description from "../../../../assets/images/logo/product-desc.png"
import overview from "../../../../assets/images/logo/coveringImg.png"
import main from "../../../../assets/images/logo/product_galleryimages.png"
import fullDesc from "../../../../assets/images/logo/full-desc.png"
import option from "../../../../assets/images/logo/options-img.png"
import { RiImageAddFill } from 'react-icons/ri';


function AddProductIndex() {


    const nagivate = useNavigate()
    const [getData, setGetData] = useState([])
    const imageRef = useRef(null);
    const [imageUpload, setImageUpload] = useState([])
    const [image, setImage] = useState(null);
    const [feildOption, setFieldOption] = useState([])
    const [getOptionsFieldType, setOptionsFieldType] = useState([])
    const inputRef1 = useRef(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [profileImages, setProfileImages] = useState([]);
    const [loader, setloader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fieldTypeIds, setFieldTypeIds] = useState([]);
    const [typeIds, setTypeIds] = useState([])
    const navigate = useNavigate()
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const formSchema = yup.object().shape({

        productCategory: yup.mixed().required('Please Enter Your productCategory '),
        name: yup.string().required('Please Enter Your productName'),
        fullDescription: yup.string().required('Please Enter Your fullDescription'),
        // shortDescription: yup.string().required('Please Enter Your shortDescription'),
        amount: yup.mixed().required('Please Enter Your amount'),
        quantityType: yup.mixed().required('Please Enter Your quantityType'),
        minimunQuantity: yup.string().required('Please Enter Your minimunQuantity'),
        maximunQuantity: yup.string().required('Please Enter Your maximunQuantity'),


    });



    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid }

    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });


    const { fields: fieldTypesFields, append: appendFieldType, remove: removeFieldType } = useFieldArray({
        control,
        name: "fieldTypes",
    });

    const { fields: quantityBasedAmountFields, append: appendQuantityBasedAmount, remove: removeQuantityBasedAmount } = useFieldArray({
        control,
        name: "quantityBasedAmount",
    });


    const submitForm = async (data) => {
        const productCategory = data?.productCategory?.value
        delete data.img_url
        delete data.image
        const quantityType = data?.quantityType?.value
        const quantityBasedAmount = data.quantityBasedAmount.map(item => ({
            type: item?.type?.value,
            amount: parseFloat(item?.amount),
            from: parseFloat(item?.from),
            to: parseFloat(item?.to)
        }));

        const fieldd = {
            fieldType: data?.fieldTypes?.map((el) => ({
                name: el?.name?.value,
                options: el?.options?.map((item) => item?.value)
            }))
        }


        const payload = {
            ...data,
            amount: parseFloat(data.amount),
            maximunQuantity: parseFloat(data.maximunQuantity),
            minimunQuantity: parseFloat(data.minimunQuantity),
            fieldType: fieldd.fieldType

        }
        delete payload.fieldTypes

        try {
            const response = await axios.post(productApi, { ...payload, productCategory, galleryImages: profileImages?.map((el) => el?.url), image: profileImageUrl, quantityType, quantityBasedAmount })
            toast.success(response?.data?.msg)
            nagivate('/admin/product')
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
        }
    }


    // const handleProfileUpload = async (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(URL.createObjectURL(e.target.files[0]));
    //     }
    //     if (e.target.files) {
    //         try {
    //             setloader(true)
    //             const formData = new FormData();
    //             formData.append('file', e.target.files[0]);

    //             const uploadData = await uploadImage(formData);
    //             if (uploadData && uploadData.result && uploadData.result.length) {
    //                 setProfileImageUrl(uploadData.result[0].location);

    //             }
    //         } catch (error) {
    //             toast.error(error?.response?.data?.msg);
    //         } finally {
    //             setloader(false)
    //         }
    //     }
    // };
    const handleProfileUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                setloader(true)
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await uploadImage(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setProfileImageUrl(uploadData.result[0].location);

                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            } finally {
                setloader(false)
            }
        }
    };



    // const handleProfileUpload = async (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const imageFile = e.target.files[0];
    //         const image = new Image();
    //         image.src = URL.createObjectURL(imageFile);

    //         image.onload = () => {
    //             if (image.width === 3798 && image.height === 2532) {
    //                 setImage(URL.createObjectURL(imageFile));
    //                 uploadImageAndSetProfile(imageFile);
    //             } else {
    //                 toast.error('Image dimensions must be 3798x2532 pixels.');
    //             }
    //         };
    //     }
    // };

    // const uploadImageAndSetProfile = async (imageFile) => {
    //     try {
    //         setloader(true);
    //         const formData = new FormData();
    //         formData.append('file', imageFile);

    //         const uploadData = await uploadImage(formData);
    //         if (uploadData && uploadData.result && uploadData.result.length) {
    //             setProfileImageUrl(uploadData.result[0].location);
    //         }
    //     } catch (error) {
    //         toast.error(error?.response?.data?.msg);
    //     } finally {
    //         setloader(false);
    //     }
    // };

    const handleImageUpload = async (e) => {
        if (e.target.files) {
            try {
                setLoading(true)
                const formData = new FormData();
                const uploadedFiles = [];

                for (let i = 0; i < e.target.files.length; i++) {
                    formData.append('files', e.target.files[i]);
                }

                const uploadData = await multiImageUpload(formData);

                if (uploadData && uploadData.result && uploadData.result.length) {
                    uploadData.result.forEach((file) => {
                        uploadedFiles.push({
                            name: file.originalname,
                            url: file.location,
                        });
                    });

                    setProfileImages([...profileImages, ...uploadedFiles]);
                    // setIsImageUploaded(true);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            } finally {
                setLoading(false)

            }
        }
    };



    // const handleImageUpload = async (e) => {
    //     if (e.target.files) {
    //         try {
    //             setLoading(true);
    //             const formData = new FormData();
    //             const uploadedFiles = [];

    //             for (let i = 0; i < e.target.files.length; i++) {
    //                 const imageFile = e.target.files[i];
    //                 const image = new Image();
    //                 image.src = URL.createObjectURL(imageFile);

    //                 await new Promise((resolve) => {
    //                     image.onload = () => resolve();
    //                 });

    //                 const requiredWidth = 3200;
    //                 const requiredHeight = 2400;

    //                 if (image.width !== requiredWidth || image.height !== requiredHeight) {
    //                     toast.error(`Image dimensions must be ${requiredWidth}x${requiredHeight} pixels.`);
    //                     continue;
    //                 }

    //                 formData.append('files', imageFile);
    //             }

    //             const uploadData = await multiImageUpload(formData);

    //             if (uploadData && uploadData.result && uploadData.result.length) {
    //                 uploadData.result.forEach((file) => {
    //                     uploadedFiles.push({
    //                         name: file.originalname,
    //                         url: file.location,
    //                     });
    //                 });

    //                 setProfileImages([...profileImages, ...uploadedFiles]);
    //             }
    //         } catch (error) {
    //             toast.error(error?.response?.data?.msg);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // };


    const handleRemoveImage = (index) => {
        const updatedImages = [...profileImages];
        updatedImages.splice(index, 1);
        setProfileImages(updatedImages);
        setSelectedImageIndex(null);
    };


    const getProduct = async () => {
        try {

            const response = await axios.get(productCategory)
            setGetData(response?.data?.result)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const options = getData?.map((item) =>
    (
        {
            label: item?.name,
            value: item?._id
        }))

    useEffect(() => {
        if (fieldTypeIds.length) {
            let value = fieldTypeIds.map(id => id.id);
            setTypeIds(value)
        }
    }, [fieldTypeIds])
    const getFieldType = async (id, ind) => {
        try {
            let payload = [];
            if (id) {
                typeIds.map((val) => {
                    if (val.toString() !== id.toString()) {
                        payload.push(val)
                    }
                })
            } else {
                payload = typeIds
            }
            const response = await axios.post(`${getFieldTypeOptions}`, { fieldType: payload })
            const optionsFieldType = response?.data?.result?.map((item) =>
            (
                {
                    label: item?.name,
                    value: item?._id
                }))
            setOptionsFieldType(optionsFieldType)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const getDatas = async (id, index) => {

        if (!fieldTypeIds.length) {
            setFieldTypeIds([{ index: index, id }]);
        } else if (fieldTypeIds[index]?.index === index) {
            setFieldTypeIds(prevState => {
                const updatedState = [...prevState];
                updatedState[index] = { index: index, id };
                return updatedState;
            });
        } else {
            fieldTypeIds.push({ index, id })
            // /(prevState => [...prevState, index, id]);
        }
    };
    useEffect(() => {
        getFieldType()
    }, [typeIds])


    const getFieldOption = async (id) => {
        try {
            const response = await axios.get(`${fieldOption}?fieldType=${id}`)
            setFieldOption(response?.data?.result)
        } catch (error) {

        }
    }
    const fieldoption = feildOption?.map((item) => (
        {
            label: item?.name,
            value: item?._id
        }
    ))



    const quantityBasedAmountType = [
        {
            name: "Recommended",
            value: "recemended"
        },
        {
            name: "General",
            value: "general"
        },
        {
            name: "BestPrice",
            value: "bestprice"
        },
        {
            name: "BulckPrice",
            value: "bulckprice"
        },

    ]

    const quantityBasedType = quantityBasedAmountType?.map((item) => (
        {
            label: item?.name,
            value: item?.value
        }
    ))

    const quantityTypeData = [
        {
            name: "dropdown",
            value: "dropdown"
        },
        {
            name: "manual",
            value: "manual"
        }
    ]

    const quantityTypeDrop = quantityTypeData?.map((item) => (
        {
            label: item?.name,
            value: item?.name
        }
    ))







    useEffect(() => {
        getProduct()
        getFieldType()
    }, [])

    const handleTypeChange = (selectedOption, index) => {
        setValue(`fieldTypes[${index}].options`, []);
        getFieldOption(selectedOption?.value);
        getDatas(selectedOption?.value, index);
    };

    return (
        <>
            <Navbar />

            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/product')}><ArrowLeft /><p>Back ProductPage</p> </div>

                <h1 className='text-center ms-3 mb-5'>Add Product</h1>

                <Form onSubmit={handleSubmit(submitForm)}>
                    <Row className='p-3'>
                        <Col sm={12} md={12} lg={6}>
                            <Row>
                                <Col sm={12} md={12} lg={12} >
                                    <div className='mb-4'>
                                        <h2>1. Product details :</h2>
                                        <hr />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={6}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>
                                            <div className='d-flex'>
                                                <div>Product Category</div>

                                            </div>
                                        </Label>
                                        <Controller
                                            name='productCategory'
                                            id='productCategory'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    isSearchable={false}
                                                    type="select"
                                                    {...field}
                                                    options={options}
                                                    invalid={errors.productCategory && true}
                                                >
                                                </Select>
                                            )}
                                        />
                                        {errors.productCategory && <FormFeedback>{errors.productCategory.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={6}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>
                                            <div className='d-flex'>
                                                <div>Product Name</div>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <div className="eye-icon-container">
                                                        <Info />
                                                        <div className="hover-image">
                                                            <img src={category} alt='text' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Label>
                                        <Controller
                                            name='name'
                                            id='name'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (<Input type="text" {...field}
                                                invalid={errors.name && true}
                                                placeholder="Enter Product Name" />)}
                                            onInput={(e) => {
                                                const inputValue = e.target.value;
                                                if (inputValue.length === 1) {
                                                    e.target.value = inputValue.replace(/[^A-Za-z]/g, '');
                                                } else {
                                                    e.target.value = inputValue.replace(/[^A-Za-z0-9]/g, '');
                                                }
                                            }}
                                        />

                                        {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={6} md={6} lg={6}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bold" }}>
                                            <div className='d-flex'>
                                                <div>Full Description</div>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <div className="eye-icon-container">
                                                        <Info />
                                                        <div className="fulldesc img-fluid">
                                                            <img src={fullDesc} alt='text' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Label>
                                        <Controller
                                            name='fullDescription'
                                            id='fullDescription'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Input type="textarea" rows={5} cols={60} {...field} invalid={errors.fullDescription && true} placeholder="Enter Full Description" />)}
                                        />
                                        {errors.fullDescription && <FormFeedback>{errors.fullDescription.message}</FormFeedback>}
                                    </div>
                                </Col>
                                {/* <Col sm={6} md={6} lg={6}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bold" }}>
                                            Short Description
                                        </Label>
                                        <Controller
                                            name='shortDescription'
                                            id='shortDescription'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (<Input type="textarea" rows={5} cols={60} {...field} invalid={errors.shortDescription && true} placeholder="Enter Short Description" />)} />
                                        {errors.shortDescription && <FormFeedback>{errors.shortDescription.message}</FormFeedback>}
                                    </div>
                                </Col> */}
                                <Col sm={12} md={12} lg={12}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>
                                            <div className='d-flex'>
                                                <div>Product OverView</div>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <div className="eye-icon-container">
                                                        <Info />
                                                        <div className="viewImg img-fluid">
                                                            <img src={description} alt='text' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Label>
                                        <Controller
                                            name='productOverview'
                                            control={control}
                                            defaultValue={[]}
                                            render={({ field }) => (
                                                <div>
                                                    {field.value.map((item, index) => (
                                                        <div key={index} className='mb-3 d-flex'>
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
                                                            <div className='justify-content-end ms-2 mt-1'
                                                                color='danger'
                                                                size='sm'
                                                                style={{ cursor: 'pointer', color: '#AF1B1B' }}
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
                                                        className='overview-btn'
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
                                                <div style={{ marginLeft: "20px" }}>
                                                    <div className="eye-icon-container">
                                                        <Info />
                                                        <div className="viewImg img-fluid">
                                                            <img src={overview} alt='text' />
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        onChange={handleProfileUpload}
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
                                                                        onClick={() => setImage(null)}                                                                    >
                                                                        <X />
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className='text-primary text-center'>
                                                                    <h1 style={{ color: "primary" }}><RiImageAddFill /></h1>
                                                                    <p>*Upload your Cover Images</p>
                                                                </div>
                                                            )}
                                                        </Card>

                                                    )}
                                                    {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    {/* <div style={{ width: "270px" }}>
                                        <p style={{ color: '#06377E', fontSize: '13px' }}>*Upload Your Image Height: 2532 px Width: 3798 px</p>
                                    </div> */}
                                </Col>
                                <Col sm={4} md={6} >
                                    <div className='d-flex'>
                                        <div> <b> Product Gallery Images</b></div>
                                        <div style={{ marginLeft: "20px" }}>
                                            <div className="eye-icon-container">
                                                <Info />
                                                <div className="viewImg img-fluid">
                                                    <img src={main} alt='text' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Card className='p-3 mt-1 mt-md-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="">
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {profileImages.map((image, index) => (
                                                    <div key={index} className="m-2" style={{ position: 'relative' }}>
                                                        <img
                                                            alt={`preview image ${index + 1}`}
                                                            src={image.url}
                                                            style={{
                                                                width: '100px',
                                                                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => setSelectedImageIndex(index)}
                                                        />
                                                        <div className="cursor-pointer image-close" style={{ position: 'absolute', top: '1px', right: '1px', cursor: 'pointer' }} onClick={() => handleRemoveImage(index)}>
                                                            <X style={{ width: '16px', height: '16px' }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-center" style={{ cursor: 'pointer' }}>
                                                <input style={{ display: 'none' }} type="file" ref={inputRef1} accept=".jpeg,.png,.jpg" onChange={handleImageUpload} multiple />
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

                                    {/* <div style={{ width: "380px", marginTop: "15px" }}>
                                        <p style={{ color: '#06377E', fontSize: '13px' }}>*Upload Your Image Height: 2400 px Width: 3200 px</p>
                                    </div> */}
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={12} lg={6}>
                            <Row>
                                <Col sm={12} md={12} lg={12} >
                                    <div className='mb-4 mt-5 mt-lg-0'>
                                        <h2>2. Product specifications :</h2>
                                        <hr />
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={6}>
                                    <div className='mb-3 '>
                                        <Label style={{ fontWeight: "bolder" }}>Basic Amount</Label>
                                        <Controller
                                            name='amount'
                                            id='amount'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (<Input type="number" {...field} invalid={errors.amount && true} placeholder="Enter your Amount" />)} />
                                        {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={6}>
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>User Quantity Type</Label>
                                        <Controller
                                            name='quantityType'
                                            id='quantityType'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    isSearchable={false}
                                                    type="select"
                                                    {...field}
                                                    options={quantityTypeDrop}
                                                    invalid={errors.quantityType && true} >
                                                </Select>
                                            )} />
                                        {errors.quantityType && <FormFeedback>{errors.quantityType.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={6} >
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>Minimum Quantity</Label>
                                        <Controller
                                            name='minimunQuantity'
                                            id='minimunQuantity'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (<Input type="number"  {...field} invalid={errors.minimunQuantity && true} placeholder="Enter Minimun Quantity" />)} />
                                        {errors.minimunQuantity && <FormFeedback>{errors.minimunQuantity.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={6} >
                                    <div className='mb-3'>
                                        <Label style={{ fontWeight: "bolder" }}>Maximum Quantity</Label>
                                        <Controller
                                            name='maximunQuantity'
                                            id='maximumQuantity'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (<Input type="number" {...field} invalid={errors.maximunQuantity && true} placeholder="Enter Maximun Quantity" />)} />
                                        {errors.maximunQuantity && <FormFeedback>{errors.maximunQuantity.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className='mb-1 d-flex flex-column'>
                                        <Label style={{ marginBottom: '5px', paddingRight: "10px", fontWeight: "bolder" }}>
                                            User Custom Upload
                                        </Label>
                                        <Controller
                                            name='upload'
                                            id='upload'
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <div className="d-flex">
                                                    <div >
                                                        <label
                                                            style={{
                                                                cursor: 'pointer',
                                                                padding: '5px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '3px',
                                                                backgroundColor: field.value === 'true' ? '#007bff' : 'transparent',
                                                                color: field.value === 'true' ? '#fff' : '#000',
                                                                width: "100px",
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            <input
                                                                type="radio"
                                                                {...field}
                                                                value="true"
                                                            />
                                                            <span className='ml-1'> True</span>
                                                        </label>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <label
                                                            style={{
                                                                cursor: 'pointer',
                                                                padding: '5px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '3px',
                                                                backgroundColor: field.value === 'false' ? '#007bff' : 'transparent',
                                                                color: field.value === 'false' ? '#fff' : '#000',
                                                                width: "100px",
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            <input
                                                                type="radio"
                                                                {...field}
                                                                value="false"
                                                            />
                                                            <span className='ml-1'> False</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        {errors.upload && <FormFeedback>{errors.upload.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col sm={12} md={6} lg={12}>
                                    <div className='d-flex'>
                                        <div> <b>Product Fields :</b></div>
                                        <div style={{ marginLeft: "20px" }}>
                                            <div className="eye-icon-container">
                                                <Info />
                                                <div className="option img-fluid">
                                                    <img src={option} alt='text' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {fieldTypesFields.map((field, index) => (
                                        <div key={field.id}>
                                            <Row>
                                                <Col sm={12} md={5}>
                                                    <div className='mb-3'>
                                                        <Label>Type</Label>
                                                        <Controller
                                                            name={`fieldTypes[${index}].name`}
                                                            id='options'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    isSearchable={false}
                                                                    id='fieldTypes'
                                                                    options={getOptionsFieldType}
                                                                    value={field.value}
                                                                    onChange={(selectedOption) => {
                                                                        getFieldOption(selectedOption.value);
                                                                        field.onChange(selectedOption);
                                                                        getDatas(selectedOption.value, index)
                                                                        handleTypeChange(selectedOption, index);

                                                                    }}
                                                                />
                                                            )} />

                                                    </div>
                                                </Col>
                                                <Col sm={5} md={5}>
                                                    <div className='mb-3'>
                                                        <Label style={{ fontWeight: "bolder" }}>Options</Label>
                                                        <Controller
                                                            name={`fieldTypes[${index}].options`}
                                                            id='options'
                                                            control={control}
                                                            defaultValue={[]}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    options={fieldoption}
                                                                    isMulti={true}
                                                                    closeMenuOnSelect={false}
                                                                    isSearchable={false}
                                                                    invalid={errors.fieldType && true}
                                                                />
                                                            )}
                                                        />
                                                        {errors.fieldType && errors.fieldType[index]?.options && (
                                                            <FormFeedback>{errors.fieldType[index]?.options.message}</FormFeedback>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col sm={2} md={2}>
                                                    <div className='mt-0 mb-5 pt-0 mt-lg-4 mb-lg-3 pt-lg-3' style={{ cursor: 'pointer', color: "#AF1B1B" }} onClick={(e) => {
                                                        getFieldType(typeIds[index], index);
                                                        removeFieldType(index)
                                                    }}>
                                                        <Trash2 />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>
                                    ))}
                                    <div className='d-flex'>
                                        <Button type="button" className='overview-btn' onClick={() => appendFieldType({ name: '', options: [] })}>
                                            <PlusCircle /> Field
                                        </Button>
                                    </div>
                                </Col>
                                <Col sm={12}>

                                    <div className='mt-3'>
                                        <Label style={{ fontWeight: "bolder" }} className='mt-3 mb-3'>Quantity Based Amount :</Label>
                                        {quantityBasedAmountFields.map((field, index) => (
                                            <div key={field.id}>
                                                <Row>

                                                    <Col sm={12} md={12} lg={5}>
                                                        <div className='mb-3'>
                                                            <Label style={{ fontWeight: "bolder" }}>Quantity From</Label>
                                                            <Controller

                                                                name={`quantityBasedAmount[${index}].from`}
                                                                id='from'
                                                                control={control}
                                                                defaultValue=""
                                                                render={({ field }) => (
                                                                    <Input type="number"
                                                                        {...field}
                                                                        invalid={errors.from && true}
                                                                        placeholder="Enter Quantity From" />)} />
                                                            {errors.from && <FormFeedback>{errors.from.message}</FormFeedback>}
                                                        </div>
                                                    </Col>

                                                    <Col sm={12} md={6} lg={5}>
                                                        <div className='mb-3'>
                                                            <Label style={{ fontWeight: "bolder" }}>Quantity To</Label>
                                                            <Controller
                                                                name={`quantityBasedAmount[${index}].to`}
                                                                id='to'
                                                                control={control}
                                                                defaultValue=""
                                                                render={({ field }) => (<Input type="number"
                                                                    {...field} invalid={errors.to && true} placeholder="Enter Quantity To" />)} />
                                                            {errors.to && <FormFeedback>{errors.to.message}</FormFeedback>}
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={5}>
                                                        <div className='mb-3'>
                                                            <Label style={{ fontWeight: "bolder" }}>Amount</Label>
                                                            <Controller
                                                                name={`quantityBasedAmount[${index}].amount`}
                                                                id='amount'
                                                                control={control}
                                                                defaultValue=""
                                                                render={({ field }) => (<Input type="number" {...field} invalid={errors.amount && true} placeholder="Enter Your Amount" />)} />
                                                            {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={12} lg={5}>
                                                        <div className='mb-3'>
                                                            <Label style={{ fontWeight: "bolder" }}>Type</Label>
                                                            <Controller
                                                                name={`quantityBasedAmount[${index}].type`}
                                                                id='type'
                                                                control={control}
                                                                defaultValue=""
                                                                render={({ field }) => (
                                                                    <Select
                                                                        {...field}
                                                                        isSearchable={false}
                                                                        options={quantityBasedType}
                                                                        invalid={errors.form && true}

                                                                    />
                                                                )}
                                                            />
                                                            {errors.type && errors.type[index]?.name && (
                                                                <FormFeedback>{errors.type[index]?.name.message}</FormFeedback>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={2}>
                                                        <div className='mt-0 mb-5 pt-0 mt-lg-4 mb-lg-3 pt-lg-3' style={{ cursor: 'pointer', color: "#AF1B1B" }} onClick={() => { removeQuantityBasedAmount(index); }}>
                                                            <Trash2 />
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </div>
                                        ))}
                                        <div className='d-flex py-3'>
                                            <Button type="button" className='overview-btn' onClick={() => appendQuantityBasedAmount({})}>
                                                <PlusCircle /> Add Field
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <hr />

                    <div className='d-flex justify-content-end mt-2'>
                        <Button disabled={!isDirty || !isValid} className='overview-btn' type='submit'>Create Product</Button>
                    </div>
                </Form >
            </div >
        </>
    )
}

export default AddProductIndex