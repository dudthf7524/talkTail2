import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css'

const Login = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo/logo.svg`;

  return (
    <div className='login' lang='ko'>
      <div className='login-logo'>
        <img src={logoUrl} alt="logo img"></img>
      </div>
      <div className='login-text'>
        관리자 로그인
      </div>
      <div className='login-form'>
        <input type='text' id='username' name='username' placeholder='ID'/>
        <input type='password' id='password' name='password' placeholder='PW'/>
        <button type='submit'>로그인 하기</button>
      </div>
      <div className='find-id-pw-text'>
        <Link to="/find-admin-account">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default Login;