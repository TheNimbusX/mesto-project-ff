import "../pages/index.css";
import { openModal, closeModal } from "./modal";
import { likeCard, deleteCard, createCard } from "./card";
import { enableValidation, clearValidation } from "./validation";
import { getUser, getCards, editUser, postCard, patchAvatar } from "./api";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error_active",
};

const container = document.querySelector(".content");
const cardsContent = container.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-button");
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const addNewCardBtn = document.querySelector(".profile__add-button");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");

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
  clearValidation(editProfileForm, validationConfig);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;

  editUser(editProfileForm)
    .then(() => {
      editProfileForm.querySelector(".button").textContent = "Сохранение ...";
    })
    .then(() => {
      setTimeout(() => {
        editProfileForm.querySelector(".button").textContent = "Сохранить";
        closeModal(editPopup);
      }, 800);
    })
    .catch((err) => {
      console.log(err);
    });
}
editProfileForm.addEventListener("submit", handleEditFormSubmit);

addNewCardBtn.addEventListener("click", () => {
  openModal(addNewCardPopup);
  clearValidation(addCardForm, validationConfig);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  postCard(addCardForm)
    .then((item) => {
      cardsContent.prepend(
        createCard(item, deleteCard, likeCard, openPopupCard)
      );
      addCardForm.querySelector(".button").textContent = "Сохранение ...";
      setTimeout(() => {
        closeModal(addNewCardPopup);
        evt.target.reset();
        addCardForm.querySelector(".button").textContent = "Сохранить";
      }, 400);
    })
    .catch((err) => {
      console.log(err);
    });
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function openPopupCard(item) {
  popupImage.src = item.srcElement.currentSrc;
  popupImage.alt = item.srcElement.alt;
  popupCaption.textContent = item.srcElement.alt;
  openModal(imagePopup);
}

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((item) => {
      const cardElement = createCard(
        item,
        deleteCard,
        likeCard,
        openPopupCard,
        user._id
      );
      cardsContent.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

profileAvatar.addEventListener("click", () => {
  openModal(avatarPopup);
  avatarForm.elements.avatar.value = profileAvatar.style.backgroundImage
    .slice(4, -1)
    .replace(/["']/g, "");
  clearValidation(avatarForm, validationConfig);
});

function changeAvatarFromPopup(evt) {
  evt.preventDefault();
  profileAvatar.style.backgroundImage = `url(${avatarForm.elements.avatar.value})`;
  patchAvatar(avatarForm)
    .then(() => {
      avatarForm.querySelector(".button").textContent = "Сохранение ...";
      setTimeout(() => {
        closeModal(avatarPopup);
        evt.target.reset();
        avatarForm.querySelector(".button").textContent = "Сохранить";
      }, 400);
    })
    .catch((err) => {
      console.log(err);
    });
}
avatarForm.addEventListener("submit", changeAvatarFromPopup);

enableValidation(validationConfig);
