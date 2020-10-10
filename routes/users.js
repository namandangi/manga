/* eslint-disable comma-dangle */
const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/users');
const { authRequired } = require('../middleware/auth');

const router = Router();

router.get('/mangas/user/get/:username', asyncHandler(controller.userProfile));
router.post('/mangas/user/register', asyncHandler(controller.userSignUp));
router.post('/mangas/user/login', asyncHandler(controller.userLogin));
router.delete(
  '/mangas/user/delete/:username',
  authRequired,
  asyncHandler(controller.userDelete)
);
router.post(
  '/mangas/read/:name/:id/like',
  authRequired,
  asyncHandler(controller.likeChapter)
);
router.post(
  '/mangas/read/:name/subscribe',
  authRequired,
  asyncHandler(controller.subscribeManga)
);

module.exports = router;
