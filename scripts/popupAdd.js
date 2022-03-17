
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAddWindow = popupAdd.querySelector('.popup__close-button');
const addButton = userProfile.querySelector('.profile__button-add');
const formPopupAdd = popupAdd.querySelector(validationConfig.formSelector);
const feldNameFoto = formPopupAdd.elements.title;
const feldLinkFoto = formPopupAdd.elements.link;

// открытие popap-add по нажатию на кнопку "добавить"
addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

// закрытие popap-add по нажатию на кнопку "крестик"
closeButtonAddWindow.addEventListener('click', function() {
  closePopup(popupAdd);
  feldLinkFoto.value = '';
  feldNameFoto.value = '';
});

//добавляем новую карточку с фотографией
formPopupAdd.addEventListener('submit', function(e) {
  const linkFoto = feldLinkFoto.value;
  const nameFoto = feldNameFoto.value;
  const newCardFoto = createCard(nameFoto, linkFoto);

  e.preventDefault();

  cardsList.prepend(newCardFoto);

  formPopupAdd.reset();
  closePopup(popupAdd);
});

