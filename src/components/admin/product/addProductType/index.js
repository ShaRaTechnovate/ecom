import React from 'react';
import './index.css';
import { Modal, ModalBody, ModalHeader, Form, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import { addQuantityBasedAmount } from '../../../../ApiConfigs/ApiConfig';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


function AddProductType({ modal, toggle, bulkData, getData }) {
    const formSchema = yup.object().shape({
        quantityBasedAmount: yup.array().of(
            yup.object().shape({
                from: yup.number().required('Quantity From is required'),
                to: yup.number().required('Quantity To is required'),
                amount: yup.number().required('Amount is required'),
                type: yup.string().required('Type is required'),
            })
        ),
    });


    const { handleSubmit, control, formState: { errors }, setValue, reset } = useForm({

        defaultValues: {
            quantityBasedAmount: [{}],
        },
        resolver: yupResolver(formSchema),

    });

    const submitForm = async (data) => {
        const payload = {
            from: data.quantityBasedAmount[0]?.from,
            to: data.quantityBasedAmount[0]?.to,
            amount: data.quantityBasedAmount[0]?.amount,
            type: data.quantityBasedAmount[0]?.type
        };
        try {
            const response = await axios.put(`${addQuantityBasedAmount}/${bulkData}`, payload);
            toast.success(response?.data?.msg);
            reset();
            toggle();
            getData();
        } catch (error) {
            toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg)
        }
    };

    const quantityBasedAmountType = [
        {
            name: "recomended",
            value: "recomended"
        },
        {
            name: "general",
            value: "general"
        },
        {
            name: "bestprice",
            value: "bestprice"
        },
        {
            name: "bulckprice",
            value: "bulckprice"
        },
    ];

    const quantityBasedType = quantityBasedAmountType?.map((item) => ({
        label: item?.name,
        value: item?.value,
    }));

    const { fields: quantityBasedAmountFields } = useFieldArray({
        control,
        name: 'quantityBasedAmount',
    });

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader className='add-modal-header' toggle={toggle}>Add Quantity Based Amount</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-1">
                        {quantityBasedAmountFields.map((field, index) => (
                            <div key={field._id}>

                                <div className='mb-3'>
                                    <Label style={{ fontWeight: "bolder" }}>Quantity From<span className='text-danger'>*</span></Label>
                                    <Controller
                                        name={`quantityBasedAmount[${index}].from`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                {...field}
                                                invalid={errors?.quantityBasedAmount?.[index]?.from && true}
                                                placeholder="Enter Quantity From"
                                            />
                                        )}
                                    />

                                    {errors?.quantityBasedAmount?.[index]?.from && <FormFeedback>{errors?.quantityBasedAmount?.[index]?.from.message}</FormFeedback>}
                                </div>

                                <div className='mb-3'>
                                    <Label style={{ fontWeight: "bolder" }}>Quantity To<span className='text-danger'>*</span></Label>
                                    <Controller
                                        name={`quantityBasedAmount[${index}].to`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input type="number"
                                                {...field}
                                                invalid={errors?.quantityBasedAmount?.[index]?.to && true}
                                                placeholder="Enter Quantity To" />
                                        )} />
                                    {errors?.quantityBasedAmount?.[index]?.to && <FormFeedback>{errors?.quantityBasedAmount?.[index]?.to.message}</FormFeedback>}
                                </div>

                                <div className='mb-3'>
                                    <Label style={{ fontWeight: "bolder" }}>Amount<span className='text-danger'>*</span></Label>
                                    <Controller
                                        name={`quantityBasedAmount[${index}].amount`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input type="number"
                                                {...field}
                                                invalid={errors?.quantityBasedAmount?.[index]?.amount && true}
                                                placeholder="Enter Your Amount" />
                                        )} />
                                    {errors?.quantityBasedAmount?.[index]?.amount && <FormFeedback>{errors?.quantityBasedAmount?.[index]?.amount.message}</FormFeedback>}
                                </div>

                                <div className='mb-3'>
                                    <Label style={{ fontWeight: "bolder" }}>Type</Label>
                                    <Controller
                                        name={`quantityBasedAmount[${index}].type`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isSearchable={false}
                                                options={quantityBasedType}
                                                value={quantityBasedType.find(option => option.value === field.value)}
                                                onChange={(selectedOption) => setValue(`quantityBasedAmount[${index}].type`, selectedOption.value)}
                                                isInvalid={errors?.quantityBasedAmount?.[index]?.type && true}
                                            />
                                        )}
                                    />
                                    {errors?.quantityBasedAmount?.[index]?.type && errors?.quantityBasedAmount?.[index]?.type?.name && (
                                        <FormFeedback>{errors?.quantityBasedAmount?.[index]?.type?.name.message}</FormFeedback>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                    <Button type="submit" className="mt-1 add-modal-btn">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default AddProductType;