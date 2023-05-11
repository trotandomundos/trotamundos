const router = require("express").Router();
const Experience = require("../models/Review.model");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/route-guard");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Mostrar todas mis reviews
router.get("/", isLoggedIn, async (req, res, next) => {
    console.log(req.session.currentUser._id);
    const reviews = await Review.find({
      userId: req.session.currentUser._id,
    });
    res.render("myReviews", {
        reviews: reviews,
        users: req.session.currentUser,
      });
    });
    // Formulario de crear una nueva review
router
.get("/create", isLoggedIn, (req, res, next) => {
  res.render("reviewNew", { users: req.session.currentUser });
})
.post("/create", isLoggedIn, async (req, res) => {
  const { titulo, texto, imagenes, filtro } = req.body;

  Experience.create({
    title,
    rating,
    comment,
    location: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
    userId: req.session.currentUser._id,
  })
    .then(() => res.redirect("/myReviews")) //crear 
    .catch((err) => console.log(err));
});
// Mostrar una experiencia en concreto

//vacio /reviewDetails
module.exports = router;
