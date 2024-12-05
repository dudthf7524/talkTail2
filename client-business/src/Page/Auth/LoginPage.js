import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css'
import axios from 'axios';
const Login = () =>{
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo/logo.svg`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const login = async () => {
    const form = document.querySelector(".loginform");
    const formData = new FormData(form);

    const data = {
      username: formData.get("username"),
      password: formData.get("password")
    };
    console.log(data)

    try {
      // axios로 데이터 전송
      const response = await axios.post(`${apiUrl}/api/business/login`, data, { withCredentials: true});
      if (response.status === 200) {
        alert("로그인이 완료되었습니다.");
        console.log("req.body : ", response.data);
        window.location.href = "/admin-menu";
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("로그인 실패, 다시 시도하세요.");
    }

  }

  const loadUser = async() => {
    try {
      const response = await axios.get(`${apiUrl}/api/business/test`);
      console.log("response : ", response.data);
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className='login' lang='ko'>
      <div className='login-logo'>
        <img src={logoUrl} alt="logo img"></img>
      </div>
      <div className='login-text'>
        관리자 로그인
      </div>
      <button onClick={loadUser}>asdasd</button>
      <form className='loginform' typeof='post' onSubmit={login}>
        <div className='login-form'>
          <input type='text' id='username' name='username' placeholder='ID' />
          <input type='password' id='password' name='password' placeholder='PW' />
          <button type="button" onClick={(e) => {
            e.preventDefault();
            login();
          }}>
            로그인 하기
          </button>
        </div>
      </form>
      <div className='find-id-pw-text'>
        <Link to="/register">회원가입</Link>
      </div>
      <div className='find-id-pw-text'>
        <Link to="/find-admin-account">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default Login;