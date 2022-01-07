
const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');
const closeButtonFotoToBig = popupFotoToBig.querySelector('.popup__close-button');
const popupFotoBig = popupFotoToBig.querySelector('.popup__image');

// открываем фото в большом окне по клику на него
function makeFotoToBig() {
  const url = this.getAttribute('src');
  const name = this.getAttribute('alt');

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);
  
  openPopup(popupFotoToBig);
}


// закываем полноэкранное фото по нажатию на "крестик"
closeButtonFotoToBig.addEventListener('click', function() {
  closePopup(popupFotoToBig);
  popupFotoName.textContent = '';
})

