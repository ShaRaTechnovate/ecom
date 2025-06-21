import React from "react";
import "../socialmedia-feeds/style.css";
import Tabs from "./Taps";
import printonlogo from '../../../assets/images/logo/printon.png';
import insta from '../../../assets/images/logo/18246125_v982-d3-04 [Converted]-01.png';
import facebook from '../../../assets/images/logo/icon (3).png';
import twitter from '../../../assets/images/logo/sl_z_072523_61700_05.jpg';
import { Badge, Card, Col, Row, Spinner } from 'reactstrap'


function SocialFeeds() {

    const feedDetails = [
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/premium-psd/digital-marketing-agency-social-media-instagram-post-template_542746-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in",
            username: "@printon official",
            medialogo: facebook,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/furniture-sale-instagram-post-social-media-template_501970-139.jpg?w=826&t=st=1703673662~exp=1703674262~hmac=8e2a0c59daa3402af2e4f22b58de471f1acd7ee123f8092987ee86eb0bf1f9e6',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in official",
            username: "@printon official",
            medialogo: twitter,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/set-man-fashion-instagram-post-set-premium-psd_174241-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },

    ]

    const fbDetails = [

        {
            profileimg: printonlogo,
            Name: "printon.co.in",
            username: "@printon official",
            medialogo: facebook,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in",
            username: "@printon official",
            medialogo: facebook,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/premium-psd/digital-marketing-agency-social-media-instagram-post-template_542746-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in",
            username: "@printon official",
            medialogo: facebook,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in",
            username: "@printon official",
            medialogo: facebook,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },



    ]
    const instaDetails = [
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/radial-social-media-instagram-facebook-post-template_125755-384.jpg?w=826&t=st=1703673559~exp=1703674159~hmac=c8b5046b017ff09d463778f12967be46c1c60457f0096884949b9ac40eb7386d',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/set-man-fashion-instagram-post-set-premium-psd_174241-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon_co_in",
            username: "@printon official",
            medialogo: insta,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },

    ]

    const TwitterDetails = [
        {
            profileimg: printonlogo,
            Name: "printon.co.in official",
            username: "@printon official",
            medialogo: twitter,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/set-man-fashion-instagram-post-set-premium-psd_174241-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in official",
            username: "@printon official",
            medialogo: twitter,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instagram-post-social-media-post-web-banner-template_632498-803.jpg?w=826&t=st=1703660202~exp=1703660802~hmac=39f7eaad4abcc47816ccc618dffcfcb63edc77148b5136dc379ca962eab0034e',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in official",
            username: "@printon official",
            medialogo: twitter,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/tour-travel-instaghttps://img.freepik.com/premium-psd/digital-marketing-agency-social-media-instagram-post-template_542746-92.jpg?size=626&ext=jpg&ga=GA1.1.1402783899.1676623995&semt=ais',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },
        {
            profileimg: printonlogo,
            Name: "printon.co.in official",
            username: "@printon official",
            medialogo: twitter,
            dec: 'The giving the booklets a professional look and feel. The entire process, from designing to delivery, was seamless. ',
            img: 'https://img.freepik.com/free-psd/furniture-sale-instagram-post-social-media-template_501970-139.jpg?w=826&t=st=1703673662~exp=1703674262~hmac=8e2a0c59daa3402af2e4f22b58de471f1acd7ee123f8092987ee86eb0bf1f9e6',
            likecount: 'like',
            comments: 'comments',
            share: 'share'
        },

    ]



    return (
        <div className="SocialFeeds pt-5 pb-5" style={{ paddingLeft: '8%', paddingRight: '8%' }}>
            <Row>
                <Col lg={4} md={4} sm={4}>
                    <hr className='fast-head-line mt-4' />
                </Col>

                <Col lg={4} md={4} sm={4}>
                    <h1 className='fast-head'>Our Social Feeds</h1>
                </Col>

                <Col lg={4} md={4} sm={4}>
                    <hr className='fast-head-line mt-4' />
                </Col>
            </Row>

            <Tabs >
                <div label="ALL">
                    <Row>

                        {feedDetails?.map((items) => (
                            <Col xl={3} lg={6} md={6} sm={12} >
                                <Card className="feed-card shadow mt-3 mt-lg-0" style={{ border: "none", padding: '10px', borderRadius: '20px' }}>

                                    <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                                        < div className="d-flex">
                                            <img style={{ borderRadius: '100px' }} height={50} src={items.profileimg} />
                                            <h1 style={{ paddingLeft: '10px', fontSize: '15px' }} >{items.Name} <br></br><span style={{ fontSize: '15px' }}>{items.username}</span></h1>
                                        </div>

                                        <img style={{}} height={40} src={items.medialogo} />
                                    </div>

                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>{items.dec}</p>

                                    <img style={{}} height={300} src={items.img} />
                                    <div className="d-flex ms-1 gap-5 mt-4 ">
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-solid fa-comment"></i>
                                        <i class="fa-solid fa-share"></i>
                                    </div>
                                </Card>

                            </Col>
                        ))}
                    </Row>

                </div>
                <div label="Facebook">
                    <Row>

                        {fbDetails?.map((items) => (
                            <Col xl={3} lg={6} md={6} sm={12} >
                                <Card className="feed-card shadow  mt-3 mt-lg-0" style={{ border: "none", padding: '10px', borderRadius: '20px' }}>

                                    <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                                        < div className="d-flex">
                                            <img style={{ borderRadius: '100px' }} height={50} src={items.profileimg} />
                                            <h1 style={{ paddingLeft: '10px', fontSize: '15px' }} >{items.Name} <br></br><span style={{ fontSize: '15px' }}>{items.username}</span></h1>
                                        </div>

                                        <img style={{}} height={40} src={items.medialogo} />
                                    </div>
                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>{items.dec}</p>

                                    <img style={{}} height={300} src={items.img} />
                                    <div className="d-flex ms-1 gap-5 mt-4 ">
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-solid fa-comment"></i>
                                        <i class="fa-solid fa-share"></i>
                                    </div>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </div>
                <div label="Instagram">
                    <Row>

                        {instaDetails?.map((items) => (
                            <Col xl={3} lg={6} md={6} sm={12} >
                                <Card className="feed-card shadow  mt-3 mt-lg-0" style={{ border: "none", padding: '10px', borderRadius: '20px' }}>

                                    <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                                        < div className="d-flex">
                                            <img style={{ borderRadius: '100px' }} height={50} src={items.profileimg} />
                                            <h1 style={{ paddingLeft: '10px', fontSize: '15px' }} >{items.Name} <br></br><span style={{ fontSize: '15px' }}>{items.username}</span></h1>
                                        </div>

                                        <img style={{}} height={40} src={items.medialogo} />
                                    </div>
                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>{items.dec}</p>

                                    <img style={{}} height={300} src={items.img} />
                                    <div className="d-flex ms-1 gap-5 mt-4 ">
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-solid fa-comment"></i>
                                        <i class="fa-solid fa-share"></i>
                                    </div>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </div>
                <div label="Twitter">
                    <Row>

                        {TwitterDetails?.map((items) => (
                            <Col xl={3} lg={6} md={6} sm={12} >
                                <Card className="feed-card shadow  mt-3 mt-lg-0" style={{ border: "none", padding: '10px', borderRadius: '20px' }}>

                                    <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                                        < div className="d-flex">
                                            <img style={{ borderRadius: '100px' }} height={50} src={items.profileimg} />
                                            <h1 style={{ paddingLeft: '10px', fontSize: '15px' }} >{items.Name} <br></br><span style={{ fontSize: '15px' }}>{items.username}</span></h1>
                                        </div>

                                        <img style={{}} height={40} src={items.medialogo} />
                                    </div>

                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>{items.dec}</p>

                                    <img style={{}} height={300} src={items.img} />
                                    <div className="d-flex ms-1 gap-5 mt-4 ">
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-solid fa-comment"></i>
                                        <i class="fa-solid fa-share"></i>
                                    </div>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </div>
            </Tabs>
        </div >
    );
}

export default SocialFeeds
