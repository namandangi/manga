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
  const getMangaChapter = useCallback(async () => {
    try {
      const doc = await fetch(
        `/mangas/read/${props.match.params.name}/${props.match.params.id}`
      );
      const response = await doc.json();
      setData(response);
      setImgs(response.chapterImgUrl);
      const mangaDoc = await fetch(`/mangas/details/${response.mangaName}`);
      const mangaResponse = await mangaDoc.json();
      setDetails(mangaResponse);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleNextChapter = () => {
    // <Redirect to={`/mangas/read/${props.match.params.name}/${Number(props.match.params.id)+1}`} />
  };
  const handlePrevChapter = () => {
    // <Redirect to={`/mangas/read/${props.match.params.name}/${Number(props.match.params.id)-1}`} />
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
      <div className="chapterHeader">
        <div className="leftChapterHeader">
          <Typography variant="h6">
            <Link href="#">{(details as Details).title}</Link> &nbsp; {'>'}
          </Typography>
          <Typography variant="h6">{(data as Chapter).chapterTitle}</Typography>
        </div>
        <div className="middleChapterHeader">
          <Link
            href={`/mangas/read/${props.match.params.name}/${
              Number(props.match.params.id) - 1
            }`}
          >
            <Button variant="contained" onClick={handlePrevChapter}>
              <img className="prev" src={arrowIcon} alt="prev-chapter" />
            </Button>
          </Link>
          <Typography variant="h6">
            {'#'} {(data as Chapter).chapterId}
          </Typography>
          <Link
            href={`/mangas/read/${props.match.params.name}/${
              Number(props.match.params.id) + 1
            }`}
          >
            <Button variant="contained" onClick={handleNextChapter}>
              <img className="next" src={arrowIcon} alt="next-chapter" />
            </Button>
          </Link>
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
