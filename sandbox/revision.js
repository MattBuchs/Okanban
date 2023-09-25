// =====================================
// =========== REVISION 1 ==============
// =========== querySelector ===========

// Selectionner le H1
// Ajouter la classe title

// 3 manière de selectionner :
// - par le tag
// - par la classe
// - par l'ID

const titleElement = document.querySelector("h1");
titleElement.classList.add("title");

const infoButton = document.querySelector('#add-fruit-button')
infoButton.classList.add('is-danger')
console.log(infoButton)

// =====================================
// =========== REVISION 2 ==============
// =========== create d'élément ===========

const fruits = [
  { id: 1, name: "Kiwi", unitPrice: 1, quantity: 6 },
  { id: 2, name: "Pomme", unitPrice: 0.8, quantity: 2 },
  { id: 3, name: "Raisin", unitPrice: 2.5, quantity: 1 },
  { id: 4, name: "Fraise", unitPrice: 3.5, quantity: 1 },
];

// On récupére le contenant dans lequel on va ajouter tous nos fruits
const fruitsListElement = document.querySelector("#fruits-container");

// Pour chaque fruit :
fruits.forEach((fruit) => {
  console.log(fruit); // ABUSEZ DU CONSOLE.LOG SVP

  // Méthode 1 : insertAdjacentHTML
  // ATTENTION : SENSIBLE AUX INJECTION XSS
  // fruitsListElement.insertAdjacentHTML("afterbegin", `
  //   <article class="card">
  //     <h2 class="card-title">${fruit.name}</h2>
  //     <footer class="card-footer">
  //       <p class="card-footer-item">Quantité : ${fruit.quantity}</p>
  //       <p class="card-footer-item">Prix à l'unité : ${fruit.unitPrice}€</p>
  //     </footer>
  //   </article>
  // `);

  // Méthode 2 : template HTML
  // 1. selectionner le template
  const fruitTemplate = document.getElementById("fruit-template");
  console.log(fruitTemplate);

  // 2. cloner le template
  const fruitClone = document.importNode(fruitTemplate.content, true);
  console.log(fruitClone);

  // 3. changer son texte
  fruitClone.querySelector('[slot="name"]').textContent = fruit.name;
  fruitClone.querySelector('[slot="quantity"]').textContent = `Quantité : ${fruit.quantity}`;
  fruitClone.querySelector('[data-template="unit-price"]').textContent = `Prix à l'unité : ${fruit.unitPrice}€`;


  // 4. l'insérer dans la page
  fruitsListElement.appendChild(fruitClone);
});

// =======================
//  --- REVISION 3 ---
//    addEventListener
// =======================



const addFruitButton = document.getElementById("add-fruit-button");
addFruitButton.addEventListener("click", () => {
  console.log("bonjour");
  document.querySelector("#add-fruit-modal").classList.add("is-active");
});


// const closeModal = document.getElementById("add-fruit-modal");
// closeModal.addEventListener('click', () => {
//   closeModal.classList.remove('is-active');
// });

// On sélectionne les différents buttons qui servent à fermer la modal
const deleteButton = document.querySelector('.delete')
const saveButton = document.querySelector('.modal-card footer button')
const modalBackground = document.querySelector('.modal-background')


const deleteButtons = [
  deleteButton, saveButton, modalBackground
]

console.log(deleteButtons)

// On vient boucler sur les buttons delete et on y ajoute un eventListener afin de supprimer la class is-active de la modal
for(button of deleteButtons){
  button.addEventListener('click', () => {
    document.querySelector('#add-fruit-modal').classList.remove('is-active')
  })
}

// deleteButton.addEventListener('click', () => {
//   console.log('Hide the modal')
//   document.querySelector("#add-fruit-modal").classList.remove("is-active");
// })



// Exercice autonomie : fermer la modale !