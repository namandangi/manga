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
import Auth from '../authPage';
import Page404 from '../404';

function RootRouter() {
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
        <Route exact path="/mangas/authentication" component={Auth} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default RootRouter;
