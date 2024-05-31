const Pedidos = require("../models/Pedidos");

//Nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
  try {
    const pedido = new Pedidos(req.body);

    await pedido.save();
    res.json({ message: "Se agregó un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    next();
  }
};

//Muestra un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido).populate({
    path: "pedido.producto",
    model: "Productos",
  });

  if (!pedido) {
    res.json({ message: "Ese pedido no existe" });
    next();
  }

  res.json(pedido);
};

//Actualizar pedido por su ID
exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      { new: true }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Eliminar un pedido por su ID
exports.deletePedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({ message: "El pedido se ha eliminado correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
