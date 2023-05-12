module.exports = (app) => {
  //Home and search routes
  const home = require("./search.routes");
  app.use("/", home);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //STUDENT
  const indexStudent = require("./users.routes");
  app.use("/users", indexStudent);

  //experiencias
  const experiences = require("./experiences.routes");
  app.use("/myExperiences", experiences);


//reviews

const reviews = require("./reviews.routes");
app.use("/myReviews",reviews )
};