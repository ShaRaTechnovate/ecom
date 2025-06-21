import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css';

function Terms() {
    const navigate = useNavigate()
    const navToHome = () => {
        navigate('/')
    }
    const navToTerms = () => {
        navigate('/Terms')
    }

    return (
        <>
            <div className='container'>
                <div>
                    <p className='pt-3' style={{ cursor: 'pointer' }}><span onClick={navToHome}>Home</span> / <span onClick={navToTerms}>Terms & Conditions</span></p>
                </div>
                <div>
                    <h3 className='fw-bold mt-5 mb-5'>TERMS & CONDITIONS</h3>
                </div>
                <div className='terms-para'>
                    <p>
                        These Terms & Conditions apply to between you, the User of this Website
                        (including any sub-domains), and *Printon India Private Limited*,
                        the owner and operator of this website. By using this site you
                        accept and agree to be legally bound by our terms and conditions.
                        We may change the terms and condition at any time without notice.
                        Please read these terms and conditions carefully, as they affect your
                        legal rights. Your agreement to comply with and be bound by these terms and
                        conditions is deemed to occur upon your first use of the Website. If you
                        do not agree to be bound by these terms and conditions, you should stop using the
                        Website immediately.</p>
                    <p>This website is operated by and behalf of
                    </p>
                    <p>**Printon India Private Limited**<br />
                        1A 24th Main, 5th A Cross Rd,<br />
                        2nd Phase, J. P. Nagar,<br />
                        Bengaluru,<br />
                        Karnataka 560078<br />
                        +91-99800 97005</p>
                    <p>#### Intellectual property and acceptable use
                    </p>
                    <p>The content of the pages of this website is for your general information and use only.
                        It is subject to change without notice.

                    </p>
                    <p>
                        We may amend these terms from time to time.
                        Every time you wish to use our website,
                        please check these terms to ensure you
                        understand the terms that apply at that time.</p>
                    <p>You agree, understand and acknowledge
                        that Printon is an online platform that
                        enables you to purchase products listed
                        on the Platform at the price indicated
                        therein at any time.</p>
                    <p>
                        Neither we nor any third parties provide any warranty or
                        guarantee as to the accuracy, timeliness, performance,
                        completeness or suitability of the information and materials
                        found or offered on this website for any particular purpose.
                        You acknowledge that such information and materials may contain
                        inaccuracies or errors and we expressly exclude liability for
                        any such inaccuracies or errors to the fullest extent permitted by law.
                    </p>
                    <p>

                        Your use of any information or materials
                        on this website is entirely at your own risk, for which we shall not be liable.
                        It shall be your own responsibility to ensure that any products, services or
                        information available through this website meet your specific requirements.
                    </p>
                    <p>
                        This website contains material which is owned by or licensed to us.
                        This material includes, but is not limited to, the design, layout,
                        look, appearance and graphics. Reproduction is prohibited other than
                        in accordance with the copyright notice, which forms part of these
                        terms and conditions.
                    </p>
                    <p>
                        All trademarks reproduced in this website which are not the property
                        of, or licensed to, the operator are acknowledged on the website.

                    </p>
                    <p>
                        Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
                    </p>
                    <p>
                        Your use of this website and any dispute arising out of such use of the website is subject to the laws of Australia.

                    </p>

                    <p>

                        #### User-generated content
                    </p>
                    <p>
                        This website may include information and materials uploaded
                        by other users of the website, including to blogs, bulletin
                        boards and chat rooms. This information and these materials
                        have not been verified or approved by us. The views expressed
                        by other users on our website do not represent our views or values.
                    </p>
                    <p>
                        #### Uploading content to our website

                    </p>
                    <p>

                        Whenever you make use of a feature that allows you to upload conten
                        to our website, or to make contact with other users of our website,
                        you must comply with the content standards set out in these terms.
                    </p>
                    <p>
                        You warrant that any such contribution does comply with
                        those standards, and you will be liable to us and indemnify
                        us for any breach of that warranty. This means you will be responsible
                        for any loss or damage we suffer as a result of your breach of warranty.
                    </p>
                    <p>
                        We have the right to remove any posting
                        you make on our website if, in our opinion,
                        your post does not comply with the content
                        standards set out in these terms.
                    </p>
                    <p>
                        You are solely responsible for securing and backing up your content.

                    </p>
                    <p>
                        #### Privacy Policy

                    </p>
                    <p>

                        Information collected by *Printon India Private Limited*
                        from their customers is kept strictly confidential.
                        Any information passed on to third parties such as
                        Australia Post or courier companies, is solely for
                        the completion of your order. *Printon India Private Limited*
                        will not sell any collected personal information.
                    </p>
                    <p>
                        Use of the Website is also governed by our [Privacy Policy](#).

                    </p>
                    <p>
                        #### Copyright Notice

                    </p>
                    <p>
                        This website and its content,
                        including the site design and graphics,
                        is copyright of *Printon India Private Limited*.
                        All rights reserved.
                    </p>
                    <p>
                        Any other trademarks, company names,
                        product names and/or logos set forth
                        in this web site are the property of their
                        respective owners. Trade marks, brand names,
                        product names and company names of or related
                        to the products appearing on this web site are
                        the property of their respective owners.
                        *Printon India Private Limited* does not
                        claim to own any of these trade marks nor
                        claim that *Printon India Private Limited*
                        is related to, endorsed by, or in any other
                        way connected or associated with these companies
                    </p>
                    <p>
                        Any redistribution or reproduction of part or
                        all of the contents in any form is prohibited other than the following:

                    </p>
                    <p>
                        You may print or download to a local hard disk extracts
                        for your personal and non-commercial use only. You may
                        copy the content to individual third parties for their
                        personal use, but only if you acknowledge the website as the source of the material.

                    </p>
                    <p>
                        You may not, except with our express written permission, distribute or commercially exploit the content.
                        Nor may you transmit it or store it in any other website or other form of electronic retrieval system
                    </p>
                    <p>
                        #### Disclaimer

                    </p>
                    <p>
                        The information contained in this website is for general
                        information purposes only. The information is provided by
                        *Printon India Private Limited* and whilst we endeavour
                        to keep the information up-to-date and correct,
                        we make no representations or warranties of any
                        kind, express or implied, about the completeness,
                        accuracy, reliability, suitability or availability
                        with respect to the website or the information, products,
                        services, or related graphics contained on the website
                        for any purpose. Any reliance you place on such information
                        is therefore strictly at your own risk.
                    </p>
                    <p>
                        In no event will we be liable for any loss or
                        damage including, without limitation, indirect
                        or consequential loss or damage, or any loss or
                        damage whatsoever arising from loss of data or
                        profits arising out of or in connection with the
                        use of this website. We do not guarantee that our
                        site will be secure or free from bugs or viruses.
                        You are responsible for configuring your information technology,
                        computer programmes and platform to access our site. You should
                        use your own virus protection software.
                    </p>
                    <p>
                        Through this website you are able to link to other
                        websites which are not under the control of *Printon India Private Limited*.
                        We have no control over the nature, content and availability of those sites.
                        The inclusion of any links does not necessarily
                        imply a recommendation or endorse the views expressed within them.
                    </p>
                    <p>
                        Every effort is made to keep the website
                        up and running smoothly. However, *Printon India Private Limited*
                        takes no responsibility for and will not be liable for the website
                        being temporarily unavailable due to technical issues beyond our control.
                    </p>
                    <p>
                        You are responsible for ensuring that all persons who
                        access our website through your internet connection are
                        aware of these terms of use and other applicable terms and
                        conditions, and that they comply with them.

                    </p>
                    <p>
                        #### Pricing

                    </p>
                    <p>
                        All prices are displayed in AUD and include GST.
                        Prices may be subject to change without notice.
                        All prices are correct at time of purchase and
                        are confirmed with an order confirmation email.
                    </p>
                    <p>
                        #### Product Availability

                    </p>
                    <p>
                        All orders are subject to product availability.
                        If a product is not available at the time of purchase you will be notified as soon as
                        possible and offered an alternate product (if available) or a store credit or refund.
                    </p>
                    <p>
                        #### Conditions of Sale

                    </p>
                    <p>
                        All orders must be paid for before they are sent.
                        *Printon India Private Limited* takes no responsibility
                        for goods damaged during delivery.

                    </p>
                    <p>
                        #### Returns Policy

                    </p>
                    <p>
                        If for any reason you are not satisfied with
                        your purchase it can be returned for an exchange
                        or refund within 30 days, no questions asked.
                        The returned item must be in original condition and in original packaging.

                    </p>
                    <p>
                        Digital subscription products can be cancelled at any time,
                        after which, your access to our product/service will cease.
                        Digital subscription products are only eligible for refunds
                        within 10 days of the initial subscription start date
                    </p>
                    <p>
                        Digital products which are downloadable, are not eligible for return.
                        If you're unsure if this product is right for you, download our *Free Demo Product*.
                    </p>
                    <p>
                        #### Replacement of Faulty Items

                    </p>
                    <p>
                        To ensure you are happy with your purchase we thoroughly check all items before they are sent.
                        If you do receive a faulty item please contact
                        *Printon India Private Limited* immediately and we will arrange an alternative product,
                        store credit or refund.
                    </p>
                    <p>
                        #### Payment

                    </p>
                    <p>
                        *Printon India Private Limited* welcomes payment by credit card,
                        including VISA, Mastercard and American Express.
                        Payment must be made at time of purchase.
                    </p>
                    <p>
                        #### Acceptance of Order

                    </p>
                    <p>
                        *Printon India Private Limited* will send email
                        confirmations of your order once placed on our website.
                    </p>
                    <p>
                        #### Supply
                    </p>
                    <p>
                        *Printon India Private Limited*
                        reserves the right to refuse to
                        supply to any individual or company.

                    </p>
                    <p>
                        #### Security

                    </p>
                    <p>
                        *Printon India Private Limited*
                        uses Secure Sockets Layer (SSL)
                        technology to ensure that your
                        details are encrypted and securely
                        communicated to us, safe from prying
                        eyes or malicious threats. Secure Sockets
                        Layer (SSL) is a protocol for enabling data
                        encryption on the Internet and for helping
                        web site users confirm the owner of the web site.
                        Learn more about how we keep your shopping experience [Safe and Secure](#).
                    </p>
                </div>
            </div>

        </>
    )
}

export default Terms
