import React from 'react';
import { Link, Button, Typography } from '@material-ui/core';
import readmoreIcon from '../static/readmore-icon.png';
import '../styles/home.scss';
import erwin_hero from '../static/erwin_hero_edited.png';

function Home() {
  return (
    <div className="root">
      <div className="backdrop">
        <img src={erwin_hero} />
      </div>
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
          <Button variant="contained">LOGIN</Button>
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
