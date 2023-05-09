module.exports = (app) => {
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //STUDENT
  const indexStudent = require("./users.routes");
  app.use("/users", indexStudent);

  //Buscar
  const buscar = require("./buscar.routes");
  app.use("/buscar", buscar);

  //experiencias
  const experiencias = require("./experiencias.routes");
  app.use("/", experiencias);
};
