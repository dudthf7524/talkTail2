import React, { useState, useEffect } from 'react';
import '../styles/page.css';
import '../font.css';
import CommunityList from './Components/List/CommunityList';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import Header from './Components/Header/Head';
import { useNavigate } from 'react-router-dom';
import api from '../Api';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const floatingButtonUrl = `${process.env.PUBLIC_URL}/images/community/floatingButton.svg`;

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }

            const response = await api.get('/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data;
            setNickname(userData.user_nickname);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // 오류 처리 로직 추가
        }
    };

    fetchUserData();
}, []);

  const onProfilClick = () => {
    navigate('/edit-user');
  }

  return (
    <div lang='ko'>
        <div className='navigation'>
          <div></div>
          커뮤니티
          <div></div>
        </div>
        <Header
          nickname={nickname}
          onProfilClick={onProfilClick}
        />
        {/* <CommunityList /> */}
        <NButtonContainer />
        <button className='floating-button'>
            <img src={floatingButtonUrl} alt="Floating Button" />
        </button>
    </div>
  );
};

export default CommunityPage;
