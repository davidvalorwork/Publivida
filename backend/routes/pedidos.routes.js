const crud = require('../controllers/default/crud.controller');
const route = `/pedidos`;
const getPedidos = require('../controllers/pedidos/getPedidos').obtener
const flow = require('../controllers/flow')

module.exports = (app,db) => {
    app.get(`${route}/estado/:id`,(req,res)=>crud.find(db.estados_pedidos,req,res))
    app.post(`${route}/obtener`,(req,res)=>getPedidos(db,req,res))
    app.post(`${route}/pago`,(req,res)=>flow.pago(db,req,res));
    app.post(`${route}/flow/result`,(req,res)=>flow.result(db,req,res));
    app.get(`${route}`,(req,res)=>crud.findAll(db.pedidos,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.pedidos,req,res));
    app.post(`${route}/condition`,(req,res)=>
      crud.findByCondition(db.pedidos,req.body.condition,res));
    app.post(`${route}`,(req,res)=>crud.create(db.pedidos,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.pedidos,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.pedidos,req,res));

}