import UserForm from './UserForm.js';
import { Link } from 'react-router-dom';

function Register ({onRegister}) {

  return (
    <UserForm
      name="registration"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      hint={<>
        <span className='form__hint'>Уже зарегистрированы? </span>
        <Link to='/signin' className='form__link'>Войти</Link>
      </>}
      onSubmit={onRegister}
      />
  )
}

export default Register;