import "./Record_write.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function Record_write(){

  const [title, setTitle] = useState(''); // State for title
  const [description, setDescription] = useState(''); // State for description

  const [imageSrc, setImageSrc] = useState(null);
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);

  const [filename, setFilename] = useState(null); // State to store the filename
  const [binaryImageFile, setBinaryImageFile] = useState(null); // State to store the binary image file

  const maxChars = 500;

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || null);
      };

      // Set the filename in state
      setFilename(file.name);
      setBinaryImageFile(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const handlesetTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setDescription(value);
      setCharCount(value.length);
    }
  };

  // Function to fetch data from API
  const fetchDataFromAPI = async () => {
    if (filename) {
      try {
        const response = await axios.get(`https://api.coslow.site/img-upload/${filename}`).then((response) => {
          
          const formData = new FormData();
          formData.append('file', binaryImageFile);
          
          axios.put(response.data, formData, {
            headers: {
              'Content-Type' : 'image/' + filename.split(".")[1] 
            }
          }).then((response) => {
            const body = {
              "dietTitle" : title,
              "description" : description,
              "dietImg" : "https://coslow-imagebucket.s3.ap-northeast-2.amazonaws.com/" + filename,
              "challengeId" : 1
            }
            axios.post('https://api.coslow.site/diet/save', body, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
              }
            }).then((respose) =>{
              navigate('/recordPost');
            })
          })
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.error('No filename available.');
    }
  };

  

  const navigate = useNavigate();
  const handleChallengeMainClick = () => {
    navigate('/challenge');
  };
  const handleCoslowBannerClick = () => {
    navigate('/');
  };
  const handleDietRecordWriteClick = () => {
    navigate('/DietRecord_write');
  };

  return (
    <div className="Diet-record-write-container">
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
        <div className="diet-certification-container">
          <div className="certification-title">
            <div className="certification-title-text">챌린지 식단 인증하기</div>
            <button className="certification-button" onClick={fetchDataFromAPI}>인증하기</button>
          </div>
          <div className="diet-certification-content">
            <div className="upload-img-container">
              <div className="upload-box" onClick={handleClick}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={onUpload}
                />
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Preview"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <span>사진 첨부</span>
                )}
              </div>
            </div>
            <div className="diet-write-contents">
            <input 
                type="text" 
                className="diet-write-title" 
                placeholder="제목을 입력해주세요" 
                value={title}
                onChange={handlesetTitleChange}
                required 
              />
              <textarea
                className="diet-write-contents"
                placeholder="구성한 식단을 유저들에게 공유해보세요!"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
              <div className="char-count">({charCount}/{maxChars})</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
  
}

export default Record_write;