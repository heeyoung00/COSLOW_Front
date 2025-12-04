import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import saveicon from './images/save.png';
import plus from './images/plus.png'; // 이미지 파일 import
import './CoslowChallenge_main.css';
import Modal from 'react-modal';
import axios from 'axios';

// 모달의 루트 엘리먼트를 설정합니다.
Modal.setAppElement('#root');

function CoslowChallenge_main() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeOption, setActiveOption] = useState('코슬로 챌린지');
  const [searchTerm, setSearchTerm] = useState('');
  const [showImage, setShowImage] = useState(false); // 이미지 표시 여부 상태 추가
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열림 여부 상태 추가

  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  // 모달 입력 상태 추가
  const [title, setTitle] = useState('');
  const [description] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [certificationNum, setCertificationNum] = useState('');
  const [maxPersonNum, setMaxPersonNum] = useState('');
  const [tags, setTags] = useState('');
  const [isCustomTerm, setIsCustomTerm] = useState(false); // 기간 직접 입력 여부 상태 추가
  const [selectedTerm, setSelectedTerm] = useState(''); // 선택된 기간 상태 추가

  const navigate = useNavigate();

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
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const filterChallenges = () => {
      let filtered = [];
      if (activeOption === '코슬로 챌린지') {
        filtered = challenges.filter(challenge => challenge.createdBy === 'adminUser');
      } else if (activeOption === '제휴 챌린지') {
        filtered = challenges.filter(challenge => challenge.createdBy === 'ptnUser');
      } else if (activeOption === '유저끼리 챌린지') {
        filtered = challenges.filter(challenge => !['adminUser', 'ptnUser'].includes(challenge.createdBy));
      }
      setFilteredChallenges(filtered);
    };

    filterChallenges();
  }, [activeOption, challenges]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleCustomTermClick = () => {
    setIsCustomTerm(true);
    setSelectedTerm('');
  };

  const handlePresetTermClick = (term) => {
    const today = new Date();
    const start = formatDate(today);
    let end;

    switch (term) {
      case '1주':
        end = formatDate(new Date(today.setDate(today.getDate() + 7)));
        break;
      case '2주':
        end = formatDate(new Date(today.setDate(today.getDate() + 14)));
        break;
      case '1달':
        end = formatDate(new Date(today.setMonth(today.getMonth() + 1)));
        break;
      default:
        end = '';
        break;
    }

    setStartDate(start);
    setEndDate(end);
    setIsCustomTerm(false);
    setSelectedTerm(term);
  };

  const handleRecordMainClick = () => {
    navigate('/record');
  };

  const handleCoslowBannerClick = () => {
    navigate('/');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
    if (option === '유저끼리 챌린지') {
      setShowImage(true);
    } else {
      setShowImage(false);
      setModalIsOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePlusImageClick = () => {
    setModalIsOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    const term = selectedTerm === '1주' ? 'ONE_WEEK' :
                  selectedTerm === '2주' ? 'TWO_WEEKS' :
                  selectedTerm === '1달' ? 'ONE_MONTH' : 'CUSTOM';

    const data = {
      title,
      description,
      startDate,
      endDate,
      participateFrequency: term,
      maxParticipants: parseInt(maxPersonNum, 10),
      weeklyCheckInCount: parseInt(certificationNum, 10),
      tags: tags.split(',').map(tag => tag.trim()),
      createdBy: localStorage.getItem('userId'),
      createDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      daysRemaining: ' ', // 계산 후 추가할 수 있음
      boardId: 3
    };

    console.log('제출할 데이터:', data);

    try {
      const response = await axios.post('https://api.coslow.site/challenges', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('성공:', response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error('오류:', error);
    }
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

  

  const mapTitleToChallengeType = (title) => {
    const normalizedTitle = title.replace(/\n/g, '').trim(); // 줄바꿈과 공백 제거
    switch (normalizedTitle) {
      case "계란으로 하루 한끼 요리하기":
        return 'egg';
      case "코슬로와 함께하는저속노화 첫걸음 챌린지":
        return 'firststep';
      case "채소 듬뿍 일주일 챌린지":
        return 'fullvegetable';
      case "‘샐러드판다’샐러드 16종 한달 챌린지":
        return 'SaleSalad';
      case "‘다신샵’닭가슴살 한달 챌린지":
        return 'DasinShop';
      case "‘그리팅’저당플랜 5일 패키지 챌린지":
        return 'Greeting';
      default:
        return null;
    }
  };

  const handleChallengeClick = (id,title) => {
    if (activeOption === '유저끼리 챌린지') {
      navigate(`/UserChallenge_detail/${id}`);
    } else {
      const challengeType = mapTitleToChallengeType(title);
      if (challengeType) {
        navigate(`/challenge/${challengeType}`);
      } else {
        console.error('Invalid challenge type:', title);
      }
    }
  };

  // \n을 <br />로 변환하는 함수
  const formatTitle = (title) => {
    return title.replace(/\n/g, '<br />');
  };

  const categories = ['마감순', '인기순', '최신순'];

  return (
    <div className="Challenge-container">
      <div className="Challenge-Coslow-main">
        <div className="Coslow-header">
          <div className="Coslow-header-layout">
            <div className="header-left">
              <div className="header-logo">CO-SLOW</div>
            </div>
            <div className="header-right">
              <div className="header-challenge">챌린지</div>
              <div className="header-record" onClick={handleRecordMainClick}>나의기록</div>
              <div className="header-mypage">마이페이지</div>
              <div className="header-logout" onClick={handleCoslowBannerClick}>로그아웃</div>
            </div>
          </div>
        </div>

        <div className='challenge-header'>
          <div className="search-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              placeholder=" "
            />
            <div className="search-icon"></div>
          </div>
          <div className="Order-category">
            {categories.map((order_category) => (
              <span
                key={order_category}
                className={activeCategory === order_category ? 'active' : ''}
                onClick={() => handleCategoryClick(order_category)}
              >
                {order_category}
              </span>
            ))}
          </div>
        </div>
        
        <div className='Challenge-subcontainer'>
          <div className="challenge-options">
            {['코슬로 챌린지', '제휴 챌린지', '유저끼리 챌린지'].map((option) => (
              <div
                key={option}
                className={option === activeOption ? 'active' : ''}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>

          {showImage && (
            <div className="plus-img" onClick={handlePlusImageClick}>
              <img src={plus} alt="plus-challenge" />
            </div>
          )}

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
                  <div className='save-icon' onClick={(e) => { e.stopPropagation(); handleSaveIconClick(challenge.id); }}>
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

        {/* 모달 컴포넌트 */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)} // 모달 외부 클릭 시 모달 닫기
          contentLabel="챌린지 만들기" 
          className="challengeModal"
          overlayClassName="modal-overlay"
        >
          <div className="challengeModal-content">
            <div className="modal-challenge">챌린지 만들기</div>
            <div className="challengeModal-container">
              <div className='modal-title-contents'>
                <div>
                  <label>
                    <input 
                      type="text" 
                      className="title" 
                      placeholder="제목을 입력해주세요" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <input 
                      type="text" 
                      className="hash-tag" 
                      placeholder="해시태그(최대 N개)" 
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="challenge-term">
                <div className="challenge-term-text">기간 정하기</div>
                <div className="term-button">
                  <button
                    className={`oneweek ${selectedTerm === '1주' ? 'active' : ''}`}
                    onClick={() => handlePresetTermClick('1주')}
                  >
                    1주
                  </button>
                  <button
                    className={`twoweek ${selectedTerm === '2주' ? 'active' : ''}`}
                    onClick={() => handlePresetTermClick('2주')}
                  >
                    2주
                  </button>
                  <button
                    className={`onemonth ${selectedTerm === '1달' ? 'active' : ''}`}
                    onClick={() => handlePresetTermClick('1달')}
                  >
                    1달
                  </button>
                  <button
                    className={`selfwrite ${isCustomTerm ? 'active' : ''}`}
                    onClick={handleCustomTermClick}
                  >
                    직접입력
                  </button>
                </div>
                {isCustomTerm && (
                  <div className="input-term">
                    <label>
                      <input 
                        type="text" 
                        name="start-date" 
                        placeholder="YYYY.MM.DD" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </label>
                    <span className="term-icon">-</span>
                    <label>
                      <input 
                        type="text" 
                        name="end-date" 
                        placeholder="YYYY.MM.DD" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className='certification-num-contents'>
                <div className='certification-num-text'>인증 횟수(1주)</div>
                <label>
                  <input 
                    type="text" 
                    name="certification-num" 
                    placeholder="" 
                    value={certificationNum}
                    onChange={(e) => setCertificationNum(e.target.value)}
                    required 
                  />
                </label>
                <span className="certification-num-2">회</span>
              </div>
              <div className='max-person-contents'>
                <div className='max-person-text'>
                  <div className='max-person-text-1'>최대 인원</div>
                  <div className='max-person-text-2'>*최대 NN명까지 가능합니다.</div>
                </div>
                <label>
                  <input 
                    type="text" 
                    name="max-person-num" 
                    placeholder="" 
                    value={maxPersonNum}
                    onChange={(e) => setMaxPersonNum(e.target.value)}
                    required 
                  />
                </label>
                <span className="max-person-num-2">명</span>
              </div>
              <div className='challenge-modal-submit-button'>
                <button 
                  className='make-challenge-button' 
                  onClick={handleSubmit}
                >
                  만들기
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CoslowChallenge_main;
