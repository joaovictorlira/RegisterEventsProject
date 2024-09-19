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

  if (
    nome === "" ||
    data === "" ||
    local === "" ||
    description === "" ||
    participants === "" ||
    email === ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  cadastrarEvento(nome, data, local, description, participants, email);
  listarEventos();  

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
  let novoEvento = {
    nome: nome,
    data: data,
    local: local,
    description: description,
    participants: participants,
    email: email,
  };

  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos.push(novoEvento);
  localStorage.setItem("eventos", JSON.stringify(eventos));


}

function listarEventos() {
  const listaEventosUl = document.querySelector("#listaEventosUl");
  listaEventosUl.innerHTML = "";
  
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos.forEach((evento) => {
    const novoEventoLi = document.createElement("li");
    novoEventoLi.innerHTML = `
    <h3>${evento.nome}</h3>
    <p>${evento.data}</p>
    <p>${evento.local}</p>
    <p class="descriptionText">${evento.description}</p>
    <p>${evento.participants} pessoas</p>
    <p>${evento.email}</p>
    <button class="deleteBtn">Deletar</button>
    `;
    listaEventosUl.appendChild(novoEventoLi);


    const deleteBtn = document.querySelector('.deleteBtn')
    deleteBtn.addEventListener('click', () => {
      excluirEvento(evento)
      novoEventoLi.remove()
  })
})}

function excluirEvento(eventoParaExcluir) {
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos = eventos.filter(evento => evento.nome !== eventoParaExcluir.nome && evento.data !== eventoParaExcluir.data)
  localStorage.setItem("eventos", JSON.stringify(eventos))
}

document.addEventListener("DOMContentLoaded", listarEventos)

// O que falta

// - Armazenar os dados no localStorage
// - Criar uma função para listar os eventos do localStorage
// - Criar uma função para deletar um evento do localStorage
