import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Activity, Airplay, CheckCircle, Eye, Loader } from "react-feather";
import { toast } from "react-hot-toast";
import Select from 'react-select';
import { Badge, Button, Card, Col, Input, Label, Row, Spinner } from "reactstrap";
import { orderPost, orderStats } from "../../../ApiConfigs/ApiConfig";
import Navbar from "../../navbar";
import FooterSection from "../../footer";
import { useNavigate, useParams } from "react-router-dom";
import './index.css';
import ReactPaginate from 'react-paginate'
import first from '../../../assets/images/logo/first.png'
import second from '../../../assets/images/logo/second.png'
import third from '../../../assets/images/logo/third.png'
import fourth from '../../../assets/images/logo/fourth.png'
import Flatpickr from 'react-flatpickr'


function DashBoardIndex() {
    const [data, setData] = useState([])
    const [setStats, setSetStats] = useState([])
    const [sorts, setSorts] = useState('')
    const [dayData, setDays] = useState('')
    const [searchData, setSearchData] = useState('')
    const [resetKey, setResetKey] = useState(0);
    const [resetInputKey, setResetInputKey] = useState(0);
    const nagivate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    let formattedDate

    if (dayData != "" && dayData != undefined) {

        const inputDate = new Date(dayData);

        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');

        formattedDate = `${year}-${month}-${day}`;

    }


    const getStatusColor = (status) => {
        switch (status) {
            case 'process':
                return 'warning';
            case 'delivered':
                return 'success';
            case 'ordercompleted':
                return 'primary';
            default:
                return 'danger';
        }
    };

    const sortData = [
        {
            name: "cart",
            value: "cart"
        },
        {
            name: "ordercompleted",
            value: "ordercompleted"
        },
        {
            name: "process",
            value: "process"
        },
        {
            name: "delivered",
            value: "delivered"
        },
    ]

    const dateSort = [
        {
            name: "Today",
            value: "0"
        },
        {
            name: "1 Week",
            value: "7"
        },
        {
            name: "1 Month",
            value: "30"
        },
    ]
    const getdata = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${orderPost}?status=${sorts}&date=${formattedDate == undefined ? "" : formattedDate}&search=${searchData}&currentPage=${currentPage > 0 ? currentPage - 1 : currentPage}&perPage=${rowsPerPage}`)
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }

    const getStage = async () => {
        try {
            const response = await axios.get(orderStats)
            setSetStats(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getdata()

    }, [sorts, dayData, searchData, currentPage])


    useEffect(() => {
        getStage()
    }, [])

    const handleReset = () => {
        setSorts('');
        setDays('');
        setSearchData('');
        getdata();
        setResetKey((prevKey) => prevKey + 1);
        setResetInputKey((prevKey) => prevKey + 1);
    };

    const dataTable = [
        {
            name: 'No',
            minWidth: '50px',
            cell: (row, i) => i + 1,
        },
        {
            name: 'Name',
            sortable: false,
            minWidth: '50px',
            cell: row => row?.personal?.name,
        },
        {
            name: 'Mobile',
            sortable: false,
            minWidth: '50px',
            cell: row => row?.personal?.mobile,
        },
        {
            name: 'Email',
            sortable: false,
            minWidth: '250px',
            cell: row => row?.personal?.email,
        },
        {
            name: 'Date',
            sortable: false,
            minWidth: '100px',
            cell: row => new Date(row?.createdAt).toLocaleDateString()
        },
        {
            name: ' Amount',
            sortable: false,
            minWidth: '50px',
            cell: row => row?.totalAmount,
        },
        {
            name: 'Qty',
            sortable: false,
            minWidth: '50px',
            cell: row => row?.products?.map((el, i) => i + 1).length || 0,
        },
        {
            name: 'Status',
            sortable: false,
            minWidth: '150px',
            cell: (row) => (
                <div >
                    {
                        <Badge style={{ fontSize: '12px', padding: '10px' }} className=''
                            color={getStatusColor(row?.status)}>{row?.status} </Badge>
                    }
                </div>
            )
        },
        {
            name: 'Action',
            sortable: false,
            minWidth: "50px",
            cell: (row) => (
                <div style={{ cursor: "pointer" }} onClick={() => nagivate(`/admin/dashboardViewData/${row?._id}`)}><Eye /></div>
            )
        }
    ];

    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };
    const CustomPagination = (pageCount) => {

        return (
            <>
                <ReactPaginate
                    nextLabel="Next"
                    breakLabel="..."
                    previousLabel="Prev"
                    pageCount={pageCount || 1}
                    activeClassName="active"
                    breakClassName="page-item"
                    pageClassName={'page-item'}
                    breakLinkClassName="page-link"
                    nextLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    nextClassName={'page-item next'}
                    previousLinkClassName={'page-link'}
                    previousClassName={'page-item prev'}
                    onPageChange={(page) => handlePagination(page)}
                    forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                    containerClassName={'pagination react-paginate justify-content-end p-1'}
                />
            </>
        );
    };
    return (
        <>
            <Navbar />
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='pb-4 mt-1'>
                    <h1>Welcome To Your Dashboard!</h1>

                </div>
                <Row className="my-3">
                    <Col lg={3} md={3} sm={6}>
                        <Card style={{ border: "1px solid #0122", boxShadow: ' rgba(0, 0, 0, 0.25) 0px 5px 15px', height: '130px' }}>
                            <div style={{ padding: "5px", }}>
                                <div className="d-flex justify-content-evenly ">
                                    <div style={{ marginTop: '20px' }} >
                                        <img src={first} style={{ height: '75px', width: '75px' }} alt="img" srcset="" />
                                        {/* <Activity size={30} style={{ display: "block", margin: "auto" }} /> */}
                                    </div>
                                    <div style={{ marginTop: '10px', marginRight: '30px' }}>
                                        <h2 className="text-center" >{setStats?.today}</h2>
                                        <p>Today Order</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <Card style={{ border: "1px solid #0122", boxShadow: ' rgba(0, 0, 0, 0.25) 0px 5px 15px', height: '130px' }}>
                            <div style={{ padding: "5px", }}>
                                <div className="d-flex justify-content-evenly">
                                    <div style={{ marginTop: '20px' }}>
                                        <img src={second} style={{ height: '75px', width: '75px' }} alt="img" srcset="" />
                                        {/* <Airplay size={30} style={{ display: "block", margin: "auto" }} /> */}
                                    </div>

                                    <div style={{ marginTop: '10px', marginRight: '30px' }}>
                                        <h2 className="text-center"  >{setStats?.total}</h2>
                                        <p >Total Order</p>
                                    </div>


                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <Card style={{ border: "1px solid #0122", boxShadow: ' rgba(0, 0, 0, 0.25) 0px 5px 15px', height: '130px' }}>
                            <div style={{ padding: "5px", }}>
                                <div className="d-flex justify-content-evenly">
                                    <div style={{ marginTop: '20px' }}>
                                        <img src={third} style={{ height: '75px', width: '75px' }} alt="img" srcset="" />
                                        {/* <Loader size={30} style={{ display: "block", margin: "auto" }} /> */}
                                    </div>
                                    <div style={{ marginTop: '10px', marginRight: '30px' }}>
                                        <h2 className="text-center" >{setStats?.process}</h2>
                                        <p >Process Order</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3} md={3} sm={6}>
                        <Card style={{ border: "1px solid #0122", boxShadow: ' rgba(0, 0, 0, 0.25) 0px 5px 15px', height: '130px' }}>
                            <div style={{ padding: "5px", }}>
                                <div className="d-flex justify-content-evenly">
                                    <div style={{ marginTop: '20px' }}>
                                        <img src={fourth} style={{ height: '75px', width: '75px' }} alt="img" srcset="" />
                                        {/* <CheckCircle size={30} style={{ display: "block", margin: "auto" }} /> */}
                                    </div>
                                    <div style={{ marginTop: '10px', marginRight: '30px' }}>
                                        <h2 className="text-center" >{setStats?.completed}</h2>
                                        <p >Complete Order</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <div style={{ marginTop: "30px", display: "flex" }}>
                    <div>
                        <Label> ORDER STATUS</Label>
                        <Select
                            className="react-select "
                            styles={{
                                menu: provided => ({ ...provided, zIndex: 9999 })
                            }}
                            key={`status${resetKey}`}
                            type='select'
                            options={sortData?.map((item) => ({
                                label: item?.name,
                                value: item?.value
                            }))}
                            placeholder='Select Status'
                            onChange={(selectedOption) => setSorts(selectedOption.value)}
                        />
                    </div>

                    <div style={{ marginLeft: "30px" }}>
                        <Label>FILTER DATE </Label>
                        <Flatpickr
                            options={{ allowInput: true }}
                            className="form-control"
                            placeholder='Select Days'
                            onChange={(selectedDates) => setDays(selectedDates[0])} />


                    </div>
                    <div style={{ marginLeft: "30px" }}>
                        <Label>SEARCH</Label>

                        <Input type="search"
                            key={`search${resetKey}`}
                            onChange={(e => setSearchData(e.target.value))} />

                    </div>

                    <div style={{ marginLeft: "20px", marginTop: "30px" }}>
                        <Button style={{ background: '#e4510b', border: 'none' }} onClick={handleReset}>Reset</Button>
                    </div>

                </div>
                {loading ? (
                    <div style={{ height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            color="primary"
                        >
                            Loading...
                        </Spinner>
                    </div>
                ) : (
                    <div className="mt-5">
                        <DataTable
                            pagination
                            paginationServer
                            noHeader
                            highlightOnHover
                            fixedHeader
                            // fixedHeaderScrollHeight='90vh'
                            data={data?.rows}
                            columns={dataTable}
                            paginationDefaultPage={currentPage}
                            paginationComponent={() => CustomPagination(data?.pagination?.pages)} />
                    </div>
                )}


            </div >

            <FooterSection />
        </>
    )
}
export default DashBoardIndex;