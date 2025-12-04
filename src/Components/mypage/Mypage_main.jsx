import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import "./Mypage_main.css";
import rank from './images/rank.png';
import reward from './images/reward.png';
import ranking from './images/ranking.png';
import attend from './images/attend.png';
import right from './images/right.png';
import like1 from './images/like1.png';
import save1 from './images/save1.png';
import back from './images/back.png';

import bbaendak from './images/bbaendak.png';
import dashin from './images/dashin.png';
import greating from './images/greating.png';
import health from './images/health.png';
import pocket from './images/pocket.png';
import saladbowl from './images/saladbowl.png';
import saladda from './images/saladda.png';
import thinker from './images/thinker.png';
import umsalad from './images/umsalad.png';

import rank1 from './images/rank1.png';
import rank2 from './images/rank2.png';
import rank3 from './images/rank3.png';
import rank4 from './images/rank4.png';
import rank5 from './images/rank5.png';

Modal.setAppElement('#root');

function Mypage_main() {
  const [rankModalIsOpen, setRankModalIsOpen] = useState(false);
  const [ptnModalIsOpen, setPtnModalIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    charLevel: 1, // Default to level 1
    grade: '',
    charPoint: 0,
    challengeCount: 0
  });

  // Define rank levels and thresholds
  const rankLevels = {
    1: '아기코북',
    2: '멋진코북',
    3: '똑똑한코북',
    4: '용감한코북',
    5: '전설의코북'
  };

  const rankThresholds = {
    1: 10,
    2: 30,
    3: 50,
    4: 100,
    5: Infinity
  };

  const getRankClassName = (charLevel) => {
    switch (charLevel) {
      case 1:
        return 'rank1-img';
      case 2:
        return 'rank2-img';
      case 3:
        return 'rank3-img';
      case 4:
        return 'rank4-img';
      case 5:
        return 'rank5-img';
      default:
        return '';
    }
  };

  const getRankImage = (charLevel) => {
    switch (charLevel) {
      case 1:
        return rank1;
      case 2:
        return rank2;
      case 3:
        return rank3;
      case 4:
        return rank4;
      case 5:
        return rank5;
      default:
        return null;
    }
  };

  const getNextRank = (charLevel) => {
    return rankLevels[charLevel + 1] || null;
  };

  const getProgressPercentage = (charLevel, challengeCount) => {
    const totalChallenges = rankThresholds[charLevel];
    const percentage = (challengeCount / totalChallenges) * 100;
    return Math.min(percentage, 100);
  };

  const openRankModal = () => {
    setRankModalIsOpen(true);
    setPtnModalIsOpen(false);
  };

  const closeRankModal = () => {
    setRankModalIsOpen(false);
  };

  const openPtnModal = () => {
    setPtnModalIsOpen(true);
    setRankModalIsOpen(false);
  };

  const closePtnModal = () => {
    setPtnModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/mypage', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('가져온 데이터: ', response.data);

        const { charLevel, charPoint, challengeCount } = response.data;
        const currentLevel = parseInt(charLevel, 10); // Ensure it's an integer

        setUserData({
          charLevel: currentLevel,
          charPoint,
          challengeCount
        });
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateLevel = () => {
      const { charLevel, challengeCount } = userData;
      const nextLevel = charLevel + 1;
      if (challengeCount >= rankThresholds[charLevel] && charLevel < Object.keys(rankThresholds).length) {
        setUserData((prevData) => ({
          ...prevData,
          charLevel: nextLevel,
          challengeCount: challengeCount - rankThresholds[charLevel] // Reset the challenge count for the new level
        }));
      }
    };

    updateLevel();
  }, [userData.challengeCount]);

  useEffect(() => {
    const percentage = getProgressPercentage(userData.charLevel, userData.challengeCount);
    const progressBarFill = document.querySelector('.progress-bar-fill');
    if (progressBarFill) {
      progressBarFill.style.width = percentage + '%';
    }
  }, [userData.charLevel, userData.challengeCount]);

  const rankImage = getRankImage(userData.charLevel);
  const nextRank = getNextRank(userData.charLevel);
  const progressPercentage = getProgressPercentage(userData.charLevel, userData.challengeCount);

  return (
    <div className="Mypage-main-container">
      <div className="Coslow-main">
        <div className="Coslow-header">
          <div className="Coslow-header-layout">
            <div className="header-left">
              <div className="header-logo">CO-SLOW</div>
            </div>
            <div className="header-right">
              <div className="header-challenge">챌린지</div>
              <div className="header-record">나의기록</div>
              <div className="header-mypage">마이페이지</div>
              <div className="header-logout">로그아웃</div>
            </div>
          </div>
        </div>
        <div className="mypage-user-1">
          <div className="mypage-user">
            <div className="Mypage-user-container">
              <div className="mypage-profile-img">
                <img src={localStorage.getItem('profileImg')} alt="Profile" />
              </div>
              <div className="mypage-user-info">
                <div className="mypage-user-nickname">
                  <span>{localStorage.getItem('nickname')}</span>
                  <div className="mypage-nickname-text">님</div>
                </div>
              </div>
            </div>

            <div className="mypage-coslow-container">
              <div className="mypage-rank-container" onClick={openRankModal}>
                <div className="rank-img">
                  <img src={rank} alt="rank_image" />
                </div>
                <div className="rank-text">나의 등급</div>
                <span>{rankLevels[userData.charLevel]}</span>
              </div>
              <div className="mypage-reward-container" onClick={openPtnModal}>
                <div className="reward-img">
                  <img src={reward} alt="reward_image" />
                </div>
                <div className="reward-text">리워드</div>
                <span>{userData.charPoint}</span>
              </div>
              <div className="mypage-challenge-attand-container">
                <div className="attend-img">
                  <img src={attend} alt="attend_image" />
                </div>
                <div className="attend-text">챌린지 참여횟수</div>
                <span>{userData.challengeCount}</span>
              </div>
            </div>

            <div className="mypage-action-container">
              <div className="action-text">나의 활동</div>
              <div className='my-action-container'>
                <div className="mylike-post-container">
                  <div className='mylike-post-contents'>
                    <div className="like1-img">
                      <img src={like1} alt="like1_image" />
                    </div>
                    <span>좋아요한 게시물</span>
                  </div>
                  <div className="right-img">
                    <img src={right} alt="right_image" />
                  </div>
                </div>
                <div className="mysave-challenge-container">
                  <div className='mysave-challenge-contents'>
                    <div className="save1-img">
                      <img src={save1} alt="save1_image" />
                    </div>
                    <span>저장한 챌린지</span>
                  </div>
                  <div className="right-img">
                    <img src={right} alt="right_image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="character-status">
            <div className='char-container'>
              <div className={`rank-image ${getRankClassName(userData.charLevel)}`}>
                {rankImage ? (
                  <img src={rankImage} alt="rank_image" />
                ) : (
                  <p>랭크 이미지가 없습니다.</p>
                )}
              </div>
            </div>
            <div className="character-text">
              <span>{nextRank}이가 되기까지</span>
              <div className="percent-content">
                <div className="percent">{progressPercentage.toFixed(1)}%</div>
                <span>진행했어요!</span>
              </div>
            </div>
            <div className="character-progress-bar">
              <div className="progress-bar-background">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="progress-bar-text-container">
                <div className="progress-bar-start-text">{rankLevels[userData.charLevel]}</div>
                <div className="progress-bar-end-text">{nextRank}</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modals for Rank and Reward */}
      <Modal
        isOpen={rankModalIsOpen}
        onRequestClose={closeRankModal}
        contentLabel="Rank Modal"
        className="Rankmodal"
        overlayClassName="overlay"
      >
        <div className='rankmodal-title'>등급표</div>
        <div className='back-button' onClick={closeRankModal}>
          <img src={back} alt="back-img" />
        </div>
        <div className='ranking-img'>
          <img src={ranking} alt="ranking-img" />
        </div>
      </Modal>

      <Modal
        isOpen={ptnModalIsOpen}
        onRequestClose={closePtnModal}
        contentLabel="ptn Modal"
        className="ptnmodal"
        overlayClassName="overlay"
      >
        <div className='ptnmodal-title'>리워드 사용가능한 제휴 브랜드</div>
        <div className='back-button' onClick={closePtnModal}>
          <img src={back} alt="back-img" />
        </div>
        <div className='ptnmodal-subtitle'>
          총 <span>9</span>개의 제휴 브랜드가 있어요.
        </div>
        <div className='ptn-img'>
          <div className='bbaendak-img'>
            <a href="https://smartstore.naver.com/bbaendak/category" target="_blank" rel="noopener noreferrer">
              <img src={bbaendak} alt="bbaendak-img" />
            </a>
          </div>
          <div className='dashin-img'>
            <a href="https://dietshin.com" target="_blank" rel="noopener noreferrer">
              <img src={dashin} alt="dashin-img" />
            </a>
          </div>
          <div className='greating-img'>
            <a href="https://greating.co.kr" target="_blank" rel="noopener noreferrer">
              <img src={greating} alt="greating-img" />
            </a>
          </div>
          <div className='health-img'>
            <a href="https://hnbclub.co.kr" target="_blank" rel="noopener noreferrer">
              <img src={health} alt="health-img" />
            </a>
          </div>
          <div className='pocket-img'>
            <a href="https://pocketsalad.co.kr" target="_blank" rel="noopener noreferrer">
              <img src={pocket} alt="pocket-img" />
            </a>
          </div>
          <div className='saladbowl-img'>
            <a href="https://thesaladbowl.co.kr" target="_blank" rel="noopener noreferrer">
              <img src={saladbowl} alt="saladbowl-img" />
            </a>
          </div>
          <div className='saladda-img'>
            <a href="https://saladpanda.co.kr" target="_blank" rel="noopener noreferrer">
              <img src={saladda} alt="saladda-img" />
            </a>
          </div>
          <div className='thinker-img'>
            <a href="https://smartstore.naver.com/thinkabody" target="_blank" rel="noopener noreferrer">
              <img src={thinker} alt="thinker-img" />
            </a>
          </div>
          <div className='umsalad-img'>
            <a href="https://smartstore.naver.com/yumsalad/category" target="_blank" rel="noopener noreferrer">
              <img src={umsalad} alt="umsalad-img" />
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Mypage_main;
