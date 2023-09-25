import { closeModalOnClick } from "./utils.js";
import {
  listenToSubmitOnAddCardForm,
  listenToSubmitOnEditCardForm,
  listenToSubmitOnDeleteCardForm,
  listenToDragAndDropOnCards,
} from "./cards.module.js";
import {
  listenToClickOnAddListButton,
  fetchAndDisplay,
  listenToSubmitOnAddListForm,
  listenToSubmitOnListEditModal,
  listenToDragAndDropOnLists,
  listenToDeleteListeModal
} from "./lists.module.js";

document.addEventListener("DOMContentLoaded", async () => {
  listenToUserActions();
  await fetchAndDisplay();

  listenToDragAndDropOnCards()
});

const listenToUserActions = () => {
    listenToClickOnAddListButton(),
    closeModalOnClick(),
    listenToSubmitOnAddListForm(),
    listenToSubmitOnListEditModal(),
    listenToDragAndDropOnLists(),
    listenToSubmitOnAddCardForm(),
    listenToSubmitOnEditCardForm(),
    listenToSubmitOnDeleteCardForm(),
    listenToDeleteListeModal();
};
