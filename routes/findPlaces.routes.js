const router = require("express").Router();
const Experience = require("../models/Experience.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const { isLoggedIn } = require("../middlewares/route-guard");
const uploader = require("../config/claudinary.config");
const axios = require("axios");

router.get("/search-places", isLoggedIn, async (req, res, next) => {
  res.render("experienceSearch", { user: req.session.currentUser });
});

router.post("/search-places", isLoggedIn, async (req, res, next) => {
  let { location, category, name } = req.body;
  // llamamos a la API
  // http://tour-pedia.org/api/getPlaces?category=restaurant&location=Berlin&name=La+Dolce+Vita
  // bar california
  if (name) {
    let words = name.split(" "); // split the string into an array of words
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1); // capitalize the first letter of each word
    }
    name = words.join("+");
  }
  let urlAPi = `http://tour-pedia.org/api/getPlaces?category=${category}&location=${location}&name=${name}`;

  axios
    .get(urlAPi)
    .then((response) => {
      res.render("search-places-results", {
        response: response.data,
        user: req.session.currentUser,
      });
      console.log(response.data);
      //los datos de l y l para mapa estan en response.data y se envian bien
    })
    .catch((error) => {
      console.log("Tu error es", error);
    });
});
//dime como puedo usa esta ultima parte del codigo get para usar paginacion 



//----paginacion 
// axios
//     .get(urlAPi)
//     .then((response) => {
//       const pageSize = 10; // Número de resultados por página
//       const totalResults = response.data.length;
//       const totalPages = Math.ceil(totalResults / pageSize);
//       const startIndex = (page - 1) * pageSize;
//       const endIndex = startIndex + pageSize;
//       const paginatedResults = response.data.slice(startIndex, endIndex);

//       res.render("search-places-results", {
//         response: paginatedResults,
//         user: req.session.currentUser,
//         currentPage: page,
//         totalPages: totalPages,
//       });
//       console.log(paginatedResults);
//       // Los datos de l y l para mapa están en response.data y se envían correctamente
//     })
//     .catch((error) => {
//       console.log("Tu error es", error);
//     });
//     });

//DETALLES API, ME DEVUELVE LOS DATOS PERO NO ME APARECE EL MAPA, AUNQUE LG Y LONG ME LOS DA
router.get("/search-places/details/:id", isLoggedIn, async (req, res, next) => {
  try {
    const experienceId = req.params.id;
    const urlApi = `http://tour-pedia.org/api/getPlaceDetails?id=${experienceId}`;
    const response = await axios.get(urlApi);
    const experienceData = response.data;

    if (!experienceData) {
      // Lógica para manejar el caso en el que no se encuentren datos de la experiencia
      // Por ejemplo, mostrar un mensaje de error o redirigir a otra página
    } else {
      const coordinates = experienceData.map((place) => [place.lng, place.lat]);
      const map = createMap(coordinates);

      const detailsData = experienceData.find(
        (item) => item.id === parseInt(experienceId)
      );

      res.render("details-experience", {
        details: detailsData,
        map: map, // Pasa el mapa como variable a la vista
      });
    }
  } catch (error) {
    console.log(error);
    // Lógica para manejar el error en caso de que ocurra un problema al llamar a la API
  }
});

module.exports = router;
