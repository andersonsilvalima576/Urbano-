window.estacoes=[
    {id:1,nome:"Estação Centro",lat:-23.501,lng:-47.452,bicicletas:5,patinetes:3},
    {id:2,nome:"Estação Vila Yolanda",lat:-23.506,lng:-47.465,bicicletas:4,patinetes:6},
    { id: 3, nome: "Estação Vila Assis", lat: -23.512, lng: -47.448, bicicletas: 7, patinetes: 4 },
    { id: 4, nome: "Estação Norte", lat: -23.482, lng: -47.454, bicicletas: 10, patinetes: 2 },
    { id: 5, nome: "Estação Vila Santo Antônio", lat: -23.497, lng: -47.463, bicicletas: 6, patinetes: 5 }


];
function irParaAluguel(id){window.location.href='aluguel.html?estacao='+id}document.addEventListener('DOMContentLoaded',()=>{});

if (typeof L !== 'undefined') {
    const centro = [-23.501, -47.452];

    const mapa = L.map('mapa').setView(centro, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    if (window.estacoes && Array.isArray(window.estacoes)) {
        window.estacoes.forEach(est => {
            const marker = L.marker([est.lat, est.lng]).addTo(mapa);

            const popupHtml = `
                <strong>${est.nome}</strong><br/>
                🚲 ${est.bicicletas} | 🛴 ${est.patinetes}<br/>
                <button onclick="irParaAluguel(${est.id})">Alugar aqui</button>
            `;

            marker.bindPopup(popupHtml);
        });
    }
}
