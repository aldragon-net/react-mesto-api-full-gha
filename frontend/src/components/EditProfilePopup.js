import { useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup ({isOpen, onUpdateUser, isUpdating, onClose}) {
  
  const currentUser = useContext(CurrentUserContext);  
  const { values, handleChange, setValues } = useForm({name: '', about: ''})

  useEffect(() => {
      setValues({name: currentUser.name, about: currentUser.about})
    },
    [currentUser, isOpen, setValues]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({name: values.name, about: values.about});
  }

  return ( 
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isUpdating ? "Сохраняется…" : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    > 
      <input 
        type="text"
        className="form__input"
        id="profile-name-input"
        name="name"
        value={values.name || ''}
        onChange={handleChange}
        placeholder="Имя"
        minLength="2"
        maxLength="20"
        required />
      <p className="profile-name-input-error form__error"></p>
      <input 
        type="text"
        className="form__input"
        id="profile-about-input"
        name="about"
        value={values.about || ''}
        onChange={handleChange}
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required />
      <p className="profile-about-input-error form__error"></p>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
