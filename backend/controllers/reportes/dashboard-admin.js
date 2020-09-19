const messages = require("../default/messages.controller")
module.exports=async(db,req,res)=>{
  const pedidos = await db.pedidos.findAll()
  const pedidosPagados = await db.pedidos.findAll({where:{borrado:0,estadosPedidoIdEstadosPedidos:3}})
  const usuarios = await db.usuarios.findAll()
  const productos = await db.productos.findAll()
  const categorias = await db.categorias.findAll()
  const response = {
    pedidos:pedidos.length,
    usuarios:usuarios.length,
    productos:productos.length,
    categorias:categorias.length,
    pedidosPagados:pedidosPagados.length,
  }
  messages.success(response,res)
}