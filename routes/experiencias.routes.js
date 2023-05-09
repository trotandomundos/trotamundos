const router = require("express").Router();
const Experiencia = require("../models/Experiencia.model");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/route-guard");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Mostrar todas mis experiencias
router.get("/", isLoggedIn, async (req, res, next) => {
  const experiencias = await Experiencia.find({
    userId: req.session.currentUser._id,
  });

  res.render("experiencias", { experiencias, users: req.session.currentUser });
});

// Formulario de crear una nueva experiencia
router
  .get("/nueva", isLoggedIn, (req, res, next) => {
    res.render("nueva", { users: req.session.currentUser });
  })
  .post("/nueva", isLoggedIn, async (req, res) => {
    const { titulo, texto, imagenes, filtro } = req.body;

    Experiencia.create({
      titulo,
      texto,
      imagenes,
      filtro,
      userId: req.session.currentUser._id,
    })
      .then(() => res.redirect("/experiencias"))
      .catch((err) => console.log(err));
  });

// Mostrar una experiencia en concerto
router
  .get("/:id", isLoggedIn, async (req, res, next) => {
    const experiencia = await Experiencia.findOne({
      _id: req.params.id,
    });

    res.render("experiencia", { users: req.session.currentUser, experiencia });
  })
  .put("/:id", isLoggedIn, (req, res, next) => {
    //
  })
  .post("/:id/delete", isLoggedIn, async (req, res, next) => {
    const { deletedCount, acknowledged } = await Experiencia.deleteOne({
      _id: req.params.id,
    });

    if (deletedCount) {
      res.redirect("/experiencias");
    } else {
      res.status(500).render("Experience not found");
    }
  });

// Mis ajustes
router.get("experiencias/ajustes", isLoggedIn, async (req, res) => {
  res.render("ajustes", { user });
  // try {
  //   const user = await User.findById(req.session.currentUser._id);
  //   console.log(user, req.session.currentUser);
  //   res.render("ajustes", { user });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Error de servidor");
  // }
});

module.exports = router;
