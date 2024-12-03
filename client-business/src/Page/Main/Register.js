import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../../Contexts/ImageContext';

function Register() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { imageFiles } = useContext(ImageContext);
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;

  const handleUploadClick = (imageType) => {
    navigate(`/imgupload/${imageType}`);
  };

  const [formData, setFormData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // 이미지 파일을 FormData에 추가
      Object.keys(imageFiles).forEach((key) => {
        imageFiles[key].forEach((file) => {
          formData.append(key, file);
        });
      });

      // 추가 입력값들을 FormData에 추가
      const inputs = document.querySelectorAll('.input-container input, .input-container textarea');
      inputs.forEach((input) => {
        formData.append(input.name, input.value);
      });

      // 서버로 FormData를 전송
      const response = await axios.post(`${apiUrl}/api/businesses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload successful:', response.data);

      // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
      navigate('/success'); // 성공 페이지로 이동
    } catch (error) {
      console.error('Error during upload:', error);
      // 오류 처리
    }
  };

  return (
    <div className='mid' lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/admin-menu')} />
        </button>
        등록자료 올리기
        <div onClick={handleSave}>저장</div>
      </div>
      <div className='main-mid'>
        <div className='upload-box' onClick={() => handleUploadClick('pricing')}>
          <p>가격표</p>
          <p>엑셀,이미지,pdf,한글 파일 등</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div>
        카테고리
        <div className='input-container'>
          <p>사업체 운영 종류</p>
          <select>
            <option value="value">미용</option>
            <option value="hotel">호텔</option>
            <option value="kindergarten">유치원</option>
          </select>
        </div>
        회원가입
        <div className='input-container'>
          <p>아이디</p>
          <input type='text' name='login_id' onChange={handleInputChange} value={formData.login_id} placeholder='상호명을 입력해 주세요.' />
        </div>
        <div className='input-container'>
          <p>비밀번호</p>
          <input type='text' name='name' placeholder='상호명을 입력해 주세요.' />
        </div>

        사업자 정보
        <div className='input-container'>
          <p>사업자 등록명</p>
          <input type='text' name='business_registration_name' placeholder='사업자 등록명' />
        </div>
        <div className='input-container'>
          <p>사업자 번호</p>
          <input type='text' name='business_registration_number' placeholder='000-00-00000' />
        </div>
        <div className='input-container'>
          <p>이메일</p>
          <input type='text' name='email' placeholder='이메일' />
        </div>
        <div className='input-container'>
          <p>대표번호</p>
          <input type='text' name='phone' placeholder='010-0000-0000' />
        </div>
        -
        <div className='input-container'>
          <input type='text' name='phone' placeholder='010-0000-0000' />
        </div> 
        -
        <div className='input-container'>
          <input type='text' name='phone' placeholder='010-0000-0000' />
        </div>
      </div>
    </div>
  );
}

export default Register;
