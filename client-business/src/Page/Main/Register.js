import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../../Contexts/ImageContext';

function Register() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { imageFiles } = useContext(ImageContext);
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
  const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;

  useEffect(() => {
    const textarea = document.getElementById('greetingTextarea');
    const placeholderText = '간단한 인삿말\n30자 이내';
    textarea.setAttribute('placeholder', placeholderText);
    textarea.style.whiteSpace = 'pre-line';
  }, []);

  const handleUploadClick = (imageType) => {
    navigate(`/imgupload/${imageType}`);
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
        {/* <div className='upload-box' onClick={() => handleUploadClick('main')}>
          <p>메인사진(상세페이지 최상단 노출)</p>
          <p>jpg 해상도 430*468</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div>
        <div className='upload-box' onClick={() => handleUploadClick('sub')}>
          <p>서브사진(로고 또는 가게 내외부 사진)</p>
          <p>jpg,png 해상도 430*430</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div>
        <div className='upload-box' onClick={() => handleUploadClick('album')}>
          <p>앨범사진(포트폴리오 or 게시할 사진)</p>
          <p>jpg 해상도 430*430</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div>
        <div className='upload-box' onClick={() => handleUploadClick('review')}>
          <p>후기사진(후기글은 .txt 파일로 업로드)</p>
          <p>해상도 430*430</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div> */}
        <div className='upload-box' onClick={() => handleUploadClick('pricing')}>
          <p>가격표</p>
          <p>엑셀,이미지,pdf,한글 파일 등</p>
          <div>
            <img src={keyButtonUrl} alt='' />
            파일올리기
          </div>
        </div>
        <div className='input-container'>
          <p>상호명</p>
          <input type='text' name='name' placeholder='상호명을 입력해 주세요.' />
        </div>
        <div className='input-container'>
          <p>주소</p>
          <input type='text' name='location' placeholder='주소를 입력해 주세요.' />
        </div>
        <div className='input-container'>
          <p>취급종</p>
          <input type='text' name='species' placeholder='소형견,중형견,대형견 등' />
        </div>
        <div className='input-container'>
          <p>영업요일</p>
          <input type='text' name='dayon' placeholder='월화수목금토' />
        </div>
        <div className='input-container'>
          <p>휴무일</p>
          <input type='text' name='dayoff' placeholder='지정공휴일,매주 일요일' />
        </div>
        <div className='input-container'>
          <p>인삿말</p>
          <div className="textarea-wrapper">
            <textarea id='greetingTextarea' name='contents' />
          </div>
        </div>
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
        <div className='input-container'>
          <p>영업점 번호</p>
          <input type='text' name='store_number' placeholder='02-000-0000' />
        </div>
      </div>
    </div>
  );
}

export default Register;
