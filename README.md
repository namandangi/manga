[![HitCount](http://hits.dwyl.io/namandangi/comics.svg)](http://hits.dwyl.io/namandangi/comics) ![](https://img.shields.io/github/issues/namandangi/manga?style=flat-square) ![](https://img.shields.io/github/languages/top/namandangi/manga?style=flat-square) ![](https://img.shields.io/github/languages/count/namandangi/manga?style=flat-square)
<br />

<p align="center">
  <a href="https://manga-webapp.herokuapp.com/">
    <img src="https://github.com/namandangi/comics/blob/master/public/docs/levi_finger_spin.gif" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Manga!</h3>

  <p align="center">
    A web-scraper based Manga Reader!
    <br />
    <a href="https://github.com/namandangi/manga/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://manga-webapp.herokuapp.com/">View Demo</a>
    |
    <a href="https://github.com/namandangi/manga/issues">Report Bug</a>
    |
    <a href="https://github.com/namandangi/manga/issues">Request Feature</a>
  </p>
</p>
   
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/landing.png)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/authentication.png)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/404.png)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/searchManga.png)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/mangaList.jpg)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/chapterList.png)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/mangaChapter.jpg)
   ![](https://github.com/namandangi/comics/blob/master/public/screenshots/desktopApp.jpeg)

## Technology Stack :

1.  ExpressJS for server library.
2.  Node.js for Environment.
3.  Embedded JavaScript for templating.
4.  Axios for promise based HTTP requests
5.  Cheerio.js for quick and flexible implementation of core jQuery
6.  Puppeteer for headless-browser based scraping
7.  Electron.js for Desktop-client app.

## Build Instructions

#### 1. First the clone the repository locally by

```
    git clone https://github.com/namandangi/manga
```

and change directory into the project using

```
    cd ./manga
```

#### 2. Install all server-side packages

In the root directory of the backend project using

```
npm install
```

#### 3. Run the backend-server

In the root directory of the backend using

```
npm start
```

and change directory into the webapp using

```
   cd ./webapp
```

#### 4. Install all client-side packages

In the root directory of the webapp using

```
npm install
```

#### 5. Run the client-server

In the root directory of the webapp using

```
npm start
```

#### 6. Run the desktop-client after the client-server loads

In the root directory of the webapp using

```
npm run electron
```

#### 7. Optionally run the desktop & client server togethor

In the root directory of the webapp setup the startUrl in ` electron.js` file and then run

```
npm run dev
```

## Run Test

In the root directory of the project run

```
   npm test
```

## Contributing

1.  Fork it (https://github.com/namandangi/manga/fork)
2.  Create your feature branch (`git checkout -b feature/fooBar`)
3.  Commit your changes (`git commit -m 'Add some fooBar'`)
4.  Push to the branch (`git push origin feature/fooBar`)
5.  Create a new Pull Request
