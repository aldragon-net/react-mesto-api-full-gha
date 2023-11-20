import success from '../images/icons/success.svg';
import fail from '../images/icons/fail.svg';

function InfoTooltip ({isOpen, isSuccess, onClose}) {

    return ( 
      <div 
        className={`popup ${isOpen && 'popup_opened'}`}
        id={"info-popup"}
      >
        <div className="popup__container">
          <button 
            className="popup__close"
            type="button"
            aria-label={`закрыть уведомление`}
            onClick={onClose}/>
          <div className="popup__content info-tooltip">
            <img 
              className="info-tooltip__image"
              src={isSuccess ? success : fail}
              alt={isSuccess ? "Ok" : "Ошибка"}
            />
            <p className="info-tooltip__text">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
          </div>  
        </div>
      </div>  
    )
  }
  
  export default InfoTooltip;