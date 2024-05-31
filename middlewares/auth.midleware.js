const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // Autorización por el header
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    error.statusCode = 401;
    throw error;
  }

  // Obtener el token y verificarlo
  const token = authHeader.split(" ")[1];
  let revisarToken;

  try {
    revisarToken = jwt.verify(token, "LLAVESECRETA");
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }

  // Si el token es inválido
  if (!revisarToken) {
    const error = new Error("Token inválido");
    error.statusCode = 401;
    throw error;
  }

  // Si llegamos aquí, el token es válido, podemos continuar
  next();
};
