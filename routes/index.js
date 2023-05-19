module.exports = (app) => {

  const home = require("./search.routes");
  app.use("/", home);


  const authRouter = require("./auth.routes");
  app.use("/", authRouter);


  const indexUser = require("./user.routes");
  app.use("/user", indexUser);


  const experiences = require("./experiences.routes");
  app.use("/myExperiences", experiences);


  const reviews = require("./reviews.routes");
  app.use("/myReviews", reviews);


  const findPlace = require("./findPlaces.routes");
  app.use("/",findPlace)
};
