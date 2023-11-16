const cardsRouter = require('express').Router(); // создали роутер
const { celebrate } = require('celebrate');
const { queryIdSchema, cardCreationSchema } = require('../utils/schemas');
const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.put('/:id/likes', celebrate(queryIdSchema), likeCard);
cardsRouter.delete('/:id/likes', celebrate(queryIdSchema), dislikeCard);
cardsRouter.delete('/:id', celebrate(queryIdSchema), deleteCard);
cardsRouter.get('/', getAllCards);
cardsRouter.post('/', celebrate(cardCreationSchema), createCard);

module.exports = cardsRouter;
