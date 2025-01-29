import { deleteMyCard, putLike, deleteLike } from "./api";

const createCard = (item, deleteFunc, likeFunc, handleImageClick, idUser) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardCountLikes = cardElement.querySelector(".card__like-counter");
  const cardLikeWrapper = cardElement.querySelector(".card__like");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardCountLikes.textContent = item.likes.length;

  // cardLike.addEventListener("click", likeFunc);
  cardImage.addEventListener("click", handleImageClick);

  if (item.owner._id === idUser) {
    cardDelete.addEventListener("click", () => {
      deleteMyCard(item._id)
        .then(deleteFunc(cardDelete))
        .catch((err) => console.log(err));
    });
  } else {
    cardDelete.remove();
  }

  if (
    item.likes.some((element) => {
      return element._id === idUser;
    })
  ) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }
  cardElement.querySelector(".card__like-counter").textContent =
    item.likes.length;
  cardLike.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
      if (!evt.target.classList.contains("card__like-button_is-active")) {
        putLike(item._id)
          .then((card) => {
            likeFunc(evt);
            cardLikeWrapper.querySelector(".card__like-counter").textContent =
              card.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        deleteLike(item._id)
          .then((card) => {
            likeFunc(evt);
            cardLikeWrapper.querySelector(".card__like-counter").textContent =
              card.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });

  return cardElement;
};

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(btn) {
  const deletableCard = btn.closest(".places__item");
  deletableCard.remove();
}

export { createCard, likeCard, deleteCard };
