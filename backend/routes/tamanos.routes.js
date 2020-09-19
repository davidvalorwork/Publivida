const crud = require('../controllers/default/crud.controller');
const route = `/tamanos`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.tamanos,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.tamanos,req,res));
    app.post(`${route}/condition`,(req,res)=>crud
    .findByCondition(db.tamanos,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.tamanos,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.tamanos,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.tamanos,req,res));
}