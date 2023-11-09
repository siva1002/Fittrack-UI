import React, { useState } from "react";
import "../../assets/css/login.css";
import CSRFToken from "../csrf/csrf";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const Login = () => {
  const AUTH_USER = gql`
    mutation TokeAuth($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        payload
        token
      }
    }
  `;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authUser] = useMutation(AUTH_USER);
  const navigate = useNavigate();


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      var csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0]
        .value;
      authUser({
        variables: { username, password },
      })
        .then((response) => {
          console.log("User created:", response);
          return response;
          // Handle success, e.g., show a success message
        })
        .then((data) => {
          var token = data.data.tokenAuth;
          localStorage.setItem("token", token.token);
          navigate("/home")
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          // Handle error, e.g., show an error message
        });
    }
  };

  return (
    <div className="logindiv">
      <CSRFToken />
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
