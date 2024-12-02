import React from 'react';
import { useNavigate } from 'react-router-dom';

const Event = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}/view-details`);
    };

    const handleClickReview = (event) => {
        navigate(`/events/${event.id}/review`);
    };

    return (
        <div className='notice-list-container' key={event.id} style={{ cursor: 'pointer' }}>
            <div className='text-container' onClick={() => handleClick(event)}>
                <div className='list-title-container'>
                    <div className='list-title'>{event.title}</div>
                    <div className='notice-content'>{event.content}</div>
                    <div className='notice-content'>{event.time}</div>
                </div>
            </div>
            <button className='notice-button' onClick={() => handleClickReview(event)}>후기쓰기</button>
        </div>
    );
};

export default Event;
