const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/mangas');

const router = Router();

router.get('/mangas', asyncHandler(controller.getMangas));
router.get('/mangas/read/:name', asyncHandler(controller.getMangaByName));
router.get('/mangas/read/:name/:id', asyncHandler(controller.getMangaChapter));
router.get('/search', asyncHandler(controller.searchManga));
router.get('/mangas/:tag', asyncHandler(controller.getByTag));

module.exports = router;
