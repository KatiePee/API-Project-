// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemo = () => {
    const demo = {
      credential: "DemoLicious",
      password: 'password'
    }
    return dispatch(sessionActions.login(demo))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label>
          Username or Email
        </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <button className='demouser-login' onClick={handleDemo}>Log in as Demo User</button>
      </form>

    </>
  );
}

export default LoginFormModal;