import React, {useState} from 'react';
import { useHistory} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import '../styles/login.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {URL} from './Myconnect';
import avata from '../images/img_avatar2.png';
function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(null);
  const [isPassword, setIsPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  let history = useHistory();
  const navigation =()=> {
    history.push("/home");
    window.location.reload();
  }
  const handleSubmit = ()=> {
    if (email === ""){
      setIsEmail("Email is blank !");
      setIsPassword("Password is blank")
      return false;
    }
    if (password === ""){
      setIsPassword("Password is blank")
      return false;
    }

    let url = URL + '/api/account';
    axios.post(url, {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
    if (response['data']['status'] ===200 && response['data']['disable'] === 0 && response['data']['admin'] === 0 ) {
       localStorage.setItem('id', response['data']['id'])
       navigation();
    }else{
      setIsLogin("1. Email or password is incorrect! or Your account is blocked !")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  }


  return (
    <>
    <Container maxWidth="md" component="main">
      <div className="imgcontainer">
       <img src={avata} alt="Avatar" className="avatar"/>
      </div>
      <div className="text-center">
        <small className="text-center text-danger">{isLogin}</small>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address:</label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={e=> setEmail(e.target.value)}/>
        <small className="text-center text-danger">{isEmail}</small>
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password:</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={e=> setPassword(e.target.value)} />
        <small className="text-center text-danger">{isPassword}</small>
      </div>
      <button type="submit" className="btn btn-primary button" onClick={handleSubmit}>Login</button>
    </Container>
    </>
  )
}
export default Login;
