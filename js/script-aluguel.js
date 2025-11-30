// =============================
// 1. Lista de estações
// =============================
window.estacoes = [
    { id: 1, nome: "Estação Centro", lat: -23.501, lng: -47.452, bicicletas: 5, patinetes: 3, carros: 2 },
    { id: 2, nome: "Estação Vila Yolanda", lat: -23.506, lng: -47.465, bicicletas: 4, patinetes: 6, carros: 1 },
    { id: 3, nome: "Estação Vila Assis", lat: -23.512, lng: -47.448, bicicletas: 7, patinetes: 4, carros: 0 },
    { id: 4, nome: "Estação Norte", lat: -23.482, lng: -47.454, bicicletas: 10, patinetes: 2, carros: 4 },
    { id: 5, nome: "Estação Vila Santo Antônio", lat: -23.497, lng: -47.463, bicicletas: 6, patinetes: 5, carros: 3 }
];


// =============================
// 2. Função para pegar o tipo de veículo escolhido
// =============================
function getTipoSelecionado() {
    const selecionado = document.querySelector('input[name="tipoVeiculo"]:checked');
    return selecionado ? selecionado.value : null;
}


// =============================
// 3. Exibir estações na tela
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("lista-estacoes");

    window.estacoes.forEach(est => {
        lista.innerHTML += `
            <div class="estacao-card">
                <h4>${est.nome}</h4>

                <p>
                    🚲 Bicicletas: <strong>${est.bicicletas}</strong><br>
                    🛴 Patinetes: <strong>${est.patinetes}</strong><br>
                    🚗 Carros: <strong>${est.carros}</strong>
                </p>

                <button class="btn-alugar" onclick="confirmarAluguel(${est.id})">
                    Alugar nesta estação
                </button>
            </div>
        `;
    });
});


// =============================
// 4. Confirmar aluguel
// =============================
function confirmarAluguel(id) {
    const tipo = getTipoSelecionado();

    if (!tipo) {
        alert("Escolha um tipo de veículo primeiro!");
        return;
    }

    const estacao = window.estacoes.find(e => e.id === id);
    if (!estacao) return;

    // Checar disponibilidade
    if (tipo === "bicicleta" && estacao.bicicletas <= 0) {
        alert("Não há bicicletas disponíveis nesta estação!");
        return;
    }
    if (tipo === "patinete" && estacao.patinetes <= 0) {
        alert("Não há patinetes disponíveis nesta estação!");
        return;
    }
    if (tipo === "carro" && estacao.carros <= 0) {
        alert("Não há carros disponíveis nesta estação!");
        return;
    }

    // Mostrar o aluguel ativo
    document.getElementById("status-aluguel").innerHTML = `
        <p>Você alugou um(a): <strong>${tipo}</strong></p>
        <p>Na estação: <strong>${estacao.nome}</strong></p>

        <button class="btn-encerrar" onclick="encerrarAluguel()">
            Encerrar aluguel
        </button>
    `;
}


// =============================
// 5. Encerrar aluguel
// =============================
function encerrarAluguel() {
    document.getElementById("status-aluguel").innerHTML =
        `<p>Nenhum aluguel ativo</p>`;
}


