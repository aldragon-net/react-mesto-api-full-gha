const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { queryIdSchema, profileUpdateSchema, avatarUpdateSchema } = require('../utils/schemas');
const {
  getUser, getAllUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.patch('/me/avatar', celebrate(avatarUpdateSchema), updateAvatar);
usersRouter.patch('/me', celebrate(profileUpdateSchema), updateProfile);
usersRouter.get('/me', getProfile);
usersRouter.get('/:id', celebrate(queryIdSchema), getUser);
usersRouter.get('/', getAllUsers);

module.exports = usersRouter;
