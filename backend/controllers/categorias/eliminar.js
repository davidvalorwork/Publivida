const messages =require("../default/messages.controller")
module.exports=async (db,req,res)=>{
  console.log(req.params)
  const id_categorias = req.params.id
  const result = await db.productos.update({borrado:1},
    {where:{
      categoriaIdCategorias:id_categorias
    }})
  console.log(result)
  const result2 = await db.categorias.update({borrado:1},
    {where:{
      id_categorias:id_categorias
    }})
    console.log(result2)
  messages.success("Catergoria y Productos eliminados",res)
}