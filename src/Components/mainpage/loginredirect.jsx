import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginredirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = window.location.href.split("=")[1];
        console.log(code);

        // Make an Axios GET request to your backend with the code
        const response = await axios.get(`https://api.coslow.site/oauth2/code/kakao?code=${code}`);

        console.log(response.data); // Handle the response from the server as needed
        if(response.status==200){
          localStorage['id'] = response.data['id']
          localStorage['profileImg'] = response.data['profileImg']
          localStorage['nickname'] = response.data['nickname']
          localStorage['accessToken'] = response.data['accessToken']
          localStorage['userId'] = response.data['userId']

          
          navigate('/afterlogin');

          // Authorization: 'Bearer ' + localStorage.getItem["accessToken"]
        }
        else{
          throw Error
        }
        // Redirect to '/afterlogin'
      } catch (error) {
        console.error('Error during Kakao login:', error);
      }
    };
    fetchData();
  }, [navigate]);

};

export default Loginredirect;
