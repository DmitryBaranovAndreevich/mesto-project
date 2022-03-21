import '../pages/index.css';
export { cardsList, validationConfig };
import { enableValidation } from './validate.js';
import {
  openAddPopup,
  closeAddPopup,
  submitAddPopup,
  openEditPopup,
  submitEditPopup,
  closeEditPopup,
  closePopupFotoToBig,
} from './modal.js';
import { createCard } from './card.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-field_invalid',
  errorClass: 'popup__input-error_active',
};

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

initialCards.forEach((item) => {
  const newCardFoto = createCard(item.name, item.link);
  cardsList.prepend(newCardFoto);
});

enableValidation(validationConfig);

openEditPopup();
submitEditPopup();
closeEditPopup();

openAddPopup();
closeAddPopup();
submitAddPopup();

closePopupFotoToBig();
