import React from "react";
import { useNavigate } from "react-router-dom";

const NButtonContainer = () => {
    const navigate = useNavigate();
    const reservationUrl = `${process.env.PUBLIC_URL}/images/community/reservation.svg`;
    const noticeUrl = `${process.env.PUBLIC_URL}/images/community/notice.svg`;
    const communityUrl = `${process.env.PUBLIC_URL}/images/community/community.svg`;
    const homeUrl = `${process.env.PUBLIC_URL}/images/community/home.svg`;
    const myPageUrl = `${process.env.PUBLIC_URL}/images/community/myPage.svg`;

    return (
        <div className='navigation-bar'>
            <button className='header-nickname-button' onClick={() => navigate('/reservation')}>
                <img src={reservationUrl} alt="reservation" />
            </button>
            <button className='header-nickname-button' onClick={() => navigate('/notice')}>
                <img src={noticeUrl} alt="notice" />
            </button>
            <button className='header-nickname-button' onClick={() => navigate('/home')}>
                <img src={homeUrl} alt="home" />
            </button>
            <button className='header-nickname-button' onClick={() => navigate('/community')}>
                <img src={communityUrl} alt="community" />
            </button>
            <button className='header-nickname-button' onClick={() => navigate('/my-Page')}>
                <img src={myPageUrl} alt="myPage" />
            </button>
        </div>
    );
}

export default NButtonContainer;
