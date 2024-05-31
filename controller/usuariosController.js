const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  try {
    //leer los datos del usuario
    const { email, nombre, password } = req.body;

    //generar la salt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //guardar en la bd
    await Usuarios.create({
      email,
      nombre,
      password: passwordHash,
    });
    res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Hubo un error" });
  }
};

exports.authenticarUsuario = async (req, res, next) => {
  //buscar el usuario
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    //si no existe
    await res.status(401).json({ message: "Ese usuario no existe" });
    next();
  } else {
    //el usuario existe verificar si el password es correcto o incorrecto
    if (!bcrypt.compareSync(password, usuario.password)) {
      //es incorrecto
      await res.status(401).json({ message: "Password incorrecto" });
      next();
    } else {
      //passwor correcto firmar token
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1h",
        }
      );

      //retornar el TOKEN
      res.json({token});
    }
  }
};
