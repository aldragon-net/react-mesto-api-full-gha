import { useForm } from '../hooks/useForm.js';

function UserForm ({name, title, buttonText, hint, onSubmit}) {

  const { values, handleChange, setValues } = useForm({email: '', password: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      values,
      () => {setValues({email: '', password: ''})}
    );
  }

  return (
    <form 
      className="form form_palette_black" 
      id={`${name}-form`} 
      name={`${name}-form`}
      onSubmit={handleSubmit}
    >
    <h2 className="form__heading form__heading_centered">{title}</h2>  
    <input 
        type="email"
        className="form__input form__input_palette_black"
        id="email-input"
        name="email"
        value={values.email || ''}
        onChange={handleChange}
        placeholder="Email"
        required />
      <p className="profile-email-input-error form__error"></p>
    <input 
        type="password"
        className="form__input form__input_palette_black"
        id="password-input"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
        placeholder="Пароль"
        minLength="6"
        required />
      <p className="profile-password-input-error form__error"></p>
    <button 
      className="form__submit form__submit_palette_black" 
      type="submit">
      {buttonText}
    </button>
    <p className='form__hint'>{hint}</p>
    </form>
  )
}

export default UserForm;