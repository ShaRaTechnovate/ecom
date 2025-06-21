import React, { useEffect, useState, useRef } from 'react'
import './index.scss'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { AlignCenter, ArrowRight, BookOpen, Box, ChevronDown, ChevronUp, File, FileText, Heart, LogOut, Package, Percent, ShoppingBag, Phone, ShoppingCart, TrendingUp, User, Search, Home } from 'react-feather'
import printOnLogo from '../../assets/images/logo/printon logo2.webp'
import logo from "../../assets/images/logo/logo.png"
import { Button, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import AuthModal from './auth/authModal'
import OtpVerification from './otp'
import { cart, menuProduct, menuProductAd, productSearch, wishList } from '../../ApiConfigs/ApiConfig'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NewAuthModal from './newAuth'
import ProductModal from './productModal'
import FinalAuthModal from './finalAuth'
import MobileOTPModal from './finalAuth/mobileOTP'
import officialLogo from '../../../src/assets/images/logo/printon logo-01.png'
import HomeMenu from './homeMenu/HomeMenu'
import { Newspaper } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'


function Navbar({ closeSearchModal }) {

    const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const queryClient = useQueryClient();
    const [modal, setModal] = useState(false);
    const [wishlistData, setWishlistData] = useState([]);
    const [productSearchData, setProductSearch] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isModalOpen, setModalOpen] = useState(null);
    const [logoutValue, setLogoutValue] = useState(false)

    const toggle = () => setModal(!modal);

    const [modalOtp, setModalOtp] = useState(false);

    const toggleOtp = () => setModalOtp(!modal);

    const nagivate = useNavigate()
    const toggleModal = () => setModalOpen(!isModalOpen);

    const [isShown, setIsShown] = useState(false);

    const toggleProductsDropdown = () => {
        setProductsDropdownOpen(!isProductsDropdownOpen);
    };

    const closeProductsDropdown = () => {
        setProductsDropdownOpen(false);
    };


    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const logout = () => {
        setLogoutValue(true)
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('mobile');

    }

    const role = localStorage.getItem('role')
    const name = localStorage.getItem('name')
    const mobile = localStorage.getItem('mobile')

    const navigate = useNavigate()

    const [dataa, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const numberOfItem = dataa?.products?.length;
    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${cart}`)
            setData(response?.data?.result)

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const numberOfData = wishlistData?.length;


    const handleSearchInputChange = (event) => {
        setProductSearch(event.target.value);
    };
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (productSearchData && productSearchData.length > 0) {
            setModalOpen(true);
        }
    };
    const productGet = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${productSearch}?search=${productSearchData}`);
            // setProductSearch(response?.data?.result);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Error fetching product search:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        productGet()

    }, [productSearchData])


    const openModalOnClick = () => {
        setModalOpen(true);
        setLogoutValue(false)
    };

    const wishlist = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${wishList}`)
            setWishlistData(response?.data?.result)
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            additionalData()
            wishlist()
        }

    }, [localStorage.getItem('token')])

    const [menuData, setMenuData] = useState([]);


    const handleMenuData = async () => {
        try {
            const response = await axios.get(menuProduct);
            setMenuData(response?.data?.result);
        } catch (error) {
            toast.error(error?.response?.data?.msg)

        }
    }

    useEffect(() => {
        handleMenuData()
    }, [])

    console.log('menuuuuuuuuuuuu', menuData);

    const [menus, setMenus] = useState();

    const openShow = (id) => {
        getMenu(id)
        setIsShown(true)
    }

    const getMenu = async (id) => {
        try {
            const response = await axios.get(`${menuProduct}/${id}`)
            setMenus(response?.data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }

    }


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showTabCount, setShowTabCount] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 1570) {
            setShowTabCount(10)
        } if (windowWidth < 1540) {
            setShowTabCount(7)
        } if (windowWidth < 1530) {
            setShowTabCount(7)
        } if (windowWidth < 1400) {
            setShowTabCount(6)
        } if (windowWidth < 1300) {
            setShowTabCount(5)
        }
    }, [windowWidth])

    const handleMenuProductClick = (menu_url) => {
        window.location.href = `/menuProducts/${menu_url}`;

    };
    return (
        <>
            <div className='navbar-con'>
                <div className='d-flex'>
                    <div className='nav-logo'>
                        <Link to='/'>
                            <img src={officialLogo} className='mt-3 official-logo' alt="logo" />
                        </Link>
                    </div>
                    <div className='nav-top-hide'>
                        <div onClick={openModalOnClick}  >
                            <form className="search-container"
                                onSubmit={handleSearchSubmit}
                            >
                                <input
                                    type="text"
                                    id="search-bar"
                                    placeholder="Business Cards, Posters, Booklets..."
                                    // onChange={(e) => handleSearchInputChange(e)}
                                    onClick={openModalOnClick}

                                />
                                <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
                            </form>
                        </div>
                        <ProductModal
                            isOpen={isModalOpen}
                            toggle={toggleModal}
                        />

                    </div>
                </div>
                <div className='d-none d-lg-block'>
                    <div className='d-flex pt-2 nav-top-header'>
                        <NavLink
                            to="/reachUs"
                        >
                            <div className='d-flex mt-2'>
                                <span style={{ color: 'black' }} className='pe-2'><Phone size={25} /></span>
                                <h3 className='nav-top-header-head'>Reach Us</h3>
                            </div>
                        </NavLink>
                        <NavLink>


                            {role ? (
                                <UncontrolledDropdown style={{ marginTop: '5px' }} tag="li" className="dropdown-user nav-item">
                                    <DropdownToggle
                                        href="/"
                                        tag="a"
                                        className="nav-link dropdown-user-link"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <div className='d-flex mt-2'>
                                            <span style={{ color: 'black' }} className='pe-2'><User size={25} /></span>
                                            <h3 className='nav-top-header-head'>{name === "undefined" ? (mobile) : (name)}</h3>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        {role === 'USER' ? (
                                            <>
                                                <Link to='/MyOrder'>
                                                    <DropdownItem tag='a'><ShoppingBag style={{ color: 'black' }} /> My Order</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/MyCart'>
                                                    <DropdownItem tag='a'><ShoppingCart style={{ color: 'black' }} /> My Cart</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                {/* <Link to='/myQueries'>
                                                    <DropdownItem tag='a'><User style={{ color: 'black' }} /> My Queries</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' /> */}
                                                <Link to='/myWishList'>
                                                    <div className='d-flex'>
                                                        <DropdownItem tag='a'><Heart style={{ color: 'black' }} /> My WishList</DropdownItem>
                                                        {numberOfData ? (
                                                            <div className='cart-count mt-1 pe-4' style={{ backgroundColor: 'white', color: 'black' }}>
                                                                ({numberOfData})
                                                            </div>
                                                        ) : (
                                                            null
                                                        )}
                                                    </div>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/MyProfile'>
                                                    <DropdownItem tag='a'><User style={{ color: 'black' }} /> My Profile</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/'>
                                                    <DropdownItem tag='a' onClick={logout} className="text-danger"><LogOut /> Log Out</DropdownItem>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to='/admin/dashboard'>
                                                    <DropdownItem tag='a'><TrendingUp style={{ color: 'black' }} /> DashBoard</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                {/* <Link to='/admin/'>
                                        <DropdownItem tag='a'>Orders</DropdownItem>
                                    </Link> */}
                                                <Link to='/admin/productCategory'>
                                                    <DropdownItem tag='a'><BookOpen style={{ color: 'black' }} /> Product Category</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/admin/product'>
                                                    <DropdownItem tag='a'><Box style={{ color: 'black' }} /> Product</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/admin/offerProduct'>
                                                    <DropdownItem tag='a'><Percent style={{ color: 'black' }} />Offer Product</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/admin/fieldType'>
                                                    <DropdownItem tag='a'><File style={{ color: 'black' }} /> Field</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/admin/menu'>
                                                    <DropdownItem tag='a'><Home style={{ color: 'black' }} /> Menu Combo</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />
                                                <Link to='/admin/newstiker'>
                                                    <DropdownItem tag='a'><Newspaper style={{ color: 'black' }} /> News Ticker</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' />

                                                {/* <Link to='/admin/report'>
                                                    <DropdownItem tag='a'><FileText style={{ color: 'black' }} /> Report</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' /> */}
                                                {/* <Link to='/admin/fieldOption'>
                                                    <DropdownItem tag='a'><AlignCenter style={{ color: 'black' }} /> Field Option</DropdownItem>
                                                </Link>
                                                <hr className='m-0 p-0' /> */}
                                                <Link to='/'>
                                                    <DropdownItem tag='a' onClick={logout} className="text-danger"><LogOut /> Log Out</DropdownItem>
                                                </Link>
                                            </>
                                        )}

                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            ) : (
                                <div className='d-flex mt-2' onClick={toggle}>
                                    <span style={{ color: 'black' }} className='pe-2'><User size={25} /></span>
                                    <h3 className='nav-top-header-head'>Login / Signup</h3>
                                </div>
                            )}
                        </NavLink>
                        <Link to='/myCart'>
                            <div className='d-flex'>
                                <span style={{ color: 'black' }} className='pe-1 mt-2'><ShoppingCart size={25} /></span>
                                {numberOfItem ? (
                                    <div className='cart-count mb-4'>
                                        {numberOfItem}
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div >

            <div style={{ position: 'sticky', top: -1, zIndex: 100 }}>
                <div className='nav-mobile' >
                    <nav>
                        <div className='d-lg-none'>
                            <div className='nav-mobile-flex'>
                                <div className='d-flex'>
                                    <div className={`toggle-wrap ${menuActive ? 'active' : ''} mt-3`} onClick={toggleMenu}>
                                        <span className="toggle-bar"></span>
                                    </div>
                                    <h2 style={{ color: 'white', fontWeight: '400' }} className='pt-4'>Products</h2>
                                </div>
                                <div className='d-flex mt-3'>
                                    <div onClick={openModalOnClick} style={{ marginTop: "10px", marginRight: "3px" }}>
                                        <span className='pe-3' style={{ color: "white" }}> <Search /></span>
                                    </div>
                                    <div className='cart-link me-3' >
                                        <Link to='/myCart'>
                                            <div className='d-flex'>
                                                <span style={{ color: 'white' }} className='pe-1 mt-2'><ShoppingCart size={25} /></span>
                                                {numberOfItem ? (
                                                    <div className='cart-count mb-4' style={{ backgroundColor: 'white', color: 'black' }}>
                                                        {numberOfItem}
                                                    </div>
                                                ) : (
                                                    null
                                                )}

                                            </div>
                                        </Link>
                                    </div>
                                    {role ? (
                                        <UncontrolledDropdown style={{ marginTop: '5px' }} tag="li" className="dropdown-user nav-item">
                                            <DropdownToggle
                                                href="/"
                                                tag="a"
                                                className="nav-link dropdown-user-link"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <div className='d-flex mt-1'>
                                                    <span style={{ color: 'white' }} className=''><User size={25} /></span>
                                                    {/* <h3 className='nav-top-header-head'>{role}</h3> */}
                                                </div>
                                            </DropdownToggle>
                                            <DropdownMenu className='mobile-dropdown-auth' end>
                                                {role === 'USER' ? (
                                                    <>
                                                        <Link to='/MyOrder'>
                                                            <DropdownItem tag='a'><ShoppingCart /> My Order</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/MyCart'>
                                                            <DropdownItem tag='a'><ShoppingCart /> My Cart</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/myWishList'>
                                                            <div className='d-flex'>
                                                                <DropdownItem tag='a'><Heart style={{ color: 'black' }} /> My WishList</DropdownItem>
                                                                {numberOfData ? (
                                                                    <div className='cart-count mt-1 pe-4' style={{ backgroundColor: 'white', color: 'black' }}>
                                                                        ({numberOfData})
                                                                    </div>
                                                                ) : (
                                                                    null
                                                                )}
                                                            </div>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        {/* <Link to='/myQueries'>
                                                            <DropdownItem tag='a'><User style={{ color: 'black' }} /> My Queries</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' /> */}

                                                        <Link to='/MyProfile'>
                                                            <DropdownItem tag='a'><User /> My Profile</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/'>
                                                            <DropdownItem tag='a' onClick={logout} className="text-danger"><LogOut /> Log Out</DropdownItem>
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to='/admin/dashboard'>
                                                            <DropdownItem tag='a'><TrendingUp /> DashBoard</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        {/* <Link to='/admin/'>
                                        <DropdownItem tag='a'>Orders</DropdownItem>
                                    </Link> */}
                                                        <Link to='/admin/productCategory'>
                                                            <DropdownItem tag='a'><BookOpen /> Product Category</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/admin/product'>
                                                            <DropdownItem tag='a'><Box /> Product</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/admin/offerProduct'>
                                                            <DropdownItem tag='a'><Percent />Offer Product</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/admin/fieldType'>
                                                            <DropdownItem tag='a'><File /> Field</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/admin/menu'>
                                                            <DropdownItem tag='a'><Home style={{ color: 'black' }} /> Menu Combo</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />
                                                        <Link to='/admin/newstiker'>
                                                            <DropdownItem tag='a'><Newspaper style={{ color: 'black' }} /> News Ticker</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' />                                                        {/* <Link to='/admin/fieldOption'>
                                                            <DropdownItem tag='a'><AlignCenter /> Field Option</DropdownItem>
                                                        </Link>
                                                        <hr className='m-0 p-0' /> */}
                                                        <Link to='/'>
                                                            <DropdownItem tag='a' onClick={logout} className="text-danger"><LogOut />Log Out</DropdownItem>
                                                        </Link>
                                                    </>
                                                )}

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    ) : (
                                        <div className='d-flex mt-2' onClick={toggle} style={{ cursor: 'pointer' }}>
                                            <span style={{ color: 'white' }} className=''><User size={25} /></span>
                                            {/* <h3 className='nav-top-header-head'>Login / Signup</h3> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='d-none d-lg-block' style={{ position: 'relative' }}>
                            <hgroup>
                                <div className='nav-left-con mt-3'>
                                    {/* <p className='nav-second-head pt-2' */}

                                    {/* onClick={handleNavLinkClick} > */}

                                    <NavLink style={{ textDecoration: 'none' }}>
                                        <div className='d-flex'>
                                            {menuData && menuData?.rows?.slice(0, showTabCount)?.map((item, i) => (
                                                <div className='d-flex'>
                                                    <p className='nav-second-head mt-2' key={item._id}
                                                        onMouseEnter={() => openShow(item?._id)}
                                                        onClick={() => handleMenuProductClick(item?.menu_url)}
                                                    >{item?.name}</p>
                                                    {showTabCount !== i + 1 && (
                                                        <div className='vertical-line'></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </NavLink>
                                    {/* </p> */}
                                </div>
                            </hgroup>
                            <div className='shadow menus-container' style={{ position: 'absolute ', width: '100%', marginTop: '8px', borderRadius: '20px' }}>
                                {isShown && (
                                    <div>
                                        <HomeMenu setIsShown={setIsShown} menus={menus} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                    <aside className={menuActive ? 'active' : ''}>
                        <a href="#" >
                            {menuData && menuData?.rows?.map(detail => (
                                <p className='mt-4' key={detail?._id}
                                    onClick={() => handleMenuProductClick(detail?.menu_url)}
                                >{detail?.name}</p>
                            ))}
                        </a>

                    </aside>
                </div >
            </div >

            {/* <HomeMenu isShown={isShown} setIsShown={setIsShown} menus={menus} /> */}
            <MobileOTPModal isOpen={modal} toggleOTP={toggle} logout={logoutValue} />

        </>
    )
}

export default Navbar
