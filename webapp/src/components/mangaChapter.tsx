import React, { useState, useCallback, useEffect } from 'react';
import { Header, Footer } from '../components/partial';
import '../styles/mangaChapter.scss';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import arrowIcon from '../static/readmore-icon.png';
import likeIcon from '../static/like-icon.png';
import subscribeIcon from '../static/add-icon.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import Page404 from './404';

function MangaChapter(props: any) {
  interface Chapter {
    chapterImgUrl: string[];
    chapterId: Number;
    chapterTitle: String;
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

  const [data, setData] = useState({});
  const [imgs, setImgs] = useState([]);
  const [details, setDetails] = useState({});
  const [token, setToken] = useState('');

  const getMangaChapter = useCallback(async () => {
    try {
      const doc = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/mangas/read/${props.match.params.name}/${props.match.params.id}`
      );
      const response = await doc.json();
      setData(response);
      setImgs(response.chapterImgUrl);
      const mangaDoc = await fetch(
        process.env.REACT_APP_API_URL +
          `/api/mangas/details/${response.mangaName}`
      );
      const mangaResponse = await mangaDoc.json();
      setDetails(mangaResponse);
      const isToken = !Cookies.get('token') ? null : Cookies.get('token');
      setToken(isToken as string);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
  const handleLike = () => {
    axios.post(
      process.env.REACT_APP_API_URL +
        `/api/mangas/read/${props.match.params.name}/${props.match.params.id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  useEffect(() => {
    getMangaChapter();
  }, [setData]);
  console.log(data);
  console.log(imgs);
  console.log(details);
  console.log(props);
  return (
    <>
      {imgs.length > 0 && (
        <>
          <div className="chapterHeader">
            <div className="leftChapterHeader">
              <Typography variant="h6">
                <Link to="#">{(details as Details).title}</Link> &nbsp; {'>'}
              </Typography>
              <Typography variant="h6">
                {(data as Chapter).chapterTitle}
              </Typography>
            </div>
            <div className="middleChapterHeader">
              <Link
                to={`/mangas/read/${props.match.params.name}/${
                  Number(props.match.params.id) - 1
                }`}
              >
                <Button variant="contained">
                  <img className="prev" src={arrowIcon} alt="prev-chapter" />
                </Button>
              </Link>
              <Typography variant="h6">
                {'#'} {(data as Chapter).chapterId}
              </Typography>
              <Link
                to={`/mangas/read/${props.match.params.name}/${
                  Number(props.match.params.id) + 1
                }`}
              >
                <Button variant="contained">
                  <img className="next" src={arrowIcon} alt="next-chapter" />
                </Button>
              </Link>
            </div>
            <div className="rightChapterHeader">
              <Button variant="contained" onClick={handleLike}>
                <img
                  src={likeIcon}
                  style={{ width: '15px', height: '15px' }}
                  alt="like"
                />
              </Button>
              <Button
                className="subscribeBtn"
                variant="contained"
                onClick={handleSubscribe}
              >
                <img src={subscribeIcon} alt="subscribe" />
                <Typography variant="button">Subscribe</Typography>
              </Button>
            </div>
          </div>
          <div className="chapterContent">
            {imgs.map((img: string) => (
              <img src={img} />
            ))}
          </div>
        </>
      )}
      {imgs.length === 0 && (
        <>
          <Header />
          <Page404 />
        </>
      )}
      <Footer />
    </>
  );
}

export default MangaChapter;
