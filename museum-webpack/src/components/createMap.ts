import 'mapbox.js';

function createMap() {
  const apiKey =
    'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA';

  const mymap = L.map('map').setView([48.86091, 2.3364], 17);

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      maxZoom: 18,
      id: `mapbox/light-v10`,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: apiKey,
    }
  ).addTo(mymap);

  const myIcon = L.icon({
    iconUrl: './assets/img/maps-and-flags.png',
    iconSize: [35, 35],
  });

  L.marker([48.86091, 2.3364], { icon: myIcon }).addTo(mymap);

  (
    document.querySelectorAll('.leaflet-marker-icon') as NodeListOf<HTMLElement>
  ).forEach((i) => {
    i.style.opacity = String(0.4);
  });

  // Adding Marker
  const mapPopup = [
    [48.8602, 2.3333],
    [48.8607, 2.3397],
    [48.8619, 2.333],
    [48.8625, 2.3365],
  ];
  mapPopup.forEach((point) => {
    L.marker(point, { icon: myIcon }).addTo(mymap);
  });
}

export default createMap;
