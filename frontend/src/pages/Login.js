import React, { useState } from 'react'
import styles from "../styles/Login.module.scss";
import api from "../api/UnProtectedApi";
import {useSelector ,useDispatch} from "react-redux";
import { setUserDetails } from '../redux/UserDetails';
import {useNavigate} from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData,setLoginData] = useState({
    username:"",
    password:""
  })

  const onSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await api.post("api-token-auth/",loginData);
      dispatch(setUserDetails(response.data));
      localStorage.setItem("isTeacher",response.data.is_professor);
      localStorage.setItem("isAdmin",response.data.is_superuser);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("userId",response.data.user_id);
      navigate("/");
    }
    catch(err){
      console.log(err.response);

    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={onSubmit}>
                <input type="text" placeholder='Username' onChange={(e)=>{
                  setLoginData({
                    ...loginData,
                    username:e.target.value
                  })
                }} required/>
                <input type="password" placeholder='Password' onChange={(e)=>{
                  setLoginData({
                    ...loginData,
                    password:e.target.value
                  })
                }} required/>
                <button className={styles.loginBtn} type="submit">
                    <h3>Login</h3>
                </button>
            </form>
      </div>
    </div>
  )
}

export default Login
