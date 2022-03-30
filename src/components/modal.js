export { closePopupToClickOnOverlay, pushToEsc, openPopup, closePopup };

const body = document.querySelector('.body');

const closePopupToClickOnOverlay = (e) => {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
};

const pushToEsc = (e) => {
  if (e.key === 'Escape') {
    const opendPopup = document.querySelector('.popup_open');
    closePopup(opendPopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_open');
  body.addEventListener('keydown', pushToEsc);
  body.addEventListener('mousedown', closePopupToClickOnOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  body.removeEventListener('keydown', pushToEsc);
  body.removeEventListener('mousedown', closePopupToClickOnOverlay);
};
