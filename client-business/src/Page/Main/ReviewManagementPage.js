import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/review.css'

const ReviewManagement = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const reviews = [
    {
        reviewtime: '24-05-10-13:00',
        customername: '멍멍이/김인간',
        resultButton: '내용보기',
        reviewButton: '후기보기'
    },
    {
        reviewtime: '24-05-10-13:00',
        customername: '야옹이/최사람',
        resultButton: '내용보기',
        reviewButton: '후기보기'
    },
  ];

  return (
    <div className='page-container' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/admin-menu')} />
            </button>
            후기관리
            <div> </div>
        </div>
        <div className='review-title'>
            <div className='review-text'>이용한시간</div>
            <div className='review-text'>반려동물/보호자</div>
            <div className='review-text'>보낸 알림장</div>
            <div className='review-text'>후기</div>
        </div>
        <div class="horizontal-line"></div>
        {reviews.map((review, index) => (
            <div key={index} className='review-row'>
                <div className='review-item'>{review.reviewtime}</div>
                <div className='review-item'>{review.customername}</div>
                <div className='review-item'>
                    <button className='result-button' onClick={()=>navigate('/admin-menu')}>{review.resultButton}</button>
                </div>
                <div className='review-item'>
                    <button className='review-button' onClick={()=>navigate('/admin-menu')}>{review.reviewButton}</button>
                </div>
            </div>
        ))}
    </div>
  );
};

export default ReviewManagement;