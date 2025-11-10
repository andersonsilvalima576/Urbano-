// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// 🔧 Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqcCz2oQ2VpbdWZwGlTx3y-BA_5ss-Sjw",
  authDomain: "urbano-plus.firebaseapp.com",
  databaseURL: "https://urbano-plus-default-rtdb.firebaseio.com",
  projectId: "urbano-plus",
  storageBucket: "urbano-plus.firebasestorage.app",
  messagingSenderId: "1071019322285",
  appId: "1:1071019322285:web:c9fa0364d747f83ea90f24"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🧾 Referência ao formulário
const form = document.getElementById("pedidoForm");
const listaPedidos = document.getElementById("listaPedidos");

// Função para enviar pedido
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const comida = document.getElementById("comida").value;
  const endereco = document.getElementById("endereco").value;

  const pedidosRef = ref(db, "pedidos");
  push(pedidosRef, { nome, comida, endereco });

  form.reset();
});

// Atualiza lista em tempo real
onValue(ref(db, "pedidos"), (snapshot) => {
  listaPedidos.innerHTML = "";
  snapshot.forEach((child) => {
    const pedido = child.val();
    const li = document.createElement("li");
    li.textContent = `${pedido.nome} pediu ${pedido.comida} - Endereço: ${pedido.endereco}`;
    listaPedidos.appendChild(li);
  });
});

// 🔹 Captura e envia avaliação
document.getElementById("enviarAvaliacao").addEventListener("click", () => {
  const estrelas = document.querySelector('input[name="estrela"]:checked');
  const comentario = document.getElementById("comentario").value;

  if (!estrelas) {
    alert("Por favor, selecione uma quantidade de estrelas!");
    return;
  }

  const avaliacaoRef = ref(db, "avaliacoes");
  const novaAvaliacao = push(avaliacaoRef);

  set(novaAvaliacao, {
    estrelas: estrelas.value,
    comentario: comentario || "Sem comentário",
    data: new Date().toISOString()
  })
  .then(() => {
    alert("Avaliação enviada com sucesso! Obrigado pelo seu feedback!");
    document.getElementById("comentario").value = "";
    document.querySelectorAll('input[name=\"estrela\"]').forEach(e => e.checked = false);
  })
  .catch((error) => {
    alert("Erro ao enviar avaliação: " + error.message);
  });
});


