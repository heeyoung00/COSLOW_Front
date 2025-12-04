import "./AddExplain.css"
import explainImage1 from './images/challenge 1.png';
import explainImage2 from './images/dietlog 1.png';


function AddExplain() {
  return (
    <div className='cs_addexplain_container'>
      <div className='cs_explain_title'>
        <br/>CO-SLOW
      </div>
      <div className='cs_explain_contents'>
        코슬로는 저속노화 식단을 통한 건강한 삶을 위해<br />
        다양한 챌린지와 혜택을 제공합니다.
      </div>
      <div className='cs_challenge'>
        
        <div className='cs_challenge_title'>CHALLENGE</div>

        <div className='cs_challenge_contents'>
          <div className='addexplain_Image1'><img src={explainImage1} alt="addexplain_image1" /></div>
          <div className='cs_challenge_contentslist'>
            <div className='cs_challenge_contents1'>코슬로 챌린지</div>
            <div className='cs_challenge_detail1'>
              코슬로가 직접 설계한 챌린지에 참여하여<br />
              단계별 가이드를 따르며 건강한 생활습관을<br />
              형성해보세요.
            </div>

            <div className='cs_challenge_contents2'>제휴 챌린지</div>
            <div className='cs_challenge_detail2'>
              제휴 업체와 협력하여 특별한 챌린지를 제공합니다.<br />
              특별 할인 등 다양한 혜택을 받아보세요.
            </div>

            <div className='cs_challenge_contents3'>유저끼리 챌린지</div>
            <div className='cs_challenge_detail3'>
              챌린지를 생성하고, 서로의 식단을 공유하며<br/>
              동기부여를 받을 수 있습니다.
            </div>
          </div>
        </div>

      </div>
      <div className='cs_dietlog'>
        <div className='cs_dietlog_title'>DIET LOG</div>

        <div className='cs_dietlog_contents'>  
          <div className='addexplain_Image2'><img src={explainImage2} alt="addexplain_image2" /></div>
          <div className='cs_dietlog_contentslist'>
            <div className='cs_dietlog_contents1'>식단 기록</div>
            <div className='cs_dietlog_detail1'>
              사진 한 장과 간단한 소개로 기록하고 공유해보세요.<br />
              재료의 칼로리와 효능 정보를 제공합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExplain;