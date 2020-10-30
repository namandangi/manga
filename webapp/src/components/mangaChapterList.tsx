import React, { useState, useEffect, useCallback } from 'react';
import { Header, Footer } from './partial';
import '../styles/mangaChapterList.scss';
import { Typography, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import subscribeIcon from '../static/add-icon.png';
import ratingIcon from '../static/rating-icon.png';
import likeIcon from '../static/like-icon.png';
import readmoreIcon from '../static/readmore-icon.png';
import Page404 from './404';

function MangaChapterList(props: any) {
  interface Chapter {
    chapterId: Number;
    mangaName: String;
    chapterTitle: String;
    chapterUrl: String;
    postedAt: String;
  }
  interface Details {
    title: String;
    name: String;
    author: String;
    rating: Number;
    release: String;
    status: String;
    genre: String[];
    imgUrl: string;
  }

  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});
  const [count, setCount] = useState(10);
  const [token, setToken] = useState('');

  const getMangaChapterList = useCallback(async () => {
    try {
      const chapterDoc = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/mangas/read/${props.match.params.name}`
      );
      const chapterResponse = await chapterDoc.json();
      const mangaDoc = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/mangas/details/${chapterResponse[0].mangaName}`
      );
      const mangaResponse = await mangaDoc.json();
      setData(chapterResponse);
      setDetails(mangaResponse);
      const isToken = !Cookies.get('token') ? null : Cookies.get('token');
      setToken(isToken as string);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleReadMore = () => {
    setCount(count + 10);
  };

  const handleSubscribe = () => {
    axios.post(
      process.env.REACT_APP_API_URL +
        `/api/mangas/read/${props.match.params.name}/subscribe`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  const handleLike = (id: any) => {
    axios.post(
      process.env.REACT_APP_API_URL +
        `/api/mangas/read/${props.match.params.name}/${id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  useEffect(() => {
    getMangaChapterList();
  }, [setData]);
  console.log('token: ', token);

  return (
    <>
      <Header />
      {data.length > 0 && (
        <>
          <div className="contentBody">
            <div className="contentHero"></div>
            <div className="content">
              <div className="chapterCard">
                <div className="cardHeader">
                  <div className="title">
                    <Typography variant="h4">
                      {(details as Details).title}
                    </Typography>
                  </div>
                  <Button variant="outlined" onClick={handleSubscribe}>
                    <img
                      src={subscribeIcon}
                      style={{
                        width: '20px',
                        height: '20px',
                        paddingLeft: '5px',
                      }}
                      alt="subscribe"
                    />
                    Subscribe
                  </Button>
                </div>
                <div className="cardBody">
                  <div className="imgHolder">
                    <img src={(details as Details).imgUrl} alt="chapter-img" />
                  </div>
                  <div className="info">
                    <Typography variant="subtitle1">
                      {(details as Details).author}
                    </Typography>
                    <div className="infoContainer">
                      <div className="infoLeft">
                        <div className="rating">
                          <Typography variant="overline">Rating:</Typography>
                          <img src={ratingIcon} alt="rating" />
                          <Typography variant="body1">
                            {(details as Details).rating}
                          </Typography>
                        </div>
                        <div className="genre">
                          <Typography variant="overline">Genres:</Typography>
                          <div className="genreList">
                            {(details as Details).genre &&
                              (details as Details).genre.map(
                                (el: String, id: number) => (
                                  <Typography key={id} variant="body1">
                                    {el} &nbsp;
                                  </Typography>
                                )
                              )}
                          </div>
                        </div>
                        <Link
                          to={`/mangas/read/${(details as Details).name}/${
                            data.length > 0 &&
                            (data[data.length - 1] as Chapter).chapterId
                          }`}
                        >
                          <Button variant="contained">Read First</Button>
                        </Link>
                      </div>
                      <Divider orientation="vertical" flexItem />
                      <div className="infoRight">
                        <div className="release">
                          <Typography variant="overline">Release:</Typography>
                          <Typography variant="body1">
                            {(details as Details).release}
                          </Typography>
                        </div>
                        <div className="status">
                          <Typography variant="overline">Status:</Typography>
                          <Typography variant="body1">
                            {(details as Details).status}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chapterList">
                {data.slice(0, count).map((chapter: Chapter, i: number) => (
                  <div key={i}>
                    <div className="chapter">
                      <div className="chapterLeft">
                        <img
                          src={likeIcon}
                          alt="like"
                          onClick={() => handleLike(chapter.chapterId)}
                        />
                        <Typography variant="overline">
                          <Link
                            to={`/mangas/read/${props.match.params.name}/${chapter.chapterId}`}
                          >
                            {chapter.chapterTitle}
                          </Link>
                        </Typography>
                      </div>
                      <div className="chapterRight">
                        <Typography variant="overline">
                          {chapter.postedAt}
                        </Typography>
                      </div>
                    </div>
                    <Divider variant="middle" />
                  </div>
                ))}
                <div className="readmoreBtn">
                  <Button variant="outlined" onClick={handleReadMore}>
                    <img src={readmoreIcon} alt="read-more" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {data.length === 0 && <Page404 />}
      <Footer />
    </>
  );
}

export default MangaChapterList;
