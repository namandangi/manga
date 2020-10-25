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
  interface LinkProps {
    to: String;
    query: Object;
  }

  const [data, setData] = useState([]);

  const getMangaList = useCallback(async () => {
    try {
      const { pathname, search } = props.location;
      const searchUrl = pathname + search;
      console.log(searchUrl);
      const doc = await fetch(searchUrl);
      const response = await doc.json();
      setData(response);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getMangaList();
  }, [setData]);
  console.log(data);
  console.log(props);

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
            {data.map((manga: Manga) => (
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
                  <div className="rating">
                    <img src={ratingIcon} />
                    <Typography variant="subtitle1">{manga.rating}</Typography>
                  </div>
                </Paper>
              </Link>
            ))}
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
