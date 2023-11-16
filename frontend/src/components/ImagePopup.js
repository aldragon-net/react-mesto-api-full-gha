function ImagePopup ({card, onClose}) {
  return ( 
    <div 
      className={`popup popup_opaque ${Boolean(card.link) && 'popup_opened'}`}
      id="photo-popup"
    >
      <div className="popup__container">
        <button 
          className="popup__close"
          type="button"
          aria-label="закрыть просмотр фото"
          onClick={onClose}/>
          <div className="popup__content">
            <img 
              className="popup__image"
              src={card.link} 
              alt={`фото места ${card.name}`}/>
            <h2 className="popup__image-caption">{card.name}</h2>
          </div>
      </div>
    </div>
  )}

export default ImagePopup;
