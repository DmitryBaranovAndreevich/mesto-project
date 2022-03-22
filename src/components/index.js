import '../pages/index.css';
import { validationConfig } from './config.js';
import { openPopup, closePopup} from './modal.js';
import { enableValidation, toggleButtonState, hideErrors } from './validate.js';
import { createCard } from './card.js';
export { makeFotoToBig };
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const cardsList = document.querySelector('.elements__list');
const userProfile = document.querySelector('.profile');
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAddWindow = popupAdd.querySelector('.popup__close-button');
const addButton = userProfile.querySelector('.profile__button-add');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const feldNameFoto = formPopupAdd.elements.title;
const feldLinkFoto = formPopupAdd.elements.link;

const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEditWindow = popupEdit.querySelector('.popup__close-button');
const editButton = userProfile.querySelector('.profile__button-edit');
const formEditPopup = popupEdit.querySelector('.popup__form');
const inputs = formEditPopup.querySelectorAll('.popup__text-field');
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector(
  '.profile__user-profession'
);
const feldNameUser = formEditPopup.elements.user;
const feldProfessionUser = formEditPopup.elements.profession;

const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoBig = popupFotoToBig.querySelector('.popup__image');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');
const closeButtonFotoToBig = popupFotoToBig.querySelector(
  '.popup__close-button'
);

const makeFotoToBig = (e) => {
  const url = e.target.getAttribute('src');
  const name = e.target.getAttribute('alt');
  popupFotoName.textContent = '';

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);

  openPopup(popupFotoToBig);
};


initialCards.forEach((item) => {
  const newCardFoto = createCard(item.name, item.link);
  cardsList.prepend(newCardFoto);
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

// закрытие popap-add по нажатию на кнопку "крестик"
  closeButtonAddWindow.addEventListener('click', function () {
    closePopup(popupAdd);
  });

//добавляем новую карточку с фотографией
  formPopupAdd.addEventListener('submit', function (e) {
    const linkFoto = feldLinkFoto.value;
    const nameFoto = feldNameFoto.value;
    const newCardFoto = createCard(nameFoto, linkFoto);

    e.preventDefault();

    cardsList.prepend(newCardFoto);

    formPopupAdd.reset();
    closePopup(popupAdd);
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

    profileName.textContent = feldNameUser.value;
    profileProfession.textContent = feldProfessionUser.value;

    closePopup(popupEdit);
  });

// закрытие popap-edit по нажатию на кнопку "крестик"
  closeButtonEditWindow.addEventListener('click', function () {
    closePopup(popupEdit);
  });


  closeButtonFotoToBig.addEventListener('click', function () {
    closePopup(popupFotoToBig);
    popupFotoName.textContent = '';
  });

enableValidation(validationConfig);


