const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let userProfile = document.querySelector('.profile');
let editButton = userProfile.querySelector('.profile__button-edit');
let addButton = userProfile.querySelector('.profile__button-add');

let elements = document.querySelector('.elements');
let elementsList = elements.querySelector('.elements__list');
let likeButton = elements.querySelectorAll('.item__like-button');
let deleteButton = elements.querySelector('.item__button-delete');

let popupWindow = document.querySelectorAll('.popup');

let popupEdit = searchPopapEdit();
let closeButtonEditWindow = popupEdit.querySelector('.popup__close-button');

let popupAdd = searchPopapAdd();
let closeButtonAddWindow = popupAdd.querySelector('.popup__close-button');
let createButton = popupAdd.querySelector('.popup__submit-button');

let popupFotoToBig = searchPopapFotoToBig();
let closeButtonFotoToBig = popupFotoToBig.querySelector('.popup__close-button');
let popupFotoName = popupFotoToBig.querySelector('.popup__image-name');

function searchPopapEdit() {
  for(i = 0; i < popupWindow.length; i++){
    if(popupWindow[i].classList.contains('popup_function_edit')) {
        return popupWindow[i];
    }
  }
}

function searchPopapAdd() {
  for(i = 0; i < popupWindow.length; i++){
    if(popupWindow[i].classList.contains('popup_function_add')) {
        return popupWindow[i];
    }
  }
}

function searchPopapFotoToBig() {
  for(i = 0; i < popupWindow.length; i++){
    if(popupWindow[i].classList.contains('popup_function_image-to-big')) {
        return popupWindow[i];
    }
  }
}

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function addNewFoto(name, url) {
  elementsList.insertAdjacentHTML('afterbegin', `
    <li class="elements__element">
      <article class="item">
        <div class="item__overlay">
          <button class="item__button-delete"></button>
          <img src="${url}" alt="${name}" class="item__image">
        </div>
        <div class="item__image-title">
          <h3 class="item__title">${name}</h3>
          <button class="item__like-button" type="button"></button>
        </div>
      </article>
    </li>`);

  let likeButton = elements.querySelector('.item__like-button');
  let cardFoto = elements.querySelector('.item__image');
  let deleteButton = elements.querySelector('.item__button-delete');
  let listCards = elements.querySelector('.elements__element');

  cardFoto.addEventListener('click', makeFotoToBig);
  likeButton.addEventListener('click', setLikeToActive);
  deleteButton.addEventListener('click', function () {
    listCards.remove();
  });
}

function popupFeldsSetValueToNone(popup) {
  let popupInputFelds = popup.querySelectorAll('.popup__text-field');

  for(let i = 0; i < popupInputFelds.length; i++) {
    popupInputFelds[i].value = '';
  }
}

function setLikeToActive() {
  if(this.classList.contains('item__like-button_active')) {
    this.classList.remove('item__like-button_active');
  }
  else {
    this.classList.add('item__like-button_active');
  }
}

function makeFotoToBig() {
  let url = this.getAttribute('src');
  let name = this.getAttribute('alt');

  let popupFotoBig = popupFotoToBig.querySelector('.popup__image');

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);
  popupFotoToBig.classList.add('popup_open');
}



// загружаем 6 карточек
for(let i = 0; i < initialCards.length; i++) {
  addNewFoto(initialCards[i].name, initialCards[i].link);
}

// открытие popap-edit по нажатию на кнопку "редактировать"
editButton.addEventListener('click', function(){
  let profileName = userProfile.querySelector('.profile__user-name');
  let profileProfession = userProfile.querySelector('.profile__user-profession');
  let popupInputFelds = popupEdit.querySelectorAll('.popup__text-field');

  openPopup(popupEdit);

  popupInputFelds[0].value = profileName.textContent;
  popupInputFelds[1].value = profileProfession.textContent;
});


// закрытие popap-edit по нажатию на кнопку "крестик"
closeButtonEditWindow.addEventListener('click', function() {
  closePopup(popupEdit)
});

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
  let popupInputFelds = popupAdd.querySelectorAll('.popup__text-field_popup-add');
  let name = popupInputFelds[0].value;
  let url = popupInputFelds[1].value;

  addNewFoto(name, url);
  closePopup(popupAdd);
  popupFeldsSetValueToNone(popupAdd);
});

// по клику на фото оно становится большим
let cardFoto = elements.querySelectorAll('.item__image');
for(let i = 0; i < cardFoto.length; i++) {
  cardFoto[i].addEventListener('click', makeFotoToBig);
}

// закываем полноэкранное фото по нажатию на "крестик"
closeButtonFotoToBig.addEventListener('click', function() {
  popupFotoToBig.classList.remove('popup_open');
  popupFotoName.textContent = '';
})



// ставим лайк
for(let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', setLikeToActive);
}


let listCards = elements.querySelectorAll('.elements__element');
for(let i = 0; i < listCards.length; i++) {
  let deleteButton = listCards[i].querySelector('.item__button-delete');
  deleteButton.addEventListener('click', function () {
    listCards[i].remove();
  });
}
