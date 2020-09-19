const crud = require('../controllers/default/crud.controller');
const route = `/detalle-pedido`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>
    crud.findAll(db.detalles_pedidos,req,res));

    app.get(`${route}/:id`,(req,res)=>
    crud.find(db.detalles_pedidos,req,res));

    app.post(`${route}/condition`,(req,res)=>
      crud.findByCondition(
        db.detalles_pedidos
        ,req.body.condition,res));

    app.post(`${route}`,(req,res)=>
    crud.create(db.detalles_pedidos,req,res));

    app.post(`${route}/:id`,(req,res)=>
    crud.update(db.detalles_pedidos,req,res));

    app.delete(`${route}/:id`,(req,res)=>
    crud.delete(db.detalles_pedidos,req,res));
    
}