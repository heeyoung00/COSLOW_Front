import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FirstStep_detail from './FirstStep_detail';
import Egg_detail from './Egg_detail';
import FullVegetable_detail from './FullVegetable_detail';
import SaleSalad_detail from './SaleSalad_detail';
import DasinShop_detail from './DasinShop_detail';
import Greeting_detail from './Greeting_detail';

function ChallengeDetail() {
  const { challengeType } = useParams();
  const [detailComponent, setDetailComponent] = useState(null);

  useEffect(() => {
    switch (challengeType) {
      case 'firststep':
        setDetailComponent(<FirstStep_detail />);
        break;
      case 'egg':
        setDetailComponent(<Egg_detail />);
        break;
      case 'fullvegetable':
        setDetailComponent(<FullVegetable_detail />);
        break;
      case 'SaleSalad':
        setDetailComponent(<SaleSalad_detail />);
        break;
      case 'DasinShop':
        setDetailComponent(<DasinShop_detail />);
        break;
      case 'Greeting':
        setDetailComponent(<Greeting_detail />);
        break;
      default:
        setDetailComponent(<div>Challenge type not found</div>);
        break;
    }
  }, [challengeType]);

  return (
    <div>
      {detailComponent}
    </div>
  );
}

export default ChallengeDetail;
