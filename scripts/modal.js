const body = document.querySelector('.body');
const popups = document.querySelectorAll('.popup');

body.addEventListener('click', (e) => {
  if(e.target.classList.contains('popup')) {
    e.target.querySelector('.popup__close-button').click();
  }
});


function pushToEsc(e) {
  if(e.key === 'Escape') {
    [...popups].forEach(popup => {
      if(popup.classList.contains('popup_open')) {
       popup.querySelector('.popup__close-button').click();
      }
    });
  }
}

function hideErrors(popup) {
  const elementForm = popup.querySelector(validationConfig.formSelector);
  if (elementForm) {
    const inputList = Array.from(
      popup.querySelectorAll(validationConfig.inputSelector)
    );
    inputList.forEach((inputElelment) => {
      hideInputError(elementForm, inputElelment);
    });
  }

}

function openPopup(popup) {
  popup.classList.add('popup_open');
  body.addEventListener('keydown', pushToEsc);
}


function closePopup(popup) {
  popup.classList.remove('popup_open');
  body.removeEventListener('keydown', pushToEsc);
  hideErrors(popup);
}
