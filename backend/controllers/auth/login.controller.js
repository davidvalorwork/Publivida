const messages = require('../default/messages.controller'),
      bcrypt = require('bcrypt-nodejs'),
      jwt = require('jsonwebtoken'),
      config = require('../../config/config');
module.exports = {
    login:(req,res,db)=>{
        db.usuarios.findAll({where:{usuario:req.body.usuario,borrado:0}})
            .then(result=>{
                if(result.length !== 0){
                    compararClaves(req.body.clave,result[0].dataValues.clave)===true?
                    generarToken(result[0].dataValues.id_usuarios,result[0].dataValues.tiposUsuarioIdTiposUsuarios,res)
                    :messages.error('Credenciales Invalidas',res)
                }
                else messages.error('Credenciales Invalidas',res);
            })
            .catch(err=>messages.error(err,res))
    },
}
const compararClaves = (clave_login, clave_usuario) => {
    if(bcrypt.compareSync(clave_login, clave_usuario))
    return true
    else return false
}
const generarToken = (id_usuario,tipo_usuario,res) => {
    const payload = {
        check:  true
    };
    const token = jwt.sign(payload, config.llave);
    messages.success({msj:'Credenciales Validas',token:token,tipo_usuario:tipo_usuario,id_usuario},res)
}