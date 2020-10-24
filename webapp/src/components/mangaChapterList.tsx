import React from 'react';
import { Header, Footer } from './partial';
import '../styles/mangaChapterList.scss';
import { Typography, Paper, Button, Link, Divider } from '@material-ui/core';
import subscribeIcon from '../static/add-icon.png';
import gamerIcon from '../static/gamer.jpg';
import ratingIcon from '../static/rating-icon.png';
import likeIcon from '../static/like-icon.png';
import readmoreIcon from '../static/readmore-icon.png';

function MangaChapterList() {
  return (
    <>
      <Header />
      <div className="contentBody">
        <div className="contentHero"></div>
        <div className="content">
          <div className="chapterCard">
            <div className="cardHeader">
              <div className="title">
                <Typography variant="h4">The Gamer</Typography>
              </div>
              <Button variant="outlined">
                <img
                  src={subscribeIcon}
                  style={{ width: '20px', height: '20px', paddingLeft: '5px' }}
                  alt="subscribe"
                />
                Subscribe
              </Button>
            </div>
            <div className="cardBody">
              <div className="imgHolder">
                <img src={gamerIcon} alt="chapter-img" />
              </div>
              <div className="info">
                <Typography variant="subtitle1">Sangyoung Seong</Typography>
                <div className="infoContainer">
                  <div className="infoLeft">
                    <div className="rating">
                      <Typography variant="overline">Rating:</Typography>
                      <img src={ratingIcon} alt="rating" />
                      <Typography variant="body1">4.5</Typography>
                    </div>
                    <div className="genre">
                      <Typography variant="overline">Genres:</Typography>
                      <Typography variant="body1">
                        Action, Adventure, Comedy, Fantasy, Manhwa, Shounen
                      </Typography>
                    </div>
                    <Button variant="contained">Read First</Button>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div className="infoRight">
                    <div className="release">
                      <Typography variant="overline">Release:</Typography>
                      <Typography variant="body1">2013</Typography>
                    </div>
                    <div className="status">
                      <Typography variant="overline">Status:</Typography>
                      <Typography variant="body1">OnGoing</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chapterList">
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 320</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 319</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 318</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 317</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 316</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 315</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 314</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 313</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 312</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="chapter">
              <div className="chapterLeft">
                <img src={likeIcon} alt="like" />
                <Typography variant="overline">
                  <Link href="#">Chapter 311</Link>
                </Typography>
              </div>
              <div className="chapterRight">
                <Typography variant="overline">October 24, 2020</Typography>
              </div>
            </div>
            <div className="readmoreBtn">
              <Button variant="outlined">
                <img src={readmoreIcon} alt="read-more" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MangaChapterList;
