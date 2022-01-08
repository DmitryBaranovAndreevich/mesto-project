const itemTarget = document.querySelector('#item-template').content;

// создаем новую карточку с фото
function createCard(nameFoto, linkFoto) {
const newFotoItem = itemTarget.querySelector('.elements__element').cloneNode(true);

newFotoItem.querySelector('.item__image').setAttribute('src', linkFoto);
newFotoItem.querySelector('.item__image').setAttribute('alt', nameFoto);
newFotoItem.querySelector('.item__title').textContent = nameFoto;

  // поставить или убрать лайк  для карточки с фото
  newFotoItem.querySelector('.item__like-button').addEventListener('click', function(e) {
    e.target.classList.toggle('item__like-button_active');
  });

  // удаление карточки
  newFotoItem.querySelector('.item__button-delete').addEventListener('click', function (e) {
    e.target.closest('.elements__element').remove();
  });

  // большое фото по клику на него
  newFotoItem.querySelector('.item__image').addEventListener('click', makeFotoToBig);

  return newFotoItem;
}



