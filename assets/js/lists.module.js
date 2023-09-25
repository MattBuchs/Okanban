import { fetchLists, createList, updateList, deleteList } from "./api.js";
import { showCardModal, addCardToList } from "./cards.module.js";
import { closeModal, openModal } from "./utils.js";
import Sortable from "sortablejs";

export const listenToClickOnAddListButton = () => {
  // on récupère le button qui nous permet d'afficher notre modal au click
  const showModalButton = document.querySelector("#show-list-modal"); // on sélectionne l'ID show-list-modal
  showModalButton.addEventListener("click", () => openModal()); // au click on exécute la fonction openModal
};

export const fetchAndDisplay = async () => {
  // on appelle notre fonction fetchLists qui nous permet de récupérer la data de notre api et ensuite on va parcourir
  // le tableau d'objet et pour chaque élément de notre tableau appeller la fonction addListToListsContainer
  const lists = await fetchLists();
  // le return est implicite, quand on a seulement une instruction après la fonction fléchée on peut donner l'instruction directement sans accolades
  lists.forEach((list) => {
    addListToListsContainer(list);
    list.cards.forEach((card) => addCardToList(card));
  });
};

export const listenToSubmitOnAddListForm = async () => {
  // On sélectionne le form et on y ajoute un event submit
  const form = document.querySelector("#add-list-modal form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // On vient récupérer la data (key/value) avec le new FormData et avec la méthode Object.fromEntries on créait un objet à partir la key/value
    const formData = Object.fromEntries(new FormData(form));
    form.reset();

    // on fait l'appel à l'api qui va ajouter la nouvelle list
    const createNewList = await createList(formData);
    // On nettoie la div et on rappelle fetchAndDisplay pour ré-afficher les lists
    // document.querySelector('#lists-container').textContent = ''
    // await fetchAndDisplay()
    if (!createNewList) {
      alert("Error on list creation");
      closeModal();
    }
    // ajoute la list au DOM
    addListToListsContainer(createNewList);
    closeModal();
  });
};

export const addListToListsContainer = async (formData) => {
  const listTemplate = document.querySelector("#list-template"); // récupérer le template de list
  const newListElement = document.importNode(listTemplate.content, true); // on clone le template afin de le manipuler

  const listsContainer = document.querySelector("#lists-container"); // on récupère la div lists-container
  newListElement.querySelector('[slot="list-name"]').textContent =
    formData.name;
  // on remplace le contenu de la div par le formData récupéré dans la fonction précédente
  newListElement.querySelector('[slot="list-id"]').id = `list-${formData.id}`; // on donne l'id généré à liste

  const addCardButton = newListElement.querySelector(
    '[slot="add-card-button"]'
  );
  // on récupère le button qui nous permet d'afficher la modal d'ajout de card
  addCardButton.addEventListener("click", () => showCardModal(formData.id)); // on appelle la fonction showCardModal afin d'afficher la modal et de lui passer l'id de la list

  const editListName = newListElement.querySelector('[slot="list-name"]');
  editListName.addEventListener("click", () => editListModal(formData.id));

  const addDeleteButton = newListElement.querySelector(
    '[slot="list-delete-button"]'
  );

  addDeleteButton.addEventListener("click", () => {
    showDeletedModal(formData.id);
  });

  listsContainer.appendChild(newListElement); // on créait uene list à l'intérieur de la div list-containers
};

export const editListModal = (id) => {
  const editModal = document.querySelector("#edit-list-modal");
  editModal.classList.add("is-active");
  editModal.dataset.listId = id; // on ajoute l'id a notre modal edit afin de récupérer l'id pour les prochaines modifications
  // on récupère grace à l'id la list sur laquelle on click et on récupère sa valeur text
  const previousName = document
    .querySelector(`#list-${id}`)
    .querySelector('[slot="list-name"]').textContent;
  // on sélectionne l'input de notre modal et on lui donne comme value previousName
  editModal.querySelector("input").value = previousName;
};

