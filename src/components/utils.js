import {validationConfig} from './index.js';
import {
  hideInputError,
  toggleButtonState,
} from './validate.js';

export {
  closePopupToClickOnOverlay,
  pushToEsc,
  hideErrors,
  openPopup,
  closePopup,
};

const body = document.querySelector('.body');
const popups = document.querySelectorAll('.popup');


const closePopupToClickOnOverlay = (e) => {
  if (e.target.classList.contains('popup')) {
     e.target.querySelector('.popup__close-button').click();
  }
}

const pushToEsc = (e) => {
  if(e.key === 'Escape') {
    [...popups].forEach(popup => {
      if(popup.classList.contains('popup_open')) {
       popup.querySelector('.popup__close-button').click();
      }
    });
  }
}

const hideErrors = (popup) => {
  const elementForm = popup.querySelector('.popup__form');
  if (elementForm) {
    const inputList = Array.from(popup.querySelectorAll('.popup__text-field'));
    inputList.forEach((inputElelment) => {
      hideInputError(elementForm, inputElelment, validationConfig);
    });
  }

}

const openPopup = (popup) => {
  popup.classList.add('popup_open');
  body.addEventListener('keydown', pushToEsc);
  body.addEventListener('mousedown', closePopupToClickOnOverlay);
}


const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  body.removeEventListener('keydown', pushToEsc);
  body.removeEventListener('mousedown', closePopupToClickOnOverlay);
  hideErrors(popup);
}

