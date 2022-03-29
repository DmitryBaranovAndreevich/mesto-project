import {apiConfig} from './config.js';
export {
  getUserInfo,
  getCards,
  editProfile,
  addCard,
  deleteCards,
  setLike,
  deleteLike,
};


const getUserInfo = () => {
  return fetch(apiConfig.user ,{
    headers: apiConfig.headers
  })
  .then( res => {
    if(res.ok) {
     return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
    });
}

const getCards = () => {
  return fetch(apiConfig.cards, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const editProfile = (data) => {
  return fetch(apiConfig.user, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const addCard = (data) => {
  return fetch(apiConfig.cards, {
    method : 'POST',
    headers : apiConfig.headers,
    body : JSON.stringify(data)
  }).then(res => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const deleteCards = (idCard) => {
  return fetch(`${apiConfig.cards}/${idCard}`, {
    method : 'DELETE',
    headers : apiConfig.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const setLike = (idCard) => {
  return fetch(`${apiConfig.cards}/likes/${idCard}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const deleteLike = (idCard) => {
  return fetch(`${apiConfig.cards}/likes/${idCard}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
