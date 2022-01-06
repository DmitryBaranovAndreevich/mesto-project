
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAddWindow = searchCloseButton(popupAdd);
const createButton = popupAdd.querySelector('.popup__submit-button');
const addButton = userProfile.querySelector('.profile__button-add');

// открытие popap-add по нажатию на кнопку "добавить"
addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

// закрытие popap-add по нажатию на кнопку "крестик"
closeButtonAddWindow.addEventListener('click', function() {
  closePopup(popupAdd);
  popupFeldsSetValueToNone(popupAdd);
});

//добавляем новую карточку с фотографией
createButton.addEventListener('click', function(e) {
  e.preventDefault();
  const popupInputFelds = popupAdd.querySelectorAll('.popup__text-field_popup-add');
  const name = popupInputFelds[0].value;
  const url = popupInputFelds[1].value;

  if(url && name) {
  addNewFotoItem(name, url);
  closePopup(popupAdd);
  popupFeldsSetValueToNone(popupAdd);
  } else {closePopup(popupAdd);}
});

