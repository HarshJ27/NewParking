import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import CarPark from "../CarPark.png";

const AuthContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const LeftSec = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.7rem;
  img {
    width: 50px;
    height: 50px;
  }
  h2 {
    color: white;
    span {
      color: #ffab10;
    }
  }
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d1d1d1;
  padding-top: 1rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 20px;
  box-shadow: #8a8a8a;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border: none;
      border-radius: 20px;
      background-color: #f5f5f5;
      padding-top: 10px;
      padding-bottom: 10px;
      color: black;
      width: 15rem;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      padding-left: 0.9rem;
    }
    button {
      border: none;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 15px;
      font-size: 1.2rem;
      font-weight: 600;
      background-color: #faa404;
      color: white;
      margin-top: 1.2rem;
      :hover {
        background-color: #db8f00;
      }
    }
  }
  p {
    font-weight: 600;
  }
`;

function LoginAuth() {
  const URL = "https://parking-app-79h9.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });
    //   console.log("Logged in", res.data)

      const data = await res.data;

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setRedirectToReferrer(true);
    
      } else {
        setError(data.message);
      }
      console.log("Success", data.token);
      navigate("/parking-spots");
    } catch (err) {
      console.error(err);
      setError("Error logging in. Please try again.");
    }
  };

  if (redirectToReferrer) {
    return navigate('/');
  }

  return (
    <AuthContainer>
      <LeftSec>
        <h2>
          Welcome to Parkin-<span>Go</span>
        </h2>
        <img src={CarPark} alt="" />
      </LeftSec>
      <MainForm>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </MainForm>
    </AuthContainer>
  );
}

export default LoginAuth;

