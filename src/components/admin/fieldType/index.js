import React, { useEffect, useState } from 'react'
import { fieldOption, fieldOptionApi, fieldType, fieldTypeApi, fieldTypeApiNew } from '../../../ApiConfigs/ApiConfig';
import DataTable from 'react-data-table-component';
import { Edit2, PlusCircle, Trash } from 'react-feather';
import axios from 'axios'
import './index.css'
import FieldTypeModal from './addmodal';
import { toast } from 'react-hot-toast'
import { Button, Modal, ModalBody, Spinner } from 'reactstrap'
import FieldtypeEdit from './editmodal';
import Navbar from '../../navbar';
import FooterSection from '../../footer';
import FieldOptionsModal from './addOption';
import FieldOptionsEdit from './editOption';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { GrPowerReset } from "react-icons/gr";


function FieldTypeIndex() {

    // Options Add
    const [addModal, setModal] = useState(false);
    const toggleAdd = () => setModal(!addModal);
    const [fieldOptionId, setFieldOptionId] = useState()

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [resetKey, setResetKey] = useState(0);
    const [sorts, setSorts] = useState('')
    const [optionModal, setOptionModal] = useState(false);

    const openOptionAddModal = (id) => {
        setOptionModal(!optionModal);
        setFieldOptionId(id)
    };

    const closeOptionModal = () => {
        setOptionModal(false);
    };

    // Options Edit
    const [editOptionData, setEditOptionData] = useState([])
    // const handleOptionEdit = () => setEditOptionData(!editModal)
    const [editOptionModal, setEditOptionModal] = useState(false)

    const openOptionEditModal = (id) => {
        getOptionEditModal(id)
        setEditOptionModal(true);
    };

    const closeOptionEditModal = () => {
        setEditOptionModal(false);
    };

    const getOptionEditModal = async (id) => {
        try {
            const response = await axios.get(`${fieldOption}/${id}`)
            setEditOptionData(response?.data?.result)
        } catch (error) {
            toast.error(error.response.data.msg)
        }

    }


    // Options Delete
    const [optionDelete, setOptionDelete] = useState(false)
    const [deleteOptionData, setDeleteOptionData] = useState();


    const openOptionDeleteModal = (id) => {
        setDeleteOptionData(id);
        setOptionDelete(true);
    }
    const closeOptionDeleteModal = () => {
        setOptionDelete(false);
    }
    const handleConfirmOptionDelete = async () => {
        try {
            const response = await axios.delete(`${fieldOptionApi}/${deleteOptionData}`)
            closeOptionDeleteModal()
            additionalOptionData()
            toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)

        }

    }


    // over all get field option
    const [optionLoading, setOptionLoading] = useState(false);


    const additionalOptionData = async () => {
        try {
            setOptionLoading(true);
            const response = await axios.get(fieldOption)
            additionalData()
        } catch (error) {
            toast.error(error?.response?.optiondata?.msg)
        } finally {
            setOptionLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            additionalOptionData()
        }

    }, [localStorage.getItem('token')])





    // Over All get field type
    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${fieldType}?search=${searchKey}&currentPage=${currentPage > 0 ? currentPage - 1 : currentPage}&perPage=${rowsPerPage}&sortBy=${sorts}`)
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {

            additionalData()
        }
    }, [localStorage.getItem('token')])

    useEffect(() => {
        additionalData(searchKey)

    }, [sorts, searchKey, currentPage, rowsPerPage])



    // Field Type Delete 
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const openDeleteModal = (id) => {
        setDeleteData(id);
        setDeleteModal(true);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${fieldTypeApi}/${deleteData}`)
            closeDeleteModal()
            additionalData()
            toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }


    // Field Type Edit

    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState('')

    const openEditModal = (row) => {
        setSelectedData(row)
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditModal(false);
    };

    const handleReset = () => {
        setSorts('');
        additionalData();
        setResetKey((prevKey) => prevKey + 1);
        // setResetInputKey((prevKey) => prevKey + 1);
    };

    const categorySortData = [
        {
            name: "latest",
            value: "latest"
        },
        {
            name: "oldest",
            value: "oldest"
        }
    ]


    const additionalTable = [
        {
            name: 'S No',
            minWidth: '2px',
            cell: (row, i) => i + 1,

        },
        {
            name: 'Image',
            sortable: false,
            minWidth: '200px',
            cell: row => <img src={row?.image} height={100} width={150} alt="" style={{ padding: '5px' }} />,
        },
        {
            name: 'Type',
            sortable: false,
            minWidth: '200px',
            cell: row => row?.name,
        },
        {
            name: 'Options',
            sortable: false,
            minWidth: '400px',
            cell: row => (
                <div className='mt-3 mb-3' >
                    {row?.options.map(option => (
                        <div className='d-flex mt-2'>
                            <p className='text-center d-flex' style={{ width: '200px' }} key={option._id}>
                                {option.name}
                            </p>
                            <div className='options-Actions d-flex ms-4'>
                                <div className='Edit cursor-pointer me-2' style={{ cursor: 'pointer' }} onClick={() => openOptionEditModal(option?._id)} ><Edit2 size={20} /></div>
                                <div className='text-danger me-5' style={{ cursor: 'pointer' }} onClick={() => openOptionDeleteModal(option?._id)}> <Trash /> </div>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex justify-content-end mt-1 me-3 mb-2'>
                        <div className='plus' style={{ cursor: 'pointer' }} onClick={() => openOptionAddModal(row?._id)} >
                            <span className='fw-bold'>  <PlusCircle /> Add</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: 'Description',
            sortable: false,
            minWidth: '300px',
            cell: row => row?.description,
        },
        {
            name: "Type Edit",
            minWidth: "100px",
            cell: (row) => (
                <>
                    <div className='Edit me-2' style={{ cursor: 'pointer' }} onClick={() => openEditModal(row)} ><Edit2 size={20} /></div>
                    <div className="Trash" style={{ cursor: 'pointer' }} onClick={() => openDeleteModal(row?._id)}><Trash size={20} color='red' /></div>
                </>
            )

        }
    ]

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
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePagination}
                    containerClassName="pagination justify-content-end p-1"
                    activeClassName="active"
                    pageClassName="page-item"
                    breakClassName="page-item"
                    pageLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    forcePage={currentPage - 1}
                />
            </>
        );
    };


    return (
        <>
            <Navbar />

            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div style={{ display: 'flex', marginBottom: '-30px' }}>
                    <h1>FIELD</h1>
                    <div className='total-count'> {data?.pagination?.total}</div>
                    <div className="ms-4" >
                        <Select
                            className="react-select me-2"
                            styles={{
                                menu: provided => ({ ...provided, zIndex: 9999, }),
                            }}
                            key={`status${resetKey}`}
                            type='select'
                            options={categorySortData?.map((item) => ({
                                label: item?.name,
                                value: item?.value
                            }))}
                            placeholder='Sort By'
                            onChange={(selectedOption) => setSorts(selectedOption.value)}
                        />
                    </div>
                    <div style={{ marginRight: "20px", marginTop: '10px', color: '#e4510b' }}>
                        <GrPowerReset size={25} onClick={handleReset} />
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex' }}>
                        <form className="search me-2"
                        >
                            <input
                                type="text"
                                id="search-bar"
                                placeholder="Search Name"
                                onChange={(e) => setSearchKey(e.target.value)}
                                style={{ color: 'black', borderColor: 'black', paddingRight: '50px' }}
                            />
                            <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
                        </form>
                        <button className='productCategoryBtn' onClick={toggleAdd}>Add Field Type</button>
                    </div>
                </div>
                {loading ? (
                    <div style={{ height: "50vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            color="primary"
                        >
                            Loading...
                        </Spinner>
                    </div>
                ) : (
                    <DataTable
                        pagination
                        paginationServer
                        noHeader
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='130vh'
                        data={data?.rows}
                        columns={additionalTable}
                        paginationDefaultPage={currentPage}
                        paginationComponent={() => CustomPagination(data?.pagination?.pages)}
                    />
                )}
            </div >


            <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
                {/* <ModalHeader style={{ paddingLeft: '20px', fontFamily: 'italic', textAlign: 'center' }} toggle={closeDeleteModal}>Confirm Delete</ModalHeader> */}
                <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Field?</ModalBody>
                <div style={{ justifyContent: 'center' }} className="modal-footer">
                    <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={handleConfirmDelete} >
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={closeDeleteModal} >
                        Cancel
                    </Button>
                </div>
            </Modal>

            {/* Option Add ,Edit % Delete */}
            <FieldOptionsModal modal={optionModal} toggle={closeOptionModal} additionalData={additionalData} fieldId={fieldOptionId} />
            <FieldOptionsEdit open={editOptionModal} handleEdit={closeOptionEditModal} editData={editOptionData} additionalData={additionalData} />

            <Modal isOpen={optionDelete} toggle={closeOptionDeleteModal} className="modal-dialog-centered modal-xs">
                <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Option?</ModalBody>
                <div style={{ justifyContent: 'center' }} className="modal-footer">
                    <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={handleConfirmOptionDelete} >
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={closeOptionDeleteModal} >
                        Cancel
                    </Button>
                </div>
            </Modal>


            {/* Field Type Add & Edit */}
            <FieldTypeModal modal={addModal} toggle={toggleAdd} additionalData={additionalData} />
            <FieldtypeEdit open={editModal} handleEdit={closeEditModal} editData={selectedData} additionalData={additionalData} />


            <FooterSection />
        </>
    )
}

export default FieldTypeIndex
