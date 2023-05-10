const router = require("express").Router();
const Experience = require("../models/Experience.model");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/route-guard");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Mostrar todas mis experiencias
router.get("/", isLoggedIn, async (req, res, next) => {
  console.log(req.session.currentUser._id);
  const experiences = await Experience.find({
    userId: req.session.currentUser._id,
  });

  res.render("myExperiences", {
    experiences: experiences,
    users: req.session.currentUser,
  });
});

// Formulario de crear una nueva experiencia
router
  .get("/new", isLoggedIn, (req, res, next) => {
    res.render("experienceNew", { users: req.session.currentUser });
  })
  .post("/new", isLoggedIn, async (req, res) => {
    const { titulo, texto, imagenes, filtro } = req.body;

    Experience.create({
      titulo,
      texto,
      imagenes,
      filtro,
      userId: req.session.currentUser._id,
    })
      .then(() => res.redirect("/myExperiences"))
      .catch((err) => console.log(err));
  });

// Mostrar una experiencia en concerto
router
  .get("/:id", isLoggedIn, async (req, res, next) => {
    const experience = await Experience.findOne({
      _id: req.params.id,
    });

    res.render("experienceDetails", {
      users: req.session.currentUser,
      experience: experience,
    });
  })
  .post("/:id", isLoggedIn, (req, res, next) => {
    //
  })
  .post("/:id/delete", isLoggedIn, async (req, res, next) => {
    const { deletedCount, acknowledged } = await Experience.deleteOne({
      _id: req.params.id,
    });

    if (deletedCount) {
      res.redirect("/myExperiences");
    } else {
      res.status(500).render("Experience not found");
    }
  });

router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const experience = await Experience.findOne({
      _id: req.params.id,
    });

    res.render("experienceEdit", {
      experience: experience,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      pais: req.body.pais,
    });
    res.redirect("/myExperiences");
  } catch (error) {
    next(error);
  }
});

// Mis ajustes
router.get("/myExperiences/ajustes", isLoggedIn, async (req, res) => {
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
