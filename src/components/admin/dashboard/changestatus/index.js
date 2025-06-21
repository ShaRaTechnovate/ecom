import React from 'react'
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'react-feather'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Form, FormFeedback, Input, Modal, ModalBody } from 'reactstrap'
import boysicon from '../../../../assets/images/logo/boyicon.png'
import { orderStatus } from '../../../../ApiConfigs/ApiConfig';
import Select, { } from 'react-select';

const ChangestatusPage = ({ handlechange, open, getdata, dataId }) => {
    // const { id } = useParams();

    const formSchema = yup.object().shape({

    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const submitForm = async (data) => {
        const status = data?.status?.value
        try {
            const response = await axios.post(`${orderStatus}/${dataId}`, { ...data, status: status });
            toast.success(response?.data?.msg)
            handlechange()
            getdata()

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }

    }

    // useEffect(() => {
    //     setValue('status', { label: data?.status, value: data?.status })
    //     // setValue('status', { label: data?.status?.name, value: data?.status?.value });
    // }, [data, setValue])

    const sortData = [

        {
            name: "process",
            value: "process"
        },
        {
            name: "delivered",
            value: "delivered"
        },
    ]
    const options = sortData?.map((item) => (
        {
            label: item?.name,
            value: item?.value

        }
    ))

    return (
        <div>
            <Modal isOpen={open} toggle={handlechange} className='sidebar-lg' modalClassName='modal-slide-in sidebar-todo-modal' contentClassName='p-0' style={{ maxWidth: '400px' }}>
                <ModalBody>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <div className='d-flex align-items-center justify-content-between mb-1 px-1' style={{ backgroundColor: '#ffff' }}>
                            <img src={boysicon} style={{ height: '50px', width: '50px' }} alt="adminicon" srcset="" />
                            <h4 className='modal-title' style={{ marginTop: '23px', marginBottom: '23px', paddingLeft: '10px', fontFamily: 'roboto', color: 'black', marginRight: 'auto', font: 'bold' }}>
                                <b>SET STATUS</b>
                            </h4>
                            <X style={{ color: 'black' }} className="fw-normal mt-25" size={25} onClick={handlechange} />
                        </div>
                        <div className='mb-2 d-flex justify-content-center' >

                            <Controller
                                name='status'
                                id='status'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        // defaultValue={data?.status}
                                        options={options}
                                        invalid={errors.status && true}
                                        styles={{

                                            control: (provided) => ({
                                                ...provided,
                                                width: '290px',
                                                background: "#ebeff1",
                                                border: 'none',
                                                borderRadius: '10px'
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                width: '290px',
                                                background: "#ebeff1",
                                                border: 'none',
                                            }),
                                        }}
                                    />
                                )}
                            />
                            {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
                        </div>
                        <div className='mb-1 d-flex justify-content-center'>
                            <Controller
                                name='description'
                                id='description'
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                (<Input style={{
                                    width: '290px',
                                    borderRadius: '10px',
                                    border: '3px solid #ebeff1'
                                }} type="textarea" {...field} invalid={errors.description && true} placeholder="Enter Your description" rows={5} />)} />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                        <div className='text-center mt-4'>
                            <Button style={{ width: '290px' }} color='primary' type='submit'><b> Update</b>
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div >
    );
};

export default ChangestatusPage;