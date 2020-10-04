/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const favManga = [];
let mangaUrl;
let chapterNumber = 1;
// const mangaNameList;
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
    imgurl: String,
  },
];
const imgs = [];

exports.getMangas = async (req, res) => {
  await axios.get('https://kissmanga.link/').then((response) => {
    const $ = cheerio.load(response.data);

    /* The code below is used to get image-urls along with chapter-urls */
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
        rating: $(manga).find('.score').text(),
        mangaUrl: $(manga).find('.item-thumb > a').attr('href'),
        imgurl: $(manga).find('.item-thumb > a > img').attr('src'),
      };
      console.log(mangaList[i]);
    });
  });
  res.render('home.ejs', { list: mangaList });
};

exports.getMangaByName = async (req, res) => {
  let id;
  for (let i = 0; i < mangaList.length; i++) {
    if (req.params.name === mangaList[i].name) {
      mangaUrl = mangaList[i].url;
      id = i;
    }
  }
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
  res.render('chapters', { allChaps: chapterList });
};

exports.getMangaChapter = async (req, res) => {
  let id1;
  let id2;
  console.log(`${req.params.name} ${req.params.id}`);
  chapterNumber = req.params.id;
  for (let i = 0; i < mangaList.length; i++) {
    if (mangaList[i].name === chapterList[0].name) id2 = i;
  }

  const { url } = chapterList[req.params.id];
  await axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    // eslint-disable-next-line func-names
    $('.wp-manga-chapter-img').each(function (i, img) {
      imgs[i] = $(this).attr('src');
    });
    res.render('index', {
      images: imgs,
      name: mangaList[id2].title,
      number: chapterNumber,
    });
  });
};

exports.searchManga = async (req, res) => {
  console.log(req.query.search);
  const surl = `https://kissmanga.link/?s=${req.query.search
    .toString()
    .split(' ')
    .join('+')}&post_type=wp-manga`;
  console.log(surl);
  await axios.get(surl).then((response) => {
    const $ = cheerio.load(response.data);
    $('.c-tabs-item__content').each((i, manga) => {
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
  res.render('search', { list: mangaList });
};

exports.getFavourites = async (req, res) => {
  favManga.push(req.query.value);
  res.render('favourite', { list: favManga });
};
