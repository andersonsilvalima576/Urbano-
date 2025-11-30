// ================================
// Cálculo de entrega
// ================================

function calcularEntrega() {
    const tipo = document.getElementById("tipoEntrega").value;
    const retirada = document.getElementById("localRetirada").value.trim();
    const destino = document.getElementById("localDestino").value.trim();

    if (!retirada || !destino) {
        alert("Preencha os dois endereços para continuar.");
        return;
    }

    // valores fictícios
    let valorBase = tipo === "express" ? 18 : 10;
    let valorFinal = valorBase + (Math.random() * 12).toFixed(2);

    document.getElementById("resultadoEntrega").innerHTML = `
        <p>Tipo de entrega: <strong>${tipo}</strong></p>
        <p>Valor estimado: <strong>R$ ${valorFinal}</strong></p>
        <button class="botao-enviar" onclick="confirmarEntrega('${retirada}', '${destino}', '${tipo}', ${valorFinal})">
            Confirmar Entrega
        </button>
    `;
}


// ================================
// Confirmar entrega
// ================================

function confirmarEntrega(retirada, destino, tipo, valor) {
    document.getElementById("statusEntrega").innerHTML = `
        <p><strong>Entrega em andamento</strong></p>
        <p>Retirada: ${retirada}</p>
        <p>Destino: ${destino}</p>
        <p>Tipo: ${tipo}</p>
        <p>Valor: R$ ${valor}</p>

        <div class="timeline">
            <p>📦 Pedido recebido...</p>
        </div>

        <button class="btn-encerrar" onclick="finalizarEntrega()">Finalizar entrega</button>
    `;

    iniciarTimeline();
}


// ================================
// Linha do tempo automática
// ================================

function iniciarTimeline() {
    const timeline = document.querySelector(".timeline");

    setTimeout(() => timeline.innerHTML += "<p>🚲 Entregador a caminho...</p>", 2000);
    setTimeout(() => timeline.innerHTML += "<p>📍 Chegando no destino...</p>", 4000);
    setTimeout(() => timeline.innerHTML += "<p>✅ Entrega concluída!</p>", 6000);
}


// ================================
// Finalizar entrega
// ================================

function finalizarEntrega() {
    document.getElementById("statusEntrega").innerHTML =
        "<p>Nenhuma entrega ativa</p>";

    document.getElementById("resultadoEntrega").innerHTML = "";
}
