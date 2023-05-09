const router = require("express").Router();
const Users = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../middlewares/route-guard");

const saltRounds = 10;

// Sta dice cual es la pagina que tiene que renderizar
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("buscar", { users: req.session.currentUser });
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
