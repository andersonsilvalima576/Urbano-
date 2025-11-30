import { 
  getAuth, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // 🔹 Redireciona para homepage após sair
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erro ao sair:", error);
    });
});

