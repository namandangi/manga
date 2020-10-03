/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const favManga = [];
let mangaUrl;
let chapterNumber = 1;
const mangaNameList = [];
const chapterLink = [
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
    url: String,
    imgurl: String,
  },
];
const imgs = [];

exports.getMangas = async (req, res) => {
  await axios.get('https://www.mangazuki.online/').then((response) => {
    const $ = cheerio.load(response.data);

    /* The code below is used to get image-urls along with chapter-urls */
    $('.item-thumb')
      .children()
      .each((i, manga) => {
        mangaNameList[i] = $(manga)
          .attr('title')
          .toString()
          .replace(/\s+/g, '-')
          .toLowerCase();
        mangaList[i] = {
          title: $(manga).attr('title'),
          name: mangaNameList[i],
          url: $(manga).attr('href'),
          imgurl: $(manga).find('.img-responsive').attr('src'),
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
      chapterLink[i] = {
        id: i,
        name: mangaList[id].name,
        title: $(name).text().toString().replace(/\s+/g, ' '),
        url: $(name).find('a').attr('href'),
      };
      console.log(chapterLink[i]);
    });
  console.log(chapterLink[0].url);
  res.render('chapters', { allChaps: chapterLink });
};

exports.getMangaChapter = async (req, res) => {
  let id1;
  let id2;
  console.log(`${req.params.name} ${req.params.id}`);
  chapterNumber = req.params.id;
  for (let i = 0; i < mangaList.length; i++) {
    if (mangaList[i].name === chapterLink[0].name) id2 = i;
  }

  const { url } = chapterLink[req.params.id];
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
  const surl = `https://www.mangazuki.online/?s=${req.query.search
    .toString()
    .split(' ')
    .join('+')}&post_type=wp-manga`;
  console.log(surl);
  await axios.get(surl).then((response) => {
    const $ = cheerio.load(response.data);
    $('.tab-thumb')
      .children()
      .each((i, manga) => {
        mangaNameList[i] = $(manga)
          .attr('title')
          .toString()
          .replace(/\s+/g, '-')
          .toLowerCase();
        mangaList[i] = {
          title: $(manga).attr('title'),
          name: mangaNameList[i],
          url: $(manga).attr('href'),
          imgurl: $(manga).find('.img-responsive').attr('src'),
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
