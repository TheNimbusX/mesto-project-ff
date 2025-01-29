const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "67dedd4f-2aab-47ae-9594-fab41227b68c",
    "Content-Type": "application/json",
  },
};

function validateFetch(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(`Ошибка: ${data.status}`);
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(validateFetch);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(validateFetch);
};

export const editUser = (editProfileForm) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: editProfileForm.elements.name.value,
      about: editProfileForm.elements.description.value,
    }),
  }).then(validateFetch);
};

export const postCard = (addCardForm) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: addCardForm.elements["place-name"].value,
      link: addCardForm.elements["link"].value,
    }),
  }).then(validateFetch);
};

export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(validateFetch);
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(validateFetch);
};

export const deleteMyCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((data) => {
    if (!data.ok) {
      return Promise.reject(`Ошибка: ${data.status}`);
    }
  });
};

export const patchAvatar = (avatarForm) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarForm.elements.avatar.value,
    }),
  }).then(validateFetch);
};
