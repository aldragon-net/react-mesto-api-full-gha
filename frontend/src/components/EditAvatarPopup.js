import { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({isOpen, onUpdateAvatar, isUpdating, onClose}) {

  const linkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(linkRef.current.value);
  }

  return ( 
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isUpdating ? "Сохраняется…" : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    > 
      <input 
        ref={linkRef}
        type="url"
        className="form__input"
        id="avatar-link-input"
        name="link"
        placeholder="Ссылка на новый аватар"
        required />
      <p className="avatar-link-input-error form__error"></p>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

