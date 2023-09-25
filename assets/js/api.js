import { apiBaseUrl } from "./config.js";

// on déclare une fonction fetchLists qui va fetcher notre api et recupérer toutes les listes
export const fetchLists = async () => {
  const responseHttp = await fetch(`${apiBaseUrl}/lists`);
  const lists = await responseHttp.json();
  return lists;
};

export const createList = async (formData) => {
  const httpResponse = await fetch(`${apiBaseUrl}/lists`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  if (!httpResponse.ok) {
    return null;
  }
  const createdList = await httpResponse.json();
  return createdList;
};

export const createCard = async (cardData) => {
  const httpResponse = await fetch(`${apiBaseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: { "Content-Type": "application/json" },
  });

  if (!httpResponse.ok) {
    return null;
  }

  const createCard = await httpResponse.json();
  return createCard;
};

export const updateList = async (formData, listId) => {
  // On fait l'appelle sur notre api on lui donnant l'id récupérer en paramètre qui va permettre à notre api
  // de savoir à quel objet l'on va faire la manipulation sur notre BDD
  const url = `${apiBaseUrl}/lists/${listId}`
  const httpResponse = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  if (!httpResponse.ok) {
    return null;
  }

  const modifyList = await httpResponse.json();
  return modifyList;
};


export async function updateCard(cardId, newCardData) { // newCardData = { title: "..." }
  const url = `${apiBaseUrl}/cards/${cardId}`;
  const httpResponse = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCardData)
  });

  if (! httpResponse.ok) { return null; }

  const updatedCard = await httpResponse.json();
  return updatedCard;
}

export async function deleteCard(cardId) {
  const url = `${apiBaseUrl}/cards/${cardId}`;
  const httpResponse = await fetch(url, { method: "DELETE" });
  return httpResponse.ok; // si OK, on renvoie true. si pas OK, on renvoie false !
}

export async function deleteList(listId) {
  const url = `${apiBaseUrl}/lists/${listId}`;
  const httpResponse = await fetch(url, { method: "DELETE" });
  return httpResponse.ok; // si OK, on renvoie true. si pas OK, on renvoie false !
}