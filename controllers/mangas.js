/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const axios = require('axios');
const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
const Manga = require('../models/manga');
const Chapter = require('../models/chapter');

exports.getMangas = async (req, res) => {
  const mangaList = [];
  axios.get('https://kissmanga.link/').then((response) => {
    const $ = cheerio.load(response.data);

    /*
      The code below is used to get image-urls along with chapter-urls
    */
    $('.page-item-detail').each((id, manga) => {
      const mangaName = $(manga)
        .find('.item-thumb > a')
        .attr('title')
        .toString()
        .replace(/\s+/g, '-')
        .toLowerCase();
      mangaList[id] = {
        title: $(manga).find('.item-thumb > a').attr('title'),
        name: mangaName,
        rating: Number($(manga).find('.score').text()),
        mangaUrl: $(manga).find('.item-thumb > a').attr('href'),
        imgUrl: $(manga).find('.item-thumb > a > img').attr('src'),
      };
      console.log(mangaList[id]);
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
  res.status(200).json(mangaList);
};

exports.getMangaDetail = async (req, res) => {
  const { id } = req.params;
  const doc = await Manga.findOne({ _id: id })
    .populate({ path: 'chapter', options: { sort: { chapterId: 1 } } })
    .exec();
  res.status(200).json(doc);
};

exports.getMangaByName = async (req, res) => {
  let mangaName;
  let mangaUrl;
  const chapterList = [];
  const { name } = req.params;
  const doc = await Manga.findOne({ name });
  console.log(doc);
  if (doc) {
    mangaUrl = doc.mangaUrl;
    mangaName = doc.name;
  }

  /* Below code-snippet is headless way of scrapping content; its too slow, but reliable
     beacuse we it handles dynamic data scrapping without the use of xhr request info.
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
    we found that the xhr req was a post req which required the id of the manga, for which we
    made the first req and found the mangaId
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
      chapterId: i,
      mangaName: doc._id,
      chapterTitle: selector(manga)
        .find('a')
        .text()
        .toString()
        .replace(/\s+/g, ' '),
      chapterUrl: selector(manga).find('a').attr('href'),
      postedAt: $(manga).find('.chapter-release-date > i').text(),
    };
  });
  await Manga.update({ name: mangaName }, mangaDetail, { new: true });
  chapterList.sort((a, b) => parseFloat(a.chapterId) - parseFloat(b.chapterId));
  console.log(chapterList);
  chapterList.forEach(async (chapter) => {
    const obj = await Chapter.findOne({ chapterTitle: chapter.chapterTitle });
    if (!obj) {
      const chapterObj = new Chapter(chapter);
      await chapterObj.save();
      await Manga.findOneAndUpdate(
        { name: mangaName },
        { $push: { chapter: chapterObj._id } },
        { new: true }
      );
    }
  });
  res.status(200).json(chapterList);
};

exports.getMangaChapter = async (req, res) => {
  let mangaChapterUrl;
  let chap;
  let chapterImgUrl;
  let chapterTitle;
  const imgs = [];
  const { name, id } = req.params;
  const doc = await Manga.findOne({ name })
    .populate({ path: 'chapter', options: { sort: { chapterId: 1 } } })
    .exec();
  if (doc) {
    mangaChapterUrl = doc.chapter[id].chapterUrl;
    chapterImgUrl = doc.chapter[id].chapterImgUrl;
    chapterTitle = doc.chapter[id].chapterTitle;
  }

  await axios.get(mangaChapterUrl).then((response) => {
    const $ = cheerio.load(response.data);
    $('.wp-manga-chapter-img').each((i, img) => {
      imgs[i] = $(img).attr('src');
    });
  });
  if (chapterImgUrl.length !== imgs.length) {
    chap = await Chapter.findOneAndUpdate(
      { mangaName: doc._id, chapterTitle },
      { chapterImgUrl: imgs },
      { new: true, sort: { chapterId: 1 } }
    );
  }
  console.log(chap);
  res.status(200).json(chap);
};

exports.searchManga = async (req, res) => {
  const mangaList = [];
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
        imgUrl: $(manga).find('.tab-thumb > a > img').attr('src'),
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
  res.status(200).json(mangaList);
};

exports.getByTag = async (req, res) => {
  const mangaList = [];
  const { name } = req.params;
  const queries = req.query;
  const limit = queries === undefined ? 50 : Number(queries.limit);
  const { data } = await axios.get(
    `https://kissmanga.link/all-manga/?m_orderby=${name}`
  );
  const $ = cheerio.load(data);
  $('.page-item-detail').each((id, manga) => {
    mangaList.push({
      title: $(manga).find('.post-title > h3 > a').text(),
      name: $(manga)
        .find('.post-title > h3 > a')
        .text()
        .toString()
        .replace(/\s+/g, '-')
        .toLowerCase(),
      mangaUrl: $(manga).find('.post-title > h3 > a').attr('href'),
      rating: $(manga).find('.score').text(),
      imgUrl: $(manga).find('.item-thumb > a > img').attr('src'),
    });
  });

  /*
   * 10 items load initially, 10 items load after hitting a XML request
   * so therefore, 10 + 10*iterator = limit
   */
  const iterator = (limit - 10) / 10;
  for (let i = 1; i <= iterator; i += 1) {
    const response = await axios.post(
      'https://kissmanga.link/wp-admin/admin-ajax.php',
      `action=madara_load_more&page=${i}&template=madara-core%2Fcontent%2Fcontent-archive&vars%5Bpaged%5D=1&vars%5Borderby%5D=post_title&vars%5Btemplate%5D=archive&vars%5Bsidebar%5D=right&vars%5Bpost_type%5D=wp-manga&vars%5Bpost_status%5D=publish&vars%5Border%5D=ASC&vars%5Bmeta_query%5D%5Brelation%5D=OR&vars%5Bmanga_archives_item_layout%5D=default`
    );
    const selector = cheerio.load(response.data);
    selector('.page-item-detail').each((id, manga) => {
      mangaList.push({
        title: selector(manga).find('.post-title > h3 > a').text(),
        name: selector(manga)
          .find('.post-title > h3 > a')
          .text()
          .toString()
          .replace(/\s+/g, '-')
          .toLowerCase(),
        mangaUrl: selector(manga).find('.post-title > h3 > a').attr('href'),
        rating: selector(manga).find('.score').text(),
        imgUrl: selector(manga).find('.item-thumb > a > img').attr('src'),
      });
    });
  }

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
  res.status(200).json(mangaList);
};
