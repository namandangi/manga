import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Header, Footer } from './partial';
import '../styles/mangaList.scss';
import readmoreIcon from '../static/readmore-icon.png';
import ratingIcon from '../static/rating-icon.png';
import { Paper, Typography, Link, Button } from '@material-ui/core';

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
      let { pathname, search } = props.location;
      search = !pathname.includes('tag') ? search : search + `?limit=${limit}`;
      if (limit == count) {
        setLimit(limit + 50);
      }
      const searchUrl = pathname + search;
      console.log(searchUrl, limit);
      const doc = await fetch(searchUrl);
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
  }, [setData, limit]);
  console.log(data);
  console.log(count, limit);

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
            {data.slice(0, count).map((manga: Manga) => (
              <Link href={`/mangas/read/${manga.name}`}>
                <Paper
                  className="paper"
                  style={{
                    backgroundImage: `url(${manga.imgUrl})`,
                    backgroundSize: 'cover',
                  }}
                  variant="outlined"
                  square
                >
                  <Typography variant="body1">{manga.title}</Typography>
                  <div className="innerRating">
                    <img src={ratingIcon} />
                    <Typography variant="subtitle1">{manga.rating}</Typography>
                  </div>
                </Paper>
              </Link>
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
      <Footer />
    </>
  );
}

export default MangaList;
