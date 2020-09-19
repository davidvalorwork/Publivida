const crud = require('../controllers/default/crud.controller');
const {pedir_usuario} = require('../controllers/auth/login.controller')
const route = `/usuarios`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.usuarios,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.usuarios,req,res))
    app.post(`${route}/:id`,(req,res)=>crud.update(db.usuarios,req,res))
}