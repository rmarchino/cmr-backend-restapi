const Clientes = require("../models/Clientes");

//Agregar un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  try {
    //Verificar si el nombre ya existe en bd
    const nameExist = await Clientes.findOne({ nombre: req.body.nombre });
    if (nameExist) {
      return res.status(400).json({
        error: {
          message: "El nombre ya está en uso",
        },
      });
    }

    //Verificar si el email ya existe en la bd
    const emailExist = await Clientes.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({
        error: {
          message: "El correo electrónico ya está en uso",
        },
      });
    }

    //Sin no hay errores ni duplicados crear nuevo cliente
    const cliente = new Clientes(req.body);
    await cliente.save();
    res.status(201).json({ message: "Se agregó un nuevo cliente" });
  } catch (error) {
    next(error);
  }
};

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

//Muestra un cliente en específico (ID)
exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
      res.json({
        mensaje: "El cliente no existe",
      });
    }
    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

//Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }
    res.json(cliente);

  } catch (error) {
    next(error);
  }
};

//Eliminar cliente por su ID
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ message: "El cliente se ha eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
