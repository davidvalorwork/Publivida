const db = require('../../models')
const messages = require('../default/messages.controller')
module.exports = async(id,res) => {
  const responseCategoria = await db.categorias.update({borrado:0},{where:{id_categorias:id}})
  console.log(responseCategoria)
  const productos = await db.productos.findAll({where:{categoriaIdCategorias:id}})
  for(let i in productos){
    await db.productos.update({borrado:0},{where:{id_productos:productos[i].dataValues.id_productos}})
  }
  messages.success("ok",res)
}