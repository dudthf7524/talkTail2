import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import '../styles/notice.css';

const NoticePage = () => {
    const [isOpen, setIsOpen] = useState(false); // 아코디언 상태를 관리하기 위한 상태

    const toggleAccordion = () => {
        setIsOpen(!isOpen); // 아코디언 열림/닫힘 상태 토글
    };

    const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
    const searchUrl = `${process.env.PUBLIC_URL}/images/notice/search.svg`;

    return (
        <div lang='ko'>
            <div className='navigation'>
                <div></div>
                알림장목록
                <div></div>
            </div>
            <div className='header' lang='ko'>
                <div className='notice-header-bar'>
                    <input className='notice-header-search' placeholder="검색어를 입력하세요..." />
                    <img src={searchUrl} alt="" />
                </div>
                <div className={`notice-header ${isOpen ? 'open' : ''}`}>
                    <div className='notice-header-i'>
                        <div className='notice-header-item' onClick={toggleAccordion}>
                            시간 오름차 순
                            <button>
                                <img src={arrowUrl} alt='arrow' />
                            </button>
                        </div>
                    </div>
                      {isOpen && (
                        <div className='notice-header-i2'>
                            <div className='notice-header-item' onClick={toggleAccordion}>
                            시간 내림차 순
                            </div>
                        </div>
                      )}
                </div>
            </div>
        <div className={`notice-mid ${isOpen ? 'open' : ''}`}>
            <List />
        </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default NoticePage;