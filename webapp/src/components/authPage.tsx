import React, { useState } from 'react';
import { Footer } from '../components/partial';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { login, register } from './helpers/auhenticaton';
import '../styles/authPage.scss';
import { useHistory } from 'react-router-dom';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameExists, setUsernameError] = useState('');
  const history = useHistory();

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    register(username, password);
    history.push('/mangas', { username, loggedIn: true });
  };
  const handleRegisterClick = (e: any) => {
    e.preventDefault();
    handleRegister();
  };
  const handleLogin = () => {
    login(username, password);
    history.push('/mangas', { username, loggedIn: true });
  };
  const handleLoginClick = (e: any) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="formContainer">
        <Paper className="paper">
          <Typography variant="subtitle1">
            Sign in to Subscribe to your favourite Mangas now!
          </Typography>
          <TextField
            id="standard-basic"
            label="Username"
            value={username}
            onChange={handleUsername}
          />
          <TextField
            id="standard-basic"
            label="Password"
            value={password}
            onChange={handlePassword}
          />
          <div className="buttonContainer">
            <Button
              className="registerBtn"
              variant="contained"
              type="submit"
              onClick={handleRegisterClick}
            >
              Sign up
            </Button>
            <Button
              className="loginBtn"
              variant="contained"
              type="submit"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          </div>
          <div className="resetPassword">
            <Typography variant="subtitle2">Forgot Password?</Typography>
            <Typography variant="caption">Make a new account! 🤗</Typography>
          </div>
        </Paper>
      </div>
      <Footer />
    </>
  );
}
