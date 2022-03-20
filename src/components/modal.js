import { openPopup, closePopup } from './utils.js';
import { validationConfig, toggleButtonState } from './validate.js';
import {createCard } from './card.js';
import {cardsList} from './index.js';
export {
  openAddPopup,
  closeAddPopup,
  submitAddPopup,
  openEditPopup,
  submitEditPopup,
  closeEditPopup,
  userProfile,
  makeFotoToBig,
  closePopupFotoToBig,
};

const userProfile = document.querySelector('.profile');
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAddWindow = popupAdd.querySelector('.popup__close-button');
const addButton = userProfile.querySelector('.profile__button-add');
const formPopupAdd = popupAdd.querySelector(validationConfig.formSelector);
const feldNameFoto = formPopupAdd.elements.title;
const feldLinkFoto = formPopupAdd.elements.link;

const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEditWindow = popupEdit.querySelector('.popup__close-button');
const editButton = userProfile.querySelector('.profile__button-edit');
const formEditPopup = popupEdit.querySelector(validationConfig.formSelector);
const inputs = formEditPopup.querySelectorAll(validationConfig.inputSelector);
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector('.profile__user-profession');
const feldNameUser = formEditPopup.elements.user;
const feldProfessionUser = formEditPopup.elements.profession;


const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');
const closeButtonFotoToBig = popupFotoToBig.querySelector('.popup__close-button');
const popupFotoBig = popupFotoToBig.querySelector('.popup__image');


// открытие popap-add по нажатию на кнопку "добавить"
const openAddPopup = () => {
  addButton.addEventListener('click', function () {
    openPopup(popupAdd);
  });
}

// закрытие popap-add по нажатию на кнопку "крестик"
const closeAddPopup = () => {
  closeButtonAddWindow.addEventListener('click', function () {
    closePopup(popupAdd);
    feldLinkFoto.value = '';
    feldNameFoto.value = '';
  });
}

//добавляем новую карточку с фотографией
const submitAddPopup = () => {
  formPopupAdd.addEventListener('submit', function (e) {
    const linkFoto = feldLinkFoto.value;
    const nameFoto = feldNameFoto.value;
    const newCardFoto = createCard(nameFoto, linkFoto);

    e.preventDefault();

    cardsList.prepend(newCardFoto);

    formPopupAdd.reset();
    closePopup(popupAdd);
  });
}


// открытие popap-edit по нажатию на кнопку "редактировать"
const openEditPopup = () => {
  editButton.addEventListener('click', function () {
    openPopup(popupEdit);

    feldNameUser.value = profileName.textContent;
    feldProfessionUser.value = profileProfession.textContent;
    toggleButtonState(
      [...inputs],
      popupEdit.querySelector(validationConfig.submitButtonSelector)
    );
  });
};

const submitEditPopup = () => {
  formEditPopup.addEventListener('submit', function (e) {
    e.preventDefault();

    profileName.textContent = feldNameUser.value;
    profileProfession.textContent = feldProfessionUser.value;

    closePopup(popupEdit);
  });
};

// закрытие popap-edit по нажатию на кнопку "крестик"
const closeEditPopup = () => {
  closeButtonEditWindow.addEventListener('click', function () {
    closePopup(popupEdit);
  });
};


const makeFotoToBig = (e) => {
  const url = e.target.getAttribute('src');
  const name = e.target.getAttribute('alt');

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);

  openPopup(popupFotoToBig);
};

const closePopupFotoToBig = () => {
  closeButtonFotoToBig.addEventListener('click', function () {
    closePopup(popupFotoToBig);
    popupFotoName.textContent = '';
  });
};
