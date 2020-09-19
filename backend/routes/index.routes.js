const auth = require('./auth.routes');
const usuarios = require('./usuarios.routes');
const categorias = require('./categorias.routes');
const productos = require('./productos.routes');
const precios = require('./precios.routes')
const pedidos = require('./pedidos.routes')
const detallespedidos = require('./detalle-pedidos.routes')
const reportes = require('./reportes.routes')
const tamanos = require('./tamanos.routes')

module.exports = (app,db,protegerRutas,multer) => {
    auth(app,db);
    usuarios(app,db);
    categorias(app,db);
    productos(app,db,multer);
    precios(app,db);
    pedidos(app,db);
    detallespedidos(app,db);
    reportes(app,db);
    tamanos(app,db);
}