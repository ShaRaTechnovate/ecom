import React from 'react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap'
import logo from '../../../assets/images/logo/printon logo-01.png'
import dammy from '../../../assets/images/logo/dammy.jpg'
import logopng from '../../../assets/images/logo/logo.png'
import { orderPost } from '../../../ApiConfigs/ApiConfig';


function PrintoutPage({ data }) {
    const { id } = useParams();
    const [data1, setData] = useState([])

    const getdata = async () => {
        try {
            const response = await axios.get(`${orderPost}/${id}`)
            setData(response?.data?.result)
            // toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <>
            <div id='printing-content'>
                <div className='container'>
                    <div style={{ marginTop: '30px' }} >
                        <Row>
                            <Col lg={4}>
                                <div >
                                    <b><h2>Tax Invoice</h2></b>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div>
                                    <h5>Order Id :OD32546635636100</h5>
                                    <h5>Order Date :21-05-2024,07:10 <span>AM</span></h5>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div>
                                    <h5>Invoice No:7624667764567</h5>
                                    <h5>Invoice Date:21-05-2023,07:10<span>AM</span> </h5>
                                </div>
                            </Col>
                        </Row>

                    </div>
                    <hr />

                    <div style={{ marginTop: '50px' }}>
                        <Row>

                            <Col lg={4}>


                            </Col>



                            <Col lg={4}>

                                <h5>SHIPPING ADDRESS</h5>
                                <div style={{ marginTop: '20px' }}>
                                    <p>
                                        <span >Address :</span> <span> {data?.shipping?.address} </span>
                                        <span>{data?.shipping?.landmark}</span>,
                                        <span>{data?.shipping?.locality}</span>,
                                        <span>{data?.shipping?.city}</span>,
                                        <span>{data?.shipping?.state}</span>
                                    </p>
                                    <p>LANDMARK:  <span> {data?.shipping?.landmark} </span></p>
                                    <p>PINCODE:   <span> {data?.shipping?.pincode} </span></p>
                                    <p>MOBILE NUMBER: <span> {data?.shipping?.alternateMobile} </span>  </p>
                                </div>
                            </Col>


                            <Col lg={4}>

                                <h5>BILLING ADDRESS</h5>
                                <div style={{ marginTop: '20px' }}>
                                    <p>
                                        <span >Address :</span> <span> {data?.shipping?.address} </span>
                                        <span>{data?.shipping?.landmark}</span>,
                                        <span>{data?.shipping?.locality}</span>,
                                        <span>{data?.shipping?.city}</span>,
                                        <span>{data?.shipping?.state}</span>
                                    </p>
                                    <p>LANDMARK:  <span> {data?.shipping?.landmark} </span></p>
                                    <p>PINCODE:   <span> {data?.shipping?.pincode} </span></p>
                                    <p>MOBILE NUMBER: <span> {data?.shipping?.alternateMobile} </span>  </p>
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <Row>
                            <Col lg={12}>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Taxable Value</th>
                                            <th>DISCOUNT</th>
                                            <th>IGST</th>
                                            <th>Total</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.products && data.products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{product?.product?.name}</td>
                                                <td>{product?.singlePrice?.toFixed(2)}</td>
                                                <td>{product?.quantity}</td>
                                                <td>{product?.taxableAmount?.toFixed(2)}</td>
                                                <td>{product?.discountAmount}</td>
                                                <td>
                                                    {data?.shipping?.state === 'Karnataka' ? (
                                                        // Render IGST for Karnataka
                                                        product?.IGST?.toFixed(2)
                                                    ) : (
                                                        // Render GST for other states (assuming SGST + CGST)
                                                        (product?.SGST + product?.CGST)?.toFixed(2)
                                                    )}
                                                </td>
                                                <td>{product?.total?.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    {/* Add more rows as needed */}

                                </table>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ paddingBottom: '80px', marginRight: '30px' }} className="d-flex justify-content-end" >
                        <Label>
                            {/* <span style={{ color: 'gray' }}>SHIPPING AMOUNT: {data?.totalAmount} </span><br /> */}
                            <span style={{ color: 'gray' }}>GRAND TOTAL: {data?.totalAmount} </span>
                        </Label>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p>Seller Registered Address: Defender,<br />
                            <p>No. 01/A, 5th A Cross, 24th Main,<br /> Manjunatha Colony , Karnataka, 560078
                            </p>
                            <b> Declaration</b><br />
                            The goods sold are intended for end user consumption and not for resale.
                        </p>
                    </div>
                    <div className="d-flex">
                        <div>
                            <img src={logo} alt="Logo" style={{ width: '200px', height: '100px' }} />
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <img src={dammy} alt="Logo" style={{ width: '100x', height: '100px' }} />
                            <p>Defender
                                Authorized
                                Signature</p>
                        </div>

                    </div>


                </div>

            </div >


        </>
    )
}

export default PrintoutPage