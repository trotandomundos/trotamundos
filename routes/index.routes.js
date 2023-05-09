const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.redirect("/iniciar-sesion");
});

module.exports = router;
