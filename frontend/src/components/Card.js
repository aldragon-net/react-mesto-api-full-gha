import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card ({card, onCardDelete, onCardLike, onCardClick}) {
  
  const currentUser = useContext(CurrentUserContext);  
  const isOwned = card.owner === currentUser._id;
  const isLiked = card.likes.some(_id => _id === currentUser._id);

  const handleClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return ( 
    <li className="place">
      <img 
        src={card.link} 
        className="place__image"
        alt={`фотография места${card.name}`}
        onClick={handleClick} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button 
            className={`place__like-icon ${isLiked && 'place__like-icon_active'}`}
            type="button"
            aria-label="лайк"
            onClick={handleLikeClick} />
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwned && 
        <button 
          className="place__delete-icon"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteClick} />
      }
    </li>
  )
}

export default Card;
