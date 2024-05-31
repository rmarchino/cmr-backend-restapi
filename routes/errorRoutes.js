const errorHandler = require("../middlewares/errorHandler.midleware");
const logError = require("../middlewares/logError.midleware");
const mongooseErrorHandler = require("../middlewares/ormErrorHandler.midleware");

const errorRoutes = (app) => {
  app.use(logError);
  app.use(mongooseErrorHandler);
  app.use(errorHandler);

  //manejar el error 404
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "EL backend se encuentra trabajando, pronto tendremos esta ruta",
    });
  });
};

module.exports = errorRoutes;
