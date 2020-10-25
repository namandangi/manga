import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Header, Footer } from './partial';
import '../styles/mangaChapterList.scss';
import { Typography, Paper, Button, Link, Divider } from '@material-ui/core';
import subscribeIcon from '../static/add-icon.png';
import gamerIcon from '../static/gamer.jpg';
import ratingIcon from '../static/rating-icon.png';
import likeIcon from '../static/like-icon.png';
import readmoreIcon from '../static/readmore-icon.png';

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
    author: String;
    rating: Number;
    release: String;
    status: String;
    genre: String[];
    imgUrl: string;
  }

  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});

  const getMangaChapterList = useCallback(async () => {
    try {
      const chapterDoc = await fetch(`/mangas/read/${props.match.params.name}`);
      const chapterResponse = await chapterDoc.json();
      const mangaDoc = await fetch(
        `/mangas/details/${chapterResponse.chapterList[0].mangaName}`
      );
      const mangaResponse = await mangaDoc.json();
      setData(chapterResponse.chapterList);
      setDetails(mangaResponse);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getMangaChapterList();
  }, [setData]);
  console.log(data);
  console.log(details);
  console.log(props.match.params.name);

  return (
    <>
      <Header />
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
                      <Typography variant="body1">
                        {(details as Details).genre}
                      </Typography>
                    </div>
                    <Button variant="contained">Read First</Button>
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
            {data.map((chapter: Chapter) => (
              <>
                <div className="chapter">
                  <div className="chapterLeft">
                    <img src={likeIcon} alt="like" />
                    <Typography variant="overline">
                      <Link
                        href={`/mangas/read/${props.match.params.name}/${chapter.chapterId}`}
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
              </>
            ))}
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
