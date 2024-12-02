import React, { useState } from 'react';
import Event from './Events';

const List = () => {
    const [listEvents, setListEvents] = useState([
        {
            id: 1,
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
            time: '2024.02.06',
        },
        {
            id: 2,
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
            time: '2024.02.06',
        },
        {
            id: 3,
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
            time: '2024.02.06',
        },
        {
            id: 4,
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
            time: '2024.02.06',
        },
        {
            id: 5,
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
            time: '2024.02.06',
        }
    ]);

    return (
        <>
           {listEvents.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </>
    );
}

export default List;
