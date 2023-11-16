import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import burger from '../images/icons/burger.svg';
import cross from '../images/icons/close.svg';

function Header ({isLoggedIn, email, linkURL, linkText, onLogout, onMenuSwitch, isMenuOpen}) {
  return ( 
    <header className="header">
      <img className="header__logo" src={logo} alt="Проект Mesto Russia" />
      {isLoggedIn ?
        <div>
          <span className='header__userinfo'>{email} </span>
          <button onClick={onLogout} className='header__button'>Выйти</button>
          <img 
            src={!isMenuOpen ? burger : cross}
            alt={!isMenuOpen ? 'открыть меню' : 'закрыть меню'}
            onClick={onMenuSwitch} 
            className='header__menu-switch' />
        </div>
      :
        <div>
          <Link to={linkURL} className='header__link'>{linkText}</Link>
        </div> 
      }
    </header>
  )
}

export default Header;
