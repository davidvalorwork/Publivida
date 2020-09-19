const messages = require('../default/messages.controller'),
    bcrypt = require('bcrypt-nodejs'),
    salt = bcrypt.genSaltSync(10),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config');

module.exports = {
    olvide_contra:async(req,res,db)=>{
        const {correo} = req.body;
        await db.usuarios.findOne({where:{correo:correo,borrado:0}})
            .then(result=>{
                const payload = {id_usuarios:result.dataValues.id_usuarios}
                const token_recuperacion = jwt.sign(payload, config.llave)
                result.update({recupera_contra:token_recuperacion});
                messages.success(token_recuperacion,res)
            })
            .catch(err=>messages.error(err,res));
    },
    verificaToken:async(req,res,db)=>{
        const {token} = req.body;
        await db.usuarios.findOne({where:{recupera_contra:token,borrado:0}})
            .then(result=>{
                result.update({recupera_contra:null});
                messages.success({id_usuarios:result.dataValues.id_usuarios},res)
            })
            .catch(err=>messages.error(err,res));
    },
    cambiaContra:async(req,res,db)=>{
        const {id_usuarios,clave} = req.body;
        await db.usuarios.findOne({where:{id_usuarios:id_usuarios,borrado:0}})
            .then(result=>{
                const claveHash = bcrypt.hashSync(clave,salt);
                result.update({clave:claveHash});
                messages.success(`Clave cambiada correctamente.`,res)
            })
            .catch(err=>messages.error(err,res));
    }
}