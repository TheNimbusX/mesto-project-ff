const createCard = (item, deleteFunc, likeFunc, handleImageClick) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardDelete.addEventListener("click", deleteFunc);
  cardLike.addEventListener("click", likeFunc);
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
};

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export { createCard, likeCard, deleteCard };
