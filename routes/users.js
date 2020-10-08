/* eslint-disable comma-dangle */
const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/users');

const router = Router();

router.get('/mangas/user/get/:username', asyncHandler(controller.userProfile));
router.post('/mangas/user/register', asyncHandler(controller.userSignUp));
router.post('/mangas/user/login', asyncHandler(controller.userLogin));
router.delete(
  '/mangas/user/delete/:username',
  asyncHandler(controller.userDelete)
);

module.exports = router;
