// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Kaart wordt alleen aangemaakt als er een element met id="map" aanwezig is
  const mapElement = document.getElementById("map");

  if (mapElement && typeof L !== "undefined") {
    const map = L.map("map").setView([51.59, 4.78], 11); // ongeveer Breda e.o.

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap-bijdragers"
    }).addTo(map);

    // Voorbeeldorganisaties – vervang deze door echte deelnemers
    const organisaties = [
      { naam: "Voorbeeldpraktijk 1", lat: 51.59, lng: 4.78 },
      { naam: "Voorbeeldpraktijk 2", lat: 51.57, lng: 4.82 }
    ];

    organisaties.forEach(org => {
      L.marker([org.lat, org.lng])
        .addTo(map)
        .bindPopup(org.naam);
    });
  }
});
