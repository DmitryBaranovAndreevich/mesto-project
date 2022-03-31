const body = document.querySelector('.body');

const pushToEsc = (e) => {
  if (e.key === 'Escape') {
    const opendPopup = document.querySelector('.popup_open');
    closePopup(opendPopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_open');
  body.addEventListener('keydown', pushToEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  body.removeEventListener('keydown', pushToEsc);
};

export { pushToEsc, openPopup, closePopup };
