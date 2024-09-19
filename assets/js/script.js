// DOM

const button = document.querySelector("#registerBtn");
const showEvents = document.querySelector("#showEventsBtn");
const backBtn = document.querySelector(".backBtn");

// EVENTOS

showEvents.addEventListener("click", (e) => {
  e.preventDefault();
  const activeContainer = document.querySelector(".registerContainer.active");
  activeContainer.classList.remove("active");

  const eventsContainer = document.querySelector(".eventsContainer");
  eventsContainer.classList.add("active");
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const eventsContainer = document.querySelector(".eventsContainer.active");
  eventsContainer.classList.remove("active");

  const container = document.querySelector(".registerContainer");
  container.classList.add("active");
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // armazenando o DOM dos inputs
  const nomeInput = document.querySelector("#name");
  const dataInput = document.querySelector("#data");
  const localInput = document.querySelector("#local");
  const descriptionInput = document.querySelector("#description");
  const participantsInput = document.querySelector("#participants");
  const emailInput = document.querySelector("#email");

  // coletando os valores dos inputs
  const nome = nomeInput.value;
  const data = dataInput.value;
  const local = localInput.value;
  const description = descriptionInput.value;
  const participants = participantsInput.value;
  const email = emailInput.value;

  cadastrarEvento(nome, data, local, description, participants, email);

  // limpando os inputs
  nomeInput.value = "";
  dataInput.value = "";
  localInput.value = "";
  descriptionInput.value = "";
  participantsInput.value = "";
  emailInput.value = "";
});

// FUNCOES

function cadastrarEvento(nome, data, local, description, participants, email) {
   nome = nome;
   data = data;
   local = local;
   description = description;
   participants = participants;
   email = email;

  const listaEventosUl = document.querySelector("#listaEventosUl");
  const novoEventoLi = document.createElement("li");

  novoEventoLi.innerHTML = `
   <h3>${nome}</h3>
   <p>${data}</p>
   <p>${local}</p>
   <p class="descriptionText">${description}</p>
   <p>${participants} pessoas</p>
   <p>${email}</p>
   <button class="deleteBtn">Excluir Evento</button>
   `;
  
   listaEventosUl.appendChild(novoEventoLi);

   const deleteBtn = novoEventoLi.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    novoEventoLi.remove(); // Remove apenas o evento correspondente
  });
  
}


