// import React, { useEffect, useState } from 'react'
// import { fieldOption, fieldOptionApi, fieldType } from '../../../ApiConfigs/ApiConfig';
// import DataTable from 'react-data-table-component';
// import { Edit2, Trash } from 'react-feather';
// import axios from 'axios'
// import './index.css'
// import { toast } from 'react-hot-toast'
// import { Button, Card, Input, Modal, ModalBody, } from 'reactstrap'
// import FieldOptionEdit from './editModal';
// import FieldTypeModal from '../fieldType/addmodal';
// import FieldOptionModal from './addModal';
// import Navbar from '../../navbar';
// import FooterSection from '../../footer';


// function FieldOptionIndex() {
//     const [addModal, setModal] = useState(false);
//     const toggleAdd = () => setModal(!addModal);

//     // edit

//     const [editData, setEditData] = useState([])

//     const handleEdit = () => setEditData(!editModal)
//     const [editModal, setEditModal] = useState(false)
//     //

//     const [deleteModal, setDeleteModal] = useState(false);
//     const [deleteData, setDeleteData] = useState();

//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState();
//     const [selectedData, setSelectedData] = useState('')

//     const additionalData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(fieldOption)
//             setData(response?.data?.result)
//         } catch (error) {
//             toast.error(error?.response?.data?.msg)
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             additionalData()
//         }

//     }, [localStorage.getItem('token')])



//     const openDeleteModal = (id) => {
//         setDeleteData(id);
//         setDeleteModal(true);
//     }
//     const closeDeleteModal = () => {
//         setDeleteModal(false);
//     }
//     const handleConfirmDelete = async () => {
//         try {
//             const response = await axios.delete(`${fieldOptionApi}/${deleteData}`)
//             closeDeleteModal()
//             additionalData()
//             toast.success(response?.data?.result?.msg)
//         } catch (error) {
//             toast.error(error?.response?.data?.msg)

//         }

//     }


//     const openEditModal = (id) => {
//         getEditModal(id)
//         // setSelectedData(row)
//         setEditModal(true);
//     };

//     const closeEditModal = () => {
//         setEditModal(false);
//     };

//     const getEditModal = async (id) => {
//         try {
//             const response = await axios.get(`${fieldOption}/${id}`)
//             setEditData(response?.data?.result)
//         } catch (error) {
//             toast.error(error.response.data.msg)
//         }

//     }

//     const additionalTable = [
//         {
//             name: 'S No',
//             minWidth: '50px',
//             cell: (row, i) => i + 1,

//         },
//         {
//             name: 'Type',
//             sortable: false,
//             minWidth: '100px',
//             cell: row => row?.fieldType?.name,
//         },
//         {
//             name: 'Option',
//             sortable: false,
//             minWidth: '100px',
//             cell: row => row?.name,
//         },
//         {
//             name: 'Description',
//             sortable: false,
//             minWidth: '150px',
//             cell: row => row?.description,
//         },
//         {
//             name: 'Image',
//             sortable: false,
//             minWidth: '200px',
//             cell: row => <img src={row?.image} height={100} alt="" />,
//         },
//         {
//             name: "Action",
//             minWidth: "200px",
//             cell: (row) => (
//                 <>
//                     <div className='Edit cursor-pointer me-1' onClick={() => openEditModal(row?._id)} ><Edit2 size={20} /></div>
//                     <div className="Trash cursor-pointer" onClick={() => openDeleteModal(row?._id)}><Trash size={20} color='red' /></div>
//                 </>
//             )

//         }
//     ]

//     return (
//         <>
//             <Navbar />
//             <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }} className='pb-4'>
//                     <h1>FIELD OPTION</h1>
//                     <button className='productCategoryBtn' onClick={toggleAdd}>Add Field Option</button>
//                 </div>
//                 <DataTable
//                     noHeader
//                     highlightOnHover
//                     fixedHeader
//                     fixedHeaderScrollHeight='450px'
//                     data={data}
//                     columns={additionalTable} />

//             </div >
//             <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="modal-dialog-centered modal-xs">
//                 {/* <ModalHeader style={{ paddingLeft: '20px', fontFamily: 'italic', textAlign: 'center' }} toggle={closeDeleteModal}>Confirm Delete</ModalHeader> */}
//                 <ModalBody style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30px', fontWeight: '400' }}>Are you sure you want to delete this Item?</ModalBody>
//                 <div style={{ justifyContent: 'center' }} className="modal-footer">
//                     <Button style={{ backgroundColor: "#E4510B", border: 'none' }} onClick={handleConfirmDelete} >
//                         Confirm
//                     </Button>
//                     <Button color="secondary" onClick={closeDeleteModal} >
//                         Cancel
//                     </Button>
//                 </div>
//             </Modal>
//             <FieldOptionModal modal={addModal} toggle={toggleAdd} additionalData={additionalData} />
//             <FieldOptionEdit open={editModal} handleEdit={closeEditModal} editData={editData} additionalData={additionalData} />
//             <FooterSection />
//         </>
//     )
// }

// export default FieldOptionIndex
