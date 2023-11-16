import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm.js';

function AddPlacePopup ({isOpen, onAddPlace, isUpdating, onClose}) {
  
  const { values, handleChange, setValues } = useForm({name: '', link: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(
      values,
      () => {
        setValues({name: '', link: ''});
    });
  }

  return ( 
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText={isUpdating ? "Создаётся…" : "Создать"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    > 
    <input 
      type="text"
      className="form__input"
      id="place-name-input"
      name="name"
      value={values.name || ''}
      onChange={handleChange}
      placeholder="Название" 
      minLength="2" 
      maxLength="30"
      required />
    <p className="place-name-input-error form__error"></p>
      <input 
        type="url"
        className="form__input"
        id="place-link-input"
        name="link"
        value={values.link || ''}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required />
      <p className="place-link-input-error form__error"></p>
    </PopupWithForm>
  )
}

export default AddPlacePopup;