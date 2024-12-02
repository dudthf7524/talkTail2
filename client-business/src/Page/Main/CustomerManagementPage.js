import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer.css'

const CustomerManagement = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const customerResults = [
    {
        reservationtime: '24-05-10-13:00',
        customername: '멍멍이/김인간',
        resultButton: '내용보기',
        detailButton: '상세보기'
    },
    {
        reservationtime: '24-05-10-13:00',
        customername: '야옹이/최사람',
        resultButton: '내용쓰기',
        detailButton: '상세보기'
    },
  ];

  return (
    <div className='page-container' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/admin-menu')} />
            </button>
            고객관리
            <div> </div>
        </div>
        <div className='customer-title'>
            <div className='customer-text'>이용한시간</div>
            <div className='customer-text'>반려동물/보호자</div>
            <div className='customer-text'>알림장</div>
            <div className='customer-text'>상세</div>
        </div>
        <div class="horizontal-line"></div>
        {customerResults.map((customer, index) => (
            <div key={index} className='customer-row'>
                <div className='customer-item'>{customer.reservationtime}</div>
                <div className='customer-item'>{customer.customername}</div>
                <div className='customer-item'>
                    <button 
                        className={`result-button ${customer.resultButton === '내용쓰기' ? 'write-mode' : 'view-mode'}`}
                        onClick={() => navigate('/write-notice')}
                    >
                        {customer.resultButton}
                    </button>
                </div>
                <div className='customer-item'>
                    <button className='detail-button' onClick={()=>navigate('/admin-menu')}>{customer.detailButton}</button>
                </div>
            </div>
        ))}
    </div>
  );
};

export default CustomerManagement;