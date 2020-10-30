import React, { useState, useEffect, useCallback } from 'react';
import { Header, Footer } from './partial';
import '../styles/mangaList.scss';
import readmoreIcon from '../static/readmore-icon.png';
import ratingIcon from '../static/rating-icon.png';
import { Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Page404 from './404';

function MangaList(props: any) {
  interface Manga {
    title: String;
    name: String;
    rating: Number;
    mangaUrl: String;
    imgUrl: string;
  }

  const [data, setData] = useState([]);
  const [count, setCount] = useState(10);
  const [limit, setLimit] = useState(50);

  const getMangaList = useCallback(async () => {
    try {
      let surl = window.location.href.substring(21);
      surl = !surl.includes('tag') ? surl : surl + `?limit=${limit}`;
      if (limit == count) {
        setLimit(limit + 50);
      }
      console.log(surl);
      const doc = await fetch(process.env.REACT_APP_API_URL + '/api' + surl);
      const response = await doc.json();
      setData(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const resetLimit = useCallback(async () => {
    if (limit == count) {
      setLimit(limit + 50);
      // getMangaList();
    }
  }, []);

  const handleReadMore = () => {
    setCount(count + 10);
  };

  useEffect(() => {
    getMangaList();
    resetLimit();
  }, [limit, window.location.href]);

  return (
    <>
      <Header />
      {data.length > 0 && (
        <>
          <div className="contentBody">
            <div className="hero"></div>
            <div className="content">
              <div className="genreTitle">
                <Typography variant="h5">LATEST UPDATES</Typography>
                <img src={readmoreIcon} alt="read-more" />
              </div>
              <div className="manga">
                {data.slice(0, count).map((manga: Manga, i: number) => (
                  <div key={i}>
                    <Link to={`/mangas/read/${manga.name}`}>
                      <Paper className="paper" variant="outlined" square>
                        <div className="frontCard">
                          <img
                            src={manga.imgUrl}
                            style={{ width: '130px', height: '180px' }}
                          />
                        </div>
                        <div className="backCard">
                          <Typography variant="body1">{manga.title}</Typography>
                          <div className="innerRating">
                            <img src={ratingIcon} />
                            <Typography variant="subtitle1">
                              {manga.rating}
                            </Typography>
                          </div>
                        </div>
                      </Paper>
                    </Link>
                  </div>
                ))}
              </div>
              <Button
                className="btmReadmoreBtn"
                variant="contained"
                onClick={handleReadMore}
              >
                <img src={readmoreIcon} alt="read-more" />
              </Button>
            </div>
          </div>
        </>
      )}
      {data.length === 0 && <Page404 />}
      <Footer />
    </>
  );
}

export default MangaList;
