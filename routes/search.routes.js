const router = require("express").Router();
const Users = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../middlewares/route-guard");

const saltRounds = 10;

// Vista de la pagina principal de busqueda
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("home", { users: req.session.currentUser });
});

router.get("/search", isLoggedIn, (req, res, next) => {
  res.render("search", { users: req.session.currentUser });
});

module.exports = router;
