import React from 'react'
import Navbar from '../../navbar'
import FooterSection from '..'
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
    const navigate = useNavigate()


    const navToHome = () => {
        navigate('/')
    }
    const navToPrivacyPolicy = () => {
        navigate('/privacyPolicy')
    }


    return (
        <div>
            <Navbar />
            <div className='pb-5 pt-3' style={{ paddingLeft: '18%', paddingRight: '18%' }}>
                <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToPrivacyPolicy}>Privacy Policy</span></p>

                {/* <h2 className='text-center mt-1 fw-bold'>Privacy Policy of Printon and it's associated apps</h2> */}
                {/* <p className='privacy-para text-center mt-4'>We Take Your Privacy Seriously</p> */}
                <p className='privacy-para  mt-4'># Privacy Policy
                </p>
                <p className='privacy-para  mt-4'>
                    #### 1. We respect your privacy
                </p>
                <p className='privacy-para  mt-4'>
                    **Printon India Private Limited** respects your right to privacy and this policy sets out how we collect and treat your personal information.
                    “Personal information” is information we hold which is identifiable as being about you.                </p>
                <p className='privacy-para  mt-4'>
                    #### 2. What personal information we collect
                </p>

                <p className='privacy-para  mt-4'>

                    We may collect the following types of personal information from you:
                </p>

                <p className='privacy-para mt-4'>
                    Name<br />
                    Billing address<br />
                    Shipping address<br />
                    Phone number<br />
                    Email address<br />
                    Information about the goods or services you have ordered<br />
                    Information from enquiries you have made<br />
                    Communications between us   <br />
                </p>

                <p className='privacy-para mt-4'>
                    #### 3. How we collect your personal information
                </p>

                <p className='privacy-para  mt-4'>
                    We collect personal information from you in a variety of ways,
                    including: when you interact with us electronically or in person;
                    when you access our website; and when we provide our services to you.                </p>
                {/* <h2 className=' mt-4 fw-bold'>Request erasure of Your Personal Data </h2> */}
                <p className='privacy-para  mt-4'>
                    #### 4. Use of your personal information
                </p>
                <p className='privacy-para'>
                    We use your information to provide our service to you. We also use it to improve our service and to notify you of opportunities that we think you might be interested in.
                </p>
                <p className='privacy-para'>
                    We do not provide your information to third parties,
                    except that we may provide your information to our
                    business partners, such as Payment Gateways, Courier
                    partners, who assist us in the provision of our services to you.
                </p>
                <p className='privacy-para'>
                    #### 5. Security of your personal information
                </p>
                <p className='privacy-para'>
                    We take reasonable steps to protect your personal information.
                    However we are not liable for any unauthorised access to this information.
                </p>
                <p className='privacy-para'>
                    #### 6. Access to your personal information
                </p>
                <p className='privacy-para'>
                    You can access and update your personal information by logging
                    in to your account using the email and password you registered with,
                    on the “My Account” page.
                </p>
                <p className='privacy-para'>
                    Alternatively, you can access your personal information by
                    \contacting *Printon India Private Limited*. *Printon India Private Limited*
                    will provide a copy of the information free of charge. However in certain
                    circumstances, it will be possible to charge a “reasonable fee” to the data
                    subject to cover administrative charges where the request involves the gathering
                    of large amounts of data, when the request is manifestly unfounded or excessive,
                    or when the request is repetitive.
                </p>
                <p className='privacy-para'>
                    #### 7. Complaints about privacy
                </p>
                <p className='privacy-para'>
                    If you have any complaints about our privacy practices,
                    please feel free to contact us with details of your complaints.
                    We take complaints very seriously and will respond shortly after
                    receiving notice of your complaint.
                </p>
                <p className='privacy-para'>
                    #### 8. Changes
                </p>
                <p className='privacy-para'>
                    Please be aware that we may change this Privacy Policy in the future.
                    The revised versions will be uploaded onto our website,
                    so please check back from time to time.
                </p>
                <p className='privacy-para'>
                    #### 9. Website

                </p>
                <p className='privacy-para'>
                    **When you visit our website**<br />
                    When you come on to our website we may collect certain information such as browser type,
                    operating system, website visited immediately before coming to our site, etc.
                    This information is used in an aggregated manner to analyse how people use our site,
                    such that we can improve our service.
                    More information regarding the use of the
                    Website can be found in our [Terms & conditions](#).
                </p>
                <p className='privacy-para'>
                    **Cookies**<br />
                    As is very common for companies, we use cookies on our website.
                    Cookies are very small files which a website uses to identify
                    you when you come back to the site and to store details about
                    your use of the site. Cookies are not malicious programs that
                    access or damage your computer. We use cookies to improve the
                    experience of people using our website and in providing our online store.
                    More information on our use of Cookies can be found in our [Cookie Policy](#)
                </p>
                <p className='privacy-para'>
                    **Third party sites**<br />
                    Our site has links to other websites not owned or
                    controlled by us. We are not responsible for these
                    sites or the consequences of you going on to those sites.
                </p>

            </div>





            <FooterSection />
        </div>
    )
}

export default PrivacyPolicy