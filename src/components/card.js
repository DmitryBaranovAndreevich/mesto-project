export { createCard, checkLikes };
import { makeFotoToBig, popupDeleteCard, spinner } from './index.js';
import { deleteCards, setLike, deleteLike } from './api.js';
import { closePopup, openPopup } from './modal.js';

const itemTarget = document.querySelector('#item-template').content;

const renderLoading = (isLoading, form) => {
  if (isLoading) {
    spinner.classList.add('spinner_visible');
    form.setAttribute('style', 'opacity: .4');
  } else {
    spinner.classList.remove('spinner_visible');
    form.setAttribute('style', 'opacity: 1');
  }
};

const setDeleteLike = (e) => {
  e.target.classList.toggle('item__like-button_active');
};

const deleteCard = (e) => {
  e.target.closest('.elements__element').remove();
};

const checkLikes = (arrLikes, owner) => {
  return arrLikes.some((data) => {
    return data.name === owner;
  });
};

// создаем новую карточку с фото
const createCard = (cardObjectFromServer) => {
  const newFotoItem = itemTarget
    .querySelector('.elements__element')
    .cloneNode(true);
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
    .addEventListener('click', function (e) {
      if (!e.target.classList.contains('item__like-button_active')) {
        setLike(cardObjectFromServer._id).then((card) => {
          setDeleteLike(e);
          newFotoItem.querySelector('.item__like-count').textContent =
            card.likes.length;
        });
      } else {
        deleteLike(cardObjectFromServer._id).then((card) => {
          setDeleteLike(e);
          newFotoItem.querySelector('.item__like-count').textContent =
            card.likes.length;
        });
      }
    });

  // удаление карточки
  newFotoItem
    .querySelector('.item__button-delete')
    .addEventListener('click', function (e) {
      openPopup(popupDeleteCard);
      popupDeleteCard.querySelector('.popup__form').onsubmit = function () {
        renderLoading(true, popupDeleteCard.querySelector('.popup__form'));
        deleteCards(cardObjectFromServer._id)
          .then(() => {
            deleteCard(e);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            closePopup(popupDeleteCard);
            renderLoading(false, popupDeleteCard.querySelector('.popup__form'));
          });
      };
    });

  // большое фото по клику на него
  newFotoItem
    .querySelector('.item__image')
    .addEventListener('click', makeFotoToBig);

  return newFotoItem;
};
