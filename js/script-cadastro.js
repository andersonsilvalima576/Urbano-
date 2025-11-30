// ================================
//  Firebase Imports
// ================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ================================
//  Firebase Config
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyDqcCz2oQ2VpbdWZwGlTx3y-BA_5ss-Sjw",
  authDomain: "urbano-plus.firebaseapp.com",
  databaseURL: "https://urbano-plus-default-rtdb.firebaseio.com",
  projectId: "urbano-plus",
  storageBucket: "urbano-plus.appspot.com",
  messagingSenderId: "1071019322285",
  appId: "1:1071019322285:web:c9fa0364d747f83ea90f24"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ================================
//  👤 CADASTRO DE USUÁRIOS
// ================================
const cadastroForm = document.getElementById("formCadastro");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coleta os campos corretamente
    const nome = document.getElementById("nomeCompleto").value;
    const email = document.getElementById("floatingInput").value;
    const telefone = document.getElementById("telefone").value;
    const nascimento = document.getElementById("nascimento").value;

    const genero = document.getElementById("genero").value;

    const senha = document.getElementById("floatingPassword").value;
    const confirmar = document.getElementById("confirmPassword").value;

    // Validação de senha
    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // 🔹 Cria o usuário no Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = cred.user.uid;

      // 🔹 Salva dados no banco
      await set(ref(db, "usuarios/" + uid), {
        nome,
        email,
        telefone,
        nascimento,
        genero,
        criadoEm: new Date().toISOString()
      });

      alert("Cadastro realizado com sucesso!");
      cadastroForm.reset();

      // 🔹 Redireciona para a Home (que será a área logada)
      window.location.href = "home.html";

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    }
  });
}
