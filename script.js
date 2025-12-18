// script.js
// - dropdown gedrag voor 'Protocollen'
// - Leaflet kaart + locatielijst (index.html) en herbruikbaar voor locaties.html

const locations = [
  // Vervang dit door echte locaties (naam, adres, plaats, lat, lng)
  { name: "Voorbeeldpraktijk Breda", address: "Voorbeeldstraat 1", city: "Breda", lat: 51.5890, lng: 4.7750 },
  { name: "Voorbeeldpraktijk Oosterhout", address: "Voorbeeldlaan 12", city: "Oosterhout", lat: 51.6450, lng: 4.8580 },
];

document.addEventListener("DOMContentLoaded", () => {
  setupDropdowns();
  setupMapAndList();
});

function setupDropdowns(){
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  dropdowns.forEach((dd) => {
    const btn = dd.querySelector("button");
    const menu = dd.querySelector(".dropdown");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = dd.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dd.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        btn.blur();
      }
    });
  });
}

function setupMapAndList(){
  const mapEl = document.getElementById("map");
  const listEl = document.getElementById("locationList");

  if (!mapEl || typeof L === "undefined") return;

  const map = L.map("map", { scrollWheelZoom: false }).setView([51.590, 4.780], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap-bijdragers",
  }).addTo(map);

  const bounds = [];
  const markers = [];

  locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lng]).addTo(map);
    marker.bindPopup(`<strong>${escapeHtml(loc.name)}</strong><br>${escapeHtml(loc.address)}, ${escapeHtml(loc.city)}`);
    bounds.push([loc.lat, loc.lng]);
    markers.push({ marker, loc });
  });

  if (bounds.length >= 1) {
    map.fitBounds(bounds, { padding: [18, 18] });
  }

  if (listEl) {
    listEl.innerHTML = locations.map((loc, i) => {
      return `
        <div class="location-item" data-loc-index="${i}" tabindex="0" role="button" aria-label="${escapeHtml(loc.name)}">
          <div class="location-name">${escapeHtml(loc.name)}</div>
          <div class="location-meta">${escapeHtml(loc.address)}, ${escapeHtml(loc.city)}</div>
        </div>
      `;
    }).join("");

    listEl.addEventListener("click", (e) => {
      const item = e.target.closest("[data-loc-index]");
      if (!item) return;
      const idx = Number(item.getAttribute("data-loc-index"));
      const found = markers[idx];
      if (!found) return;
      map.setView(found.marker.getLatLng(), 14, { animate: true });
      found.marker.openPopup();
    });

    listEl.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = e.target.closest("[data-loc-index]");
      if (!item) return;
      e.preventDefault();
      item.click();
    });
  }
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
