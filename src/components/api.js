function validateFetch(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(`Ошибка: ${data.status}`);
}

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-22/cards", {
    method: "GET",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
    },
  }).then(validateFetch);
};

export const getUser = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-22/users/me", {
    method: "GET",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
    },
  }).then(validateFetch);
};

export const editUser = (editProfileForm) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-22/users/me", {
    method: "PATCH",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editProfileForm.elements.name.value,
      about: editProfileForm.elements.description.value,
    }),
  }).then(validateFetch);
};

export const postCard = (addCardForm) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-22/cards", {
    method: "POST",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: addCardForm.elements["place-name"].value,
      link: addCardForm.elements["link"].value,
    }),
  }).then(validateFetch);
};

export const putLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-22/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
  }).then(validateFetch);
};

export const deleteLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-22/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
  }).then(validateFetch);
};

export const deleteMyCard = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-22/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
  }).then((data) => {
    if (!data.ok) {
      return Promise.reject(`Ошибка: ${data.status}`);
    }
  });
};

export const patchAvatar = (avatarForm) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-22/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarForm.elements.avatar.value,
    }),
  }).then(validateFetch);
};
