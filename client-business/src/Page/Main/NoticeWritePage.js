import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/notice.css'
import '../../styles/noticeModal.css'
import NoticeSendModal from '../Modal/NoticeSend';

const WriteNotice = () => {
  
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleConfirm = () => {
    console.log('보내기 작업 수행');
    closeModal();
  };

  return (
    <div className='page-container' lang='ko'>
        <div className='page-container2'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/customer-management')} />
                </button>
                알림장 작성
                <div> </div>
            </div>
            <div className='pet-title'>
                <div className='pet-name'>누렁이</div>
                <div className='pet-information'>리트리버/7kg/남/2살</div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>스타일</div>
                <input className='notice-textbox' type='text' id='sytles' name='styles' placeholder='스타일을 입력해 주세요.'/>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>피부</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="skin-type" value="good" /> 좋음
                    </label>
                    <label>
                        <input type="checkbox" name="skin-type" value="dry" /> 건조
                    </label>
                    <label>
                        <input type="checkbox" name="skin-type" value="sensitive" /> 민감
                    </label>
                </div>
            </div>
            <div className='notice-row2'>
                <div className='notice-title'> </div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="skin-type" value="red" /> 붉음
                    </label>
                    <label>
                        <input type="checkbox" name="skin-type" value="loss" /> 탈모
                    </label>
                    <label>
                        <input type="checkbox" name="skin-type" value="scab" /> 딱지
                    </label>
                </div>
            </div>
            <div className='notice-row2'>
                <div className='notice-title'> </div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="skin-type" value="boil" /> 종기
                    </label>
                    <label>
                        <input type="checkbox" name="skin-type" value="corneous" /> 각질
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>귀</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="ear-type" value="clear" /> 깨끗함
                    </label>
                    <label>
                        <input type="checkbox" name="ear-type" value="yellow-ear" /> 노란귀지
                    </label>
                    <label>
                        <input type="checkbox" name="ear-type" value="brown-ear" /> 갈색귀지
                    </label>
                </div>
            </div>
            <div className='notice-row2'>
                <div className='notice-title'> </div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="ear-type" value="ear-hear" /> 귓털많음
                    </label>
                    <label>
                        <input type="checkbox" name="ear-type" value="disease" /> 귓병
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>눈</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="eye-type" value="clear" /> 깨끗함
                    </label>
                    <label>
                        <input type="checkbox" name="eye-type" value="eyelid" /> 눈꼽
                    </label>
                    <label>
                        <input type="checkbox" name="eye-type" value="congestion" /> 충혈
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>발바닥</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="foot-type" value="good" /> 좋음
                    </label>
                    <label>
                        <input type="checkbox" name="foot-type" value="eczema" /> 습진
                    </label>
                    <label>
                        <input type="checkbox" name="foot-type" value="dry" /> 건조
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>발톱</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="nail-type" value="good" /> 적당함
                    </label>
                    <label>
                        <input type="checkbox" name="nail-type" value="short" /> 짧음
                    </label>
                    <label>
                        <input type="checkbox" name="nail-type" value="management" /> 관리필요
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>항문낭</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="anal-type" value="good" /> 적당함
                    </label>
                    <label>
                        <input type="checkbox" name="anal-type" value="many" /> 많음
                    </label>
                    <label>
                        <input type="checkbox" name="anal-type" value="none" /> 안나옴
                    </label>
                </div>
            </div>
            <div className='notice-row'>
                <div className='notice-title'>털엉킴</div>
                <div className='notice-checkboxes'>
                    <label>
                        <input type="checkbox" name="hair-type" value="yes" /> 유
                    </label>
                    <label>
                        <input type="checkbox" name="hair-type" value="no" /> 무
                    </label>
                </div>
            </div>
            <div className='notice-title2'>기타 특이사항</div>
            <textarea className='notice-textbox2' type='text' id='etc-meno' name='etc-meno' placeholder='전달사항을 입력해주세요.'/>
        </div>
        <div className='footer'>
            <button className='send-btn' onClick={openModal}>보내기</button>
        </div>
        <NoticeSendModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
        />
    </div>
  );
};

export default WriteNotice;