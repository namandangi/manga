import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import Home from '../home';
import MangaList from '../mangaList';
import MangaChapterList from '../mangaChapterList';
import MangaChapter from '../mangaChapter';

function RootRouter() {
  const latestMangaUpdate = () => <MangaList />;
  const mangaByTag = () => <MangaList />;
  const searchManga = () => <MangaList />;
  const invalidRoute = () => <Redirect to="/" />;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/mangas" component={MangaList} />
        <Route exact path="/mangas/tag/:name" component={MangaList} />
        <Route exact path="/mangas/search" component={MangaList} />
        <Route exact path="/mangas/read/:name" component={MangaChapterList} />
        <Route exact path="/mangas/read/:name/:id" component={MangaChapter} />
        <Route component={invalidRoute} />
      </Switch>
    </Router>
  );
}

export default RootRouter;
