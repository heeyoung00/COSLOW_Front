import "./Coslow_banner.css"
import vegetable from './images/vegetable.png';
import kakao from './images/kakao.png';
import Modal from 'react-modal';
// import { useNavigate } from "react-router-dom";
import { useState} from 'react';

Modal.setAppElement('#root');


function Coslow_banner(){

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  // const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);


  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };




  // const navigate = useNavigate();
  // const handleafterloginClick = () => {
  //   navigate('/afterlogin');
  // };


    const handleKakaoLogin = () => {
      window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5815a4975b35540b74e2ebbd27ed6902&redirect_uri=https://coslow.site/loginredirect';
    };


  return(
    <div className="Coslow-container">
      <div className="Coslow-main">
      <div className={`main ${loginModalIsOpen ? 'modal-open' : ''}`}>
        <div className="Coslow-header1">
          <div className="Coslow-header-layout1">
            <div className="header-left1">
              <div className="header-logo">CO-SLOW</div>
            </div>
            <div className="header-right1">
              <div className="header-challenge">챌린지</div>
              <div className="main-signIn-Up" onClick={openLoginModal}>로그인/회원가입</div>
            </div>
          </div>
        </div>
        <div className="main-text">
          <div className="main-logo">CO-SLOW</div>
          <div className="main-challenge">CHALLENGE</div>
          <div className="main-contents-text">
            코슬로와 함께 다양한 사람들과
            <br/>다채로운 저속노화 식단 챌린지에 도전해보세요!
          </div>
        </div>
        <div className="vegetable-img">
          <img src={vegetable} alt="vegetable_image" />
        </div>
      </div>

      
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        contentLabel="로그인"
        className="modal1"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <div className='modal-login'>로그인</div>
          <div className="modal-login-footer2">
              <button className="modal-login-button2" onClick={handleKakaoLogin}>
                <div className="kakao-img">
                  <img src={kakao} alt="kakao_image" />
                </div>
                <span className="button-text">카카오로 로그인</span>
              </button>
            </div> 
          </div>
      </Modal>
      </div>
    </div>
  )
}

export default Coslow_banner