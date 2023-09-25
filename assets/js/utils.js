export const openModal = () => {
  // on récupère la modal à qui l'on va donner la class is-active
  const myListModal = document.querySelector("#add-list-modal"); // on sélectionne l'ID add-list-modal
  myListModal.classList.add("is-active"); // on ajoute la class is-active à la modal
};

export const closeModal = () => {
  const myListModal = document.querySelector("#add-list-modal"); // on sélectionne l'ID add-list-modal
  const editListModal = document.querySelector("#edit-list-modal");
  const myCardModal = document.querySelector("#add-card-modal");
  const myEditCardModal = document.querySelector("#edit-card-modal");
  const deleteListModal = document.querySelector('#delete-list-modal');
  const myDeleteCardModal = document.querySelector("#delete-card-modal")
  const modalBackground = document.querySelectorAll(".modal-background");
  const myModals = [
    myListModal,
    myCardModal,
    ...modalBackground,
    editListModal,
    myEditCardModal,
    myDeleteCardModal,
    deleteListModal
  ];
  myModals.forEach((modal) => modal.classList.remove("is-active"));
};

export const closeModalOnClick = () => {
  // on récupère tous les buttons qui ont la class close et la div modal-background
  const modalBackground = document.querySelectorAll(".modal-background");
  const closeButtons = document.querySelectorAll(".close");
  const closingElements = [...closeButtons, ...modalBackground];
  // permet la récupération de tous les éléments en une fois :
  // const closeModalButtons = document.querySelectorAll(".close, .modal-background")

  // On appelle la fonction closeModal au click de chaque élément
  closingElements.forEach((button) => {
    button.addEventListener("click", closeModal);
  });
};


export function rgbToHex(rgbCode) {
  // Séparer les valeurs R, G et B en utilisant une expression régulière
  const match = rgbCode.match(/\d+/g);
  if (!match || match.length !== 3) {
    throw new Error("Le code RGB doit être au format 'rgb(r, g, b)' avec r, g et b des nombres entiers.");
  }

  // Convertir les valeurs R, G et B en nombres entiers
  const r = parseInt(match[0], 10);
  const g = parseInt(match[1], 10);
  const b = parseInt(match[2], 10);

  // Vérifier que les valeurs R, G et B sont valides (entre 0 et 255)
  if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("Les valeurs R, G et B doivent être des nombres entiers entre 0 et 255.");
  }

  // Convertir les valeurs R, G et B en code hexadécimal
  const hex = ((r << 16) | (g << 8) | b).toString(16).toUpperCase();

  // Remplir avec des zéros à gauche jusqu'à obtenir 6 caractères
  return "#".concat("0".repeat(6 - hex.length), hex);
}
