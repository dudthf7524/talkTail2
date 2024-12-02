import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css'

const FindIDPW = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo/logo.svg`;

  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/adminlogin');
  };

  return (
    <div className='find-id-pw-form' lang='ko'>
        <div className='customer-service-text'>
            고객센터로 문의해주세요.
        </div>
        <div className='service-number-text'>
            070-4571-7580
        </div>
        <button type='button' onClick={handleButtonClick}>확인</button>
        <img src={logoUrl} alt="logo img"></img>
    </div>
  );
};

export default FindIDPW;