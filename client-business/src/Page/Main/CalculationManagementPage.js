import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/calculation.css'

const CustomerManagement = () => {

  const [isListVisible, setIsListVisible] = useState(false);
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const handleToggleList = () => {
    setIsListVisible((prevState) => !prevState);
  };

  const costComfirms = [
    {
        registerDate: '24-05-10-13:00',
        customerName: '멍멍이',
        resultCost: '54,700',
        noticeButton: '상세보기'
    },
    {
        registerDate: '24-05-10-13:00',
        customerName: '강하띠',
        resultCost: '54,700',
        noticeButton: '상세보기'
    },
  ];

  return (
    <div className='page-container' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/admin-menu')} />
            </button>
            정산내역
            <div> </div>
        </div>

        <div className='calculation-title'>
            <div className='cal-date-txt'>2024년</div>
            <div className='cal-count-container'>
                <div className='cal-result-txt'>전체 건수</div>
                <div className='cal-count-txt'>0건</div>
            </div>
            <div className='cal-date-txt'> </div>
            <div className='cal-count-container'>
                <div className='cal-result-txt'>전체 금액</div>
                <div className='cal-count-txt'>45,000원</div>
            </div>
        </div>
        <div className='calculation-title2'>
            <div className='cal-date-txt'>4월</div>
            <div className='cal-count-container'>
                <div className='cal-result-txt'>전체 건수</div>
                <div className='cal-count-txt'>0건</div>
            </div>
            <div className='cal-date-txt'> </div>
            <div className='cal-count-container'>
                <div className='cal-result-txt'>전체 금액</div>
                <div className='cal-count-txt'>45,000원</div>
            </div>
        </div>
        <div class="horizontal-line"></div>

        <button className='cal-list-btn' onClick={handleToggleList}>
            {isListVisible ? '목록보기 ∧' : '목록보기 ∨'}
        </button>

        {isListVisible && (
            <div className='list-container'>
                <div className='cost-title'>
                    <div className='cost-text'>등록일</div>
                    <div className='cost-text'>반려동물</div>
                    <div className='cost-text'>금액</div>
                    <div className='cost-text'>알림장</div>
                </div>
                <div class="horizontal-line2"></div>
                {costComfirms.map((cost, index) => (
                    <div key={index} className='cost-row'>
                        <div className='cost-item'>{cost.registerDate}</div>
                        <div className='cost-item'>{cost.customerName}</div>
                        <div className='cost-item'>{cost.resultCost}</div>
                        <div className='cost-item'>
                            <button className='notice-button' onClick={()=>navigate('/admin-menu')}>{cost.noticeButton}</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CustomerManagement;