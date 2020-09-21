const messages = require("../default/messages.controller")
module.exports=async(db,req,res)=>{
  console.log("COMENZANDO REPORTE")
  response=null
  const productos = []
  const pedidos = await db.pedidos.findAll({where:{borrado:0,estadosPedidoIdEstadosPedidos:3}})
  for(let i in pedidos){
    const detalle = await db.detalles_pedidos.findOne({where:{
      pedidoIdPedidos:pedidos[i].dataValues.id_pedidos
    }})
    // console.log(detalle.cantidad)
    const precio = await db.precios.findOne({where:{
      id_precios:detalle.dataValues.precioIdPrecios
    }})
    const producto = await db.productos.findOne({where:{
      id_productos:precio.dataValues.productoIdProductos
    }})
    // console.log(producto)
    const productoVenta={
      nombre:producto.dataValues.nombre_producto,
      ventas:parseInt(detalle.cantidad)
    }
    let sumado = false
    console.log(productos.length)
    for(let i in productos){
      if(producto.dataValues.nombre_producto === productos[i].nombre){
        productos[i].ventas += parseInt(detalle.dataValues.cantidad)
        sumado = true
        console.log(sumado)
      }
    }
    console.log(sumado)
    if(!sumado){
      productos.push(productoVenta)
    }
  }
  
  messages.success(productos,res)
}