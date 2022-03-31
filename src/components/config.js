const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-field_invalid',
  errorClass: 'popup__input-error_active',
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '0ac3014f-1a26-45ea-9cc3-843822f1e2d8',
    'Content-Type': 'application/json',
  },
};

export { validationConfig, apiConfig };
