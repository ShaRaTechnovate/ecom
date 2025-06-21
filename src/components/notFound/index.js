import React from 'react'
import notFound from "../../assets/images/logo/notFound.png"
import Navbar from '../navbar'
import FooterSection from '../footer'
import { ArrowRight } from 'react-feather'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom';


function PageNotFound() {
    return (
        <>
            <Navbar />
            <div>
                <div className='d-flex justify-content-center'>
                    <img src={notFound} alt="notfound" className='img-fluid' />
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <Link to='/products'>
                        <Button className='success-modal-btn' style={{ backgroundColor: "#e4510b", borderRadius: "25px", border: "1px solid #ef510b" }}>Continue Shopping <ArrowRight size={17} /></Button>
                        {/* <p className='text-center text-danger p-0 m-0' style={{ textDecoration: 'underline' }}>countinue Shopping</p> */}
                    </Link>
                </div>
            </div>
            <FooterSection />
        </>
    )
}

export default PageNotFound
