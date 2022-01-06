
// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_open');
}

// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_open');
}


// кнопка закрыть попап
function searchCloseButton(popup) {
  return popup.querySelector('.popup__close-button');
}


// очищаем поля input от данных
function popupFeldsSetValueToNone(popup) {
  const popupInputFelds = popup.querySelectorAll('.popup__text-field');

  for(let i = 0; i < popupInputFelds.length; i++) {
    popupInputFelds[i].value = '';
  }
}

