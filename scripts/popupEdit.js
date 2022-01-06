
const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEditWindow = searchCloseButton(popupEdit);
const userProfile = document.querySelector('.profile');
const editButton = userProfile.querySelector('.profile__button-edit');
const saveButton = popupEdit.querySelector('.popup__submit-button');
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector('.profile__user-profession');

// открытие popap-edit по нажатию на кнопку "редактировать"
editButton.addEventListener('click', function(){

  let popupInputFelds = popupEdit.querySelectorAll('.popup__text-field');

  openPopup(popupEdit);

  popupInputFelds[0].value = profileName.textContent;
  popupInputFelds[1].value = profileProfession.textContent;
});

saveButton.addEventListener('click', function(e) {
  e.preventDefault();
  let popupInputFelds = popupEdit.querySelectorAll('.popup__text-field');
  profileName.textContent = popupInputFelds[0].value;
  profileProfession.textContent = popupInputFelds[1].value;
  closePopup(popupEdit);
})

// закрытие popap-edit по нажатию на кнопку "крестик"
closeButtonEditWindow.addEventListener('click', function() {
  closePopup(popupEdit)
});

