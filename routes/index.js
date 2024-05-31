const express = require("express");
const router = express.Router();
const clienteController = require("../controller/clienteController");
const productoController = require("../controller/productosController");
const pedidosController = require('../controller/pedidosController');
const usuariosController = require('../controller/usuariosController');

const { uploadImgProducto } = require("../middlewares/multer");

/**Midleware para proteger las rutas */
const auth = require('../middlewares/auth.midleware');


module.exports = function () {
  /**Clientes */
  router.post("/clientes", auth, clienteController.nuevoCliente);
  router.get("/clientes", auth, clienteController.mostrarClientes);
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);
  router.delete("/clientes/:idCliente", auth, clienteController.eliminarCliente);

  /**Productos */
  router.post("/productos", auth, uploadImgProducto.single("imagen"), productoController.nuevoProducto);
  router.get("/productos", auth, productoController.mostrarProductos);
  router.get("/productos/:idProducto", auth, productoController.mostrarProducto);
  router.put("/productos/:idProducto", auth, uploadImgProducto.single('imagen'), productoController.actualizarProducto);
  router.delete("/productos/:idProducto", auth, productoController.eliminarProducto);
  router.post('/productos/busqueda/:query', auth, productoController.buscarProducto);

  /**Peididos */
  router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);
  router.get('/pedidos', auth, pedidosController.mostrarPedidos);
  router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);
  router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido)
  router.delete('/pedidos/:idPedido', auth, pedidosController.deletePedido);

  /**Usuarios */
  router.post('/crear-cuenta', auth, usuariosController.registrarUsuario);
  router.post('/iniciar-sesion', usuariosController.authenticarUsuario);


  return router;
};
