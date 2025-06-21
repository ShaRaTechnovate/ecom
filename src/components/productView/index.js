import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, Col, FormFeedback, Input, Label, Row, Spinner, Button } from 'reactstrap'
import { Check, ChevronDown, Plus, ShoppingCart, X } from 'react-feather'
import "./index.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { addCart, getCartRate, product, quantityCountApi, wishList } from '../../ApiConfigs/ApiConfig'
import InteractiveHome from '../home/interactive'
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import img1 from "../../assets/images/banner/gallery1.jpg"
import img2 from "../../assets/images/banner/gallery2.jpg"
import img3 from "../../assets/images/banner/gallery3.jpg"
import { multiImageUpload } from '../admin/upload'
import toast from 'react-hot-toast'
import Navbar from '../navbar'
import FooterSection from '../footer'
import ImageSlider from './productImage'
import heart from "../../assets/images/logo/heart.png"
import MobileOTPModal from '../navbar/finalAuth/mobileOTP'
import { RiImageAddFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHome } from "react-icons/fa";


function ProductView() {

    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
    const [profileImages, setProfileImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [quantityCount, setQauntityData] = useState();
    const [quantityRate, setQuantityRate] = useState();
    const [payloadData, setPayloadData] = useState({})
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [loader, setLoader] = useState(false);
    const [minimumQuantity, setMinimumQuantity] = useState()
    const [maximumQuantity, setMaximumQuantity] = useState()
    const [quantityError, setQuantityError] = useState('');
    const [open, setOpen] = useState('1');
    const location = useLocation();


    const toggleAccordion = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const { product_url } = useParams();

    // const productName = window.location.pathname.split('/').pop();

    const CardImg = [
        ...(dataa?.image ? [dataa.image] : []),
        ...(dataa?.galleryImages ?? [])
    ]

    const amount = quantityRate?.amount
    const totalAmount = amount * quantity;

    const final = quantity * amount;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionChange = async (fieldType, selectedOption) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [fieldType]: selectedOption
        }));
    };

    useEffect(() => {

        const handleOnChange = async () => {

            const payload = {
                product: dataa?._id,
                quantity: quantity,
                field: dataa?.fieldType?.map((eachItem) => (
                    {
                        fieldType: eachItem?.name?._id,
                        option: selectedOptions[eachItem?.name?._id] || null,
                    }
                )),
            };
            try {
                const response = await axios.post(getCartRate, payload);
                setQuantityRate(response?.data?.result)
            } catch (error) {
            }
        }

        handleOnChange()
    }, [selectedOptions])




    const handleQuantityChange = async (event) => {

        const newQuantity = parseInt(event.target.value);
        if (newQuantity <= 0) {
            setQuantity(0)
            return;

        }
        if (newQuantity >= minimumQuantity && newQuantity <= maximumQuantity) {
            setQuantity(newQuantity);

            const payload = {
                product: dataa?._id,
                quantity: newQuantity,
                field: dataa?.fieldType?.map((eachItem) => ({
                    fieldType: eachItem?.name?._id,
                    option: selectedOptions[eachItem?.name?._id] || null,
                })),
            };

            try {
                const response = await axios.post(getCartRate, payload);
                setQuantityRate(response?.data?.result);
            } catch (error) {
            }
        } else {
            if (newQuantity < minimumQuantity) {
                setQuantityError(`Minimum quantity allowed is ${minimumQuantity}`);
            } else if (newQuantity > maximumQuantity) {
                setQuantityError(`Maximum quantity allowed is ${maximumQuantity}`);
            }
        }
    };



    useEffect(() => {
        if (Object.keys(selectedOptions).length === 0) {
            const initialOptions = {};
            dataa?.fieldType?.forEach((eachItem) => {
                const fieldType = eachItem?.name?._id;
                const firstOption = eachItem?.options[0]?._id;
                initialOptions[fieldType] = firstOption;
            });

            setSelectedOptions(initialOptions);
        }
    }, [dataa]);

    const isLogin = localStorage.getItem('role')

    const checkUserLogin = () => {

        inputRef?.current?.click();

    };

    const navToCustomize = () => {
        navigate('/products/customizeProduct')
    }


    const handleProfileUpload = async (e) => {
        if (e.target.files) {
            try {
                setLoader(true)
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
                    setIsImageUploaded(true);
                }
            } catch (error) {
                toast.error('Something went wrong...');
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



    const token = localStorage.getItem('token')

    const additionalData = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${product}/${product_url}`)
            setData(response?.data?.result)
            console.log(response?.data?.result)
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        additionalData();
    }, [product_url]);


    const quantityData = async () => {
        try {
            const response = await axios.get(`${quantityCountApi}/${product_url}`);
            setQauntityData(response?.data?.result);

            const min = response?.data?.result?.[0]?.to ?? 1;
            const lastIndex = response?.data?.result?.length - 1;
            const max = response?.data?.result?.[lastIndex]?.to;

            setMinimumQuantity(min);
            setMaximumQuantity(max);
            setQuantity(min);
        } catch (error) {
        }
    };
    console.log('idd', dataa?._id);
    useEffect(() => {
        additionalData()
    }, [])

    useEffect(() => {
        quantityData(dataa?._id)
    }, [dataa?._id])

    const formSchema = yup.object().shape({

        image: yup.string().required('Please Upload Your Design'),
    })
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const handleRest = () => {
        reset({

        })
    }
    const likeProduct = async (id) => {
        if (!localStorage.getItem('token')) {
            toggle();
        }

        try {
            const response = await axios.post(wishList, { product: id });
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };



    const submitForm = async () => {
        if (!isImageUploaded) {
            toast.error('Please upload your custom design.');
            return;
        }
        const image = profileImages
        const payload = {
            product: dataa?._id,
            quantity: quantity,
            field: dataa?.fieldType?.map((eachItem) => ({
                fieldType: eachItem?.name?._id,
                option: selectedOptions[eachItem?.name?._id] || null,
            })),
            file: profileImages?.map((el) => (

                el?.url

            ))

        };

        setPayloadData(payload)

        if (isLogin === 'USER') {
            try {
                const response = await axios.post(addCart, payload);
                toast.success(response?.data?.msg)
                localStorage.removeItem('AddCart')
                navigate('/myCart');
            } catch (error) {
                toast.error(error?.response?.data?.msg)

            }
        } else {
            toggle();

        }


    }

    const addCartKey = localStorage.getItem('AddCart')

    const autoAddCartFn = async () => {
        try {
            const response = await axios.post(addCart, payloadData);
            toast.success(response?.data?.msg)
            localStorage.removeItem('AddCart')
            navigate('/myCart');
        } catch (error) {
            toast.error(error?.response?.data?.msg)

        }
    }

    useEffect(() => {

        if (addCartKey == 'true') {
            autoAddCartFn()
        }

    }, [addCartKey == 'true'])


    const dataImg = [
        img1,
        img2,
        img3,
    ]

    const navigate = useNavigate()

    const navToProduct = (category_url) => {
        navigate(`/products/${dataa?.productCategory?.category_url}`)
    }

    const navToHome = () => {
        navigate(`/`)
    }

    const navToProducts = () => {
        navigate('/products')
    }

    const [visibleImages, setVisibleImages] = useState(3);


    const handleShowMore = () => {
        setVisibleImages(CardImg.length);
    };

    const typeSpellings = {
        'general': 'General',
        'recemended': 'Recommended',
        'bulckprice': 'Bulk Price',
        'bestprice': 'Best Price'
    };

    const [inputValue, setInputValue] = useState('560076');
    const targetPincode = '560076';

    const handleChange = (e) => {
        setInputValue(e.target.value);

    };


    const truncateTitle = (title) => {
        return title.length > 70 ? `${title.slice(0, 70)}...` : title;
    };

    return (
        <>

            <Navbar />
            {loading ? (
                <div style={{ height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        color="primary"
                        size=""
                    >
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <div className='pt-3 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>

                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToProducts}>Products</span> / <span onClick={navToProduct}>{dataa?.productCategory?.name}</span> / <span>{dataa?.name}</span> </p>

                    <Row>
                        <Col sm={12} lg={6}>
                            <Card style={{ border: 'none' }} className='mb-3'>

                                <ImageSlider images={CardImg} />

                            </Card>
                            <div className='d-none d-lg-block'>
                                <p className='pt-0' style={{ cursor: 'pointer' }}>
                                    <span style={{ color: 'green' }}><Plus /></span> <span>{dataa?.fullDescription}</span>
                                </p>
                            </div>
                            {/* <div >
                                <Accordion open={open} toggle={toggleAccordion}>
                                    <Row>
                                        {dataa?.description?.map((detail, i) => (
                                            <div key={detail?.id}>
                                                <AccordionItem>
                                                    <AccordionHeader targetId={i}><h5>{truncateTitle(detail?.title)}</h5></AccordionHeader>
                                                    <AccordionBody accordionId={i}>
                                                        {detail?.description}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </div>
                                        ))}
                                    </Row>
                                </Accordion>
                            </div> */}
                        </Col>

                        <Col sm={12} lg={6}>
                            <Card style={{ border: 'none' }}>
                                <div className='d-flex'>
                                    <h1 className='mb-3 mt-3 mt-lg-0'>{dataa?.name && dataa?.name?.length > 35 ? `${dataa?.name?.substring(0, 40)}...` : dataa?.name}</h1>
                                    {
                                        isLogin ?
                                            <div class="con-like">
                                                <input
                                                    className="like"
                                                    defaultChecked={dataa?.wishList}
                                                    onClick={() => likeProduct(dataa?._id)}
                                                    type="checkbox"
                                                    title="like"
                                                />
                                                <div class="checkmark">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="outline" viewBox="0 0 24 24">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
                                                        <polygon class="poly" points="10,10 20,20"></polygon>
                                                        <polygon class="poly" points="10,50 20,50"></polygon>
                                                        <polygon class="poly" points="20,80 30,70"></polygon>
                                                        <polygon class="poly" points="90,10 80,20"></polygon>
                                                        <polygon class="poly" points="90,50 80,50"></polygon>
                                                        <polygon class="poly" points="80,80 70,70"></polygon>
                                                    </svg>
                                                </div>
                                            </div>
                                            :
                                            <div className='heartEmoji' onClick={toggle}>
                                                <img src={heart} alt={heart} height={40} width={40} />
                                            </div>
                                    }
                                </div>
                                <div className='d-none d-lg-block'>
                                    {dataa?.productOverview?.map((eachItem, i) => (
                                        <p className='pt-0'><span style={{ color: 'green' }}><Check /></span> {eachItem?.description}</p>
                                    ))}
                                </div>
                                <div className='d-lg-none'>
                                    {dataa?.productOverview?.map((eachItem, i) => (
                                        <p className='pt-0'><span style={{ color: 'green' }}><Check /></span> {eachItem?.description}</p>
                                    ))}
                                </div>
                                <div>
                                    <Row>
                                        {dataa?.fieldType?.map((eachItem, i) => (
                                            <React.Fragment key={i}>
                                                <Col sm={4}>
                                                    <h4 className='m-0 mt-3' style={{ fontWeight: '600', fontSize: '20px' }}>
                                                        {eachItem?.name?.name}
                                                    </h4>
                                                </Col>
                                                <Col sm={8} className="position-relative">
                                                    <select
                                                        name={eachItem?.name?._id}
                                                        className='form-control mt-1 mt-md-3 pr-6'
                                                        onChange={(e) => handleOptionChange(eachItem?.name?._id, e.target.value)}
                                                    >
                                                        {eachItem?.options.map((each, k) => (
                                                            <option key={k} value={each?._id}>{each?.name}</option>
                                                        ))}
                                                    </select>
                                                    <i className=" dropicon mt-1 bi bi-caret-down position-absolute translate-middle-y">                                                    <ChevronDown />
                                                    </i>
                                                </Col>
                                            </React.Fragment>
                                        ))}

                                        <Col sm={4}>
                                            <h4 className='m-0 mt-3' style={{ fontWeight: '600', fontSize: '20px' }}>Quantity</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <div>
                                                {dataa?.quantityType === 'dropdown' ? (
                                                    <select
                                                        name='quantityCounter'
                                                        className='form-control mt-1 mt-md-3'
                                                        onChange={handleQuantityChange}
                                                    >

                                                        {quantityCount?.map((eachQuantity, i) => (
                                                            <option key={i} value={eachQuantity?.to}>
                                                                {eachQuantity?.to}
                                                                {eachQuantity?.type !== 'general' && (
                                                                    <span className='ms-4'> ({typeSpellings[eachQuantity?.type] || eachQuantity?.type})</span>
                                                                )}
                                                            </option>
                                                        ))}

                                                    </select>
                                                ) : (
                                                    <div>
                                                        <input
                                                            type="number"
                                                            name='quantity'
                                                            style={{ border: '1px solid black' }}
                                                            className='form-control mt-1 mt-md-3'
                                                            value={quantity}
                                                            onChange={handleQuantityChange}
                                                            pattern="[0-9]+"
                                                        />
                                                        {quantityError && <span className="text-danger">{quantityError}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col sm={4}>
                                            <h4 className='m-0 mt-3' style={{ fontWeight: '600', fontSize: '20px' }}>
                                                Uploads
                                                {dataa?.upload ? (
                                                    <span className='text-danger'>*</span>
                                                ) : (
                                                    <span className='ms-1' style={{ color: 'grey' }}>(optional)</span>
                                                )}
                                            </h4>
                                        </Col>
                                        <Col sm={8}>
                                            {/* {profileImages.length === 0 && (
                                                <button className='p-2 mt-3 upload-butn' onClick={() => inputRef1.current.click()}>
                                                    <RiUploadCloud2Fill size={22} /> Upload Your Files
                                                </button>
                                            )} */}
                                            <div>
                                                <Card className='p-3 mt-1 mt-md-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                    {loader ? (
                                                        <Spinner color="primary" />
                                                    ) : (
                                                        <div className="">
                                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                {profileImages.map((image, index) => (
                                                                    <div key={index} className="m-2">
                                                                        <div className='d-flex'>
                                                                            <img
                                                                                alt={`preview image ${index + 1}`}
                                                                                src={image.url}
                                                                                style={{
                                                                                    width: '130px',
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

                                                                <div className='text-center text-primary' onClick={() => inputRef1?.current?.click()}>
                                                                    {profileImages.length === 0 ? (
                                                                        <>
                                                                            <h1> <RiImageAddFill /></h1>
                                                                            <p style={{ fontSize: '13px' }}>*Upload your Custom Design</p>
                                                                            <p style={{ marginTop: '-15px', fontSize: '12px' }}>(Preferably Vector File)</p>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <h1> <RiImageAddFill /></h1>
                                                                            <p style={{ fontSize: '13px' }}>*Add more images</p>
                                                                            <p>(Preferably Vector File)</p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className='text-primary' style={{ fontSize: "14px", justifyContent: "center", textAlign: "center", }}>
                                                        <p> *Add Your Custom Image Less Than 5 MB</p>
                                                        <button className='btn btn-primary' onClick={navToCustomize}>Customize Product</button>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <div className='ms-2'>
                                                <Controller
                                                    name='image'
                                                    id='image'
                                                    control={control}
                                                    defaultValue=''
                                                    render={({ field }) => (<div className="d-flex" style={{ cursor: 'pointer' }}>
                                                        <input style={{ display: 'none' }} id="image" type="file" {...field} invalid={errors.image && true} ref={inputRef} onChange={handleProfileUpload} />
                                                        {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                                    </div>)} />
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                                <Row>
                                    <Col lg={6} md={6} sm={12}>
                                        <div>
                                            {totalAmount ? (
                                                <>
                                                    <h5 className='price-head mt-5'>
                                                        {dataa?.offer ? (
                                                            <>
                                                                <span className='text-muted' style={{ textDecoration: 'line-through' }}>{totalAmount?.toLocaleString('en-IN', {
                                                                    maximumFractionDigits: 2,
                                                                    style: 'currency',
                                                                    currency: 'INR'
                                                                })}</span>
                                                                <span className='fw-bolder' style={{ color: 'green', fontSize: '25px' }}>{dataa.offerAmount?.toLocaleString('en-IN', {
                                                                    maximumFractionDigits: 2,
                                                                    style: 'currency',
                                                                    currency: 'INR'
                                                                })}</span>
                                                            </>
                                                        ) : (
                                                            <span className='fw-bolder' style={{ color: 'orange', fontSize: '25px' }}>{totalAmount?.toLocaleString('en-IN', {
                                                                maximumFractionDigits: 2,
                                                                style: 'currency',
                                                                currency: 'INR'
                                                            })}</span>
                                                        )}
                                                        <span style={{ fontWeight: '300', marginLeft: "8px" }}>inclusive of all taxes</span> <br />
                                                        <span style={{ fontWeight: '300' }}>
                                                            for <span className='fw-bold'>{quantity}</span> Qty (<span className='fw-bold'>{amount?.toLocaleString('en-IN', {
                                                                maximumFractionDigits: 2,
                                                                style: 'currency',
                                                                currency: 'INR'
                                                            })}</span> / piece)
                                                        </span>

                                                        {quantityRate?.savings > 0 && (
                                                            <>
                                                                <br />
                                                                <span className=''>₹{quantityRate?.savings?.toLocaleString('en-IN', {
                                                                    maximumFractionDigits: 2,
                                                                    style: 'currency',
                                                                    currency: 'INR'
                                                                })}</span>
                                                                <span className='fw-normal'> - savings</span>
                                                            </>
                                                        )}
                                                    </h5>
                                                    <div className="product-bulk">
                                                        <p className='product-bulk-content'>Buy in bulk and save <HiInformationCircle size={20} /></p>
                                                        <div className="hover-content">
                                                            <p>Bulk Quantities of Product at Discountes Rates</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end' }} className='mt-5'>
                                            {dataa?.upload ? (
                                                <>
                                                    <button className='viewButton mt-3' disabled={!profileImages} onClick={submitForm}><ShoppingCart />  Add to Cart</button>
                                                    <div>
                                                        {!profileImages && <p className='mt-2' style={{ width: '250px', fontSize: '12px' }}><span className='text-danger'>*</span>Upload your Custom design to proceed!</p>}
                                                    </div>
                                                </>
                                            ) : (
                                                <button className='viewButton mt-3' disabled={!isImageUploaded}
                                                    onClick={submitForm}><ShoppingCart />  Add to Cart</button>
                                            )}
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4} sm={12}>
                                        <div className='mt-5'>
                                            <div className='d-flex'><h4>Delivery</h4></div>
                                        </div>
                                    </Col>
                                    <Col lg={8} md={8} sm={12}>
                                        <div className='mt-5'>
                                            <Input
                                                type='tel'
                                                value={inputValue}
                                                onChange={handleChange}
                                                style={{ width: '80%' }}
                                            />
                                            {inputValue === targetPincode ? (
                                                <>
                                                    <h6 className='mt-1'><RiMotorbikeFill /> Express Delivery :<br />
                                                        <span style={{ color: 'grey' }}>4 Hours/same day delivery available at selected locations.</span></h6>
                                                    <h6 className='mt-1'><TbTruckDelivery /> Standard Delivery :<br />
                                                        <span style={{ color: 'grey' }}>Estimated delivery by Mon, 1 Apr</span></h6>

                                                </>
                                            ) : (
                                                <p className="text-danger">Delivery not available for this location</p>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div >
            )
            }
            <div>
                <div style={{ marginTop: '60px' }}>
                    <div>
                        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Frequently Asked Questions</h3>
                    </div>
                    <div style={{ paddingLeft: '8%', paddingRight: '8%', marginTop: '20px' }}>
                        <Accordion open={open} toggle={toggleAccordion}>
                            <Row>
                                {dataa?.FAQ?.map((details, i) => (
                                    <Col lg={6} md={6} sm={12} key={details?.id}>
                                        <AccordionItem>
                                            <AccordionHeader targetId={i}><h5>{truncateTitle(details?.title)}</h5></AccordionHeader>
                                            <AccordionBody accordionId={i}>
                                                {details?.description}
                                            </AccordionBody>
                                        </AccordionItem>
                                    </Col>
                                ))}
                            </Row>
                        </Accordion>
                    </div>
                </div>



                <MobileOTPModal isOpen={modal} toggleOTP={toggle} setCartKey={'yes'} />
                <InteractiveHome />
                <FooterSection />
            </div >
        </>
    )
}

export default ProductView
