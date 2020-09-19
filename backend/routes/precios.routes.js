const crud = require('../controllers/default/crud.controller');
const route = `/precios`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.precios,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.precios,req,res));
    app.post(`${route}/condition`,(req,res)=>
      crud.findByCondition(db.precios,req.body.condition,res));
    app.post(`${route}`,(req,res)=>crud.create(db.precios,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.precios,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.precios,req,res));
}