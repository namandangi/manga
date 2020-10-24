import React from 'react';
import { Footer } from '../components/partial';
import '../styles/mangaChapter.scss';
import { Typography, Button, Link } from '@material-ui/core';
import arrowIcon from '../static/readmore-icon.png';
import likeIcon from '../static/like-icon.png';
import subscribeIcon from '../static/add-icon.png';
import manga1 from '../static/manga1.jpg';
import manga2 from '../static/manga2.jpg';

function MangaChapter() {
  return (
    <>
      <div className="chapterHeader">
        <div className="leftChapterHeader">
          <Typography variant="h6">
            <Link href="#">The God of High School</Link> &nbsp; {'>'}
          </Typography>
          <Typography variant="h6">Chapter 128</Typography>
        </div>
        <div className="middleChapterHeader">
          <Button variant="contained">
            <img className="prev" src={arrowIcon} alt="next-chapter" />
          </Button>
          <Typography variant="h6">{'#'} 128</Typography>
          <Button variant="contained">
            <img className="next" src={arrowIcon} alt="next-chapter" />
          </Button>
        </div>
        <div className="rightChapterHeader">
          <Button variant="contained">
            <img
              src={likeIcon}
              style={{ width: '15px', height: '15px' }}
              alt="like"
            />
          </Button>
          <Button className="subscribeBtn" variant="contained">
            <img src={subscribeIcon} alt="subscribe" />
            <Typography variant="button">Subscribe</Typography>
          </Button>
        </div>
      </div>
      <div className="chapterContent">
        <img src={manga1} />
        <img src={manga2} />
      </div>
      <Footer />
    </>
  );
}

export default MangaChapter;
