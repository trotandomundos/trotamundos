const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaXJlbmVndiIsImEiOiJjbGhyd2xza3EyZm1zM2xvZGNnNjI3NXJxIn0.ENRxlLmYlxI7a7vJKsHbsQ";

const main = () => {
  
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  const mapas = document.querySelectorAll('[id^="map-"]'); 
  const canvas = document.getElementById("myCanvas");

  mapas.forEach((mapa) => {
    const coords = mapa?.id?.replace("map-", "").split("/");
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);

    if (isNaN(longitude) || isNaN(latitude)) {
      console.error("Error: Las coordenadas deben ser números");
      return;
    }

    const map = new mapboxgl.Map({
      container: mapa?.id,
      zoom: 15,
      center: [longitude, latitude],
      style: "mapbox://styles/mapbox/streets-v11",
    });

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  });
};

window.addEventListener("load", main);

