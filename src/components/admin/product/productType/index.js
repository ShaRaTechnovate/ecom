import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { ArrowLeft, Edit, Edit2, PlusCircle, RefreshCw } from 'react-feather';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as yup from 'yup';
import { productRateUpdate, productType, fieldOption, productFieldType, productTypeSearch } from '../../../../ApiConfigs/ApiConfig';
import Navbar from '../../../navbar';
import FooterSection from '../../../footer';
import toast from 'react-hot-toast';
import "./index.css"
import AddProductType from '../addProductType';

function ProductTypeIndex() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState([]);
    const [bulkData, setBulkData] = useState([]);
    const [setFieldType, setSetFieldType] = useState([]);
    const [fieldOptions, setFieldOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const formSchema = yup.object().shape({
        amount: yup.number().required('Amount is required').positive('Amount must be positive'),
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const handleReset = () => {
        const initialSelectedOptions = setFieldType.map(() => ({ value: '' }));
        setSelectedOption(initialSelectedOptions);
        getData()
    };

    const openModal = (singleId, bulkId) => {
        setEditData(singleId);
        setBulkData(bulkId);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const submitForm = async (formData) => {
        try {
            const response = await axios.put(`${productRateUpdate}/${bulkData}?type=${editData}`, formData);
            getData();
            closeModal();
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${productType}/?product=${id}`);
            setData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getData()
    }, []);


    const [optionModal, setOptionModal] = useState(false);
    const openOptionAddModal = (bulkId) => {
        setOptionModal(!optionModal);
        setBulkData(bulkId);
    };

    const closeOptionModal = () => {
        setOptionModal(false);
    };

    const getFieldType = async () => {
        try {
            const response = await axios.get(`${productFieldType}/${id}`);
            setSetFieldType(response?.data?.result);
            const initialSelectedOptions = response?.data?.result.map(() => ({ value: '' }));
            setSelectedOption(initialSelectedOptions);
        } catch (error) {
            console.error(error);
        }
    };

    const getTypeSearch = async () => {
        try {
            const payload = {
                product: id,
                field: selectedOption.map((option, index) => ({
                    fieldType: setFieldType[index]?._id,
                    option: option?.value || '',
                })),
            };
            const response = await axios.post(productTypeSearch, payload);
            setData(response?.data?.result)
            const updatedFieldOptions = response.data.map((result) => result.options);
            setFieldOptions(updatedFieldOptions);
        } catch (error) {
        }
    };

    useEffect(() => {
        getTypeSearch()
    }, [selectedOption]);

    useEffect(() => {
        getFieldType();
    }, [id]);

    const getFieldOption = async (id, index) => {
        try {
            const response = await axios.get(`${fieldOption}?fieldType=${id}`);
            setFieldOptions((prevFieldOptions) => {
                const newFieldOptions = [...prevFieldOptions];
                newFieldOptions[index] = response?.data?.result;
                return newFieldOptions;
            });
        } catch (error) {
            console.error("Error fetching field options:", error);
        }
    };
    // const fetchSetFieldType = async () => {
    //     // Fetch setFieldType from your API and initialize selectedOption and fieldOptions arrays
    //     try {
    //         const response = await axios.get('/api/setFieldType');
    //         setSetFieldType(response.data);

    //         // Initialize selectedOption and fieldOptions arrays based on the response
    //         const initialSelectedOption = response.data.map(() => ({ value: '' }));
    //         setSelectedOption(initialSelectedOption);

    //         const initialFieldOptions = response.data.map(() => []);
    //         setFieldOptions(initialFieldOptions);
    //     } catch (error) {
    //         console.error('Error fetching setFieldType:', error);
    //     }
    // };
    // const handleChange = (event, index) => {
    //     // Update the selected option for the specific field
    //     const newSelectedOption = [...selectedOption];
    //     newSelectedOption[index] = { value: event.target.value };
    //     setSelectedOption(newSelectedOption);
    // };
    const handleChange = (event, index) => {
        const { value } = event.target;
        const updatedSelectedOption = [...selectedOption];
        updatedSelectedOption[index] = { value };
        setSelectedOption(updatedSelectedOption);
    };
    useEffect(() => {
        const fetchDataForAllFieldTypes = async () => {
            try {
                for (const [index, fieldType] of setFieldType.entries()) {
                    await getFieldOption(fieldType._id, index);
                }
            } catch (error) {
                console.error("Error fetching data for all field types:", error);
            }
        };
        fetchDataForAllFieldTypes();
    }, [setFieldType]);

    useEffect(() => {
        reset({
            amount: data?.amount,
        });
    }, [data]);

    return (
        <div>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div className='d-flex' onClick={() => navigate('/admin/product')}><ArrowLeft /><p>Back ProductPage</p> </div>
                <div className='p-2'>
                    <div>
                        <div>
                            <Card style={{ padding: "10px", paddingBottom: "3%", border: "1px solid black" }}>
                                <div className='d-flex justify-content-end' onClick={handleReset}>
                                    <a style={{ color: "red", cursor: "pointer" }}><RefreshCw /> Reset</a>
                                </div>
                                <Row>
                                    {setFieldType.map((item, index) => (
                                        <Col key={index} md={4} sm={6} lg={2}>
                                            <div className='materialProducts'>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id={`demo-custom-select-label-${index}`}>{item?.name}</InputLabel>
                                                        <Select
                                                            labelId={`demo-custom-select-label-${index}`}
                                                            id={`demo-custom-select-${index}`}
                                                            value={selectedOption[index]?.value}
                                                            label='Field Type'
                                                            onChange={(event) => handleChange(event, index)}
                                                            onClick={getTypeSearch}

                                                        >
                                                            {fieldOptions[index]?.map((el) => (
                                                                <MenuItem key={el?._id} value={el?._id}>
                                                                    {el?.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </div>
                        {data?.map((item) => {
                            return (
                                <Card style={{ margin: "5px", border: "none", background: "#ced4da", marginTop: "1%" }}>
                                    <Row>
                                        <Col lg={3} md={6} sm={12}>
                                            <div key={item} style={{ position: 'relative', width: '100%', height: '100%', display: 'inline-block' }}>
                                                <img
                                                    src={item?.image}
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                                {/* <div style={{ position: 'absolute', top: 0, right: 0, padding: '5px' }}>
                                                    <Button
                                                        style={{ backgroundColor: '#E4510B', border: 'none' }}
                                                        color="primary"
                                                        onClick={() => {
                                                            inputRef?.current?.click();
                                                        }}
                                                    >
                                                        <Edit size={15} />
                                                    </Button>

                                                </div> */}
                                            </div>
                                        </Col>
                                        <Col lg={8} md={12} style={{ padding: "5px", marginLeft: "20px" }}>
                                            <h4 style={{ fontWeight: "bolder", fontSize: "20px", color: "#e4510b" }}>{item?.product?.name}</h4>
                                            <Row style={{ marginTop: "20px" }}>
                                                <Col lg={2} md={6} sm={12}>
                                                    <div className='d-flex'>
                                                        <p style={{ color: "black", fontWeight: "800" }}>Types</p>
                                                    </div>
                                                    {item?.field?.map((item) => {
                                                        return (
                                                            <div className='d-flex'>
                                                                <p>{item?.fieldType?.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </Col>
                                                <Col lg={2} md={6} sm={12}>
                                                    <p style={{ color: "black", fontWeight: "800" }}>options</p>
                                                    {item?.field?.map((item) => {
                                                        return (

                                                            <div className='d-flex'>
                                                                <p>{item?.option?.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </Col>
                                                <Col lg={8} md={12}>
                                                    <Row>
                                                        <Col lg={3} md={8}>
                                                            <p style={{ color: "black", fontWeight: "800" }}>Type</p>
                                                            {item?.quantityBasedAmount?.map((item) => {
                                                                return (
                                                                    <p>{item?.type}</p>
                                                                )
                                                            })}
                                                        </Col>
                                                        <Col lg={2} md={6}>
                                                            <p style={{ color: "black", fontWeight: "800" }}>From</p>
                                                            {item?.quantityBasedAmount?.map((item) => {
                                                                return (
                                                                    <p>{item?.from}</p>
                                                                )
                                                            })}
                                                        </Col>
                                                        <Col lg={2} md={4} sm={8}>
                                                            <p style={{ color: "black", fontWeight: "800" }}>To</p>
                                                            {item?.quantityBasedAmount?.map((item) => {
                                                                return (
                                                                    <p>{item?.to}</p>
                                                                )
                                                            })}
                                                        </Col>
                                                        <Col lg={3} md={6}>
                                                            <p style={{ color: "black", fontWeight: "800" }}>Amount</p>
                                                            {item?.quantityBasedAmount?.map((el) => {
                                                                return (
                                                                    <div className='d-flex'>
                                                                        <p style={{ marginLeft: "10px" }}>{el?.amount}</p>
                                                                        {/* <div onClick={() => openModal(el?._id, item?._id)} style={{ marginLeft: "15px", cursor: 'pointer' }}>
                                                                            <Edit color='orange' />
                                                                        </div> */}
                                                                    </div>
                                                                )
                                                            })}

                                                        </Col>
                                                        <Col lg={2}>
                                                            <p style={{ color: "black", fontWeight: "800", display: "flex" }}>Action</p>

                                                            {item?.quantityBasedAmount?.map((el) => (
                                                                <div className='d-flex' key={el?._id}>
                                                                    <Col lg={2}>
                                                                        <div onClick={() => openModal(el?._id, item?._id)} style={{ cursor: 'pointer', marginLeft: "20%", paddingBottom: "13px", }}>
                                                                            <Edit2 />
                                                                        </div>
                                                                    </Col>
                                                                </div>
                                                            ))}
                                                            <div className='d-flex justify-content-end mt-1 mb-2'>
                                                                <div className='plus' style={{ cursor: 'pointer' }} onClick={() => openOptionAddModal(item?._id)}>
                                                                    <span className='fw-bold'>  <PlusCircle /> Add</span>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })
                        }
                    </div>
                    <Modal
                        isOpen={modal}
                        toggle={closeModal}
                    >
                        <ModalHeader style={{ background: ' #e4510b', color: 'white' }} toggle={closeModal}>Edit Amount</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit(submitForm)}>
                                <div className='mb-1'>
                                    <Label style={{ fontWeight: "bolder" }}>Rate <span className='text-danger'>*</span></Label>
                                    <Controller
                                        name='amount'
                                        id='amount'
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (<Input type="number" {...field} invalid={errors.amount && true} placeholder="Enter Amount" />)} />
                                    {errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
                                </div>
                                <Button type='submit' className='mt-2' style={{ background: '#e4510b', border: 'none', width: '100%' }}>Sumbit</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    <AddProductType modal={optionModal} toggle={closeOptionModal} bulkData={bulkData} getData={getData} />
                </div >
                <FooterSection />
            </div>
        </div>
    )
}
export default ProductTypeIndex
