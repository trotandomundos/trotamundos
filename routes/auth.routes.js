const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const uploader = require("../config/claudinary.config");


router.get("/registro", (req, res, next) => res.render("auth/signup"));

router.post(
  "/registro",
  uploader.single("profilePic"),
  async (req, res, next) => {
    console.log(req.file);
    const { userPwd } = req.body;

    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(userPwd, salt))
      .then((hashedPassword) =>
        User.create({
          ...req.body,
          password: hashedPassword,
          profilePic: req.file.path,
        })
      )
      .then((createdUser) => res.redirect("/"))
      .catch((error) => next(error));
  }
);


const { isLoggedIn, checkRole } = require("../middlewares/route-guard");

router.get("/iniciar-sesion", isLoggedIn, async (req, res, next) => {
  try {
    res.redirect("/");
  } catch (error) {
    res.render("auth/login");
  }
});

router.post("/iniciar-sesion", (req, res, next) => {
  const { email, userPwd } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.redirect("/registro");
        return;
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login", {
          errorMessage: "La contraseña es incorrecta",
        });
        return;
      } else {
        req.session.currentUser = user;
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
});

router.post("/cerrar-sesion", (req, res, next) => {
  req.session.destroy(() => res.redirect("/iniciar-sesion"));
});

module.exports = router;
