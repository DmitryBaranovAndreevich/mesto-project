
const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEditWindow = popupEdit.querySelector('.popup__close-button');
const userProfile = document.querySelector('.profile');
const editButton = userProfile.querySelector('.profile__button-edit');
const formEditPopup = popupEdit.querySelector(validationConfig.formSelector);
const inputs = formEditPopup.querySelectorAll(validationConfig.inputSelector);
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector('.profile__user-profession');
const feldNameUser = formEditPopup.elements.user;
const feldProfessionUser = formEditPopup.elements.profession;

// открытие popap-edit по нажатию на кнопку "редактировать"
editButton.addEventListener('click', function(){

  openPopup(popupEdit);

  feldNameUser.value = profileName.textContent;
  feldProfessionUser.value = profileProfession.textContent;
  toggleButtonState([...inputs],popupEdit.querySelector(validationConfig.submitButtonSelector));
});

formEditPopup.addEventListener('submit', function(e) {
  e.preventDefault();

  profileName.textContent = feldNameUser.value;
  profileProfession.textContent = feldProfessionUser.value;

  closePopup(popupEdit);
})

// закрытие popap-edit по нажатию на кнопку "крестик"
closeButtonEditWindow.addEventListener('click', function() {
  closePopup(popupEdit);
});

