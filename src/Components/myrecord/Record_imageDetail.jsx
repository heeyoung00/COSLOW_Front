import './Record_imageDetail.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowLeftgray from './images/arrow_left_gray.png';
import postMenu from './images/Kebab menu.png';
import vectorLine from './images/VectorLine.png';
import like from './images/like default.png';


function Record_imageDetail() {
    const navigate = useNavigate();


    const handleMovetoRecordDetailClick = () => {
        navigate('/recordDetail');
    };

    return (
        <div className="Record-imageDetail-container">
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
            </div>
            <div className="record-imageDetail-contents">
                <div className='postButton'>
                    <div className="arrowLeftIcon" onClick={handleMovetoRecordDetailClick}>
                        <img src={arrowLeftgray} alt="arrowLeftgray" />
                    </div>
                    <div className='postMenu'>
                        <img src={postMenu} alt='postMenu' />
                    </div>
                </div>
                <div className="postContainer">
                    <div className='userPostImage'>
                        업로드된 이미지
                    </div>
                    <div className='userPost'>
                        <div className='postTitle'>쉣</div>
                        <div className='postInfo'>
                            <div className='postWriterProfile'>
                                <div className='profileImg'>사진</div>
                                <div className='profileName'>김멋사</div>
                            </div>
                            <div className='postDateline'>2024.08.03</div>
                        </div>
                        <div className='vectorLine'>
                            <img src={vectorLine} alt="vectorLine" />
                        </div>
                        <div className='postMain'>
                            통밀빵에 아보카도 썰어놓고 반숙 계란 올려 후추 살짝 뿌려
                            먹었더니 생각보다 안 느끼하고 맛있었어요! 소화도 잘 되고
                            나름 포만감도 들고요. 이 식단 추천합니다 ㅎㅎ
                        </div>
                        <div className='likeButton'>
                            <img src={like} alt="like" />
                            <div className='likeCount'>12</div>
                        </div>
                    </div>
                </div>
                <div className='ingredientInfo'>
                        <div className='ingredientSubject'>
                            사진 속 <span>재료들의 효능</span>을 알려드릴게요
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Record_imageDetail;
