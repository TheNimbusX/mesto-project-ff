import "../pages/index.css";
import initialCards from "./cards";
import { openModal, closeModal } from "./modal";

const container = document.querySelector(".content");
const cardTemplate = document.querySelector("#card-template").content;
const cardsContent = container.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-button");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const addNewCardBtn = document.querySelector(".profile__add-button");
const closeBtn = document.querySelectorAll(".popup__close");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const editProfileForm = document.forms["edit-profile"];
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

const addCardForm = document.forms["new-place"];
let placeName = addCardForm.elements["place-name"];
let placeLink = addCardForm.elements["link"];

editProfileForm.elements.name.value = profileTitle.textContent;
editProfileForm.elements.description.value = profileDescription.textContent;

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

editBtn.addEventListener("click", () => {
  openModal(editPopup);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(editPopup);
}
editProfileForm.addEventListener("submit", handleEditFormSubmit);

addNewCardBtn.addEventListener("click", () => {
  openModal(addNewCardPopup);
});
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = (deleteFunc) => {
    const newCardElement = createNewCard(deleteFunc);
    cardsContent.prepend(newCardElement);
  };
  newCard();
  closeModal(addNewCardPopup);
  placeLink.value = "";
  placeName.value = "";
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

closeBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const popupOpened = document.querySelector(".popup_is-opened");
    closeModal(popupOpened);
  });
});

const createCard = (item, deleteFunc) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunc);

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openPopupCard);

  return cardElement;
};

const createNewCard = () => {
  const newCardElement = cardTemplate.cloneNode(true);
  newCardElement.querySelector(".card__image").src = placeLink.value;
  newCardElement.querySelector(".card__image").alt = placeName.value;
  newCardElement.querySelector(".card__title").textContent = placeName.value;
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  newCardElement
    .querySelector(".card__image")
    .addEventListener("click", openPopupCard);

  return newCardElement;
};

function openPopupCard(item) {
  popupImage.src = item.srcElement.currentSrc;
  popupImage.alt = item.srcElement.alt;
  popupCaption.textContent = item.srcElement.alt;
  openModal(imagePopup);
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

const addCard = (item, deleteFunc) => {
  const cardElement = createCard(item, deleteFunc);
  cardsContent.append(cardElement);
};

initialCards.forEach((item) =>
  addCard(item, deleteCard, likeCard, openPopupCard)
);
