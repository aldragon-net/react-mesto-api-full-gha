import UserForm from './UserForm.js';

function Login ({onLogin}) {

  return (
    <UserForm
      name="authorization"
      title="Вход"
      buttonText="Войти"
      hint=''
      onSubmit={onLogin}
      />
  )
}

export default Login;