const Card = require('../models/card');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../utils/errors');
const { MESSAGES } = require('../utils/messages');
const { STATUSES } = require('../utils/statuses');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUSES.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(MESSAGES.BAD_CARD_DATA));
      }
      return next(err);
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError(MESSAGES.CARD_NOT_FOUND))
    .then((card) => {
      if (card.owner.toHexString() === req.user._id) {
        Card.findByIdAndRemove(card._id)
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалять чужое');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError(MESSAGES.CARD_NOT_FOUND))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError(MESSAGES.CARD_NOT_FOUND))
    .then((card) => res.send(card))
    .catch(next);
};
