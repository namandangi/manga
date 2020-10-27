import React, { useEffect, useState } from 'react';
import { Link, Button, Typography } from '@material-ui/core';
import readmoreIcon from '../static/readmore-icon.png';
import '../styles/home.scss';
import erwin_hero from '../static/erwin_hero_edited.png';
import Cookies from 'js-cookie';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  function checkLogin() {
    const token: string = Cookies.get('token') || '';
    if (token != '') setLoggedIn(true);
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, [loggedIn]);

  return (
    <div className="root">
      <div className="nav">
        <div className="highRated">
          <Link href="/mangas/tag/rating">TOP</Link>
        </div>
        <div className="mostViewed">
          <Link href="/mangas/tag/trending">TRENDING</Link>
        </div>
        <div className="trending">
          <Link href="/mangas/tag/views">POPULAR</Link>
        </div>

        <div className="button">
          {!loggedIn && (
            <Link href="/mangas/authentication">
              <Button variant="contained">LOGIN</Button>
            </Link>
          )}
          {loggedIn && (
            <Button variant="contained" onClick={handleLogout}>
              LOGOUT
            </Button>
          )}
        </div>
      </div>
      <div className="title">
        <Link href="/mangas">
          <Typography variant="h1">MANGA!</Typography>
        </Link>
      </div>
      <div className="bodyCaption">
        <Typography variant="h1">読んで、私の兵士</Typography>
        <Typography variant="h3" gutterBottom>
          MY SOLDIERS, READ!
        </Typography>
      </div>
      <div className="footerCaption">
        <div className="buttonContainer">
          <Typography variant="h4">止まらない、バカヤロ</Typography>
          <Button variant="contained">
            <img src={readmoreIcon} />
          </Button>
        </div>
        <Typography variant="h5">Tomaranai, bakayaro</Typography>
      </div>
    </div>
  );
}

export default Home;
