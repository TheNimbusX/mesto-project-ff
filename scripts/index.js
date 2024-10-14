// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardContent = document.querySelector(".places__list");

// @todo: Функция создания карточки
function renderCards() {
  initialCards.forEach(function (item) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__title").textContent = item.name;
    cardElement.querySelector(".card__image").src = item.link;

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", function () {
      const cards = document.querySelectorAll(".card");
      cards[0].remove();
    });

    return cardContent.append(cardElement);
  });
}

// @todo: Функция удаления карточки
function deleteCard() {}
// @todo: Вывести карточки на страницу
renderCards();
