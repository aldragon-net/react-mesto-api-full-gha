function MobileMenu ({isOpen, email, onLogout}) {
  return ( 
    <div className={`mobile-menu ${isOpen && 'mobile-menu_visible'}`}>
      <p className="mobile-menu__item">{email}</p>
      <button onClick={onLogout} className='mobile-menu__button'>Выйти</button>
    </div>
  )
}

export default MobileMenu;
