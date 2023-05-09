module.exports = (app) => {
  //Home and search routes
  const buscar = require("./buscar.routes");
  app.use("/", buscar);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //STUDENT
  const indexStudent = require("./users.routes");
  app.use("/users", indexStudent);

  //experiencias
  const experiencias = require("./experiencias.routes");
  app.use("/experiencias", experiencias);
};
