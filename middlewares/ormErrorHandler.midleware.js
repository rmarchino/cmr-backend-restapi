const mongoose = require("mongoose");

const {
  ValidationError,
  CastError,
  OverwriteModelError,
  VersionError,
  MissingSchemaError,
  DivergentArrayError,
  BufferOOMError,
  ValidatorError,
  ObjectNotFoundError,
} = mongoose.Error;

const mongooseErrorHandler = (err, req, res, next) => {
  if (
    err instanceof CastError ||
    err instanceof OverwriteModelError ||
    err instanceof VersionError ||
    err instanceof MissingSchemaError ||
    err instanceof DivergentArrayError ||
    err instanceof BufferOOMError ||
    err instanceof ValidatorError ||
    err instanceof ValidationError ||
    err instanceof ObjectNotFoundError
  ) {
    return res.status(400).json({
      name: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof mongoose.Error) {
    return res.status(409).json({
      name: err.name,
      message: "Error en la base de datos",
    });
  }

  next(err);
};

module.exports = mongooseErrorHandler;
