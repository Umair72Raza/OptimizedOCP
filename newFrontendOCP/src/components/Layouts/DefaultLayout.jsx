/*eslint-disable react/prop-types */
import Footer from '../footer/Footer';
import MainBar from '../../Mainbar/Mainbar';
import axios from 'axios';

const DefaultLayout = (props) => {
  const handleLogIn = async (email, password) => {
    await axios.post('http://localhost:4000/loginSystem/Login/', {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(response.data.userData)
      );
    });
    window.location.href = '/';
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handleSignUp = (data) => {
    try {
      axios.post('http://localhost:4000/loginSystem/signUp', data)
      .then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{backgroundColor:"#f4f5fb"}} className="googleDyphilia   ">
      <div className=" ">
        <MainBar
          handleLogOut={handleLogOut}
          handleLogIn={handleLogIn}
          handleSignUp={handleSignUp}
        />
      </div>

      <div>
        <div>
          {props.children}
        </div>
      </div>

      <div>
       <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;