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

//DETALLES API
router.get("/search-places/details/:id", isLoggedIn, async (req, res, next) => {
  try {
    const urlApi = `http://tour-pedia.org/api/getPlaceDetails?id=${experienceId}`;
    const experienceId = req.params.id;
    const response = await axios.get(urlApi);
    const experienceData = response.data;

    if (!experienceData) {
      // Lógica para manejar el caso en el que no se encuentren datos de la experiencia
    } else {
      const detailsData = experienceData.find(
        (item) => item.id === parseInt(experienceId)
      );
      res.render("details-experience", {
        details: detailsData,
      });
    }
  } catch (error) {
    console.log(error);
    // Lógica para manejar el error en caso de que ocurra un problema al llamar a la API
  }
});

//_-----------------------_//
// router.post("/create-experience-with-api", async (req, res, next) => {
//   const body = req.body;
//   console.log(body);
//   res.render("createExperienceApi", { body });
// });

// FALTARÍA IMPLEMENTAR LA FOTO
// router.post("/create-experience-with-api", async (req, res, next) => {
// como lo queremos
//     location: String,  →
//   coordinates:[String], →
//   placeName: String,

// como nos llegan
//     {
//   name: 'freelance dee jay',
//   address: 'Eva Besnyöstraat 289, Amsterdam, Netherlands',
//   lat: '52.351137',
//   lng: '5.005955'
// }

//   console.log(req.body);
//   const { titulo, texto, imagen, filtro, address, lat, lng } = req.body;
//   const coordinates = [lng, lat];
//   const location = address;
//   const placeName = name;
//   const userId = req.session.currentUser._id;

//   const newExperience = await Experience.create({
//     titulo,
//     texto,
//     imagen,
//     filtro,
//     coordinates,
//     location,
//     placeName,
//     userId,
//   });

//   await User.findByIdAndUpdate(userId, {
//     $push: { myExperiences: newExperience._id },
//   });
//   res.send("hola");
// });

module.exports = router;
