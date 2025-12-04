import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
// import axios from 'axios';
import './Record_mydiet.css';
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일 추가

function Record_mydiet() {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();

    // const [challenges, setChallenges] = useState([]);


    const handleRecordMainClick = () => {
        navigate('/record');
    };
    
    const handleCoslowBannerClick = () => {
        navigate('/');
    };

    const handleChallengeMainClick = () => {
        navigate('/coslowchallenge_main');
    };

    const handlemyDietClick = () => {
        navigate('/recordmydiet');
    };

    return (
        <div className="Diet-container">
            <div className="Diet-Coslow-main">
                <div className="Coslow-header">
                    <div className="Coslow-header-layout">
                        <div className="header-left">
                            <div className="header-logo">CO-SLOW</div>
                        </div>
                        <div className="header-right">
                            <div className="header-challenge" onClick={handleChallengeMainClick}>챌린지</div>
                            <div className="header-record" onClick={handleRecordMainClick}>나의기록</div>
                            <div className="header-mypage">마이페이지</div>
                            <div className="header-logout" onClick={handleCoslowBannerClick}>로그아웃</div>
                        </div>
                    </div>
                </div>
                <div className='my-record-container'>
                    <div className='my-challenge-options-container'>
                        <div className='my-challenge2' onClick={handleRecordMainClick}>내가 참여한 챌린지</div>
                        <div className='my-dietrecord2' onClick={handlemyDietClick}>나의 식단 기록</div>
                    </div>  
                    <div className='mydiet-record-contents'>
                        <div className="calendar">
                            <Calendar
                                onChange={onChange}
                                value={value}
                                calendarType='gregory'
                                showNeighboringMonth={false}
                                formatDay={(locale, date) => moment(date).format("D")}
                                formatMonthYear={(locale, date) => moment(date).format("M월 YYYY")}
                                nextLabel=">"
                                prevLabel="<"
                                next2Label={null}
                                prev2Label={null}
                            />
                        </div>
                        <div className="today-challenges-container">
                            오늘 인증할 챌린지
                        </div>
                        <div className="my-challenge-photo">
                            <div className='my-challenge-photo-title'>나의 챌린지 사진</div>
                            <div className="photo-grid">
                                <div className="challenge-photo-img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}
export default Record_mydiet;
