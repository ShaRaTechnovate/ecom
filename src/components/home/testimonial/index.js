import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { speedSale } from '../../../ApiConfigs/ApiConfig';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from 'reactstrap';
import { MapPin, Star } from 'react-feather';
import man from '../../../assets/images/banner/man.jpg'
import man1 from '../../../assets/images/banner/man1.jpg'
import man2 from '../../../assets/images/banner/man2.jpg'
import man3 from '../../../assets/images/banner/man3.jpg'
import man4 from '../../../assets/images/banner/man4.jpg'
import man5 from '../../../assets/images/banner/serious-man-looking-camera_23-2147799044.avif'
import './index.css'

function TestimonialIndex() {

    const [loading, setLoading] = useState(false);
    const [dataa, setData] = useState();


    const additionalData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(speedSale)
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


    const cardDetails = [
        {
            id: "1",
            img: man4,
            name: "Palanikumar",
            location: "Tamilnadu",
            ratings: "4.5/5",
            description: "I needed new business cards in a hurry for a networking event, and Printon delivered with speed and precision. The online design tool was intuitive, and I had no trouble creating a professional-looking card."
        },
        {
            id: "2",
            img: man,
            name: "Riyazkhan",
            location: "Karnataka",
            ratings: "4.8/5",
            description: "I run a small online business and depend on eye-catching stickers and labels for packaging. The printing website has become my go-to for these essential branding elements. The stickers are of high quality and smooth finish.",
        },
        {
            id: "1",
            img: man2,
            name: "Logeshwaran",
            location: "TamilNadu",
            ratings: "4.7/5",
            description: "I've been using this Printon for diaries, and I'm impressed with the durability and attention to detail. The paper quality is excellent. I appreciate the consistency in quality and will continue to be a loyal customer. ",
        },
        {
            id: "2",
            img: man3,
            name: "Rajesh",
            location: "Karntaka",
            ratings: "4.5/5",
            description: "I recently ordered custom calendars for a family reunion, and the Printon exceeded my expectations. The design process was user-friendly, allowing me to personalize each month with memorable photos.",
        },
        {
            id: "1",
            img: man1,
            name: "Arun",
            location: "Karnataka",
            ratings: "5/5",
            description: "I'm extremely satisfied with the quality, service, and variety offered by this Printon. Their commitment to excellence is evident in every product they deliver. Highly recommended for all your printing needs!",
        },
        {
            id: "2",
            img: man5,
            name: "Jabeer",
            location: "Karnataka",
            ratings: "5/5",
            description: "The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. I highly recommend their booklet printing services for anyone looking to make a strong impact at their events.",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        centerMode: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 992,
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

    return (
        <div className='pb-5' style={{ paddingLeft: '8%', paddingRight: '8%' }}>


            <Slider {...settings}>
                {cardDetails?.map((eachDetail) => (
                    <Card key={eachDetail.id} className='testmonialsCard  mt-1 mb-5'>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
                                <img src={eachDetail.img} className='testimonialImage img-fluid' alt='image' />
                                <div>
                                    <h5 className='pt-3 ms-2'><b> {eachDetail.name}</b></h5>
                                    <p className=' testimonialLocation ms-2  d-flex'> <MapPin className='mt-1 text-danger' width={15} height={15} /><p className='ms-1'>{eachDetail.location}</p></p>
                                </div>

                            </div>
                            <p className=' testimonialRatings pt-4'>  <Star style={{ color: '#e4510b' }} /> {eachDetail.ratings}</p>
                        </div>

                        <p className=' testimonialDescription text-center mt-2'> {eachDetail.description} </p>
                    </Card>
                ))}
            </Slider>

        </div>
    )
}

export default TestimonialIndex
