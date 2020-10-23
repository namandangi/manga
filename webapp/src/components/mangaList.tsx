import React from 'react';
import { Header, Footer } from './partial';
import '../styles/mangaList.scss';
import readmoreIcon from '../static/readmore-icon.png';
import { Paper, Typography, Link, Button } from '@material-ui/core';

function MangaList() {
  return (
    <>
      <Header />
      <div className="contentBody">
        <div className="hero"></div>
        <div className="content">
          <div className="genreTitle">
            <Typography variant="h5">LATEST UPDATES</Typography>
            <Link href="#">
              <img src={readmoreIcon} alt="read-more" />
            </Link>
          </div>
          <div className="manga">
            <Paper variant="outlined" square />
            <Paper variant="outlined" square />
            <Paper variant="outlined" square />
            <Paper variant="outlined" square />
            <Paper variant="outlined" square />
            <Paper variant="outlined" square />
          </div>
          <Button className="btmReadmoreBtn" variant="contained">
            <Link href="#">
              <img src={readmoreIcon} alt="read-more" />
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MangaList;
