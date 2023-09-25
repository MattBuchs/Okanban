fetchAllTodos();
createOnePost();

// ==== GET ===
async function fetchAllTodos() {
  const responseHttp = await fetch("https://jsonplaceholder.typicode.com/users/10"); // Par défaut, c'est un GET !
  const todos = await responseHttp.json();

  return todos; // [ {}, {} ]

}

// ===== POST ====
async function createOnePost() {
  const httpResponse = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ userId: 1, title: "Bonjour les copains", body: "Salut la compagnie" }), // On stringify le body avant de l'envoyer sur le reseau
    headers: { "Content-Type": "application/json" } // On précise le type de Body pour l'API
  });

  console.log(httpResponse.ok); // true

  const returnedBody = await httpResponse.json();
  console.log(returnedBody); // { id: 101, title: "...", body: "..." }
}

