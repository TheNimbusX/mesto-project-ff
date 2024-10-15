const container = document.querySelector(".content");
const cardTemplate = document.querySelector("#card-template").content;
const cardsContent = container.querySelector(".places__list");

const addCard = (item, deleteFunc) => {
  const cardElement = createCard(item, deleteFunc);
  cardsContent.append(cardElement);
};

const createCard = (item, deleteFunc) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunc);
  return cardElement;
};

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

initialCards.forEach((item) => addCard(item, deleteCard));
