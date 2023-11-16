import { authApiSettings } from './settings.js';

class AuthApi {
  constructor ( {baseUrl, endpoints, headers} ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorizationEndpoint = this._baseUrl + endpoints.authorization;
    this._registrationEndpoint = this._baseUrl + endpoints.registration;
    this._validationEndpoint = this._baseUrl + endpoints.validation;
    this._logoutEndpoint = this._baseUrl + endpoints.logout;
  }

  register ({email, password}) {
    return fetch(
      this._registrationEndpoint,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email: email, password: password})
      })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      return Promise.reject(`Ошибка регистрации: ${response.status}`)
      })
  }

  authorize ({email, password}) {
    return fetch(
      this._authorizationEndpoint,
      {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({email: email, password: password})
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(`Ошибка авторизации: ${response.status}`)
      })
  }

  validate () {
    return fetch(
      this._validationEndpoint,
      {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          return response.json();
        }
        return Promise.reject(`Ошибка валидации токена: ${response.status}`)
      })
  }

  logout () {
    return fetch(
      this._validationEndpoint,
      {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(`Ошибка выхода: ${response.status}`)
      })
  }
}

const authApi = new AuthApi(authApiSettings);
export default authApi;