import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../../Contexts/ImageContext';

function RegisterInformation() {
    //주소 api
    const [postcode, setPostcode] = useState(""); // 우편번호
    const [roadAddress, setRoadAddress] = useState(""); // 도로명 주소
    const [jibunAddress, setJibunAddress] = useState(""); // 지번 주소
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림/닫힘 상태
    const popupRef = useRef(null);

    const handleAddressSearch = () => {
        setIsPopupOpen(true); // 팝업 열기

        const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.body.appendChild(script);

        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 도로명 주소와 지번 주소 선택 처리
                    if (data.userSelectedType === "R") {
                        setRoadAddress(data.roadAddress); // 도로명 주소
                    } else {
                        setRoadAddress("");
                    }
                    setJibunAddress(data.jibunAddress); // 지번 주소
                    setPostcode(data.zonecode); // 우편번호

                    // 팝업 닫기
                    setIsPopupOpen(false);

                    // 스크롤 위치 복원
                    document.body.scrollTop = currentScroll;
                },
                onresize: (size) => {
                    if (popupRef.current) {
                        popupRef.current.style.height = `${size.height}px`;
                    }
                },
                width: "100%",
                height: "100%",
            }).embed(popupRef.current);
        };
    };


    const times = [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
        "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ];

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
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
                </button>
                등록자료 올리기
                <div onClick={handleSave}>저장</div>
            </div>
            <div className='main-mid'>
                <div className='upload-box' onClick={() => handleUploadClick('main')}>
                    <p>메인사진(상세페이지 최상단 노출)</p>
                    <p>jpg 해상도 430*468</p>
                    <div>
                        <img src={keyButtonUrl} alt='' />
                        파일올리기
                    </div>
                </div>
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
                {isPopupOpen && (
                    <div
                        style={{
                            display: "block",
                            position: "relative",
                            width: "100%",
                            height: "300px",
                            border: "1px solid #ddd",
                            marginTop: "10px",
                        }}
                    >
                        <img
                            src="//t1.daumcdn.net/postcode/resource/images/close.png"
                            alt="닫기"
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                zIndex: 1,
                            }}
                            onClick={() => setIsPopupOpen(false)}
                        />
                        <div
                            ref={popupRef}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        ></div>
                    </div>
                )}
                <div className='input-container'>
                    <p>우편번호</p>
                    <input type="text" value={postcode} readOnly placeholder="우편번호" />
                    <button onClick={handleAddressSearch}>우편번호 찾기</button>
                </div>
                <div className='input-container'>
                    <p>도로명 주소</p>
                    <input type="text" value={roadAddress} readOnly placeholder="우편번호" />
                </div>
                <div className='input-container'>
                    <p>지번 주소</p>
                    <input type="text" value={jibunAddress} readOnly placeholder="우편번호" />
                </div>
                <div className='input-container'>
                    <p>상세 주소</p>
                    <input type="text"/>
                </div>
              
                
                
                <div className='input-container'>
                    <p>평일오픈시간</p>
                    <select>
                        {
                            times.map(function (a, i) {
                                return (
                                    <option>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>
                    <p>평일마감시간</p>
                    <select>
                        {
                            times.map(function (a, i) {
                                return (
                                    <option>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>
                    <p>주말오픈시간</p>
                    <select>
                        {
                            times.map(function (a, i) {
                                return (
                                    <option>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>
                    <p>주말마감시간</p>
                    <select>
                        {
                            times.map(function (a, i) {
                                return (
                                    <option>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='input-container'>
                    <p>영업일</p>
                    <input type='text' name='business_registration_name' placeholder='사업자 등록명' />
                </div>
                <div className='input-container'>
                    <p>휴무일</p>
                    <input type='text' name='business_registration_number' placeholder='000-00-00000' />
                </div>
                <div className='input-container'>
                    <p>가게전화번호</p>
                    <select>
                        <option>053</option>
                    </select>
                    -
                    <input type='text' />
                    -
                    <input type='text' />
                </div>
                <div className='input-container'>
                    <p>인삿말</p>
                    <div className="textarea-wrapper">
                        <textarea id='greetingTextarea' name='contents' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterInformation;