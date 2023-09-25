import { closeModal, rgbToHex } from "./utils.js";
import { createCard, updateCard, deleteCard } from "./api.js";
import Sortable from "sortablejs";

export const showCardModal = (id) => {
  const cardModal = document.querySelector("#add-card-modal"); // on sélectionner notre modal et on lui donne la class is-active
  cardModal.classList.add("is-active");
  cardModal.dataset.listId = id; // on ajoute à notre modal card l'id récupéré précédemment dans la list
};

function openDeleteCardModal(cardId) {
  const deleteCardModal = document.querySelector("#delete-card-modal");
  deleteCardModal.classList.add("is-active");

  deleteCardModal.dataset.cardId = cardId;
}

export const listenToSubmitOnAddCardForm = async () => {
  const cardModal = document.querySelector("#add-card-modal"); // on sélectionner notre modal et on lui donne la class is-active
  const formCard = cardModal.querySelector("form"); // on récupère le form de la notre modal card
  formCard.addEventListener("submit", async (event) => {
    // on ajoute comme avec la list précédemment un submit sur le formulaire et on créait un object à partir de la data du form
    event.preventDefault();
    const formCardData = Object.fromEntries(new FormData(formCard));
    const listId = document.querySelector("#add-card-modal").dataset.listId; // on ajoute l'id de la list à notre card modal
    formCardData.list_id = listId; // on ajoute une key list_id et on lui donne l'id

    const createNewCard = await createCard(formCardData);
    console.log(formCardData);
    if (!createNewCard) {
      alert("Error during the creation of the card");
    }
    addCardToList(createNewCard);
  });
};

export const addCardToList = (card) => {
  const cardTemplate = document.querySelector("#card-template"); // récupérer le template de card
  const newCardElement = cardTemplate.content.cloneNode(true); // on clone le template de la card afin de le manipuler
  newCardElement.querySelector('[slot="card-title"]').textContent =
    card.content;
  newCardElement.querySelector('[slot="card-id"]').id = `card-${card.id}`;

  newCardElement.querySelector(".card-header").style.backgroundColor =
    card.color;
  console.log(card.color);

  const myList = document.querySelector(`#list-${card.list_id}`); // on récupère la list grae à son id, id que l'on obtient en sur le paramètre card passé précédemment

  const listContent = myList.querySelector('[slot="list-content"]'); // on sélectionne slot list content de la list retrouvée dans l'instruction précédente

  // On pose un listener pour écouter le click sur le bouton EDITION ✏️ (crayon) de la carte
  const cardEditButton = newCardElement.querySelector(
    '[slot="card-edit-button"]'
  );
  cardEditButton.addEventListener("click", () => {
    openEditCardModal(card.id);
  });

  // On pose un listener pour écouter le click sur le bouton SUPPRIMER 🗑️ de la carte
  const cardDeleteButton = newCardElement.querySelector(
    '[slot="card-delete-button"]'
  );
  cardDeleteButton.addEventListener("click", () => {
    openDeleteCardModal(card.id);
  });

  // Insertion dans la list
  listContent.append(newCardElement);

  // Reset
  document.querySelector("#add-card-modal form").reset();
  closeModal();
};

function openEditCardModal(cardId) {
  // ex: cardId = 13
  const editCardModal = document.querySelector("#edit-card-modal"); // On selectionne la bonne modale à ouvrir
  editCardModal.classList.add("is-active"); // On ouvre la bonne modale;

  editCardModal.dataset.cardId = cardId; // Ajoute `data-card-id="13"` sur la modal
  console.log(editCardModal);
  const previousCardTitle = document
    .getElementById(`card-${cardId}`)
    .querySelector('[slot="card-title"]').textContent;

  editCardModal.querySelector("input#edit-card-title").value =  previousCardTitle;

  const previousColorCardRGB = document.getElementById(`card-${cardId}`).style
    .backgroundColor;

  const previousColorCardHexa = rgbToHex(previousColorCardRGB);
  editCardModal.querySelector("input#edit-card-color").value =
    previousColorCardHexa; // Seule une valeur hexa avec 6 chiffres fonctionne ici
}

export function listenToSubmitOnEditCardForm() {
  const editCardModal = document.querySelector("#edit-card-modal");
  const editCardForm = document.querySelector("#edit-card-modal form");

  editCardForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // On empeche le rechargement de la page

    // récupérer les données du form
    const newDataForCardUpdate = Object.fromEntries(new FormData(editCardForm)); // Données du form. Ex : { title: "nouveau nom" }
    const cardId = editCardModal.dataset.cardId; // Id dans le dataset de la modal. Ex : cardId = 8

    // appelle backend
    const updatedCard = await updateCard(cardId, newDataForCardUpdate);
   
    if (updatedCard) {
      // Tout s'est bien passé, on met à jour le title de la bonne carte
      document
        .querySelector(`#card-${cardId}`)
        .querySelector('[slot="card-title"]').textContent = updatedCard.content;
      document.querySelector(`#card-${cardId}`).style.backgroundColor =
        updatedCard.style;
    } else {
      alert(`Un problème est survenu. Veuillez réessayer plus tard.`); // UX : techniquement, il faudrait ouvrir une vraie MODAL propre ou rediriger vers une page "500"
    }

    closeModal();
  });
}

export function listenToSubmitOnDeleteCardForm() {
  const deleteCardForm = document.querySelector("#delete-card-modal form");
  deleteCardForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardId = document.querySelector("#delete-card-modal").dataset.cardId;

    const isDeletionSuccessfull = await deleteCard(cardId);

    if (isDeletionSuccessfull) {
      // Selectioner la carte par son ID
      const card = document.querySelector(`#card-${cardId}`);
      card.remove(); // Et la retirer du DOM
    } else {
      alert(`Un problème est survenu. Veuillez réessayer plus tard.`);
    }

    closeModal();
  });
}

export function listenToDragAndDropOnCards() {
  const cardContainers = document.querySelectorAll('[slot="list-content"]');

  cardContainers.forEach((cardContainer) => {
    Sortable.create(cardContainer, {
      group: "cards",
      onEnd: async (event) => {
        const cardId = parseInt(event.item.id.replace("card-", ""));

        const newListId = parseInt(
          event.to.parentElement.id.replace("list-", "")
        );

        await updateCard(cardId, { list_id: newListId });

        // Puis on gère les positionnements

        const cardContainer = event.to.parentElement;
        const cards = cardContainer.querySelectorAll("article");

        cards.forEach(async (card, index) => {
          const cardId = card.id.replace("card-", "");
          const newPosition = index;
          await updateCard(cardId, { position: newPosition });
        });
      },
    });
  });
}
