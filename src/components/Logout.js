import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout (){
  localStorage.removeItem('id');
  let history = useHistory();
  const navigation =()=> {
    history.push("/login");
    window.location.reload();
  }
  return (
    <>
     {navigation()}
    </>
  )
}

export default Logout;
