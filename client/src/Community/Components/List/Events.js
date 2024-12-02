import React from 'react';
import EventTags from './EventTags';

const Event = ({ event }) => {
    return (
        <div className='list-container' key={event.id}>
            <div className='image-container'></div>
            <div className='text-container'>
                <EventTags tags={event.tags} views={event.views} />
                <div className='title-container'>
                    <div className='title'>{event.title}</div>
                    <div className='content'>{event.content}</div>
                </div>
                <div className='info'>
                    <span>{event.timeAgo}</span>
                    &nbsp;·&nbsp;
                    <span>조회수 {event.views}</span>
                    &nbsp;·&nbsp;
                    <span>댓글 {event.comments}</span>
                </div>
            </div>
        </div>
    );
};

export default Event;
