import "./Coslow_main.css";
import { useNavigate } from "react-router-dom";
import vegetable from './images/vegetable.png';

function Coslow_main() {
  const navigate = useNavigate();

  const handleChallengeMainClick = () => {
    navigate('/coslowchallenge_main');
  };

  const handleDietRecordWriteClick = () => {
    navigate('/DietRecord_write');
  };


  return (
    <div className="Coslow-container">
      <div className="Coslow-main">
        <div className="Coslow-header">
          <div className="Coslow-header-layout">
            <div className="header-left">
              <div className="header-logo">CO-SLOW</div>
            </div>
            <div className="header-right">
              <div className="header-challenge" onClick={handleChallengeMainClick}>챌린지</div>
              <div className="header-record" onClick={handleDietRecordWriteClick}>나의기록</div>
              <div className="header-mypage">마이페이지</div>
              <div className="header-logout" >로그아웃</div>
            </div>
          </div>
        </div>
        <div className="main-text">
          <div className="main-logo">CO-SLOW</div>
          <div className="main-challenge">CHALLENGE</div>
          <div className="main-contents-text">
            코슬로와 함께 다양한 사람들과
            <br />다채로운 저속노화 식단 챌린지에 도전해보세요!
          </div>
        </div>
        <div className="vegetable-img">
          <img src={vegetable} alt="vegetable_image" />
        </div>
      </div>
    </div>
  );
}

export default Coslow_main;
