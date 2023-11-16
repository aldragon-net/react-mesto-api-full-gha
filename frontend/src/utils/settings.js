export const apiSettings = {
  baseUrl: 'https://api.aldragon.nomoredomainsmonster.ru',
  endpoints: {
    profile: '/users/me',
    cards: '/cards',
    avatar: '/users/me/avatar'
  },
  headers: {
    authorization: '5f40da40-c28b-4113-a248-5874131380d9',
    'Content-Type': 'application/json'
  }
}

export const authApiSettings = {
  baseUrl: 'https://api.aldragon.nomoredomainsmonster.ru',
  endpoints: {
    authorization: '/signin',
    registration: '/signup',
    logout: '/signout',
    validation: '/users/me'
  },
  headers: {
    'Content-Type': 'application/json'
  }
}
