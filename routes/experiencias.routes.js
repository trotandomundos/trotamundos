const router = require("express").Router();
const Users = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Sta dice cual es la pagina que tiene que renderizar
router.get("/", (req, res, next) => {
  res.render("experiencias", { users: req.session.currentUser });
});
router.get("/experiencias/nueva", (req, res, next) => {
  res.render("nueva", { users: req.session.currentUser });
});
router.get("/experiencias/vista", (req, res, next) => {
  res.render("vista", { users: req.session.currentUser });
});

// const { isLoggedIn, checkRole } = require("../middlewares/route-guard");
// router.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const users = await Users.find();
//     res.render("users", { users });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
