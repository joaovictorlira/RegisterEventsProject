// DOM

const button = document.querySelector("#registerBtn");
const showEvents = document.querySelector("#showEventsBtn");
const backBtn = document.querySelector(".backBtn");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

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
  const participantsInput = document.querySelector("#participants");
  const emailInput = document.querySelector("#email");
  const imageInput = document.querySelector("#image");

  // coletando os valores dos inputs
  const nome = nomeInput.value;
  const data = dataInput.value;
  const local = localInput.value;
  const participants = participantsInput.value;
  const email = emailInput.value;
  const imageFile = imageInput.files[0];

  //Manipulacao String
  function normalizarEmail(email) {
    return email.trim().toLowerCase();
  }

  const emailNormalizado = normalizarEmail(email);
  //

  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  const participantsRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex (Expressoes Regulares)
  if (!nome.match(nomeRegex)) {
    alert("O nome deve conter apenas letras e espaços.");
    return;
  }
  if (!local) {
    alert("O local não pode estar vazio.");
    return;
  }
  if (!participants.match(participantsRegex) || Number(participants) <= 0) {
    alert("O número de participantes deve ser um valor inteiro positivo.");
    return;
  }
  if (!emailNormalizado.match(emailRegex)) {
    alert("Digite um e-mail válido.");
    return;
  }
  if (!imageFile) {
    alert("Selecione uma imagem para o evento.");
    return;
  }
  //

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;

    cadastrarEvento(nome, data, local, participants, email, image);
    listarEventos();

    // limpando os inputs
    nomeInput.value = "";
    dataInput.value = "";
    localInput.value = "";
    participantsInput.value = "";
    emailInput.value = "";
    imageInput.value = "";
  };

  registerSucess();

  setTimeout(() => {
    alert("Evento cadastrado com sucesso!");
  }, 1000);

  reader.readAsDataURL(imageFile);
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  filtrarEventos(query);
});

// FUNCOES

function filtrarEventos(query) {
  const listaEventosUl = document.querySelector("#listaEventosUl");
  listaEventosUl.innerHTML = "";

  let eventos = JSON.parse(localStorage.getItem("eventos") || []);
  const eventosFiltrados = eventos.filter((evento) => {
    return evento.nome.toLowerCase().includes(query);
  });

  if (eventosFiltrados.length === 0) {
    listaEventosUl.innerHTML = "Nenhum evento encontrado";
  } else {
    eventosFiltrados.forEach((evento) => {
      const novoEventoLi = document.createElement("li");
      novoEventoLi.innerHTML = `
      <h3>${evento.nome}</h3>
      <p>${evento.data}</p>
      <p>${evento.local}</p>
      <p>${evento.participants} pessoas</p>
      <p>${evento.email}</p>
      <img src="${evento.image}" alt="Imagem do Evento" style="max-width: 200px; height: auto; margin: 10px 0;" />
      <button class="deleteBtn">Deletar</button>  
    `;
      listaEventosUl.appendChild(novoEventoLi);
      const deleteBtn = novoEventoLi.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        excluirEvento(evento);
        novoEventoLi.remove();
      });
    });
  }
}

function registerSucess() {
  const labels = document.querySelectorAll("label");

  labels.forEach((label) => {
    label.style.color = "green";
  });

  setTimeout(() => {
    labels.forEach((label) => {
      label.style.color = "";
    });
  }, 1000);
}

function cadastrarEvento(nome, data, local, participants, email, image) {
  let novoEvento = {
    nome: nome,
    data: data,
    local: local,
    participants: participants,
    email: email,
    image: image,
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
    <p>${evento.participants} pessoas</p>
    <p>${evento.email}</p>
    <img src="${evento.image}" alt="Imagem do Evento" style="max-width: 200px; height: auto; margin: 10px 0;" />
    <button class="deleteBtn">Deletar</button>
    `;
    listaEventosUl.appendChild(novoEventoLi);

    const deleteBtn = novoEventoLi.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      excluirEvento(evento);
      novoEventoLi.remove();
    });
  });
}

function excluirEvento(eventoParaExcluir) {
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos = eventos.filter((evento) => evento.nome !== eventoParaExcluir.nome);
  localStorage.setItem("eventos", JSON.stringify(eventos));
}

document.addEventListener("DOMContentLoaded", listarEventos);
