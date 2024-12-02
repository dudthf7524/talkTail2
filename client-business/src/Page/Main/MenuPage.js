import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/menu.css'

const AdminMenu = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo/logo.svg`;
  const reservationIcon = `${process.env.PUBLIC_URL}/images/icon/reservationIcon.svg`;
  const customerIcon = `${process.env.PUBLIC_URL}/images/icon/customerIcon.png`;
  const reviewIcon = `${process.env.PUBLIC_URL}/images/icon/reviewIcon.png`;
  const calculateIcon = `${process.env.PUBLIC_URL}/images/icon/calculateIcon.png`;
  const ImageIcon = `${process.env.PUBLIC_URL}/images/icon/ImageIcon.png`;
  const informationIcon = `${process.env.PUBLIC_URL}/images/icon/informationIcon.png`;

  const navigate = useNavigate();

  return (
    <div className='page-container'>
      <div className='menu-form' lang='ko'>
        <div className='greet-text'>안녕하세요.🙂</div>
        <div className='greet-text'>000님</div>
        <div className='admin-menu-text'>Admin Menu</div>
        <div className='menu-grid'>
          <button className='menu-tbt-btn' onClick={()=>navigate('/reservation-management')}>
            <img src={reservationIcon} alt="reservation icon" className='menu-icon'/>
            <span className='menu-text'><br/>예약관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/customer-management')}>
            <img src={customerIcon} alt="customer icon" className='menu-icon'/>
            <span className='menu-text'><br/>고객관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/review-management')}>
            <img src={reviewIcon} alt="review icon" className='menu-icon'/>
            <span className='menu-text'><br/>후기관리</span>
          </button>
          <button className='menu-tbt-btn' onClick={()=>navigate('/calculation-management')}>
            <img src={calculateIcon} alt="calculate icon" className='menu-icon'/>
            <span className='menu-text'><br/>정산관리</span>
          </button>
        </div>
        <button className='menu-tbt-btn2'>
          <img src={ImageIcon} alt="image icon" className='menu-icon'/>
          <span className='menu-text'><br/>이미지관리</span>
        </button>
        <button className='menu-tbt-btn2' onClick={()=>navigate('/register')}>
          <img src={informationIcon} alt="information icon" className='menu-icon'/>
          <span className='menu-text'><br/>첫 등록 자료 올리기</span>
        </button>
        <img src={logoUrl} alt="logo img" className='logo-img'></img>
      </div>
    </div>
  );
};

export default AdminMenu;