import '../pages/index.css';
import { validationConfig, apiConfig } from './config.js';
import { openPopup, closePopup} from './modal.js';
import { enableValidation, toggleButtonState, hideErrors } from './validate.js';
import { createCard, checkLikes } from './card.js';
import { getUserInfo, getCards, editProfile, addCard } from './api.js';
export { makeFotoToBig };


const cardsList = document.querySelector('.elements__list');
const userProfile = document.querySelector('.profile');
const avatarContainer = userProfile.querySelector('.profile__image-container');
const avatar = userProfile.querySelector('.profile__image');
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAddWindow = popupAdd.querySelector('.popup__close-button');
const addButton = userProfile.querySelector('.profile__button-add');
const formPopupAdd = popupAdd.querySelector('.popup__form');
const feldNameFoto = formPopupAdd.elements.title;
const feldLinkFoto = formPopupAdd.elements.link;

const popupEditAvatar = document.querySelector('.popup_function_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const closeButtonEditAvatar = popupEditAvatar.querySelector('.popup__close-button');
const avatarUrl = formEditAvatar.elements.avatar;

const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEditWindow = popupEdit.querySelector('.popup__close-button');
const editButton = userProfile.querySelector('.profile__button-edit');
const formEditPopup = popupEdit.querySelector('.popup__form');
const inputs = formEditPopup.querySelectorAll('.popup__text-field');
const profileName = userProfile.querySelector('.profile__user-name');
const profileProfession = userProfile.querySelector(
  '.profile__user-profession'
);
const feldNameUser = formEditPopup.elements.user;
const feldProfessionUser = formEditPopup.elements.profession;

const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoBig = popupFotoToBig.querySelector('.popup__image');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');
const closeButtonFotoToBig = popupFotoToBig.querySelector(
  '.popup__close-button'
);

getCards()
  .then((cards) => {
    cards.forEach((item) => {
      const newCardFoto = createCard(item);
      if (item.owner.name !== profileName.textContent) {
        newCardFoto
          .querySelector('.item__button-delete')
          .setAttribute('style', 'display : none');
      }

      if (checkLikes(item.likes, profileName.textContent)) {
        newCardFoto
          .querySelector('.item__like-button')
          .classList.add('item__like-button_active');
      }
      cardsList.prepend(newCardFoto);
    });
  })
  .catch((err) => console.log(err));

getUserInfo()
  .then((user) => {
    avatar.src = user.avatar;
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
  })
  .catch((err) => console.log(err));


const makeFotoToBig = (e) => {
  const url = e.target.getAttribute('src');
  const name = e.target.getAttribute('alt');
  popupFotoName.textContent = '';

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);

  openPopup(popupFotoToBig);
};

avatarContainer.addEventListener('click' , function() {
  avatarUrl.value = '';
  hideErrors(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
  toggleButtonState(
    Array.from(popupEditAvatar.querySelectorAll('.popup__text-field')),
    popupEditAvatar.querySelector('.popup__submit-button'),
    validationConfig
  );
});

closeButtonEditAvatar.addEventListener('click', function() {
  closePopup(popupEditAvatar);
})


// открытие popap-add по нажатию на кнопку "добавить"
  addButton.addEventListener('click', function () {
    feldLinkFoto.value = '';
    feldNameFoto.value = '';
    hideErrors(popupAdd, validationConfig);
    openPopup(popupAdd);
    toggleButtonState(
      Array.from(popupAdd.querySelectorAll('.popup__text-field')),
      popupAdd.querySelector('.popup__submit-button'),
      validationConfig
    );
  });

// закрытие popap-add по нажатию на кнопку "крестик"
  closeButtonAddWindow.addEventListener('click', function () {
    closePopup(popupAdd);
  });

//добавляем новую карточку с фотографией
  formPopupAdd.addEventListener('submit', function (e) {
    e.preventDefault();

    addCard({ name: feldNameFoto.value, link: feldLinkFoto.value })
    .then(card => {
      const newCardFoto = createCard(card);
      cardsList.prepend(newCardFoto);
    })
    .catch(err => console.log(err));

    formPopupAdd.reset();
    closePopup(popupAdd);
  });

// открытие popap-edit по нажатию на кнопку "редактировать"
  editButton.addEventListener('click', function () {
    hideErrors(popupEdit, validationConfig);
    openPopup(popupEdit);

    feldNameUser.value = profileName.textContent;
    feldProfessionUser.value = profileProfession.textContent;
    toggleButtonState(
      [...inputs],
      popupEdit.querySelector('.popup__submit-button'),
      validationConfig
    );
  });


  formEditPopup.addEventListener('submit', function (e) {
    e.preventDefault();

    editProfile({ name: feldNameUser.value, about: feldProfessionUser.value })
      .then((user) => {
        profileName.textContent = user.name;
        profileProfession.textContent = user.about;
      })
      .catch((err) => {
        console.log(err);
      });

    closePopup(popupEdit);
  });

// закрытие popap-edit по нажатию на кнопку "крестик"
  closeButtonEditWindow.addEventListener('click', function () {
    closePopup(popupEdit);
  });


  closeButtonFotoToBig.addEventListener('click', function () {
    closePopup(popupFotoToBig);
    popupFotoName.textContent = '';
  });

enableValidation(validationConfig);



