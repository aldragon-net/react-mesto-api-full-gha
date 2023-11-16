import { useContext } from 'react';

import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main ({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return ( 
    <main className="content">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="аватар пользователя"
            src={currentUser.avatar} />
          <button 
            className="profile__avatar-button"
            type="button" 
            aria-label="изменить аватар"
            onClick={onEditAvatar} />
        </div>  
        <div className="profile__userinfo">
          <div className="profile__top">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button 
              className="profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button 
          className="profile__add-button"
          type="button" 
          aria-label="добавить место"
          onClick={onAddPlace} />
      </section>
      <section aria-label="Список мест">
        <ul className="places">
          {cards.map((card) => (
            <Card 
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} 
              onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}
  
export default Main;
