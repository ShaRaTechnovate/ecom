import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { answer, askedQueAns } from '../../../ApiConfigs/ApiConfig';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ThumbsUp } from 'react-feather';


function ReportTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalId, setModalId] = useState('')

    const reportData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(askedQueAns);
            setData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        const description = question
        try {
            const response = await axios.post(`${answer}/${modalId}`, { answer: description })
            reportData()
            toast.success(response?.data?.msg);
            setModalOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        reportData();
    }, []);

    const toggleModal = (id) => {
        setModalId(id)
        setModalOpen(!modalOpen);
    };

    const reportTable = [
        {
            name: 'S No',
            Width: '20px',
            cell: (row, i) => i + 1,
        },
        {
            name: 'Queries',
            sortable: true,
            Width: '200px',
            cell: row => row?.question,
        },
        {
            name: 'Resolved',
            sortable: true,
            Width: '450px',
            cell: row => row?.answer,
        },
        {
            name: 'Action',
            maxWidth: '150px',
            cell: row => (
                row?.answer ?
                    <ThumbsUp color='green' size={24} />
                    :
                    <Button className='bg-primary' onClick={() => toggleModal(row?._id)}>
                        Solved
                    </Button>
            ),
        },
    ];

    return (
        <>
            <div className='pt-5 pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='pb-4'>
                    <h1 style={{ textTransform: 'uppercase' }}>Queries</h1>
                </div>
                <DataTable noHeader highlightOnHover fixedHeader fixedHeaderScrollHeight='90vh' data={data} columns={reportTable} />

                <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-dialog-centered modal-xs">
                    <ModalBody style={{ fontSize: '20px', textAlign: 'left', paddingTop: '30px', fontWeight: '400' }}>
                        <Form>

                            <label htmlFor="description"><b>Queries:</b></label>
                            <textarea
                                id="description"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{ fontSize: '20px', paddingTop: '30px', fontWeight: '400' }}>
                        <button className='submitbtn ml-auto' onClick={handleSubmit}>Submit</button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}

export default ReportTable;



