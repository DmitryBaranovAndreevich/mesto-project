import '../pages/index.css';
import { validationConfig } from './config.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, toggleButtonState, hideErrors } from './validate.js';
import { createCard } from './card.js';
import {
  getUserInfo,
  getCards,
  editProfile,
  addCard,
  editAvatar,
} from './api.js';

const popupDeleteCard = document.querySelector('.popup_function_delete-card');
const spinner = popupDeleteCard.querySelector('.spinner');

const cardsList = document.querySelector('.elements__list');
const userProfile = document.querySelector('.profile');
const avatarContainer = userProfile.querySelector('.profile__image-container');
const avatar = userProfile.querySelector('.profile__image');

const popupAdd = document.querySelector('.popup_function_add');
const addButton = userProfile.querySelector('.profile__button-add');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const feldNameFoto = formPopupAdd.elements.title;
const feldLinkFoto = formPopupAdd.elements.link;
const submitButtonPopupAdd = formPopupAdd.querySelector(
  '.popup__submit-button'
);

const popupEditAvatar = document.querySelector('.popup_function_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const avatarUrl = formEditAvatar.elements.avatar;
const submitButtonEditAvatar = formEditAvatar.querySelector(
  '.popup__submit-button'
);

const popupEdit = document.querySelector('.popup_function_edit');
const editButton = userProfile.querySelector('.profile__button-edit');
const formEditPopup = popupEdit.querySelector('.popup__form');
const inputs = formEditPopup.querySelectorAll('.popup__text-field');
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector(
  '.profile__user-profession'
);
const feldNameUser = formEditPopup.elements.user;
const feldProfessionUser = formEditPopup.elements.profession;
const submitButtonEditPopup = formEditPopup.querySelector(
  '.popup__submit-button'
);
const popups = document.querySelectorAll('.popup');

let userId;

getUserInfo()
  .then((user) => {
    userId = user._id;
    avatar.src = user.avatar;
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
    return getCards();
  })
  .then((cards) => {
    cards.forEach((item) => {
      const newCardFoto = createCard(item, userId);
      cardsList.prepend(newCardFoto);
    });
  })
  .catch((err) => console.log(err));

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_open')) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

// открытие popupEditAvatar по нажатию на кнопку фото пользователя
avatarContainer.addEventListener('click', function () {
  avatarUrl.value = '';
  hideErrors(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
  toggleButtonState(
    Array.from(popupEditAvatar.querySelectorAll('.popup__text-field')),
    popupEditAvatar.querySelector('.popup__submit-button'),
    validationConfig
  );
});

// смена аватара на странице
formEditAvatar.addEventListener('submit', function (e) {
  e.preventDefault();
  submitButtonEditAvatar.textContent += '...';
  editAvatar({ avatar: avatarUrl.value })
    .then((url) => {
      avatar.src = url.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButtonEditAvatar.textContent = 'Сохранить';
    });
});

// открытие popap-add по нажатию на кнопку "добавить"
addButton.addEventListener('click', function () {
  feldLinkFoto.value = '';
  feldNameFoto.value = '';
  hideErrors(popupAdd, validationConfig);
  openPopup(popupAdd);
  toggleButtonState(
    Array.from(popupAdd.querySelectorAll('.popup__text-field')),
    popupAdd.querySelector('.popup__submit-button'),
    validationConfig
  );
});

//добавляем новую карточку с фотографией
formPopupAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  submitButtonPopupAdd.textContent += '...';
  addCard({ name: feldNameFoto.value, link: feldLinkFoto.value })
    .then((card) => {
      const newCardFoto = createCard(card, userId);
      cardsList.prepend(newCardFoto);
      closePopup(popupAdd);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButtonPopupAdd.textContent = 'Создать';
    });
});

// открытие popap-edit по нажатию на кнопку "редактировать"
editButton.addEventListener('click', function () {
  hideErrors(popupEdit, validationConfig);
  openPopup(popupEdit);

  feldNameUser.value = profileName.textContent;
  feldProfessionUser.value = profileProfession.textContent;
  toggleButtonState(
    [...inputs],
    popupEdit.querySelector('.popup__submit-button'),
    validationConfig
  );
});

formEditPopup.addEventListener('submit', function (e) {
  e.preventDefault();
  submitButtonEditPopup.textContent += '...';
  editProfile({ name: feldNameUser.value, about: feldProfessionUser.value })
    .then((user) => {
      profileName.textContent = user.name;
      profileProfession.textContent = user.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButtonEditPopup.textContent = 'Сохранить';
    });
});

enableValidation(validationConfig);

export { popupDeleteCard, spinner };
