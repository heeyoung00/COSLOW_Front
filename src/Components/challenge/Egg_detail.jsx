import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Egg_detail.css';
import egg from './images/egg.png';
import back from './images/back.png';
import axios from 'axios';
import React from 'react';

function Egg_detail() {
  const navigate = useNavigate();
  
  const [challenges, setChallenges] = useState([]);
  const [participantCount, setParticipantCount] = useState(0); // 참가자 수 상태 추가

  const [filteredChallenge, setFilteredChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('https://api.coslow.site/challenges', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Authorization: 'Bearer ' + localStorage.getItem["accessToken"]
        setChallenges(response.data);
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    // 데이터가 로드된 후 타이틀에 맞는 데이터를 필터링 (백엔드 만들어진후 수정..)
    if (challenges.length > 0) {
      const challenge = challenges.find(challenge => challenge.title === '계란으로 하루 한끼 요리하기');
      setFilteredChallenge(challenge);

      if (challenge) {
        fetchParticipantCount(challenge.id); // 참가자 수 가져오기
      }
    }
  }, [challenges]);

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


    // 줄바꿈 처리를 위한 함수
    const formatTextWithLineBreaks = (text) => {
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}<br />
        </React.Fragment>
      ));
    };

  // 네비게이션 핸들러
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


      //챌린지 저장
const handleSaveIconClick = async (id) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');
  
  const data = {
    challengeId: parseInt(id, 10),
    userId: parseInt(userId, 10),
  };

  // 출력할 콘솔 로그 추가
  console.log('클릭한 챌린지 ID:', id);
  console.log('저장된 User ID:', userId);
  console.log('저장된 Token:', token);
  console.log('보내는 데이터:', data);

  try {
    const response = await axios.post('http://localhost:8080/challenges/save', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('챌린지 저장 성공:', response.data);
  } catch (error) {
    console.error('챌린지 저장 실패:', error);
    console.error('오류 응답 데이터:', error.response ? error.response.data : 'No response data');
    console.error('오류 상태:', error.response ? error.response.status : 'No response status');
    console.error('오류 헤더:', error.response ? error.response.headers : 'No response headers');
  }
};

  return (
    <div className="Egg-container">
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

          {filteredChallenge ? (
            <div className='full-container2'>
              <div className="Egg-title">
                <span>{formatTextWithLineBreaks(filteredChallenge.title)}</span>                       
                <div className="Egg-term">
                  <span>{filteredChallenge.startDate} - {filteredChallenge.endDate}</span>
                </div>
              </div>
              <div className="Egg-contents-detail">
                <span>{formatTextWithLineBreaks(filteredChallenge.description)}</span>
              </div>
              <div className="Egg-attend-num">
                <span>지금까지 {participantCount}명이 참가했어요</span>
                {/* {filteredChallenge.어쩌고} */}
                <button className="Egg-attend-button" onClick={handleChallengeApplyClick}>챌린지 참가하기</button>
              </div>
              <div className="egg-img" onClick={(e) => { e.stopPropagation(); handleSaveIconClick(challenges.id); }}>
                <img src={egg} alt="Egg" />
              </div>
            </div>
          ) : (
            <p>챌린지가 없습니다</p>
          )}
      </div>
    </div>
  );
}

export default Egg_detail;
