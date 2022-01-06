
// добавляем новое фото в проект
function addNewFotoItem(name, url) {
  const elementsList = document.querySelector('.elements__list');
  const newFotoItem = createNewFoto();

  newFotoItem.querySelector('.item__image').setAttribute('src', url);
  newFotoItem.querySelector('.item__image').setAttribute('alt', name);
  newFotoItem.querySelector('.item__title').textContent = name;

  elementsList.prepend(newFotoItem);

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
}


// создаем новую карточку для добавления фото
function createNewFoto() {
  const itemTarget = document.querySelector('#item-template').content;
  const newFotoItem = itemTarget.querySelector('.elements__element').cloneNode(true);
  return newFotoItem;
}

