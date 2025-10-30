const map = L.map('map').setView([-23.5015, -47.4526], 13); // Sorocaba

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const geocoder = L.Control.Geocoder.nominatim();

function buscarEndereco() {
    const endereco = document.getElementById("endereco").value;
    geocoder.geocode(endereco, results => {
        if (results.length > 0) {
            const result = results[0];
            map.setView([result.center.lat, result.center.lng], 15);
            L.marker([result.center.lat, result.center.lng]).addTo(map)
                .bindPopup(result.name)
                .openPopup();
        } else {
            alert("Endereço não encontrado");
        }
    });
}
