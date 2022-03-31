import { popupDeleteCard, spinner } from './index.js';
import { deleteCards, setLike, deleteLike } from './api.js';
import { closePopup, openPopup } from './modal.js';

const itemTarget = document.querySelector('#item-template').content;
const confirmationForm = document
  .querySelector('.popup_function_delete-card')
  .querySelector('.popup__form');
const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoBig = popupFotoToBig.querySelector('.popup__image');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');

const makeFotoToBig = (e) => {
  const url = e.target.getAttribute('src');
  const name = e.target.getAttribute('alt');
  popupFotoName.textContent = '';

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);

  openPopup(popupFotoToBig);
};

const renderLoading = (isLoading, form) => {
  if (isLoading) {
    spinner.classList.add('spinner_visible');
    form.setAttribute('style', 'opacity: .4');
  } else {
    spinner.classList.remove('spinner_visible');
    form.setAttribute('style', 'opacity: 1');
  }
};

const toggleLike = (e) => {
  e.target.classList.toggle('item__like-button_active');
};

const deleteCard = (e) => {
  e.target.closest('.elements__element').remove();
};

const checkLikes = (arrLikes, userId) => {
  return arrLikes.some((data) => {
    return data._id === userId;
  });
};

// создаем новую карточку с фото
const createCard = (cardObjectFromServer, userId) => {
  const newFotoItem = itemTarget
    .querySelector('.elements__element')
    .cloneNode(true);
  const cardImage = newFotoItem.querySelector('.item__image');
  const nameFoto = cardObjectFromServer.name;
  const likesCounter = newFotoItem.querySelector('.item__like-count');
  const buttonDelete = newFotoItem.querySelector('.item__button-delete');
  const likeButton = newFotoItem.querySelector('.item__like-button');

  if (cardObjectFromServer.owner._id !== userId) {
    buttonDelete.setAttribute('style', 'display : none');
  }

  if (checkLikes(cardObjectFromServer.likes, userId)) {
    likeButton.classList.add('item__like-button_active');
  }

  cardImage.setAttribute('src', cardObjectFromServer.link);
  cardImage.setAttribute('alt', nameFoto);
  newFotoItem.querySelector('.item__title').textContent = nameFoto;
  likesCounter.textContent = cardObjectFromServer.likes.length;

  // поставить или убрать лайк  для карточки с фото
  likeButton.addEventListener('click', function (e) {
    if (!e.target.classList.contains('item__like-button_active')) {
      setLike(cardObjectFromServer._id)
        .then((card) => {
          toggleLike(e);
          likesCounter.textContent = card.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      deleteLike(cardObjectFromServer._id)
        .then((card) => {
          toggleLike(e);
          likesCounter.textContent = card.likes.length;
        })
        .catch((err) => console.log(err));
    }
  });

  // удаление карточки
  buttonDelete.addEventListener('click', function (e) {
    openPopup(popupDeleteCard);
    confirmationForm.onsubmit = function (event) {
      event.preventDefault();
      renderLoading(true, confirmationForm);
      deleteCards(cardObjectFromServer._id)
        .then(() => {
          deleteCard(e);
          closePopup(popupDeleteCard);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          renderLoading(false, confirmationForm);
        });
    };
  });

  // большое фото по клику на него
  cardImage.addEventListener('click', makeFotoToBig);

  return newFotoItem;
};

export { createCard, checkLikes };
