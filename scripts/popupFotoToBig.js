
const popupFotoToBig = document.querySelector('.popup_function_image-to-big');
const popupFotoName = popupFotoToBig.querySelector('.popup__image-name');
const closeButtonFotoToBig = searchCloseButton(popupFotoToBig);

// открываем фото в большом окне по клику на него
function makeFotoToBig() {
  const url = this.getAttribute('src');
  const name = this.getAttribute('alt');

  const popupFotoBig = popupFotoToBig.querySelector('.popup__image');

  popupFotoBig.setAttribute('src', url);
  popupFotoBig.setAttribute('alt', name);
  popupFotoName.insertAdjacentText('afterbegin', name);
  popupFotoToBig.classList.add('popup_open');
}


// закываем полноэкранное фото по нажатию на "крестик"
closeButtonFotoToBig.addEventListener('click', function() {
  popupFotoToBig.classList.remove('popup_open');
  popupFotoName.textContent = '';
})

