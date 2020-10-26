import { use } from 'chai';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

async function login() {
  const [loginIn, setLoggedIn] = useState(false);
  axios
    .post('/mangas/user/login', { username: 'dnaman', password: 'password' })
    .then((response) => {
      const { token } = response.data;
      Cookies.set('token', token);
      setLoggedIn(true);
      return <></>;
    });
}

async function register() {
  const [loginIn, setLoggedIn] = useState(false);
  axios
    .post('/mangas/user/register', { username: 'dnaman', password: 'password' })
    .then((response) => {
      const { token } = response.data;
      Cookies.set('token', token);
      setLoggedIn(true);
      return <></>;
    });
}

export { login, register };
