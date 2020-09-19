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
}