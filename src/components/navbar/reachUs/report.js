import React, { useState } from 'react';
import axios from 'axios';
import { question, questions } from '../../../ApiConfigs/ApiConfig';
import { toast } from 'react-hot-toast';
import './report.css';

const ReportCard = () => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async () => {
        const description = question;
        try {
            const response = await axios.post(questions, { question: description });
            toast.success(response?.result?.msg);
            setQuestion('');
        } catch (error) {
            toast.error(error?.result?.msg);
        }
    };

    return (
        <div className="report-card">
            <h2>Report </h2>
            <div className="Title-card">
                <label htmlFor="description"><b>Queries:</b></label>
                <textarea
                    id="description"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button className='submitbtn ml-auto' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ReportCard;
