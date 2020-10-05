/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Manga = require('../models/manga');

const chapterList = [
  {
    id: Number,
    name: String,
    title: String,
    url: String,
  },
];
const mangaList = [
  {
    title: String,
    name: String,
    rating: Number,
    mangaUrl: String,
    imgUrl: String,
  },
];

exports.getMangas = async (req, res) => {
  await axios.get('https://kissmanga.link/').then((response) => {
    const $ = cheerio.load(response.data);

    /*
      The code below is used to get image-urls along with chapter-urls
    */
    $('.page-item-detail').each((i, manga) => {
      const mangaName = $(manga)
        .find('.item-thumb > a')
        .attr('title')
        .toString()
        .replace(/\s+/g, '-')
        .toLowerCase();
      mangaList[i] = {
        title: $(manga).find('.item-thumb > a').attr('title'),
        name: mangaName,
        rating: Number($(manga).find('.score').text()),
        mangaUrl: $(manga).find('.item-thumb > a').attr('href'),
        imgUrl: $(manga).find('.item-thumb > a > img').attr('src'),
      };
      console.log(mangaList[i]);
    });
  });
  mangaList.forEach(async (manga) => {
    manga.author = '';
    manga.status = '';
    manga.release = '';
    manga.genre = [];
    manga.chapter = [];
    const doc = await Manga.findOne({ name: manga.name });
    if (!doc) {
      const newManga = new Manga(manga);
      await newManga.save();
    }
  });
  res.render('home.ejs', { list: mangaList });
};

exports.getMangaByName = async (req, res) => {
  let mangaName;
  let mangaUrl;
  const { name } = req.params;
  const doc = await Manga.findOne({ name: name });
  console.log(doc);
  if (doc) {
    mangaUrl = doc.mangaUrl;
    mangaName = doc.name;
  }

  /* Below code-snippet is headless way of scrapping content
     Too slow, but reliable beacuse we it handles dynamic data scrapping without the use of xhr request info.
     However for much faster scrapping we should avoid the use of automation tools like selenium
  */

  /*

    // pupeteer setup, headless and no timeout

   const browser = await puppeteer.launch({ headless: true });
   const page = await browser.newPage();
   // waitUntil: 'networkidle0' ~ if set along with time-out it makes loading too slow
   await page.goto(mangaUrl, { timeout: 0 });
   const content = await page.content();
   const $ = cheerio.load(content);
   $('li.wp-manga-chapter')
     // .slice(0, 10)    // use slice to limit the no. of chapters to be scraped
     .each(async (i, name) => {
       chapterList[i] = {
         id: i,
         name: mangaList[id].name,
         title: $(name).text().toString().replace(/\s+/g, ' '),
         url: $(name).find('a').attr('href'),
       };
       console.log(chapterList[i]);
     });

  */

  /*
    kissmanga loads all chapter links dynamically using pseudo elements like ::before
    since these pseudo elements are not part of dom so we can't directly scrape them
    thus we look for the xhr request made by kissmanga to it's server where it loads the link
    we found that the xhr req was a post req which required the id of the manga, for which we made the
    first req and found the mangaId
  */

  const { data } = await axios.get(mangaUrl);
  const $ = cheerio.load(data);
  const managaId = $('.rating-post-id').attr('value');
  const genres = [];
  $('.genres-content > a').each((_id, genre) => {
    genres.push($(genre).text());
  });
  const mangaDetail = {
    author: $('.author-content > a').text(),
    release: $(
      '.post-status > .post-content_item > .summary-content > a'
    ).text(),
    status: $('.post-status > .post-content_item > .summary-content')
      .slice(1, 2)
      .text()
      .toString()
      .replace(/\s+/g, ''),
    genre: genres,
  };
  const response = await axios.post(
    'https://kissmanga.link/wp-admin/admin-ajax.php',
    `action=manga_get_chapters&manga=${managaId}`
  );
  const selector = cheerio.load(response.data);
  selector('li.wp-manga-chapter').each((i, manga) => {
    chapterList[i] = {
      id: i,
      chapterTitle: selector(manga)
        .find('a')
        .text()
        .toString()
        .replace(/\s+/g, ' '),
      chapterUrl: selector(manga).find('a').attr('href'),
      postedAt: $(manga).find('.chapter-release-date > i').text(),
    };
    console.log(chapterList[i]);
  });
  mangaDetail.chapter = chapterList;
  await Manga.update({ name: mangaName }, mangaDetail);
  // console.log(await Manga.find({ name: mangaName }));
  res.render('chapters', { mangaName: mangaName, allChaps: chapterList });
};

exports.getMangaChapter = async (req, res) => {
  let mangaChapterUrl;
  let mangaName;
  const imgs = [];
  const { name, id } = req.params;
  const doc = await Manga.findOne({ name: name });

  if (doc) {
    mangaName = doc.title;
    mangaChapterUrl = doc.chapter[id].chapterUrl;
  }

  await axios.get(mangaChapterUrl).then((response) => {
    const $ = cheerio.load(response.data);
    $('.wp-manga-chapter-img').each((i, img) => {
      imgs[i] = $(img).attr('src');
    });
    res.render('index', {
      images: imgs,
      name: mangaName,
      number: id,
    });
  });
};

exports.searchManga = async (req, res) => {
  const searchUrl = `https://kissmanga.link/?s=${req.query.search
    .toString()
    .split(' ')
    .join('+')}&post_type=wp-manga`;
  await axios.get(searchUrl).then((response) => {
    const $ = cheerio.load(response.data);
    $('.c-tabs-item__content').each(async (i, manga) => {
      const mangaName = $(manga)
        .find('.tab-thumb > a')
        .attr('title')
        .toString()
        .replace(/\s+/g, '-')
        .toLowerCase();
      mangaList[i] = {
        title: $(manga).find('.tab-thumb > a').attr('title'),
        name: mangaName,
        rating: $(manga).find('.score').text(),
        mangaUrl: $(manga).find('.tab-thumb > a').attr('href'),
        imgurl: $(manga).find('.tab-thumb > a > img').attr('src'),
      };
      console.log(mangaList[i]);
    });
  });
  mangaList.forEach(async (manga) => {
    manga.author = '';
    manga.status = '';
    manga.release = '';
    manga.genre = [];
    manga.chapter = [];
    const doc = await Manga.findOne({ name: manga.name });
    if (!doc) {
      const newManga = new Manga(manga);
      await newManga.save();
      console.log('New!', newManga);
    }
  });
  res.render('search', { list: mangaList });
};

exports.getFavourites = async (req, res) => {
  const favManga = [];
  favManga.push(req.query.value);
  res.render('favourite', { list: favManga });
};
