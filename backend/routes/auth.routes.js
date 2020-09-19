const authLogin = require('../controllers/auth/login.controller'),
      authRegistro = require('../controllers/auth/registro.controller'),
      authRecuContra = require('../controllers/auth/recuperar_contasena.controller'),
      route = "/auth";
module.exports = (app,db) => {
    app.post(`${route}/login`,(req,res)=>authLogin.login(req,res,db));
    app.post(`${route}/registro`,(req,res)=>authRegistro.registro(req,res,db));
    app.post(`${route}/recupera_contra`,(req,res)=>authRecuContra.olvide_contra(req,res,db));
    app.post(`${route}/verifica_token`,(req,res)=>authRecuContra.verificaToken(req,res,db));
    app.post(`${route}/cambia_contra`,(req,res)=>authRecuContra.cambiaContra(req,res,db));
}