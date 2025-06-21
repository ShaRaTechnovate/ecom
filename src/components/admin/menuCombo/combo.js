import React, { useEffect, useState } from 'react'
import { getOfferProduct, menuProduct, menuProductAd, menusStatus } from '../../../ApiConfigs/ApiConfig';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Edit2, Trash } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Button, Modal, Input, ModalBody, Spinner } from 'reactstrap'
import AddCombo from './AddCombo';
import EditCombo from './EditCombo';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { GrPowerReset } from "react-icons/gr";

function Combo() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editData, setEditData] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [deleteData, setDeleteData] = useState();
    const handleAdd = () => setAddModal(!addModal)
    const [addModal, setAddModal] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [sorts, setSorts] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');



    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength
            ? `${description.slice(0, maxLength)}...`
            : description;
    };


    const menuData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${menuProductAd}?search=${searchKey}&currentPage=${currentPage > 0 ? currentPage - 1 : currentPage}&perPage=${rowsPerPage}&sortBy=${sorts}`)
            setData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }



    const openDeleteModal = (id) => {
        setDeleteData(id);
        setDeleteModal(true);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${menuProductAd}/${deleteData}`)
            closeDeleteModal()
            menuData()
            toast.success(response?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }


    const openEditModal = (id) => {
        getEditModal(id)
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditModal(false);
    };

    const getEditModal = async (id) => {
        try {
            const response = await axios.get(`${menuProductAd}/${id}`)
            setEditData(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }

    }



    useEffect(() => {
        menuData(searchKey)
    }, [sorts, searchKey, currentPage, rowsPerPage])

    const updateStatus = async (id) => {
        try {
            const response = await axios.post(`${menusStatus}/${id}`);
            menuData()
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    };

    const handleReset = () => {
        setSorts('');
        menuData();
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
            minWidth: '50px',
            cell: (row, i) => i + 1,

        },
        {
            name: 'Image',
            sortable: false,
            minWidth: '150px',
            cell: row => <img src={row?.image} height={100} width={150} alt="" style={{ padding: '5px' }} />
        },
        {
            name: 'Name',
            sortable: false,
            minWidth: '250px',
            cell: row => row?.name,
        },
        {
            name: 'Description',
            sortable: false,
            minWidth: '400px',
            cell: row => <span onClick={toggleDescription} className='mt-2 mb-2' style={{ cursor: 'pointer' }}>
                {showFullDescription ? row?.description : truncateDescription(row?.description, 100)}</span>,
        },
        {
            name: 'Status',
            maxWidth: '100px',
            cell: (row) => (
                <>
                    <div class="switch">
                        <Input
                            type="switch"
                            id="switch-success"
                            name="success"
                            onChange={async (e) => {
                                const result = window.confirm(
                                    `Are you sure you want to make as ${row.status === 'active' ? 'Inactive' : 'Active'}`
                                );
                                if (result) {
                                    await updateStatus(row._id);
                                } else {

                                    e.target.checked = !e.target.checked;
                                }
                            }}
                            defaultChecked={row.status === 'active'}
                        />
                    </div>

                </>
            )
        },

        {
            name: "Action",
            minWidth: "200px",
            cell: (row) => (
                <>
                    <div className='Edit me-1' style={{ cursor: 'pointer' }} onClick={() => openEditModal(row?._id)}><Edit2 size={20} /></div>
                    <div className="Trash ms-2 " style={{ cursor: 'pointer' }} onClick={() => openDeleteModal(row?._id)}><Trash size={20} color='red' /></div>
                </>
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

            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div style={{ display: 'flex', marginBottom: '-30px' }}>
                    <h1>MENU PRODUCT'S</h1>
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
                        <button className='addProductBtn' onClick={handleAdd}>Add Menu</button>
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
                        noHeader
                        pagination
                        paginationServer
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='130vh'
                        data={data?.rows}
                        columns={additionalTable}
                        paginationDefaultPage={currentPage}
                        paginationComponent={() => CustomPagination(data?.pagination?.pages)}
                    />
                )}
                {/* add modal */}
                <AddCombo open={addModal} handleAdd={handleAdd} menuData={menuData} />

                {/* edit modal */}
                <EditCombo open={editModal} handleEdit={closeEditModal} editData={editData} menuData={menuData} />
                {/* delete modal */}
                <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
                    <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this menu combo?</ModalBody>
                    <div style={{ justifyContent: 'center' }} className="modal-footer">
                        <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={handleConfirmDelete} >
                            Confirm
                        </Button>
                        <Button color="secondary" onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Combo
