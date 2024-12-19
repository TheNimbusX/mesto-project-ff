import "../pages/index.css";
import initialCards from "./cards";
import { openModal, closeModal } from "./modal";
import { likeCard, deleteCard, createCard } from "./card";

const container = document.querySelector(".content");
export const cardTemplate = document.querySelector("#card-template").content;
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
const profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

const addCardForm = document.forms["new-place"];
const placeName = addCardForm.elements["place-name"];
const placeLink = addCardForm.elements["link"];

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
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
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

function handleAddCardFormSubmit(item) {
  item.preventDefault();
  const newCardElement = createCard(
    item,
    deleteCard,
    likeCard,
    openPopupCard,
    placeLink,
    placeName
  );
  cardsContent.prepend(newCardElement);
  closeModal(addNewCardPopup);
  item.target.reset();
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function openPopupCard(item) {
  popupImage.src = item.srcElement.currentSrc;
  popupImage.alt = item.srcElement.alt;
  popupCaption.textContent = item.srcElement.alt;
  openModal(imagePopup);
}

const addCard = (item) => {
  const cardElement = createCard(item, deleteCard, likeCard, openPopupCard);
  cardsContent.append(cardElement);
};

initialCards.forEach(addCard);
