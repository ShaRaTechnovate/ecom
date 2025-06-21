import React from 'react';
import './HomeMenu.css';
import { Col, Container, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function HomeMenu({ setIsShown, menus }) {
    const navigate = useNavigate();

    const navProductType = (category_url) => {
        navigate(`/products/${category_url}`);
    };

    const navToPage = (product_url) => {
        navigate(`/products/viewProduct/${product_url}`);
    };

    return (
        <div className='stationary-page' style={{ zIndex: '100px' }}>
            <div className='menu-modal-open'>
                <div className='menu-modal-content' onMouseLeave={() => setIsShown(false)}>
                    <Row>
                        {menus?.category?.map((categoryItem) => (
                            <Col lg={3} md={3}>
                                <div key={categoryItem?._id} className='bannerMenus '>
                                    <div>
                                        <h6
                                            style={{ cursor: 'pointer', color: '#e44324', fontSize: '1rem', fontWeight: '600' }}
                                            onClick={() => navProductType(categoryItem?.productCategory?.category_url)}
                                        >
                                            {categoryItem?.productCategory?.name}
                                        </h6>
                                        <hr className='menu-modal-line' />
                                        {categoryItem?.products?.map((product) => (
                                            <div key={product?._id} className='mt-2' style={{ fontWeight: '400', fontSize: '12px' }}>
                                                <p
                                                    className='menu-modal-product mt-1'
                                                    onClick={() => navToPage(product?.product_url)}
                                                >
                                                    {product?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>

                        ))}
                    </Row>
                </div >
            </div >
        </div >
    );
}

export default HomeMenu;
