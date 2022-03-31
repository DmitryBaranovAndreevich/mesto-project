import { apiConfig } from './config.js';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const editProfile = (data) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
};

const addCard = (data) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
};

const deleteCards = (idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const setLike = (idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const deleteLike = (idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const editAvatar = (data) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export {
  getUserInfo,
  getCards,
  editProfile,
  addCard,
  deleteCards,
  setLike,
  deleteLike,
  editAvatar,
};
