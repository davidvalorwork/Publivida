module.exports = {
    verificar: async(db) => {
        const tipos_usuarios = await db.tipos_usuarios.findAll();
        tipos_usuarios.length===0?inicializar(db):null;
    }
}

const inicializar = async(db) => {
    const tipo_persona = {
        tipo_usuario:'Persona',
        borrado:0
    }
    const tipo_empresa = {
        tipo_usuario:'Empresa',
        borrado:0
    }
    const tipo_admin = {
        tipo_usuario: 'Administrador',
        borrado:0
    }
    const usuario_admin={
        usuario: 'admin',
        clave: '$2a$10$a4JzBQ1c/VLBSLgdVJ3X9uo7/oUSFBvnycRiv4GQS1DppK1EGn7KK',
        correo: 'admin',
        tiposUsuarioIdTiposUsuarios:3,
        borrado:0
    }
    const usuario={
        usuario: 'prueba',
        clave: '$2a$10$a4JzBQ1c/VLBSLgdVJ3X9uo7/oUSFBvnycRiv4GQS1DppK1EGn7KK',
        correo: 'prueba',
        tiposUsuarioIdTiposUsuarios:1,
        borrado:0
    }
    await db.tipos_usuarios.create(tipo_persona).then(result=>console.log("Tipo de usuario: Usuario. Insertado"))
        .catch(err=>console.log(err));
    await db.tipos_usuarios.create(tipo_empresa).then(result=>console.log("Tipo de usuario: Empresa. Insertado"))
        .catch(err=>console.log(err));
    await db.tipos_usuarios.create(tipo_admin).then(result=>console.log("Tipo de usuario: Administrador. Insertado"))
        .catch(err=>console.log(err));
    await db.usuarios.create(usuario_admin).then(result=>console.log("Usuario admin 12345678 insertado."))
        .catch(err=>console.log(err));

    const estado_pedido_borrador = {
        nombre_estado_pedido:'Borrador',
        borrado:0
    }
    const estado_pedido_pendiente = {
        nombre_estado_pedido:'Pendiente',
        borrado:0
    }
    const estado_pedido_pago = {
        nombre_estado_pedido:'Pago',
        borrado:0
    }
    await db.estados_pedidos.create(estado_pedido_borrador).then(result=>console.log("Creado Estado Pedido Borrador."))
        .catch(err=>console.log(err));
    await db.estados_pedidos.create(estado_pedido_pendiente).then(result=>console.log("Creado Estado Pedido Pendiente."))
        .catch(err=>console.log(err));
    await db.estados_pedidos.create(estado_pedido_pago).then(result=>console.log("Creado Estado Pedido Pago."))
        .catch(err=>console.log(err));


    // CATEGORIAS
    await db.categorias.create({nombre_categoria:"Bolso",borrado:0})    //1
    await db.categorias.create({nombre_categoria:"Cartera",borrado:0})  //2
    await db.categorias.create({nombre_categoria:"Lentes",borrado:0})   //3
    await db.categorias.create({nombre_categoria:"Camisa",borrado:0})   //4
    await db.categorias.create({nombre_categoria:"Pantalon",borrado:0}) //5
    await db.categorias.create({nombre_categoria:"Zapato",borrado:0})   //6
    await db.categorias.create({nombre_categoria:"Gorra",borrado:0})    //7

    // PRODUCTOS
    const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    let productos = [
        {nombre_producto:"Bolso Gucci",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Cartera Gucci",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Lentes Aviador",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Luis Button",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Victoria Secret",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Nike",stock:100,descripcion_producto:lorem,borrado:0},
        {nombre_producto:"Adidas",stock:100,descripcion_producto:lorem,borrado:0},
    ]
    // categoriaIdCategorias: 1,
    for(let i in productos){
        productos[i].categoriaIdCategorias = i+1;
        await db.productos.create(productos[i]).then(result=>{
            console.log(result)
        })
    }

    await db.precios.create(
        {
            nombre_precio: "Rango1",
            cantidad_desde:1,
            cantidad_hasta:5,
            valor_unitario:10000,
            borrado:0,
        }
    )
}