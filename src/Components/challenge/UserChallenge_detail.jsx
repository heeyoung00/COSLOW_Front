import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import './UserChallenge_detail.css';
import back from './images/back.png';

function UserChallenge_detail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 ID를 가져옵니다
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenge, setFilteredChallenge] = useState(null);
  const [participantCount, setParticipantCount] = useState(0); // 참가자 수 상태 추가
  const [setIsFull] = useState(false); // 최대 인원 도달 상태 추가
  const [isExpired, setIsExpired] = useState(false); // 종료 상태 추가

  // 챌린지 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('https://api.coslow.site/challenges', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChallenges(response.data);
        console.log('Fetched Challenges:', response.data); // 콘솔에 받아온 데이터 출력
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    if (challenges.length > 0) {
      const challenge = challenges.find(challenge => challenge.id === parseInt(id, 10));
      if (challenge) {
        const today = new Date();
        const endDate = new Date(challenge.endDate);

        // 종료 여부를 확인
        setIsExpired(today > endDate);
        setFilteredChallenge(challenge);
        fetchParticipantCount(challenge.id); // 참가자 수 가져오기
      }
    }
  }, [challenges, id]);

  useEffect(() => {
    if (isExpired) {
      alert('이미 종료된 챌린지입니다.');
    }
  }, [isExpired]);

  // 참가자 수를 가져오는 함수
  const fetchParticipantCount = async (challengeId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://localhost:8080/challenges/${challengeId}/participants/count`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setParticipantCount(response.data); // 응답에서 참여 인원 수를 가져옴
      console.log('Participant Count:', response.data); // 콘솔에 참가자 수 출력

      // 최대 인원 도달 여부 확인
      if (response.data >= (filteredChallenge ? filteredChallenge.maxParticipants : 0)) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    } catch (error) {
      console.error('Failed to fetch participant count', error);
    }
  };

  const handleChallengeApplyClick = async () => {
    const token = localStorage.getItem('accessToken'); // 액세스 토큰

    if (filteredChallenge && token) {
      const challengeId = filteredChallenge.id;
      const challengeApplyUrl = `http://localhost:8080/challenges/${challengeId}/apply`; // URL 생성

      try {
        // 참가 요청 보내기
        const response = await axios.post(challengeApplyUrl, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 로컬스토리지에서 가져온 토큰을 헤더에 추가
          }
        });

        if (response.status === 200) {
          console.log('신청 성공');
          // 참가자 수를 즉시 업데이트
          await fetchParticipantCount(challengeId);
        } else {
          console.log('신청 실패1', response.status);
        }
      } catch (error) {
        console.error('신청 실패2', error);
      }
    }
  };

  const handleBrowseChallengeClick = () => {
    navigate(-1); // 뒤로가기
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}<br />
      </React.Fragment>
    ));
  };

  const getParticipateFrequencyText = (frequency) => {
    switch (frequency) {
      case 'ONE_WEEK':
        return '1주';
      case 'TWO_WEEKS':
        return '2주';
      case 'ONE_MONTH':
        return '1달';
      default:
        return frequency; // 값이 일치하지 않을 때의 기본 케이스
    }
  };

  const handleChallengeMainClick = () => {
    navigate('/coslowchallenge_main');
  };

  const handleCoslowBannerClick = () => {
    navigate('/');
  };

  const handleDietRecordWriteClick = () => {
    navigate('/DietRecord_write');
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="userchallenge-container">
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
              <div className="header-logout" onClick={handleCoslowBannerClick}>로그아웃</div>
            </div>
          </div>
        </div>

        <div className="back-img" onClick={handleBackButtonClick}>
          <img src={back} alt="back_image" />
        </div>

        <div className='filter-userchallenge-container'>
          {filteredChallenge ? (
            <>
              <div className="userchallenge-title">
                <span>{formatTextWithLineBreaks(filteredChallenge.title)}</span>
              </div>
              <div className="userchallenge-term">
                <span>{filteredChallenge.startDate} - {filteredChallenge.endDate}</span>
              </div>
              <div className='userchallenge-hashTag'>
                <span>{filteredChallenge.tags.join(', ')}</span>
              </div>
              <div className='userchallenge-term-container'>
                <span>이 챌린지는 </span>
                <div className='userchallege-term-box'>
                  <span className="frequency-style">
                    {filteredChallenge.participateFrequency === 'CUSTOM' ? (
                      `${filteredChallenge.startDate} - ${filteredChallenge.endDate}`
                    ) : (
                      getParticipateFrequencyText(filteredChallenge.participateFrequency)
                    )}
                  </span>
                </div>
                <span>동안 진행되는 챌린지예요.</span>
              </div>
              <div className='userCheck-num-container'>
                <span>인증 횟수는</span>
                <div className='userCheck-num-box'>
                  <span>{filteredChallenge.weeklyCheckInCount}회</span>
                </div>
              </div>
              <div className='user-maxPerson-container'>
                <span>최대 인원은 </span>
                <div className='user-maxPerson-box'>
                  <span>{filteredChallenge.maxParticipants}명</span>
                </div>
                <span> 이예요.</span>
              </div>
              <div className="userchallenge-attend-num">
                <span>지금까지 {participantCount}명이 참가했어요</span>
                {isExpired || participantCount >= filteredChallenge.maxParticipants ? (
                  <button 
                    className="userchallenge-browse-button"
                    onClick={handleBrowseChallengeClick}
                  >
                    챌린지 둘러보기
                  </button>
                ) : (
                  <button 
                    className="userchallenge-attend-submit-button"
                    onClick={handleChallengeApplyClick}
                  >
                    챌린지 참가하기
                  </button>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default UserChallenge_detail;
