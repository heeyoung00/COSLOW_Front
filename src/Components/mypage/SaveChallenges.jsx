import { useState, useEffect } from 'react';
import './SaveChallenges.css';
import back from './images/back.png';

function SaveChallenges() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('선택');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('챌린지 카테고리');
  const [challenges, setChallenges] = useState([]);

  const dropdownItems = [
    { name: '최신순', id: 'latest' },
    { name: '오래된순', id: 'oldest' }
  ];

  const categoryItems = [
    { name: '모든 챌린지', id: 'all' },
    { name: '코슬로 챌린지', id: 'coslow' },
    { name: '제휴 챌린지', id: 'affiliate' },
    { name: '유저끼리 챌린지', id: 'user' }
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:8080/challenges/saved');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const challengeDetailsPromises = data.map(async (challenge) => {
          const detailResponse = await fetch(`https://api.coslow.site/challenges/${challenge.challengeId}`);
          if (!detailResponse.ok) {
            throw new Error('Failed to fetch challenge details');
          }
          const detailData = await detailResponse.json();
          return { ...challenge, title: detailData.title };
        });

        const challengeDetails = await Promise.all(challengeDetailsPromises);
        setChallenges(challengeDetails);
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="savechallenges-container">
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
        <div className="menu-container">
          <div className="back3-img">
            <img src={back} alt="back-img" />
          </div>
          <div className="menu-dropdown-content">
            {/* 최신순/오래된순 드롭다운 */}
            <div
              className="order-recent"
              onClick={() => setIsDropdownOpen(prev => !prev)}
              tabIndex={0}
              onBlur={() => setIsDropdownOpen(false)}
              role="button"
            >
              <button className="order-recent-button">
                {selectedItem}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`dropdown-arrow ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {dropdownItems.map((item) => (
                    <div
                      key={item.id}
                      className="dropdown-item"
                      onMouseDown={() => {
                        setSelectedItem(item.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 챌린지 카테고리 드롭다운 */}
            <div
              className="order-challenge-category"
              onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
              tabIndex={0}
              onBlur={() => setIsCategoryDropdownOpen(false)}
              role="button"
            >
              <button className="order-challenge-category-button">
                {selectedCategory}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`dropdown-arrow ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg>
              </button>
              {isCategoryDropdownOpen && (
                <div className="dropdown-menu">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="dropdown-item"
                      onMouseDown={() => {
                        setSelectedCategory(item.name);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='save-challenge'>
          {challenges.map(challenge => (
            <div key={challenge.challengeId} className="challenge-item">
              {challenge.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SaveChallenges;
