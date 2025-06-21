import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, Card, Input } from 'reactstrap';
import { productSearch } from '../../ApiConfigs/ApiConfig';
import axios from 'axios';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'react-feather';
import logo from '../../../src/assets/images/logo/logo.png'



function ProductModal({ isOpen, toggle, onClickProduct, closeSearchModal }) {


    const [productSearchData, setProductSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('')



    const productGet = async (searchKey) => {
        try {
            setLoading(true);
            const response = await axios.get(`${productSearch}?search=${searchKey}`);
            setProductSearch(response?.data?.result);
        } catch (error) {
            console.error('Error fetching product search:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        productGet(searchKey)

    }, [searchKey])

    const navigate = useNavigate()


    const navToProductView = (product_url) => {
        if (onClickProduct) {
            onClickProduct(product_url);
        } else {
            navigate(`/products/viewProduct/${product_url}`);
            toggle()
        }
    };



    return (
        <>
            <Modal className='searchModal' isOpen={isOpen} >

                <ModalHeader toggle={toggle || closeSearchModal} className="modern-modal-header">
                    <div className="d-flex">
                        <img src={logo} alt="logo" height={60} className="me-2" />
                        <h1 className="auth-head mt-2">Search Items</h1>

                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='nav-top-data' style={{ width: '100px', marginLeft: '37%' }}>
                        <form className="search-container1"
                        >
                            <input
                                type="text"
                                id="search-bar"
                                placeholder="Business Cards, Posters, Booklets..."
                                onChange={(e) => setSearchKey(e.target.value)}

                            />
                            <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
                        </form>
                    </div>


                    <div style={{ marginTop: "-70px" }}>
                        <div className="search-results">
                            {productSearchData.map((productData) => (
                                <Card key={productData._id} style={{ cursor: "pointer" }} className='mt-2' onClick={() => navToProductView(productData?.product_url)}>
                                    <div className='d-flex' style={{ width: "100%" }} >
                                        <div className=''>
                                            <img src={productData?.image} style={{ height: "100%" }} width={100} className='img-fluid' alt='img' />
                                        </div>
                                        <div className='d-flex justify-content-between p-2' style={{ width: "100%" }} >
                                            <div>
                                                <p className='fw-bold'> {productData?.name}</p>
                                            </div>
                                            <div className="linkTag" >
                                                <p><ExternalLink /></p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>


                </ModalBody>
            </Modal>


        </>
    );
}


export default ProductModal



// import React, { useEffect, useState } from 'react';
// import { Modal, ModalHeader, ModalBody, Card, Input, Button, Spinner } from 'reactstrap';
// import { productSearch } from '../../ApiConfigs/ApiConfig';
// import axios from 'axios';
// import './index.scss';
// import { useNavigate } from 'react-router-dom';
// import { ExternalLink, Trash } from 'react-feather';
// import logo from '../../../src/assets/images/logo/logo.png';

// function ProductModal({ isOpen, toggle, onClickProduct, closeSearchModal }) {
//     const [productSearchData, setProductSearch] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchKey, setSearchKey] = useState('');
//     const [newProduct, setNewProduct] = useState({ name: '', image: '', product_url: '' });
//     const [isCreateModalOpen, setCreateModalOpen] = useState(false);

//     const navigate = useNavigate();

//     const productGet = async (searchKey) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${productSearch}?search=${searchKey}`);
//             setProductSearch(response?.data?.result);
//         } catch (error) {
//             console.error('Error fetching product search:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createProduct = async (product) => {
//         try {
//             await axios.post(`${productSearch}`, product);
//             productGet(searchKey);
//             setCreateModalOpen(false);
//         } catch (error) {
//             console.error('Error creating product:', error);
//         }
//     };

//     const deleteProduct = async (productId) => {
//         try {
//             await axios.delete(`${productSearch}/${productId}`);
//             productGet(searchKey);
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     useEffect(() => {
//         productGet(searchKey);
//     }, [searchKey]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct({ ...newProduct, [name]: value });
//     };

//     const handleCreateSubmit = () => {
//         createProduct(newProduct);
//         setNewProduct({ name: '', image: '', product_url: '' });
//     };

//     const navToProductView = (product_url) => {
//         if (onClickProduct) {
//             onClickProduct(product_url);
//         } else {
//             navigate(`/products/viewProduct/${product_url}`);
//             toggle();
//         }
//     };

//     return (
//         <>
//             <Modal className='searchModal' isOpen={isOpen}>
//                 <ModalHeader toggle={toggle || closeSearchModal} className="modern-modal-header">
//                     <div className="d-flex">
//                         <img src={logo} alt="logo" height={60} className="me-2" />
//                         <h1 className="auth-head mt-2">Search Items</h1>
//                     </div>
//                 </ModalHeader>
//                 <ModalBody>
//                     <div className='nav-top-data' style={{ width: '100px', marginLeft: '37%' }}>
//                         <form className="search-container1">
//                             <input
//                                 type="text"
//                                 id="search-bar"
//                                 placeholder="Business Cards, Posters, Booklets..."
//                                 onChange={(e) => setSearchKey(e.target.value)}
//                             />
//                             <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
//                         </form>
//                     </div>

//                     <div style={{ marginTop: "-70px" }}>
//                         {loading ? (
//                             <div className="d-flex justify-content-center">
//                                 <Spinner />
//                             </div>
//                         ) : (
//                             <div className="search-results">
//                                 {productSearchData.map((product) => (
//                                     <Card key={product._id} style={{ cursor: "pointer" }} className='mt-2'>
//                                         <div className='d-flex' style={{ width: "100%" }}>
//                                             <div className=''>
//                                                 <img src={product?.image} style={{ height: "100%" }} width={100} className='img-fluid' alt='img' />
//                                             </div>
//                                             <div className='d-flex justify-content-between p-2' style={{ width: "100%" }}>
//                                                 <div>
//                                                     <p className='fw-bold'> {product?.name}</p>
//                                                 </div>
//                                                 <div className="linkTag">
//                                                     <p><ExternalLink onClick={() => navToProductView(product?.product_url)} /></p>
//                                                     <p><Trash onClick={() => deleteProduct(product._id)} /></p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <Button color="primary" onClick={() => setCreateModalOpen(true)}>Add New Product</Button>
//                 </ModalBody>
//             </Modal>

//             <Modal isOpen={isCreateModalOpen} toggle={() => setCreateModalOpen(false)}>
//                 <ModalHeader toggle={() => setCreateModalOpen(false)}>Add New Product</ModalHeader>
//                 <ModalBody>
//                     <Input
//                         type="text"
//                         name="name"
//                         value={newProduct.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     <Input
//                         type="text"
//                         name="image"
//                         value={newProduct.image}
//                         onChange={handleInputChange}
//                         placeholder="Product Image URL"
//                     />
//                     {/* <Input
//                         type="text"
//                         name="product_url"
//                         value={newProduct.product_url}
//                         onChange={handleInputChange}
//                         placeholder="Product URL"
//                     /> */}
//                     <Button onClick={handleCreateSubmit}>Add Product</Button>
//                 </ModalBody>
//             </Modal>
//         </>
//     );
// }

// export default ProductModal;
// import React, { useEffect, useState } from 'react';
// import { Modal, ModalHeader, ModalBody, Card, Input, Button, Spinner } from 'reactstrap';
// import { productSearch } from '../../ApiConfigs/ApiConfig';
// import axios from 'axios';
// import './index.scss';
// import { useNavigate } from 'react-router-dom';
// import { ExternalLink, Trash } from 'react-feather';
// import logo from '../../../src/assets/images/logo/logo.png';

// function ProductModal({ isOpen, toggle, onClickProduct, closeSearchModal }) {
//     const [productSearchData, setProductSearch] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchKey, setSearchKey] = useState('');
//     const [newProduct, setNewProduct] = useState({ name: '', image: '', product_url: '' });
//     const [isCreateModalOpen, setCreateModalOpen] = useState(false);

//     const navigate = useNavigate();

//     const productGet = async (searchKey) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${productSearch}?search=${searchKey}`);
//             setProductSearch(response?.data?.result);
//         } catch (error) {
//             console.error('Error fetching product search:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createProduct = async (product) => {
//         try {
//             await axios.post(`${productSearch}`, product);
//             productGet(searchKey);
//             setCreateModalOpen(false);
//         } catch (error) {
//             console.error('Error creating product:', error);
//         }
//     };

//     const deleteProduct = async (productId) => {
//         try {
//             await axios.delete(`${productSearch}/${productId}`);
//             productGet(searchKey);
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     useEffect(() => {
//         productGet(searchKey);
//     }, [searchKey]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct({ ...newProduct, [name]: value });
//     };

//     const handleCreateSubmit = () => {
//         createProduct(newProduct);
//         setNewProduct({ name: '', image: '', product_url: '' });
//     };

//     const navToProductView = (product_url) => {
//         if (onClickProduct) {
//             onClickProduct(product_url);
//         } else {
//             navigate(`/products/viewProduct/${product_url}`);
//             toggle();
//         }
//     };

//     return (
//         <>
//             <Modal className='searchModal' isOpen={isOpen}>
//                 <ModalHeader toggle={toggle || closeSearchModal} className="modern-modal-header">
//                     <div className="d-flex">
//                         <img src={logo} alt="logo" height={60} className="me-2" />
//                         <h1 className="auth-head mt-2">Search Items</h1>
//                     </div>
//                 </ModalHeader>
//                 <ModalBody>
//                     <div className='nav-top-data' style={{ width: '100px', marginLeft: '37%' }}>
//                         <form className="search-container1">
//                             <input
//                                 type="text"
//                                 id="search-bar"
//                                 placeholder="Business Cards, Posters, Booklets..."
//                                 onChange={(e) => setSearchKey(e.target.value)}
//                             />
//                             <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
//                         </form>
//                     </div>

//                     <div style={{ marginTop: "-70px" }}>
//                         {loading ? (
//                             <div className="d-flex justify-content-center">
//                                 <Spinner />
//                             </div>
//                         ) : (
//                             <div className="search-results">
//                                 {productSearchData.map((product) => (
//                                     <Card key={product._id} style={{ cursor: "pointer" }} className='mt-2'>
//                                         <div className='d-flex' style={{ width: "100%" }}>
//                                             <div className=''>
//                                                 <img src={product?.image} style={{ height: "100%" }} width={100} className='img-fluid' alt='img' />
//                                             </div>
//                                             <div className='d-flex justify-content-between p-2' style={{ width: "100%" }}>
//                                                 <div>
//                                                     <p className='fw-bold'> {product?.name}</p>
//                                                 </div>
//                                                 <div className="linkTag">
//                                                     <p><ExternalLink onClick={() => navToProductView(product?.product_url)} /></p>
//                                                     <p><Trash onClick={() => deleteProduct(product._id)} /></p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 ))}
//                                 {/* Extra Card */}
//                                 <Card className='mt-2'>
//                                     <div className='d-flex' style={{ width: "100%" }}>
//                                         <div className=''>
//                                             <img src={newProduct.image} style={{ height: "100%" }} width={100} className='img-fluid' alt='img' />
//                                         </div>
//                                         <div className='d-flex justify-content-between p-2' style={{ width: "100%" }}>
//                                             <div>
//                                                 <p className='fw-bold'>{newProduct.name}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </Card>
//                             </div>
//                         )}
//                     </div>
//                     <Button color="primary" onClick={() => setCreateModalOpen(true)}>Add New Product</Button>
//                 </ModalBody>
//             </Modal>

//             <Modal isOpen={isCreateModalOpen} toggle={() => setCreateModalOpen(false)}>
//                 <ModalHeader toggle={() => setCreateModalOpen(false)}>Add New Product</ModalHeader>
//                 <ModalBody>
//                     <Input
//                         type="text"
//                         name="name"
//                         value={newProduct.name}
//                         onChange={handleInputChange}
//                         placeholder="Product Name"
//                     />
//                     <Input
//                         type="text"
//                         name="image"
//                         value={newProduct.image}
//                         onChange={handleInputChange}
//                         placeholder="Product Image URL"
//                     />
//                     {/* <Input
//                         type="text"
//                         name="product_url"
//                         value={newProduct.product_url}
//                         onChange={handleInputChange}
//                         placeholder="Product URL"
//                     /> */}
//                     <Button onClick={handleCreateSubmit}>Add Product</Button>
//                 </ModalBody>
//             </Modal>
//         </>
//     );
// }

// export default ProductModal;
