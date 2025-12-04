import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Record_main.css';

import saveicon from './images/save.png';

function Record_main() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeOption, setActiveOption] = useState('코슬로 챌린지');
  const [appliedChallenges, setAppliedChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(false);

  const boardIdMap = {
    '코슬로 챌린지': 1,
    '제휴 챌린지': 2,
    '유저끼리 챌린지': 3,
    '내가 만든 챌린지': 4,
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem('accessToken');
      const boardId = boardIdMap[activeOption];
      console.log(`Fetching challenges for boardId: ${boardId}`);
      try {
        const response = await axios.get(`https://api.coslow.site/challenges/user/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched challenges:', response.data);
        setAppliedChallenges(response.data);
        setFetchError(false);
      } catch (error) {
        console.error('Failed to fetch challenges', error);
        setFetchError(true);
      }
    };

    fetchChallenges();
  }, [activeOption]);


  useEffect(() => {
    const filterChallenges = () => {
      let filtered = appliedChallenges;

      // Filter by activeCategory
      if (activeCategory === '모집중') {
        filtered = filtered.filter(challenge => challenge.status === 'RECRUITING');
      } else if (activeCategory === '진행중') {
        filtered = filtered.filter(challenge => challenge.status === 'PROCEEDING');
      } else if (activeCategory === '완료') {
        filtered = filtered.filter(challenge => challenge.status === 'COMPLETED');
      }

      console.log(`Filtered challenges for ${activeOption} and ${activeCategory}:`, filtered);
      setFilteredChallenges(filtered);
    };

    filterChallenges();
  }, [activeCategory, appliedChallenges]);

  const handleRecordMainClick = () => {
    navigate('/record');
  };

  const handleCoslowBannerClick = () => {
    navigate('/');
  };

  const handlemyDietClick = () => {
    navigate('/recordmydiet');
  };

  const handlechallengeClick = () => {
    navigate('/coslowchallenge_main');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleChallengeClick = () => {
    navigate('/recordDetail')
  };

  const formatTitle = (title) => {
    // Implement your title formatting logic if needed
    return title;
  };

  return (
    <div className="Record-container">
      <div className="Record-Coslow-main">
        <div className="Coslow-header">
          <div className="Coslow-header-layout">
            <div className="header-left">
              <div className="header-logo">CO-SLOW</div>
            </div>
            <div className="header-right">
              <div className="header-challenge" onClick={handlechallengeClick}>챌린지</div>
              <div className="header-record" onClick={handleRecordMainClick}>나의기록</div>
              <div className="header-mypage">마이페이지</div>
              <div className="header-logout" onClick={handleCoslowBannerClick}>로그아웃</div>
            </div>
          </div>
        </div>

        <div className="Record-category">
          {['전체', '모집중', '진행중', '완료'].map((category) => (
            <span
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </span>
          ))}
        </div>

        <div className='my-challenge-record-container'>
          <div className='my-challenge-options-container'>
            <div className='my-challenge1'>내가 참여한 챌린지
              <div className='my-challenge-options'>
                {['코슬로 챌린지', '제휴 챌린지', '유저끼리 챌린지', '내가 만든 챌린지'].map((option) => (
                  <div
                    key={option}
                    className={option === activeOption ? 'active' : ''}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className='my-dietrecord1' onClick={handlemyDietClick}>나의 식단 기록</div>
          </div>

          <div className="challenge-list">
            {filteredChallenges.map((challenge) => {
              let statusClass = '';
              let statusText = '';

              if (challenge.status === 'RECRUITING') {
                statusClass = 'status-recruiting';
                statusText = (
                  <>
                    <div className="status-recruiting-text">모집중</div>
                    <div className="status-days-remaining">{challenge.daysRemaining}</div>
                  </>
                );
              } else if (challenge.status === 'COMPLETED') {
                statusClass = 'status-closed';
                statusText = '종료';
              } else if (challenge.status === 'PROCEEDING') {
                statusClass = 'status-ongoing';
                statusText = '진행중';
              }

              return (
                <div 
                  key={`${challenge.id}`}
                  className="challenge-box"
                  onClick={() => handleChallengeClick(challenge.id, challenge.title)}
                >
                  <div 
                    className="challenge-title" 
                    dangerouslySetInnerHTML={{ __html: formatTitle(challenge.title) }}
                  ></div>
                  <div className='save-icon'>
                    <img src={saveicon} alt="save-icon" />
                  </div>
                  <div className={`challenge-status ${statusClass}`}>
                    {statusText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record_main;
