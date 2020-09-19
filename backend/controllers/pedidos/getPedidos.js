const moment = require('moment');
const messages = require('../default/messages.controller')
module.exports={
  obtener:async(db,req,res) =>{
    console.log(req.body.condition)
    let response = []
    const pedidos = await db.pedidos.findAll(req.body.condition);
    for(let i in pedidos){
      const user = await db.usuarios.findOne({where:{id_usuarios:pedidos[i].dataValues.usuarioIdUsuarios}})
      user===undefined?null:pedidos[i].dataValues.usuario = user.correo
      const detalle = await db.detalles_pedidos.findAll({where:{
          borrado:0,
          pedidoIdPedidos:pedidos[i].dataValues.id_pedidos
      }})
      pedidos[i].dataValues.detalle = detalle[0]
      if(detalle.length >0){
          if(detalle[0].dataValues.precioIdPrecios!== null){
            let precio = await db.precios.findOne({where:{id_precios:detalle[0].dataValues.precioIdPrecios}})
            if(precio!==null){
              pedidos[i].dataValues.precio=precio.dataValues.valor_unitario * pedidos[i].dataValues.detalle.cantidad      
              pedidos[i].dataValues.productoid = precio.dataValues.productoIdProductos                       
            }
          }
        } 
      let estado = await db.estados_pedidos.findAll({where:{id_estados_pedidos:pedidos[i].dataValues.estadosPedidoIdEstadosPedidos}})
      pedidos[i].dataValues.estado = estado[0].dataValues.nombre_estado_pedido
      if(pedidos[i].dataValues.productoid !== undefined && pedidos[i].dataValues.borrado !== 1){
        let producto = await db.productos.findOne({where:{id_productos:pedidos[i].dataValues.productoid}})
        if(producto!==null){
          pedidos[i].dataValues.producto = producto.dataValues
          const fecha =new Date(pedidos[i].dataValues.fecha_pedido)
          pedidos[i].dataValues.fecha = moment(fecha).format("DD MM YYYY hh:mm:ss")
          response.push(pedidos[i].dataValues)
        }
      }
    }
    messages.success(response,res)
  }
}