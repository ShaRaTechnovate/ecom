import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label, Button, Badge, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast';
import axios from 'axios';
import { orderPost } from '../../../ApiConfigs/ApiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../navbar';
import FooterSection from '../../footer';
import contact1 from '../../../assets/images/logo/contact1.png'
import shop1 from '../../../assets/images/logo/shop1.png'
import payment1 from '../../../assets/images/logo/payment1.png'
import note1 from '../../../assets/images/logo/note1.png'
import product from '../../../assets/images/logo/product.png'
// import logo from '../../../assets/images/logo/printon logo-01.png'
// import dammy from '../../../assets/images/logo/dammy.jpg'
import DataTable from "react-data-table-component";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './index.css'
import PrintoutPage from './printout';
import ChangestatusPage from './changestatus';


function DashBoardViewPage() {

    const { id } = useParams();
    const [data, setData] = useState([])
    const [pdffile, setpdffile] = useState('')
    const navigate = useNavigate()

    const handlechange = () => setAddModal(!addModal)

    const [addModal, setAddModal] = useState(false);

    const formSchema = yup.object().shape({
    })

    const {
        setValue,
    } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });



    const getdata = async () => {
        try {
            const response = await axios.get(`${orderPost}/${id}`)
            setData(response?.data?.result)
            setpdffile(response?.data?.result?.invoice)
            // toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    useEffect(() => {
        getdata();
    }, [])

    // const handleprint = async () => {
    //     try {
    //         const response = await axios.get(`${orderPost}/${id}`)

    //     } catch (error) {
    //         toast.error(error.response.data.msg)
    //     }
    // }


    // const sortData = [
    //     {
    //         name: "cart",
    //         value: "cart"
    //     },
    //     {
    //         name: "ordercompleted",
    //         value: "ordercompleted"
    //     },
    //     {
    //         name: "process",
    //         value: "process"
    //     },
    //     {
    //         name: "delivered",
    //         value: "delivered"
    //     },
    // ]

    const getStatusColor = (paymentStatus) => {
        switch (paymentStatus) {
            case 'PAID':
                return 'success';
            case 'UNPAID':
                return 'danger';
            default:
                return 'danger';
        }
    };

    // const options = sortData?.map((item) => (
    //     {
    //         label: item?.name,
    //         value: item?.value

    //     }
    // ))


    // const submitForm = async (data) => {
    //     const status = data.status.value
    //     try {
    //         const response = await axios.post(`${orderStatus}/${id}`, { status: status });
    //         toast.success(response?.data?.msg)
    //         getdata()
    //     } catch (error) {
    //         toast.error(error?.response?.msg)
    //     }
    // }

    // let totalAmount = data?.products ? data.products.reduce((total, product) => total + (product?.IGST || 0), 0).toFixed(2) : '0.00'
    let totalAmount = data?.totalGst

    useEffect(() => {
        setValue('status', { label: data?.status, value: data?.status })
    }, [data, setValue])
    const customStyles = {
        rows: {
            style: {
                backgroundColor: '#ffffff',
                color: 'black'
            },
        },
        headCells: {
            style: {
                backgroundColor: '#ebeff1',
            },
        },
        cells: {
            style: {
                color: 'black',
            },
        },
    };

    let dataTable = [
        {
            name: ' No',
            minWidth: '50px',
            cell: (row, i) => i + 1,
        },
        {
            name: 'Product Image',
            sortable: false,
            minWidth: '150px',
            cell: row => {
                const productpic = row?.file?.length > 0 ? row.file[0] : 'N/A';
                return <img src={productpic} alt="Product Image" style={{ width: '50px', height: '50px', padding: '5px' }} />;
            },
        },
        {
            name: 'Product Name',
            sortable: false,
            minWidth: '150px',
            cell: row => row?.product?.name,
        },
        {
            name: 'Unit Price',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.singlePrice ? row.singlePrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },

        {
            name: 'Quantity',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.quantity ? row.quantity.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
        {
            name: 'Amount',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.grossAmount ? row.grossAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
        {
            name: 'Discount',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.discountAmount ? row.discountAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
        {
            name: 'Taxable Value',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.taxableAmount ? row.taxableAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
        {
            name: 'IGST',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.IGST ? row.IGST.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
        {
            name: 'Total',
            sortable: false,
            minWidth: '150px',
            cell: row => (row?.total ? row.total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            }) : '0.00')
        },
    ]



    if (data?.shipping?.state === 'Karnataka') {
        dataTable = [
            {
                name: ' No',
                minWidth: '50px',
                cell: (row, i) => i + 1,
            },
            {
                name: 'Product Image',
                sortable: false,
                minWidth: '150px',
                cell: row => {
                    const productpic = row?.file?.length > 0 ? row.file[0] : 'N/A';
                    return <img src={productpic} alt="Product Image" style={{ width: '50px', height: '50px', padding: '5px' }} />;
                },
            },
            {
                name: 'Product Name',
                sortable: false,
                minWidth: '150px',
                cell: row => row?.product?.name,
            },
            {
                name: 'Unit Price',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.singlePrice ? row.singlePrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },

            {
                name: 'Quantity',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.quantity ? row.quantity.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },


            {
                name: 'Amount',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.grossAmount ? row.grossAmount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
            {
                name: 'Discount',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.discountAmount ? row.discountAmount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
            {
                name: 'Taxable Value',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.taxableAmount ? row.taxableAmount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
            {
                name: 'SGST',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.SGST ? row.SGST.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
            {
                name: 'CGST',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.CGST ? row.CGST.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
            {
                name: 'Total',
                sortable: false,
                minWidth: '150px',
                cell: row => (row?.total ? row.total.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                }) : '0.00')
            },
        ];
        // totalAmount = data?.products ? data.products.reduce((total, product) => total + (product?.SGST + product?.CGST || 0), 0).toFixed(2) : '0.00'
        totalAmount = data?.totalGst
    }
    return (
        <>
            <Navbar />
            <span className='d-none'><PrintoutPage data={data} /></span>
            <div className='container mt-5' style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: '#000',
                borderRadius: '10px',
                boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.12)',
                padding: '30px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px' }}>
                    <div style={{}}>
                        <p className='pt-3' style={{ cursor: 'pointer', marginLeft: '10px' }}><span onClick={() => navigate('/')}>Home</span> / <span onClick={() => navigate('/admin/dashboard')}>Dashboard</span></p>
                        <div>
                            <b> <h1>Order Details</h1></b>
                        </div>
                    </div>


                    <div style={{ marginLeft: 'auto' }}>
                        <Button color='primary' onClick={handlechange}>CHANGE STATUS</Button>
                        <ChangestatusPage open={addModal} handlechange={handlechange} getdata={getdata} dataId={id} />
                    </div>
                </div>
                <div id="invoice-container" >

                    <div style={{ marginLeft: '10px', marginTop: '30px' }} >
                        <Row>
                            <Col lg={4} >

                                <div>
                                    <Label>
                                        <p style={{ color: 'gray' }}>DATE<span style={{ color: 'black', marginLeft: '45px' }}>: {new Date(data?.createdAt).toLocaleDateString()}</span></p>
                                        <span style={{ color: 'gray', fontSize: '15px' }}></span>
                                        <span> </span>
                                    </Label>
                                </div>
                                <div >
                                    <Label>
                                        <p style={{ color: 'gray' }}>ORDER ID<span style={{ color: 'black', marginLeft: '10px' }}>: {data?._id}</span></p>
                                        {/* <span style={{ color: 'gray', fontSize: '15px' }}> </span>
                                        <span>  </span> */}
                                    </Label>
                                </div>

                            </Col>
                            <Col lg={4} >
                                <div >
                                    <Label>
                                        <p style={{ color: 'gray' }}>GST NO<span style={{ color: 'black', marginLeft: '60px' }}>: {data?._id}</span></p>
                                        {/* <span style={{ color: 'gray', fontSize: '15px' }}> </span>
                                        <span>  </span> */}
                                    </Label>
                                </div>
                                <div>
                                    <Label>
                                        <p style={{ color: 'gray' }}>INVOICE NO<span style={{ color: 'black', marginLeft: '25px' }}>: {data?.invoiceNo}</span></p>
                                        <span style={{ color: 'gray', fontSize: '15px' }}></span>
                                        <span> </span>
                                    </Label>
                                </div>
                                <div>
                                    <Label>
                                        <p style={{ color: 'gray' }}>INVOICE DATE<span style={{ color: 'black', marginLeft: '10px' }}>: {data?.invoiceNo}</span></p>
                                        <span style={{ color: 'gray', fontSize: '15px' }}></span>
                                        <span> </span>
                                    </Label>
                                </div>


                            </Col>
                            <Col lg={4} >
                                <div >
                                    <Label>
                                        <p >PRINTON INDIA PRIVATE LIMITED</p>
                                        <p >No. 01/A, 5th A Cross, 24th Main, Manjunatha Colony, JP Nagar 2nd
                                            Phase, Bangalore, Bengaluru (Bangalore) Rural, Karnataka, 560078</p>

                                    </Label>
                                </div>
                                {/* <div>
                                    <Label>
                                        <p style={{ color: 'gray' }}>INVOIVE ID<span style={{ color: 'black', marginLeft: '20px' }}>: {new Date(data?.createdAt).toLocaleDateString()}</span></p>
                                        <span style={{ color: 'gray', fontSize: '15px' }}></span>
                                        <span> </span>
                                    </Label>
                                </div> */}


                            </Col>

                        </Row>
                    </div>
                    <hr></hr>
                    <div >
                        <div >
                            <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center' }}>
                            </div>
                            <div className='mt-5'>
                                <Row>
                                    <Col lg={4} >
                                        <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center' }}>
                                            <img src={contact1} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                                            <h5 style={{ marginRight: '5px' }}>CUSTOMER INFO</h5>
                                        </div>
                                        <div className=' mt-3 ' style={{ marginLeft: '10px' }}>
                                            <div className='mb-1 d-flex' >
                                                <Label>
                                                    <span style={{ color: 'gray' }}>Name :</span>
                                                    <span> {data?.personal?.name} </span>
                                                </Label>
                                            </div>
                                            <div className='mb-1 d-flex' >
                                                <Label>
                                                    <span style={{ color: 'gray' }}>Email :</span> <span> {data?.personal?.email} </span>
                                                </Label>
                                            </div>
                                            <div className='mb-1 d-flex' >
                                                <Label>
                                                    <span style={{ color: 'gray' }}>Mobile :</span> <span> {data?.personal?.mobile} </span>
                                                </Label>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} >
                                        <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center' }}>
                                            <img src={shop1} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                                            <h5 style={{ marginRight: '5px' }}>SHIPPING INFO</h5>
                                        </div>
                                        <div className='mt-3' style={{ marginLeft: '10px' }}>
                                            <div className='mb-1 ' >
                                                <Label style={{ maxWidth: '250px', minWidth: '250px' }} >
                                                    <span style={{ color: 'gray' }}>Address :</span> <span> {data?.shipping?.address} </span>
                                                    <span>{data?.shipping?.landmark}</span>,
                                                    <span>{data?.shipping?.locality}</span>,
                                                    <span>{data?.shipping?.city}</span>,
                                                    <span>{data?.shipping?.state}</span>
                                                </Label><br />
                                                <Label>
                                                    <span style={{ color: 'gray' }}>LandMark :</span>
                                                    <span> {data?.shipping?.landmark} </span>
                                                </Label>  <br />

                                                <Label>
                                                    <span style={{ color: 'gray' }}>Pincode :</span>
                                                    <span> {data?.shipping?.pincode} </span>
                                                </Label> <br />

                                                <Label>
                                                    <span style={{ color: 'gray' }}>Mobile Number :</span>
                                                    <span> {data?.shipping?.alternateMobile} </span>
                                                </Label> <br />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4} >
                                        <div >
                                            <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center', }}>
                                                <img src={payment1} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                                                <h5 style={{ marginRight: '5px' }}>PAYMENT INFO</h5>
                                            </div>
                                            <div className='mt-3' style={{ marginLeft: '10px' }}>
                                                <div>
                                                    <Label>
                                                        <span style={{ color: 'gray' }}>Payment Method :</span>
                                                        <span> {data?.payment?.mode} </span>
                                                    </Label>
                                                </div>
                                                <div className='mb-1 '>
                                                    <Label>
                                                        <span style={{ color: 'gray' }}>Payment Status :</span>
                                                        <span>

                                                            <Badge className='Customer-Badge'
                                                                color={getStatusColor(data?.paymentStatus)}>{data?.paymentStatus}</Badge>
                                                        </span>
                                                    </Label>
                                                </div>
                                                <div>
                                                    <Label>
                                                        <span style={{ color: 'gray' }}>Total Payment :</span>
                                                        <span>{data?.totalAmount ? data.totalAmount.toLocaleString("en-IN", {
                                                            style: "currency",
                                                            currency: "INR",
                                                        }) : '0.00'}</span>
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center' }}>
                        <img src={product} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                        <h5 style={{ fontFamily: 'Roboto, sans-serif', marginTop: '10px' }}>PRODUCT DETAILS</h5>
                    </div>
                    <div className="mt-4" style={{ paddingBottom: '30px' }}>
                        <DataTable
                            noHeader
                            highlightOnHover
                            fixedHeader
                            fixedHeaderScrollHeight='450px'
                            data={data?.products}
                            columns={dataTable}
                            customStyles={customStyles}
                            responsive={true}
                        // columns={modifiedColumns}
                        />
                    </div>
                    <div>
                        <div style={{ paddingBottom: '80px', marginRight: '30px' }} className="d-flex justify-content-end" >
                            <Label>
                                {/* <p style={{ color: 'gray' }}> TOTAL AMOUNT<span style={{ marginLeft: '20px' }}>: ₹{data?.products ? data.products.reduce((total, product) => total + (product?.total || 0), 0).toFixed(2) : '0.00'}
                                </span></p>
                                <p style={{ color: 'gray' }}> TOTAL DISCOUNT<span style={{ marginLeft: '10px' }}>: ₹{data?.products ? data.products.reduce((total, product) => total + (product?.discountAmount || 0), 0).toFixed(2) : '0.00'}
                                </span></p> */}
                                <p style={{ color: 'gray' }}> TOTAL AMOUNT
                                    <span style={{ marginLeft: '20px' }}>: ₹{data?.totalGrossAmount ? data.totalGrossAmount.toLocaleString('en-IN') : '000'}</span>
                                </p>

                                <p style={{ color: 'gray' }}> TOTAL DISCOUNT
                                    <span style={{ marginLeft: '10px' }}>: ₹{data?.totalDiscount ? data.totalDiscount.toLocaleString('en-IN') : '000'}</span>
                                </p>

                                {data?.shipping?.state === 'Karnataka' ?
                                    <p style={{ color: 'gray' }}> TOTAL SGST/CGST<span style={{ marginLeft: '8px' }}>: ₹{totalAmount}</span></p>
                                    :
                                    <p style={{ color: 'gray' }}> TOTAL IGST<span style={{ marginLeft: '58px' }}>: ₹{totalAmount}</span></p>
                                }
                                < p style={{ color: 'gray' }}>GRAND TOTAL<span style={{ marginLeft: '35px' }}>: ₹{data?.totalAmount ? data.totalAmount.toFixed(2) : '0.00'}</span></p>
                            </Label>
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '80px' }}>
                    <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', alignItems: 'center' }}>
                        <img src={note1} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                        <h5 style={{ marginRight: '5px' }}>ORDER STATUS</h5>

                        <div style={{ marginLeft: 'auto' }}>
                            <Button color='primary'>
                                <a className='text-decoration-none' style={{ color: 'white' }} target='_blank' href={pdffile} type="button">Download Invoice </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <Row>
                        <Col lg={12}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>STATUS</th>
                                        <th>DATE</th>
                                        <th>DESCRIPTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.tracking?.map((track, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><p>{track?.status}</p></td>
                                            <td><p>{new Date(track?.date).toLocaleDateString()}</p></td>
                                            <td><p>{track?.description}</p></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>

            </div >
            <hr></hr>
            <FooterSection />
        </>
    )
}

export default DashBoardViewPage
