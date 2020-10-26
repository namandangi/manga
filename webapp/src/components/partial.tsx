import React, { useState, useEffect } from 'react';
import { Button, Typography, Link, Divider } from '@material-ui/core';
import '../styles/partial.scss';
import searchIcon from '../static/search-icon.svg';
import githubIcon from '../static/github-icon.png';
import twitterIcon from '../static/twitter-icon.png';
import linkedinIcon from '../static/linkedin-icon.png';
// import { login, register } from './helpers/auhenticaton';
import axios from 'axios';
import Cookies from 'js-cookie';

function Header() {
  const [loginIn, setLoggedIn] = useState(false);

  const login = async () => {
    axios
      .post('/mangas/user/login', { username: 'dnaman', password: 'password' })
      .then((response) => {
        const { token } = response.data;
        Cookies.set('token', token);
        setLoggedIn(true);
      });
  };

  const register = async () => {
    axios
      .post('/mangas/user/register', {
        username: 'dnaman',
        password: 'password',
      })
      .then((response) => {
        const { token } = response.data;
        Cookies.set('token', token);
        setLoggedIn(true);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="leftHeader">
        <Typography variant="h5">
          <Link href="/mangas/tag/rating">TOP</Link>
        </Typography>
        <Typography variant="h5">
          <Link href="/mangas/tag/trending">TRENDING</Link>
        </Typography>
        <Typography variant="h5">
          <Link href="/mangas/tag/views">POPULAR</Link>
        </Typography>
      </div>
      <div className="rightHeader">
        <Button
          className="registerBtn"
          variant="contained"
          disableElevation
          onClick={register}
        >
          Register
        </Button>
        <Button className="loginBtn" variant="outlined" onClick={login}>
          Log In
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button className="searchBtn" variant="outlined">
          <img src={searchIcon} alt="search" />
        </Button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="leftFooter">
        <Typography variant="h5">© MANGA Limited</Typography>
      </div>
      <div className="middleFooter">
        <Typography variant="overline">
          <Link href="#">About </Link>
        </Typography>
        <Divider className="divider" orientation="vertical" flexItem />
        <Typography variant="overline">
          <Link href="#">Feedback</Link>
        </Typography>
        <Divider className="divider" orientation="vertical" flexItem />
        <Typography variant="overline">
          <Link href="#">Help</Link>
        </Typography>
      </div>
      <div className="rightFooter">
        <Link href="https://github.com/namandangi/manga">
          <Button variant="outlined" style={{ backgroundColor: 'black' }}>
            <img src={githubIcon} alt="github" />
          </Button>
        </Link>
        <Link href="https://linkedin.com/in/namandangi">
          <Button variant="outlined">
            <img src={linkedinIcon} alt="linkedin" />
          </Button>
        </Link>
        <Link href="https://twitter.com/namandangi_">
          <Button variant="outlined">
            <img src={twitterIcon} alt="twitter" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { Header, Footer };
