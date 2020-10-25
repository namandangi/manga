import React, { useState, useCallback, useEffect } from 'react';
import { Footer } from '../components/partial';
import '../styles/mangaChapter.scss';
import { Typography, Button, Link } from '@material-ui/core';
import arrowIcon from '../static/readmore-icon.png';
import likeIcon from '../static/like-icon.png';
import subscribeIcon from '../static/add-icon.png';
function MangaChapter(props: any) {
  interface Chapter {
    chapterImgUrl: string[];
    chapterId: Number;
    chapterTitle: String;
  }
  interface Images {}

  const [data, setData] = useState({});
  const [imgs, setImgs] = useState([]);
  const getMangaChapter = useCallback(async () => {
    try {
      const doc = await fetch(
        `/mangas/read/${props.match.params.name}/${props.match.params.id}`
      );
      const response = await doc.json();
      setData(response);
      setImgs(response.chapterImgUrl);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getMangaChapter();
  }, [setData]);
  console.log(data);
  console.log(imgs);
  return (
    <>
      <div className="chapterHeader">
        <div className="leftChapterHeader">
          <Typography variant="h6">
            <Link href="#">The God of High School</Link> &nbsp; {'>'}
          </Typography>
          <Typography variant="h6">{(data as Chapter).chapterTitle}</Typography>
        </div>
        <div className="middleChapterHeader">
          <Button variant="contained">
            <img className="prev" src={arrowIcon} alt="prev-chapter" />
          </Button>
          <Typography variant="h6">
            {'#'} {(data as Chapter).chapterId}
          </Typography>
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
        {imgs.map((img: string) => (
          <img src={img} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MangaChapter;
