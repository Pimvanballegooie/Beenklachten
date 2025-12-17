document.addEventListener("DOMContentLoaded", () => {
  // Kaart wordt enkel geladen indien aanwezig op pagina
  const mapElement = document.getElementById("map");

  if (mapElement && typeof L !== "undefined") {
    const map = L.map("map").setView([51.59, 4.78], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap-bijdragers"
    }).addTo(map);

    // Dummy markers — vul later je organisaties in
    const organisaties = [
      { naam: "Praktijk A", lat: 51.59, lng: 4.78 },
      { naam: "Praktijk B", lat: 51.57, lng: 4.82 }
    ];

    organisaties.forEach(org => {
      L.marker([org.lat, org.lng])
        .addTo(map)
        .bindPopup(org.naam);
    });
  }
});
