export { createCard, checkLikes };
import { makeFotoToBig } from './index.js';
import { deleteCards, setLike, deleteLike } from './api.js';

const itemTarget = document.querySelector('#item-template').content;

const setDeleteLike = (e) => {
  e.target.classList.toggle('item__like-button_active');
};

const deleteCard = (e) => {
  e.target.closest('.elements__element').remove();
}

const checkLikes = (arrLikes,owner) => {
  return arrLikes.some(data => {
    return data.name === owner
  })
}

// создаем новую карточку с фото
const createCard = (cardObjectFromServer) => {
const newFotoItem = itemTarget.querySelector('.elements__element').cloneNode(true);
const cardImage = newFotoItem.querySelector('.item__image');
const nameFoto = cardObjectFromServer.name;


cardImage.setAttribute('src', cardObjectFromServer.link);
cardImage.setAttribute('alt', nameFoto);
newFotoItem.querySelector('.item__title').textContent = nameFoto;
newFotoItem.querySelector('.item__like-count').textContent =
  cardObjectFromServer.likes.length;

  // поставить или убрать лайк  для карточки с фото
  newFotoItem
    .querySelector('.item__like-button')
    .addEventListener('click', function(e) {
      if (!e.target.classList.contains('item__like-button_active')){
        setLike(cardObjectFromServer._id)
        .then(card => {
          setDeleteLike(e);
          newFotoItem.querySelector('.item__like-count').textContent =
            card.likes.length;
        });
      } else {
        deleteLike(cardObjectFromServer._id)
        .then((card) => {
          setDeleteLike(e);
          newFotoItem.querySelector('.item__like-count').textContent =
            card.likes.length;
        });
      }
    });

  // удаление карточки
  newFotoItem.querySelector('.item__button-delete').addEventListener('click', function(e) {
    deleteCards(cardObjectFromServer._id)
    .then(() => {
      deleteCard(e);
    })
    .catch(err => console.log(err));
  })

  // большое фото по клику на него
  newFotoItem.querySelector('.item__image').addEventListener('click', makeFotoToBig);

  return newFotoItem;
}



