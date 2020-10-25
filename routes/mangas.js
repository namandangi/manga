const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/mangas');

const router = Router();

router.get('/mangas', asyncHandler(controller.getMangas));
router.get('/mangas/details/:id', asyncHandler(controller.getMangaDetail));
router.get('/mangas/read/:name', asyncHandler(controller.getMangaByName));
router.get('/mangas/read/:name/:id', asyncHandler(controller.getMangaChapter));
router.get('/mangas/search', asyncHandler(controller.searchManga));
router.get('/mangas/tag/:name', asyncHandler(controller.getByTag));

module.exports = router;
