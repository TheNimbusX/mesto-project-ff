import { cardTemplate } from "./index";
import { placeLink, placeName } from "./index";

const createCard = (item, deleteFunc, likeFunc, handleImageClick) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  if (item.link == undefined) {
    cardImage.src = placeLink.value;
  }
  cardImage.alt = item.name;
  if (item.name == undefined) {
    cardImage.alt = placeName.value;
  }
  cardTitle.textContent = item.name;
  if (item.name == undefined) {
    cardTitle.textContent = placeName.value;
  }

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
