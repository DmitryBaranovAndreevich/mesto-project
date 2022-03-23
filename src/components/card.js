export { createCard };
import { makeFotoToBig } from './index.js';

const itemTarget = document.querySelector('#item-template').content;

const setDeleteLike = (e) => {
  e.target.classList.toggle('item__like-button_active');
};

const deleteCard = (e) => {
  e.target.closest('.elements__element').remove();
}

// создаем новую карточку с фото
const createCard = (nameFoto, linkFoto) => {
const newFotoItem = itemTarget.querySelector('.elements__element').cloneNode(true);
const cardImage = newFotoItem.querySelector('.item__image');

cardImage.setAttribute('src', linkFoto);
cardImage.setAttribute('alt', nameFoto);
newFotoItem.querySelector('.item__title').textContent = nameFoto;

  // поставить или убрать лайк  для карточки с фото
  newFotoItem
    .querySelector('.item__like-button')
    .addEventListener('click', setDeleteLike);

  // удаление карточки
  newFotoItem.querySelector('.item__button-delete').addEventListener('click', deleteCard);

  // большое фото по клику на него
  newFotoItem.querySelector('.item__image').addEventListener('click', makeFotoToBig);

  return newFotoItem;
}



