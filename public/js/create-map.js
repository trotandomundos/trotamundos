// const MAPBOX_ACCESS_TOKEN = MAPBOX_KEY;
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaXJlbmVndiIsImEiOiJjbGhyd2xza3EyZm1zM2xvZGNnNjI3NXJxIn0.ENRxlLmYlxI7a7vJKsHbsQ";
// cuando se carga la pagina se ejecuta
const main = () => {
  // se setea la api key de mapbox
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  // div id="map-{{lat}}/{{lng}}" style="width: 100%; height: 400px;"></div>
  const mapas = document.querySelectorAll('[id^="map-"]'); // es una query

  // iteras los mapas
  mapas.forEach((mapa, index, arr) => {
    // mapa = map-3123123.3123213213/1.13123123
    // mapa.replace("map-", "") = 3123123.3123213213/1.13123123
    // mapa.split("/") = [3123123.3123213213, 1.13123123]
    const coords = mapa?.id?.replace("map-", "").split("/");
    const latitude = coords[0];
    const longitude = coords[1];

    console.log("latitude ==>", latitude);
    console.log("longitude ==>", longitude);

    // Create map with search input (geocoder)
    const map = new mapboxgl.Map({
      container: mapa?.id,
      zoom: 9,
      center: [latitude, longitude],
      style: "mapbox://styles/timiyay/cilub3df800gqa2kq178v4i8e",
    });
  });
};
window.addEventListener("load", main);