export const listenToSubmitOnListEditModal = async () => {
  // on récupère la modal edit
  const editModal = document.querySelector("#edit-list-modal");
  const formEdit = editModal.querySelector("form"); // on récupère le formulaire de la modal

  formEdit.addEventListener("submit", async (event) => {
    // on ajoute un eventListener sur le submit de notre formulaire
    event.preventDefault(); // on prévient l'action par défault du submit
    const formDataEdit = new FormData(formEdit); // on construit un jeu key/value de la data du formulaire
    const formDataEditObject = Object.fromEntries(formDataEdit); // à partir de la data récupérée précédemment on construit un objet
    const editListId = editModal.dataset.listId; // on récupère l'id de la list qui est associé à la card
    // on appelle la fonction updateList qui est dans notre api.js et fait le call sur notre api, on lui passe la data du formulaire parsée juste avant ainsi que l'id de la liste
    const modifiedList = await updateList(formDataEditObject, editListId);

    // si on l'on ne reçoit pas d'erreur alors on fait également la modification coté DOM en sélectionnant la bonne list
    if (modifiedList) {
      document
        .querySelector(`#list-${editListId}`)
        .querySelector('[slot="list-name"]').textContent =
        formDataEditObject.name;
    } else {
      alert("The update didn't went through");
    }

    // on ferme la modal
    closeModal();
  });
};

const showDeletedModal = async (id) => {
  const currentModal = document.querySelector("#delete-list-modal");
  currentModal.classList.add("is-active");
  currentModal.dataset.listId = id;
};

export const listenToDeleteListeModal = async () => {
  const deleteForm = document.querySelector("#delete-list-modal form");
  deleteForm.addEventListener("submit", async (event) => {
    console.log("Delete Form");
    event.preventDefault();
    const idList = document.querySelector("#delete-list-modal").dataset.listId;
    const myList = document.querySelector(`#list-${idList}`)
    
    const myMessageBody = myList.querySelector('.message-body');
    const myArticle = myMessageBody.querySelectorAll('article');
    console.log(myArticle);
    if (!myArticle.length > 0) {
      const deleted = await deleteList(idList);
      if (deleted) {
        const deletedList = document.querySelector(`#list-${idList}`);
        deletedList.remove();
      } else {
        alert(`Un problème est survenu. Veuillez réessayer plus tard.`);
      }

    } else {
      alert("il reste des cartes dans la liste, attention !");
    }

    closeModal();
  });
};

// Razack : Il nous faut le bouton de suppression sur la liste   V
// Nassima, on a besoin d'une modal de suppression avec le formulaire V
// Laurent on a besoin d'écouter le click sur le bouton de suppression et d'appeller une fonction V
// Emilie, on a besoin d'une fonction qui ajoute une classe à la modal pour l'afficher
// Brad,  appeler la fonction et on a besoin d'associer l'id à cette modal
// Matt, Associer l'id à la fonction showDeletedModal et supprimer la modal sur le click
// Szimonetta, Ecrire une foncton qui va récupérer la modal et écouter sur le submit de son formulaire

export function listenToDragAndDropOnLists() {
  // On selectionne le conteneur de listes
  // et on fait un sortable.create dessus

  const listsContainer = document.getElementById("lists-container");

  Sortable.create(listsContainer, {
    animation: 1000,
    handle: ".message-header",
    onEnd: () => {
      // On peut récupérer l'event pour avoir une meilleure granularité de l'update
      // console.log(event); // Ici, on récupère l'ancienne position de la liste qu'on a bougé et sa nouvelle position. Parfait. Mais notre backend n'étant pas optimiser pour changer la position d'1 liste, on va plutôt changer la position de TOUTES les listes

      // On selectionne toutes les listes
      const lists = document.querySelectorAll("#lists-container section"); // Tableau d'élément

      // Pour chaque carte, on met une nouvelle position correspondant à son index dans la liste des listes
      lists.forEach(async (list, index) => {
        // On veut update la liste dont l'id est "listId" à la position "newPosition"
        const listId = parseInt(list.id.replace("list-", "")); // "list-7" ==> 7
        const newPosition = index;

        await updateList(listId, { position: newPosition }); // A noter, il faudrait gérer la gestion d'erreur
      });
    },
  });
}
