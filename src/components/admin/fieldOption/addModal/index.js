// import React, { useEffect, useRef, useState } from 'react';
// import { Upload, X } from 'react-feather'
// import * as yup from "yup";
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody } from 'reactstrap'
// import { toast } from 'react-hot-toast';
// import Select, { components } from 'react-select';
// import { uploadImage } from '../../upload';
// import { fieldOption, fieldOptionApi, fieldType } from '../../../../ApiConfigs/ApiConfig';


// function FieldOptionModal({ modal, toggle, additionalData }) {
//     const inputRef = useRef(null);
//     const [profileImageUrl, setProfileImageUrl] = useState('');
//     const [data, setData] = useState([])

//     const formSchema = yup.object().shape({
//         // name: yup.string().required('Please Enter Categoty Name'),
//         // description: yup.string().required('Please Enter Your description'),

//     })
//     const {
//         reset,
//         control,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

//     const handleRest = () => {
//         reset({
//             description: "",
//             name: "",
//             image: "",
//             status: "",
//         })
//     }


//     const submitForm = async (data) => {
//         delete data.image
//         const image = profileImageUrl
//         const fieldType = data?.fieldType?.value
//         try {
//             const response = await axios.post(fieldOptionApi, { ...data, image, fieldType })
//             toggle()
//             toast.success(response?.data?.result?.msg)
//             additionalData()
//         } catch (error) {
//             toast.error(error.response.data.msg)
//         }
//     }

//     const handleProfileUpload = async (e) => {
//         if (e.target.files) {
//             try {
//                 const formData = new FormData();
//                 formData.append('file', e.target.files[0]);

//                 const uploadData = await uploadImage(formData);
//                 if (uploadData && uploadData.result && uploadData.result.length) {
//                     setProfileImageUrl(uploadData.result[0].location);

//                 }
//             } catch (error) {
//                 toast.error('Something went wrong...');
//             }
//         }
//     };

//     const getFieldOption = async () => {
//         try {
//             const response = await axios.get(fieldType)
//             setData(response?.data?.result)
//         } catch (error) {
//             toast.error(error.response.data.msg)
//         }
//     }



//     const options = data?.map((item) => (
//         {
//             label: item?.name,
//             value: item?._id
//         }
//     ))

//     useEffect(() => {
//         getFieldOption()
//     }, [])

//     return (
//         <div>

//             <Modal isOpen={modal} toggle={toggle}>

//                 <div className="d-flex align-items-center justify-content-between mb-1 px-1" style={{ backgroundColor: '#e4510b' }}>
//                     <h4 className="modal-title" style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'white' }}>
//                         Add Field Option
//                     </h4>
//                     <X style={{ color: 'white' }} className="fw-normal mt-25" size={25} onClick={toggle} />
//                 </div>
//                 <ModalBody className='flex-grow-1'>
//                     <Form onSubmit={handleSubmit(submitForm)}>

//                         <div className='mb-1'>
//                             <Label>Field Type</Label>
//                             <Controller
//                                 name='fieldType'
//                                 id='fieldType'
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) =>
//                                 (
//                                     <Select
//                                         type="select"
//                                         {...field}
//                                         options={options}
//                                         invalid={errors.fieldType && true} >
//                                     </Select>
//                                 )} />
//                             {errors.fieldType && <FormFeedback>{errors.fieldType.message}</FormFeedback>}
//                         </div>


//                         <div className='mb-1 mt-3'>
//                             <Label className='modal-label'>Name</Label>
//                             <Controller
//                                 name='name'
//                                 id='name'
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (<Input type="text" {...field} invalid={errors.name && true} placeholder="Enter Categoty Name" />)} />
//                             {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
//                         </div>

//                         <div className='mb-1'>
//                             <Label className='modal-label'>Description</Label>
//                             <Controller
//                                 name='description'
//                                 id='description'
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (<Input type="text" {...field} invalid={errors.description && true} placeholder="Enter Your description" />)} />
//                             {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
//                         </div>



//                         <div className="mb-5 mt-3 ">


//                             <Controller
//                                 name='image'
//                                 id='image'
//                                 control={control}
//                                 defaultValue=''
//                                 render={({ field }) => (<div className="d-flex" style={{ cursor: 'pointer' }}>
//                                     <input style={{ display: 'none' }} id="image" type="file" {...field} invalid={errors.image && true} ref={inputRef} onChange={handleProfileUpload} />
//                                     <Button
//                                         style={{ backgroundColor: '#E4510B', border: 'none' }}
//                                         color="primary"
//                                         onClick={() => {
//                                             inputRef?.current?.click();
//                                         }}
//                                     >
//                                         <Upload size={15} />
//                                         Upload
//                                     </Button>
//                                     {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
//                                 </div>)} />


//                         </div>
//                         <hr></hr>

//                         <button className='mt-1 add-modal-btn' type='submit'>Submit</button>
//                     </Form >
//                 </ModalBody>

//             </Modal>

//         </div>
//     );
// }

// export default FieldOptionModal;