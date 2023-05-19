const router = require("express").Router();
const Experience = require("../models/Experience.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const { isLoggedIn } = require("../middlewares/route-guard");
const uploader = require("../config/claudinary.config");
const axios = require("axios");
const hbs = require("hbs");
// const handlebarsHelpers = require("handlebars-helpers");

// hbs.registerHelpers(handlebarsHelpers);

const RESULTS_PER_PAGE = 10; // Cantidad de resultados por página

router.get("/search-places", isLoggedIn, async (req, res, next) => {
  res.render("experienceSearch", { user: req.session.currentUser });
});

router.post("/search-places", isLoggedIn, async (req, res, next) => {
  let { location, category, name } = req.body;
  if (name) {
    let words = name.split(" ");
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    name = words.join("+");
  }
  let urlAPi = `http://tour-pedia.org/api/getPlaces?category=${category}&location=${location}&name=${name}`;

  axios
    .get(urlAPi)
    .then((response) => {
      const totalResults = response.data.length;
      const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
      const currentPage = 1;
      const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
      const endIndex = startIndex + RESULTS_PER_PAGE;
      const paginatedResults = response.data.slice(startIndex, endIndex);

      res.render("search-places-results", {
        response: paginatedResults,
        user: req.session.currentUser,
        totalPages: totalPages,
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      console.log("Tu error es", error);
    });
});

module.exports = router;
// const router = require("express").Router();
// const Experience = require("../models/Experience.model");
// const User = require("../models/User.model");
// const Review = require("../models/Review.model");
// const { isLoggedIn } = require("../middlewares/route-guard");
// const uploader = require("../config/claudinary.config");
// const axios = require("axios");
// const hbs = require("hbs");
// const handlebarsHelpers = require("handlebars-helpers");
// // Registra todos los helpers proporcionados por el paquete handlebars-helpers
// hbs.registerHelpers(handlebarsHelpers);

// router.get("/search-places", isLoggedIn, async (req, res, next) => {
//   res.render("experienceSearch", { user: req.session.currentUser });
// });

// router.post("/search-places", isLoggedIn, async (req, res, next) => {
//   let { location, category, name } = req.body;
//   if (name) {
//     let words = name.split(" "); // split the string into an array of words
//     for (let i = 0; i < words.length; i++) {
//       let word = words[i];
//       words[i] = word.charAt(0).toUpperCase() + word.slice(1); // capitalize the first letter of each word
//     }
//     name = words.join("+");
//   }
//   let urlAPi = `http://tour-pedia.org/api/getPlaces?category=${category}&location=${location}&name=${name}`;

//   axios
//     .get(urlAPi)
//     .then((response) => {
//       res.render("search-places-results", {
//         response: response.data,
//         user: req.session.currentUser,
//       });
//       console.log(response.data);
//       //los datos de l y l para mapa estan en response.data y se envian bien
//     })
//     .catch((error) => {
//       console.log("Tu error es", error);
//     });
// });

// module.exports = router;
