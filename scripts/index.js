const cardTemplate = document.querySelector("#card-template").content;
const cardContent = document.querySelector(".places__list");

function renderCards() {
  initialCards.forEach(function (item) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__title").textContent = item.name;
    cardElement.querySelector(".card__image").src = item.link;

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", deleteCard);

    return cardContent.append(cardElement);
  });
}

const deleteCard = (evt) => {
  const card = evt.target.closest(".places__item");
  card.remove();
};

renderCards();
