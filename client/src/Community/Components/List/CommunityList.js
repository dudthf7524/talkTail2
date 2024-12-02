import React, { useState } from 'react';
import '../../../font.css';
import Event from './Events';

const CommunityList = () => {
    const [listEvents, setListEvents] = useState([
        {
            id: 1,
            tags: ['강아지', '고양이'],
            title: '제목이 들어가는 박스',
            content: '내용이 들어가는 텍스트 박스 본문이 들어가는 곳',
            timeAgo: '1시간 전',
            views: 100,
            comments: 5
        },
        {
            id: 2,
            tags: ['고양이'],
            title: '제목2',
            content: '내용2',
            timeAgo: '2시간 전',
            views: 200,
            comments: 10
        },
        {
            id: 3,
            tags: ['강아지'],
            title: '제목3',
            content: '내용3',
            timeAgo: '3시간 전',
            views: 300,
            comments: 15
        },
        {
            id: 4,
            tags: ['강아지', '고양이'],
            title: '제목4',
            content: '내용4',
            timeAgo: '3시간 전',
            views: 300,
            comments: 15
        },
        // 다른 리스트 이벤트들 추가 가능
    ]);

    return (
        <div className='list'>
           {listEvents.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </div>
    );
}

export default CommunityList;
