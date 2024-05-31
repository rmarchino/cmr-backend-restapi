const Productos = require("../models/Productos");
const fs = require("fs");

//Crear todo los productos
exports.nuevoProducto = async (req, res, next) => {
  try {
    const { nombre, precio } = req.body;
    let imagen = null;
    if (req.file) {
      imagen = req.file.filename;
    }

    await Productos.create({
      nombre,
      precio,
      imagen,
    });
    res.json({ message: "Se agregó un nuevo producto" });
  } catch (error) {
    next(error);
  }
};

//Mostrar todo los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.error(error);
    next();
  }
};

//Mostrar un producto en específico por su ID
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);

  if (!producto) {
    res.json({
      message: "Ese producto no existe",
    });
    return next();
  }
  res.json(producto);
};

// Actualizar producto por si ID
exports.actualizarProducto = async (req, res, next) => {
  try {
    // Obtener el nuevo producto del cuerpo de la solicitud
    let nuevoProducto = req.body;

    //Definir producto anterior
    let productoAnterior;

    //verificar si hay imagen nueva
    if (req.file) {
      // Si hay una nueva imagen, obtener el producto anterior de bd
      productoAnterior = await Productos.findById(req.params.idProducto);
      nuevoProducto.imagen = req.file.filename;
    } else {
      // Si no hay una nueva imagen, mantener la imagen del producto anterior
      productoAnterior = await Productos.findById(req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    // Actualizar el producto en la base de datos
    let producto = await Productos.findOneAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// Elimina un producto por su ID
exports.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({ _id: req.params.idProducto });
    res.json({ message: "El producto se ha eliminado" });
  } catch (error) {
    console.error(error);
    next();
  }
};

//Búsqueda de productos
exports.buscarProducto = async (req, res, next) => {
  try {
    //obtener el query
    const { query } = req.params;
    const producto = await Productos.find({ nombre: new RegExp(query, "i") });
    res.json(producto);
    
  } catch (error) {
    console.log(error);
    next();
  }
};
