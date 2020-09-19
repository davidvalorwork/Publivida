const messages = require('../default/messages.controller');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    registro:async(req,res,db)=>{
        req.body.clave = bcrypt.hashSync(req.body.clave,salt);
        const body = req.body;
        const usuario = {
            usuario: body.usuario,
            clave: body.clave,
            nombres: body.nombres,
            apellidos: body.apellidos,
            rut: body.rut,
            telefono: body.telefono,
            correo: body.correo,
            razon_social: body.razon_social,
            giro: body.giro,
            nombre_fantasia: body.nombre_fantasia,
            tiposUsuarioIdTiposUsuarios:body.tipo_usuario,
            borrado:0
        }
        let rut = false,
            nombre_usuario=false,
            correo=false;
        await db.usuarios.findAll({where:{rut:body.rut,borrado:0}})
            .then(result=>result.length>0?rut=true:null)
        await db.usuarios.findAll({where:{usuario:body.usuario,borrado:0}})
            .then(result=>result.length>0?nombre_usuario=true:null)
        await db.usuarios.findAll({where:{correo:body.correo,borrado:0}})
            .then(result=>result.length>0?correo=true:null)
        if(rut === true || nombre_usuario === true || correo === true){
            if(nombre_usuario === true)messages.error(`Nombre Usuario repetido.`,res)
            if(rut === true)messages.error(`Rut repetido.`,res)
            if(correo === true)messages.error(`Correo repetido.`,res)
        }else{
            await db.usuarios.create(usuario)
                .then(result=> messages.success(result,res))
                .catch(err=>messages.error(err,res))
        }
    }
}