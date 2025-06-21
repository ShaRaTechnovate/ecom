import React, { useEffect, useState } from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Card, Col, Row, Spinner } from 'reactstrap'
import star from '../../../assets/images/banner/star.png'
import vector1 from "../../../assets/images/banner/Vector1.png"
import vector from "../../../assets/images/banner/Vector.png"
import vector3 from "../../../assets/images/banner/Vector3.png"
import vector2 from "../../../assets/images/banner/Vector2.png"
import lineBar from "../../../assets/images/banner/lineBar.png"
import { cusNewsTiker, productCategory } from '../../../ApiConfigs/ApiConfig'
import axios from 'axios'
import toast from 'react-hot-toast'
import { RxExternalLink } from "react-icons/rx";

function BannerHome() {

    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState();
    const [news, setNews] = useState();

    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(productCategory)
            setData(response?.data?.result)

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        additionalData()
    }, [])


    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: dataa?.length < 4 ? dataa?.length : 4,
        centerMode: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 908,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                },
            },
        ],

    };

    const navigate = useNavigate()

    const navProductType = (category_url) => {
        navigate(`/products/${category_url}`)
    }


    const navToProduct = () => {
        navigate('/products')
    }

    const newsSticker = async () => {
        try {
            setLoading(true);
            const response = await axios.get(cusNewsTiker)
            setNews(response?.data?.result)
            console.log(response);

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        newsSticker()
    }, [])




    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function calculateRemainingTime() {
        const now = new Date();
        const despatchTime = new Date(now);
        despatchTime.setDate(despatchTime.getDate() + 1);
        despatchTime.setHours(0, 0, 0, 0);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const timeDifference = despatchTime - now;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const nextDay = daysOfWeek[despatchTime.getDay()];

        return {
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds,
            nextDay,
        };
    }


    const [showFullDescription, setShowFullDescription] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [length, setlength] = useState();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        if (windowWidth > 1200) {
            setlength(22)
        }
        if (windowWidth > 1550) {
            setlength(40)
        }
    }, [windowWidth])

    const truncateDescription = (description, maxLength) => {
        if (windowWidth > 1550) {
            return description?.length > 38 ? `${description?.slice(0, 38)}...` : description;
        }
        else {
            return description?.length > maxLength ? `${description?.slice(0, maxLength)}...` : description;
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    useEffect(() => {
        const totalDescriptionLength = news?.rows?.reduce((total, item) => total + (item?.description.length || 0), 0);

        let baseAnimationDuration = 60;
        if (totalDescriptionLength > 100) {
            baseAnimationDuration /= 0.6;
        }

        document.documentElement.style.setProperty('--animation-duration', `${baseAnimationDuration}s`);
    }, [news]);

    return (
        <>
            <div class="ticker-wrap">
                <div class="ticker">
                    <div>
                        {news?.rows?.map((item, index) => (
                            <div key={index} className="ticker_item">
                                <img src={item?.icon} className='img-fluid' alt="" style={{ height: "50px" }} />
                                <strong>{item?.title}</strong> - {item?.description}
                                <span style={{ marginLeft: '20px' }}>
                                    <b>
                                        <a href={`/products/viewProduct/${item?.link_url}`} style={{ textDecoration: 'none' }}><RxExternalLink /> Click Here</a>
                                    </b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='banner-carousel-con mt-0'>
                {loading ? (
                    <div style={{ height: '310px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            color="primary"
                            size=""
                        >
                            Loading...
                        </Spinner>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {dataa?.map((eachDetails) => (
                            <div
                                className={`banner-card mt-3`}
                                onClick={() => navProductType(eachDetails?.category_url)}
                                key={eachDetails?.category_url}
                            >
                                <img src={eachDetails?.image} className='img-fluid' alt="" style={{ height: "250px", width: "100%" }} />
                                <div className='banner-card-content d-flex'>
                                    <div className='banner-card-headcontent'>
                                        <h6 className='banner-card-head m-0'
                                            style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {eachDetails?.name?.substring(0, 20)} {eachDetails?.name.length > 20 ? '...' : ''}
                                        </h6>
                                        <p
                                            className='m-0 pt-1 pb-2'
                                            onClick={toggleDescription}
                                            style={{
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',

                                            }}
                                            title={eachDetails?.description}
                                        >
                                            {showFullDescription
                                                ? eachDetails?.description
                                                : truncateDescription(eachDetails?.description, length)}
                                        </p>
                                    </div>
                                    <div className='banner-card-prize'>
                                        <p className='banner-card-starts m-0' style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                                            As Low As
                                        </p>
                                        <h2 className='banner-card-amnt' style={{ fontSize: `${eachDetails?.minimumPrice && eachDetails.minimumPrice.toString().length > 1 ? (eachDetails.minimumPrice.toString().length > 4 ? '18px' : '24px') : '24px'}`, textAlign: `${eachDetails?.minimumPrice && eachDetails.minimumPrice.toString().length === 1 ? 'center' : 'center'}` }}>₹{eachDetails?.minimumPrice}</h2>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </Slider>
                )}
            </div>
            <div className='how-it-work-con'>
                <h3 className='how-head'>How it works</h3>
                <div className='how-it-work-con1'>
                    <div className='d-flex'>
                        <div className='how-it-work-card'>
                            <img src={vector} height={50} alt="logo" />
                            <p className='para-work'>Choose Product</p>
                        </div>
                        <div className='d-none d-lg-block'>
                            <img src={lineBar} className='mt-5' height={5} alt="" />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='how-it-work-card'>
                            <img src={vector2} height={50} alt="logo" />
                            <p className='para-work'>Spec Product</p>
                        </div>
                        <div className='d-none d-lg-block'>
                            <img src={lineBar} className='mt-5' height={5} alt="" />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='how-it-work-card'>
                            <img src={vector3} height={50} alt="logo" />
                            <p className='para-work'>Upload Artwork</p>
                        </div>
                        <div className='d-none d-lg-block'>
                            <img src={lineBar} className='mt-5' height={5} alt="" />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='how-it-work-card'>
                            <img src={vector1} height={50} alt="logo" />
                            <p className='para-work'>Checkout</p>
                        </div>
                    </div>
                </div>
                <button className='banner-shopping-btn mt-3' onClick={navToProduct}>Let's Go Shopping</button>
            </div>


            <div className='banner-botton-con mb-2'>
                <Row >
                    <Col sm={12} md={6} className='pe-lg-0'>
                        <div className='banner-left-con'>
                            <div className='review-star-con'>
                                <h1 className='banner-left-head m-0 me-3'>Reviews</h1>
                                <div>
                                    <img src={star} height={20} alt="star" />
                                    <img src={star} height={20} alt="star" />
                                    <img src={star} height={20} alt="star" />
                                    <img src={star} height={20} alt="star" />
                                    <img src={star} height={20} alt="star" />
                                </div>
                                <p className='banner-left-para  mt-1 m-0'>4.9/5</p>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} className='ps-lg-2'>
                        <div className='banner-right-con'>
                            <div className='text-center'>
                                <h1 className='banner-right-head m-0'>Order within the next</h1>
                                <p className='banner-right-para m-0 mt-1'>
                                    {`${remainingTime.hours} hrs, ${remainingTime.minutes} mins, ${remainingTime.seconds} sec `}
                                    <span style={{ fontWeight: 'normal' }}>for</span> {remainingTime.nextDay} Despatch*
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default BannerHome
