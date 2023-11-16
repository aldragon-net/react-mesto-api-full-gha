import { apiSettings } from './settings.js';

class Api {
  constructor ( {baseUrl, endpoints, headers} ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._profileEndpoint = this._baseUrl + endpoints.profile;
    this._cardsEndpoint = this._baseUrl + endpoints.cards;
    this._avatarEndpoint = this._baseUrl + endpoints.avatar;
  }

  _getResponseOrError (endpoint, options) {
    const optionsWithCredentials = { ...options, credentials: 'include' }
    return fetch(endpoint, optionsWithCredentials)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка запроса: ${res.status}`)
      })
  }

  getProfileInfo () {
    return this._getResponseOrError(
      this._profileEndpoint,
      {
        method: 'GET',
        headers: {authorization: this._headers.authorization}
      }
    )
  }

  updateProfileInfo ( {name, about }) {
    return this._getResponseOrError(
      this._profileEndpoint,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name: name, about: about})
      }
    )
  }

  changeAvatar ( {link} ) {
    return this._getResponseOrError(
      this._avatarEndpoint,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar: link})
      }
    )
  }

  getInitialCards() {
    return this._getResponseOrError(
      this._cardsEndpoint,
      {
        method: 'GET',
        headers: {authorization: this._headers.authorization}
      }
    )
  }

  createCard ( {name, link} ) {
    return this._getResponseOrError(
      this._cardsEndpoint,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({name: name, link: link})
      }
    )
  }

  deleteCard (card_id) {
    return this._getResponseOrError(
      this._cardsEndpoint + `/${card_id}`,
      {
        method: 'DELETE',
        headers: {authorization: this._headers.authorization}
      }
    )
  }

  likeCard (card_id) {
    return this._getResponseOrError(
      this._cardsEndpoint + `/${card_id}/likes`,
      {
        method: 'PUT',
        headers: {authorization: this._headers.authorization}
      }
    )
  }

  unlikeCard (card_id) {
    return this._getResponseOrError(
      this._cardsEndpoint + `/${card_id}/likes`,
      {
        method: 'DELETE',
        headers: {authorization: this._headers.authorization}
      }
    )
  }
}

const api = new Api(apiSettings);
export default api;
