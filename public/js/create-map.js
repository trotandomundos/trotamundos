// const MAPBOX_ACCESS_TOKEN = MAPBOX_KEY;
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaXJlbmVndiIsImEiOiJjbGhyd2xza3EyZm1zM2xvZGNnNjI3NXJxIn0.ENRxlLmYlxI7a7vJKsHbsQ";
// cuando se carga la pagina se ejecuta
const main = () => {
  // setea la api key de mapbox
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  // div id="map-{{lat}}/{{lng}}" style="width: 100%; height: 400px;"></div>
  const mapas = document.querySelectorAll('[id^="map-"]'); // es una query

  // itero los mapas
  mapas.forEach((mapa, index, arr) => {
    // mapa = map-3123123.3123213213/1.13123123
    // mapa.replace("map-", "") = 3123123.3123213213/1.13123123
    // mapa.split("/") = [3123123.3123213213, 1.13123123]
    const coords = mapa?.id?.replace("map-", "").split("/");
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("Error: Las coordenadas deben ser números");
      return;
    }
    console.log("latitude ==>", latitude);
    console.log("longitude ==>", longitude);

    // Create map with search input (geocoder)
    const map = new mapboxgl.Map({
      container: mapa?.id,
      zoom: 9,
      center: [latitude, longitude],
      style: "mapbox://estilos/mapbox/satélite-v9",
    });
  });
};
window.addEventListener("load", main);
