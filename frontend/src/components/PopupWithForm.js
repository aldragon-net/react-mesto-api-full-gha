function PopupWithForm ({title, name, buttonText, isOpen, onSubmit, onClose, children}) {

  return ( 
    <div 
      className={`popup ${isOpen && 'popup_opened'}`}
      id={`${name}-popup`}
    >
      <div className="popup__container">
        <button 
          className="popup__close"
          type="button"
          aria-label={`закрыть форму ${title}`}
          onClick={onClose}/>
        <form 
          className="popup__content form" 
          id={`${name}-form`} 
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className="form__heading">{title}</h2>  
          {children}
          <button className="form__submit" type="submit">
            {buttonText}
          </button>    
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
