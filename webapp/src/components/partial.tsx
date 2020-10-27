import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Typography,
  Link,
  Divider,
  TextField,
} from '@material-ui/core';
import '../styles/partial.scss';
import searchIcon from '../static/search-icon.svg';
import githubIcon from '../static/github-icon.png';
import twitterIcon from '../static/twitter-icon.png';
import linkedinIcon from '../static/linkedin-icon.png';
import Cookies from 'js-cookie';
import { useLocation, useHistory } from 'react-router-dom';

function Header(props: any) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [cookies, setCookies] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleAuthRedirect = async () => {
    history.push('/mangas/authentication');
  };

  const handleVisible = async () => {
    setVisible(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (searchVal === '') {
      setVisible(true);
    } else {
      const url = `/mangas/search?search=${searchVal
        .trim()
        .replace(/ /g, '+')}`;
      window.location.href = url;
    }
  };
  const handleKeyDown = async (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSubmit(e);
  };

  const handleChange = (e: any) => {
    setSearchVal(e.target.value);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setCookies('');
  };

  function handleAuth() {
    const token: string = Cookies.get('token') || '';
    setCookies(token);
    const usernameVar: string =
      (location.state && (location.state as any).username) || '';
    // const loginStatus: boolean = location.state && (location.state as any).loggedIn||false;
    console.log(usernameVar, token);
    if (cookies != '') {
      setLoggedIn(true);
      // setCookies(token);
      setUsername(usernameVar);
    }
  }

  useEffect(() => {
    handleAuth();
  }, [loggedIn, cookies]);
  console.log('loggedIn: ', loggedIn);

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
        {visible && (
          <>
            {!loggedIn && (
              <>
                <Button
                  className="registerBtn"
                  variant="contained"
                  disableElevation
                  onClick={handleAuthRedirect}
                >
                  Register
                </Button>
                <Button
                  className="loginBtn"
                  variant="outlined"
                  onClick={handleAuthRedirect}
                >
                  Log In
                </Button>
              </>
            )}
            {loggedIn && (
              <>
                <Typography variant="h6">{username}!</Typography>
                <Button
                  className="registerBtn"
                  variant="contained"
                  disableElevation
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            )}
            <Divider orientation="vertical" flexItem />
            <Button
              className="searchBtn"
              variant="outlined"
              onClick={handleVisible}
            >
              <img src={searchIcon} alt="search" />
            </Button>
          </>
        )}
        {!visible && (
          <input
            type="text"
            placeholder="Search...."
            value={searchVal}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        )}
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
