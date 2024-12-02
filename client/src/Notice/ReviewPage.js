import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const emptyStarUrl = `${process.env.PUBLIC_URL}/images/notice/empty_star.svg`;
    const fullStarUrl = `${process.env.PUBLIC_URL}/images/notice/full_star.svg`;

    const [stars, setStars] = useState([false, false, false, false, false]); // 별들의 상태 관리
    const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태 관리
    const textareaRef = useRef(null); // textarea 참조를 위한 ref

    const handleStarClick = (index) => {
        const newStars = stars.map((star, i) => i <= index);
        setStars(newStars);
    };

    const handleStarClickRemove = (index) => {
        const newStars = stars.map((star, i) => i < index);
        setStars(newStars);
    };

    const handleStarClickToggle = (index) => {
        if (stars[index]) {
            handleStarClickRemove(index);
        } else {
            handleStarClick(index);
        }
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
        adjustTextareaHeight(); // 텍스트가 변경될 때 높이 조정
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 자동으로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 설정
        }
    };

    useEffect(() => {
        adjustTextareaHeight(); // 컴포넌트가 마운트될 때 초기 높이 조정
    }, [reviewText]);

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    후기쓰기
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='review-text'>
                        <h1>한라마운틴미용실</h1>
                        <p>제주특별자치도 제주시 한라읍 한라동 387-8번지 101호 백록담 호수 안</p>
                    </div>
                    <div className='review-star-container'>
                        <div className='review-star-box'>
                            {stars.map((isFull, index) => (
                                <div className='review-star' key={index} onClick={() => handleStarClickToggle(index)}>
                                    <img src={isFull ? fullStarUrl : emptyStarUrl} alt={`star-${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='review-nickname'>
                        닉네임
                    </div>
                    <textarea
                        ref={textareaRef}
                        className='review-input'
                        placeholder="리뷰를 입력하세요..."
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    />
                </div>
            </div>
            <div className='Nbutton' onClick={() => navigate('/notice')}>저장하기</div>
        </div>
    );
};

export default Review;
