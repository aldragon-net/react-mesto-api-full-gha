import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import InfoTooltip from './InfoTooltip.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import MobileMenu from './MobileMenu.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api.js';
import authApi from '../utils/auth-api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({name: '', _id: ''});
  const [email, setEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardToShow, setCardToShow] = useState({name: '', link: ''});
  const [cardToDelete, setCardToDelete] = useState({name: '', link: ''});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlaceUpdating, setIsPlaceUpdating] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCardDeleting, setIsCardDeleting] = useState(false);

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {console.log(`Ошибка связи с сервером: ${err}`)})
    }, []);

  useEffect(() => {
    authApi.validate()
      .then((res) => {
        setIsAuthorized(true);
        setEmail(res.email);
        navigate('/', {replace: true});
      })
      .catch(() => {
        navigate('/signin', {replace: true});
      })
    }, [navigate]);


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleCardClick = (card) => {
    setCardToShow(card);
  }
  const handleMobileMenuSwitch = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoPopupOpen(false);
    setCardToShow({name: '', link: ''});
    setCardToDelete({name: '', link: ''});
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const apiChahgeLikeStatus = isLiked ? api.unlikeCard.bind(api) : api.likeCard.bind(api);
    apiChahgeLikeStatus(card._id)
      .then((changedCard) => {
        setCards((cards) => cards.map((oldCard) => oldCard._id === card._id ? changedCard : oldCard));
      })
      .catch((err) => {console.log(`Ошибка обработки лайка: ${err}`)})
  }
  const handleCardDelete = () => {
    setIsCardDeleting(true);
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка удаления карточки: ${err}`)})
      .finally(() => {setIsCardDeleting(false)})
  }
  const handleDeleteConfirmation = (card) => {
    setIsConfirmationPopupOpen(true);
    setCardToDelete(card);
  }

  const handleUpdateUser = (user) => {
    setIsProfileUpdating(true);
    api.updateProfileInfo(user)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка обновления данных профиля: ${err}`)})
      .finally(() => {setIsProfileUpdating(false)})
  } 
  const handleUpdateAvatar = (link) => {
    setIsAvatarUpdating(true);
    api.changeAvatar({link})
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка обновления аватара: ${err}`)})
      .finally(() => {setIsAvatarUpdating(false)})
  }
  const handleAddPlace = (place, onSuccess) => {
    setIsPlaceUpdating(true);
    api.createCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        onSuccess();
      })
      .catch((err) => {console.log(`Ошибка добавления карточки: ${err}`)})
      .finally(() => {setIsPlaceUpdating(false)})
  }

  const handleRegistration = (userData, onSuccess) => {
    authApi.register({email: userData.email, password: userData.password})
      .then(() => {
        setIsSuccess(true);
        navigate('/signin', {replace: true});
        onSuccess();
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setIsSuccess(false);
      })
      .finally(() => {setIsInfoPopupOpen(true)})
  }
  const handleLogin = (userData, onSuccess) => {
    authApi.authorize({email: userData.email, password: userData.password})
      .then((res) => {
        setIsAuthorized(true);
        setEmail(userData.email);
        navigate('/', {replace: true});
        onSuccess();
      })
      .catch((err) => {
        console.log(`Ошибка входа: ${err}`);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      })
  }
  const handleLogout = () => {
    authApi.logout()
      .then((res) => {
        setIsAuthorized(false);
        setIsMobileMenuOpen(false);
        setEmail('');
        navigate('/signin', {replace: true});
      })
      .catch((err) => {
        console.log(`Ошибка выхода: ${err}`);
      })

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <MobileMenu isOpen={isMobileMenuOpen} email={email} onLogout={handleLogout}/>
          <Routes>
            <Route 
              path="/"
              element={
                <ProtectedRoute isAuthorized={isAuthorized}>
                  <Header 
                    isLoggedIn={isAuthorized}
                    email={email}
                    onMenuSwitch={handleMobileMenuSwitch}
                    isMenuOpen={isMobileMenuOpen}
                    onLogout={handleLogout} />
                  <Main 
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteConfirmation}
                    onCardClick={handleCardClick} />
                </ProtectedRoute>
              } />
            <Route 
              path="/signup"
              element={
                <>
                  <Header isLoggedIn={false} linkURL='/signin' linkText='Вход' />
                  <section>
                    <Register onRegister={handleRegistration} />
                  </section>
                </>  
              } />
            <Route 
              path="/signin"
              element={
                <>
                  <Header isLoggedIn={false} linkURL='/signup' linkText='Регистрация' />
                  <Login onLogin={handleLogin} />
                </>  
              } />
            <Route 
              path="*"
              element={<Navigate to="/" />} />
          </Routes>  
        <Footer />
        <InfoTooltip isOpen={isInfoPopupOpen} isSuccess={isSuccess} onClose={closeAllPopups}/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isUpdating={isProfileUpdating}
          onClose={closeAllPopups} />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          isUpdating={isPlaceUpdating}
          onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          isUpdating={isAvatarUpdating}
          onClose={closeAllPopups} />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onConfirm={handleCardDelete}
          isUpdating={isCardDeleting}
          onClose={closeAllPopups} />
        <ImagePopup 
          card={cardToShow}
          onClose={closeAllPopups} />      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
