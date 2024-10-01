// src/components/logins/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/login.module.css";
import { useAuth } from "../../pages/foodManagement/context/authContext"; 
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      const { token } = response.data;
      login(token);
      console.log(response.data);
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles["sign-in-button"] }>
            Sign In
          </button>
        </form>
        {error && <p className={styles["error-message"]}>{error}</p>}
        <div className={styles["footer-links"]}>
          
         
          <a href='/staff/login' style={{marginLeft: '75px'}}><></>Admin login </a>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
